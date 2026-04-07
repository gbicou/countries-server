FROM node:24-slim@sha256:b506e7321f176aae77317f99d67a24b272c1f09f1d10f1761f2773447d8da26c AS build-env

COPY . /app
WORKDIR /app

RUN npm install -g corepack
RUN corepack enable
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm build

FROM gcr.io/distroless/nodejs22-debian12@sha256:8a3e96fe3345b5d83ecec2066e7c498139a02a6d1214e4f6c39f9ce359f3f5bc
COPY --from=build-env --chown=nonroot:nonroot /app/server/.output/server /server
WORKDIR /server

USER nonroot

ENV NODE_ENV=production
ENV NITRO_SHUTDOWN=true

EXPOSE 3000
CMD ["index.mjs"]
