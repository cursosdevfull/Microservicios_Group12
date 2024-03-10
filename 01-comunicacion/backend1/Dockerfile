ARG NODE_VERSION=18.19.1

FROM node:${NODE_VERSION}-alpine as stage_base
WORKDIR /app

FROM stage_base as stage_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM stage_base as stage_final
RUN apk add --no-cache curl
COPY . .
COPY --from=stage_deps /app/node_modules ./node_modules
USER node
CMD npm start