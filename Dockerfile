#-------------
FROM node:16.18-alpine AS deps

RUN apk add --no-cache libc6-compat=1.2.3-r0

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
  NEXT_TELEMETRY_DISABLED=1 \
  GOVERNANCE_URL="https://xd.adobe.com/view/31a3d2a5-9f07-4e31-a612-20059ff929a5-64f0/screen/d8a45cb1-7433-40b3-b6ce-4237bfcd0678/?fullscreen" \
  NAVIGATION_MENU_CREATE_URL="https://xd.adobe.com/view/0994d8fe-0e3f-44e0-b8bf-3c399bf524d9-5cc7/screen/007b4c59-2299-452d-90d6-6218e46b55f9/?fullscreen" \
  NAVIGATION_MENU_EXPLORE_URL="/explore" \
  NAVIGATION_MENU_INTERACT_URL="https://discord.com/channels/946759919678406696/968040263006179358" \
  NAVIGATION_MENU_LEARN_URL="https://docs.okp4.network/docs" \
  NAVIGATION_MENU_OKP4_URL="https://okp4.network/#protocol" \
  OKP4_DISCORD_URL='https://discord.com/invite/okp4' \
  OKP4_GITHUB_URL='https://discord.gg/okp4' \
  OKP4_LINKEDIN_URL='https://www.linkedin.com/company/okp4-open-knowledge-protocol-for/mycompany/' \
  OKP4_MEDIUM_URL='https://blog.okp4.network/' \
  OKP4_TELEGRAM_URL='https://t.me/okp4network' \
  OKP4_TWITTER_URL='https://twitter.com/OKP4_Protocol' \
  OKP4_WEBSITE_URL='https://okp4.network/' \
  DATA_PATH='./data' \
  API_URI='http://localhost:3000/api' \
  NEXT_PUBLIC_SERVER_URI='http://localhost:3000'

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
