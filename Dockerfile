FROM node:18-alpine

WORKDIR /

# Install dependencies using pnpm
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g pnpm && pnpm i

# COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY . .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Build Next.js using pnpm
RUN pnpm build

# Start Next.js using pnpm
CMD pnpm start

# Explicitly expose port 2123
EXPOSE 2123