FROM node:22-bookworm-slim AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy workspace configuration and lockfile
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
RUN npx medusa build

# Production runtime configuration
EXPOSE 9000
ENV PORT=9000

CMD ["npx", "medusa", "start"]
