# Use Node.js 20
FROM node:20-alpine AS base
RUN apk add --no-cache openssl openssl-dev

# Update Corepack
RUN corepack enable && npm i -g corepack@latest

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

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

RUN corepack enable pnpm
RUN pnpm dlx prisma generate

RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

# Copy Next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Define environment variables only once (in runner)
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

EXPOSE 2123
ENV PORT 2123

CMD HOSTNAME="0.0.0.0" node server.js
