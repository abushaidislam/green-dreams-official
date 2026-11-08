FROM node:22-bookworm-slim

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@12.5.1

# Copy workspace configuration and package definitions
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY apps/backend ./apps/backend

# Build backend and admin dashboard with 2GB heap
WORKDIR /app/apps/backend
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN pnpm build

# Production runtime configuration
EXPOSE 9000
ENV PORT=9000

CMD ["npx", "medusa", "start"]
