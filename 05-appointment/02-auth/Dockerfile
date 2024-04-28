ARG NODE_VERSION=18.19.1

FROM node:${NODE_VERSION}-alpine as stage_base
WORKDIR /app

FROM stage_base as stage_deps
RUN --mount=type=bind,source=package.json,target=/app/package.json \
    --mount=type=bind,source=package-lock.json,target=/app/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit dev

FROM stage_base as stage_build
RUN --mount=type=bind,source=package.json,target=/app/package.json \
    --mount=type=bind,source=package-lock.json,target=/app/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM stage_base as stage_prod
RUN apk add curl
COPY --from=stage_deps /app/node_modules ./node_modules
COPY --from=stage_build /app/dist ./dist
COPY --from=stage_build /app/package.json ./package.json
# COPY env.txt .
COPY tsconfig-paths-bootstrap.js .
COPY tsconfig.json .
USER node
CMD npm run start