# 构建阶段 - 安装依赖
FROM node:20-slim AS deps
WORKDIR /app

# 安装 OpenSSL（Prisma 需要）
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 复制 package 文件
COPY package.json package-lock.json ./
RUN npm ci

# 构建阶段
FROM node:20-slim AS builder
WORKDIR /app

# 安装 OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 删除本地.env文件，使用Docker环境变量
RUN rm -f .env .env.local .env.production

# 设置生产环境数据库路径
ENV DATABASE_URL="file:/app/data/dev.db"

# 生成 Prisma Client
RUN npx prisma generate

# 构建应用
RUN npm run build

# 运行阶段
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 安装 OpenSSL（Prisma 需要）
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 创建数据目录
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 复制 Prisma 相关文件（schema 和初始数据库备份）
COPY --from=builder /app/prisma/schema.prisma ./prisma/
COPY --from=builder /app/prisma/dev.db ./prisma/dev.db.init
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# 复制启动脚本
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# 设置权限
RUN chown -R nextjs:nodejs /app

# USER nextjs

EXPOSE 3000

# 使用启动脚本（检查并初始化数据库）
CMD ["./entrypoint.sh"]
