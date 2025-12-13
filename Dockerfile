# 构建阶段 - 安装依赖
FROM node:20-alpine AS deps
WORKDIR /app

# 安装必要的系统库 (For Prisma/Better-Sqlite3 on Alpine)
RUN apk add --no-cache libc6-compat openssl

# 复制 package 文件
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 删除本地.env文件，使用Docker环境变量
RUN rm -f .env .env.local .env.production

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/app/data/dev.db"

# 生成 Prisma Client (Ensure binary targets match alpine if needed, usually auto-detected)
RUN npx prisma generate

# 构建应用
RUN npm run build

# 运行阶段
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 安装 OpenSSL (Prisma 需要) 和 su-exec (用于降权执行)
RUN apk add --no-cache openssl curl su-exec

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 创建数据目录
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 复制 Prisma 相关文件
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/
# Do not copy dev.db, allow it to be created init or mounted
# COPY --from=builder --chown=nextjs:nodejs /app/prisma/dev.db ./prisma/dev.db.init
# Standalone build might NOT bundle all prisma engines or generated client files depending on config.
# Ideally .next/standalone includes node_modules which has client.
# But we usually copy .prisma manually to be safe or if using custom output.
# Next.js standalone traces used files. 

COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
# Fix Windows CRLF
RUN sed -i 's/\r$//' ./entrypoint.sh && chmod +x ./entrypoint.sh

# 设置权限
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["./entrypoint.sh"]
