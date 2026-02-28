# 我的 VPS 被入侵挖矿的完整复盘：从 10 负载到清零

- 原始链接：内部复盘
- 作者：oGL2046
- 发布时间：2026-02-28
- X Article：无
- 标签：["安全", "VPS", "Docker", "挖矿木马", "事件响应"]

---

## 一、发现异常

**时间：2026年2月25日**

登录服务器时发现严重卡顿，`top` 显示负载飙到 10+，CPU 100%，2.4G 内存几乎吃满。

这不对劲。我的 Dify 实例不该这么吃资源。

---

## 二、初步排查

**嫌疑人：docker-web-1**

```bash
docker exec docker-web-1 ps aux
```

输出让我懵了：

- `kworker_ds` — 这是什么？Linux 内核 worker 进程应该是 `kworker/0:0` 这种格式
- `kirkd`、`x64`、`python3` — 这些进程哪来的？
- CPU 占用：一个进程 67%，两个各 33%

内存几乎耗尽，swap 也在疯狂抖动。

---

## 三、深挖

### 1. 查找恶意二进制

```bash
docker exec docker-web-1 ls -la /var/tmp/
```

- `kworker_ds` — UPX 打包的 ELF，SHA256: `0c748b9e...`
- `.kworker.conf` — XMRig 配置文件

```json
{
  "pools": [{
    "url": "xmrpool.eu:5555",
    "user": "4AYSESwRUuy1JdwGxTZVjCD11duWWMFUChxt9e1bzU1vCt6TJUUy7x7efVLqzWLpAVgnJmy5zWMjS2g5UeosfpDJM53Ynnc"
  }]
}
```

**这是个门罗币钱包地址。**

### 2. 入侵时间线

通过文件时间戳追溯：

- **2025-12-11 20:53** — `/app/web/xmrig-6.24.0/` 目录创建
- **2025-12-14 08:48** — `/app/web/server.js` 被修改（注入恶意代码）
- **2026-02-25** — 我发现异常

**这台机器被挖矿了将近 3 个月。**

### 3. 入侵途径

检查 Nginx 日志时发现了关键线索：

```
34.158.168.101 - GET /.env 200
34.158.168.101 - GET /.git/config 200
```

**.env 文件暴露！HTTP 200 返回了完整环境变量！**

里面有数据库密码、API key、SECRET_KEY... 攻击者拿到后直接进入了容器。

---

## 四、清理过程

### Round 1：直接杀进程？

不行。容器里有循环脚本：

```bash
while true; do
  /var/tmp/kworker_ds -c /var/tmp/.kworker.conf
  sleep 10
done
```

杀一个，起来一个。

### Round 2：最干净的方案

**直接重建容器：**

```bash
docker stop docker-web-1
docker rm docker-web-1
# 从干净镜像重新拉起
docker compose up -d
```

`docker-web-1` 只是 Dify 的前端（Next.js），没有持久化数据，重建零损失。

**清理结果：**
- CPU load 从 10.86 降到 1.24
- 内存从 2.3G/2.4G 降到 258M
- 恶意进程：0

---

## 五、加固

### 1. SSH 密钥认证

之前是密码登录，`auth.log` 里全是暴力破解记录。

- 生成 ED25519 密钥对
- 禁用密码认证：`PasswordAuthentication no`
- `PermitRootLogin prohibit-password`

### 2. 清理 5.2G 废弃镜像

```bash
docker image prune -a -f
# 回收 5.2GB
```

### 3. 容器内存限制

在 `docker-compose.override.yaml` 里加上：

```yaml
web:
  mem_limit: 512m
api:
  mem_limit: 512m
```

防止单个容器再次吃光全部内存。

### 4. 系统更新

```bash
apt upgrade  # 内核升级 5.4.0-212 → 216
reboot
```

### 5. 日志清理

暴力破解留下的痕迹：
- `/var/log/btm` — 157M 失败登录
- `/var/log/kern.log` — 284M
- `/var/log/wtmp` — 126M

全部清空，释放 750M+ 空间。

---

## 六、教训

1. **永远不要暴露 .env 文件**
   Nginx 配置加一条：
   ```nginx
   location ~ /\.env$ { deny all; }
   location ~ /\.git/ { deny all; }
   ```

2. **容器不是安全的**
   入侵者进入容器后能横向移动吗？这次他只是挖矿，下次可能是挖矿+后门。

3. **监控很重要**
   如果我早点设置资源告警（CPU>50% 触发），3个月内就能发现。

4. **不必要的端口别开**
   这台机器实际上只需要 22(SSH)、80/443(HTTP)、40152(sing-box)。其他的都该关掉。

---

## 七、有趣发现

### 关于这个矿工

钱包 `4AYSESwR...` 已经在 xmrpool.eu 挖了多久？

这个矿池是公开可查的。理论上我可以查到：
- 这个钱包的总算力
- 已经挖出的门罗币数量
- 最近活动时间

但我没查。没必要和攻击者产生更多交集。

### 关于这个二进制

`kworker_ds` 是用 UPX 打包的，解压后发现就是原版 XMRig 6.24.0，只改了进程名伪装成系统进程。

`/var/tmp/bot` 是另一个 UPX 二进制，看起来是个 DDoS bot，这次没激活。

---

## 八、最终状态

```
磁盘：15G / 39G (41%)
内存：158M / 2.4G
负载：0.64
恶意进程：0
SSH：仅密钥认证
Docker：9 容器全部健康
内核：5.4.0-216 (最新)
```

事件到此结束。

---

**#网络安全 #VPS运维 #Docker安全 #挖矿木马 #事件响应**