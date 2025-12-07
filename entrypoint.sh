#!/bin/sh

# 检查数据库是否存在
if [ ! -f /app/data/dev.db ]; then
  echo "数据库不存在，正在初始化..."
  cp /app/prisma/dev.db.init /app/data/dev.db
  echo "数据库初始化完成"
fi

# 确保 uploads 目录持久化
# 如果 /app/data/uploads 不存在，则创建
if [ ! -d "/app/data/uploads" ]; then
    echo "创建持久化 uploads 目录..."
    mkdir -p /app/data/uploads
    
    # 如果原处有文件，迁移过去 (首次部署可能有内置图片)
    if [ -d "/app/public/uploads" ]; then
        echo "迁移现有的 uploads 文件..."
        cp -r /app/public/uploads/* /app/data/uploads/ 2>/dev/null || true
    fi
fi

# 建立软链接：让 public/uploads 指向 /app/data/uploads
# 注意：Next.js standalone 模式下，静态文件路径可能有所不同，但通常 public 仍在根目录或 .next/standalone/public
# 我们先确保 public 目录存在
mkdir -p /app/public

# 如果 public/uploads 是一个普通目录，删除它以便建立链接
if [ -d "/app/public/uploads" ] && [ ! -L "/app/public/uploads" ]; then
    echo "移除临时的 public/uploads 目录..."
    rm -rf /app/public/uploads
fi

# 如果链接不存在，创建链接
if [ ! -L "/app/public/uploads" ]; then
    echo "建立 public/uploads -> /app/data/uploads 软链接..."
    ln -s /app/data/uploads /app/public/uploads
fi

# 确保数据目录有写入权限（修复 readonly database 错误）
chmod -R 777 /app/data
chmod 666 /app/data/dev.db 2>/dev/null || true

# 启动应用
exec node server.js
