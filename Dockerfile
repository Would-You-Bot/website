# Use Node.js 20
FROM node:20-alpine AS base
RUN apk add --no-cache openssl openssl-dev

# Update Corepack
RUN corepack enable && npm i -g corepack@latest

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID}

ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}

ARG DISCORD_REDIRECT_URI
ENV DISCORD_REDIRECT_URI=${DISCORD_REDIRECT_URI}

ARG DISCORD_TOKEN_URL
ENV DISCORD_TOKEN_URL=${DISCORD_TOKEN_URL}

ARG DISCORD_AUTHORIZE_URL
ENV DISCORD_AUTHORIZE_URL=${DISCORD_AUTHORIZE_URL}

ARG REDIS_URL
ENV REDIS_URL=${REDIS_URL}

ARG REDIS_TOKEN
ENV REDIS_TOKEN=${REDIS_TOKEN}

ARG STRIPE_SECRET_KEY
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}

ARG STRIPE_WEBHOOK_SECRET
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

ARG NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID
ENV NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID=${NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID}

ARG NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID
ENV NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID=${NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID}

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

ARG UPSTASH_API_KEY
ENV UPSTASH_API_KEY=${UPSTASH_API_KEY}

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_PAGE_URL
ENV NEXT_PUBLIC_PAGE_URL=${NEXT_PUBLIC_PAGE_URL}

ARG WEBHOOK_URL
ENV WEBHOOK_URL=${WEBHOOK_URL}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable pnpm
RUN pnpm dlx prisma generate

RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID}

ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}

ARG DISCORD_REDIRECT_URI
ENV DISCORD_REDIRECT_URI=${DISCORD_REDIRECT_URI}

ARG DISCORD_TOKEN_URL
ENV DISCORD_TOKEN_URL=${DISCORD_TOKEN_URL}

ARG DISCORD_AUTHORIZE_URL
ENV DISCORD_AUTHORIZE_URL=${DISCORD_AUTHORIZE_URL}

ARG REDIS_URL
ENV REDIS_URL=${REDIS_URL}

ARG REDIS_TOKEN
ENV REDIS_TOKEN=${REDIS_TOKEN}

ARG STRIPE_SECRET_KEY
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}

ARG STRIPE_WEBHOOK_SECRET
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

ARG NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID
ENV NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID=${NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID}

ARG NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID
ENV NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID=${NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID}

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

ARG UPSTASH_API_KEY
ENV UPSTASH_API_KEY=${UPSTASH_API_KEY}

ARG NEXT_PUBLIC_PUBLISHER_ID
ENV NEXT_PUBLIC_PUBLISHER_ID=${NEXT_PUBLIC_PUBLISHER_ID}

ARG API_URL
ENV API_URL=${API_URL}

ARG API_KEY
ENV API_KEY=${API_KEY}

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_PAGE_URL
ENV NEXT_PUBLIC_PAGE_URL=${NEXT_PUBLIC_PAGE_URL}

ARG WEBHOOK_URL
ENV WEBHOOK_URL=${WEBHOOK_URL}

USER nextjs

# Expose the port the app runs on
EXPOSE 2123

ENV PORT 2123

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
