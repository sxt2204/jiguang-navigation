#!/bin/sh

# 检查数据库是否存在
if [ ! -f /app/data/dev.db ]; then
  echo "数据库不存在，正在初始化..."
  cp /app/prisma/dev.db.init /app/data/dev.db
  echo "数据库初始化完成"
fi

# 确保 uploads 目录存在 (挂载卷的情况也适用)
mkdir -p /app/public/uploads

# 确保数据目录和上传目录有写入权限
chmod -R 777 /app/data
chmod -R 777 /app/public/uploads
chmod 666 /app/data/dev.db 2>/dev/null || true

# 启动应用
exec node server.js
