#-------------
FROM node:16.18-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

#-------------
FROM node:16.18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

#-------------
FROM node:16.18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 

RUN \
  addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000

CMD ["node", "server.js"]
