#-------------
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat=1.2.3-r0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

#-------------
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

#-------------
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  GOVERNANCE_URL="https://xd.adobe.com/view/31a3d2a5-9f07-4e31-a612-20059ff929a5-64f0/screen/d8a45cb1-7433-40b3-b6ce-4237bfcd0678/?fullscreen"

RUN \
  addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
