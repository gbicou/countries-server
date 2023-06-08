FROM node:20-slim AS build-env

COPY . /app
WORKDIR /app

RUN corepack enable
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm build

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env --chown=nonroot:nonroot /app/.output/server /server
WORKDIR /server

USER nonroot

ENV NODE_ENV=production
ENV NITRO_SHUTDOWN=true

EXPOSE 3000
CMD ["index.mjs"]
