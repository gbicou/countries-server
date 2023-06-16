FROM node:20-bullseye-slim AS build-env

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml /app
RUN pnpm fetch

COPY . /app

RUN pnpm install -r --offline

ENV NODE_ENV=production

# RUN pnpm --filter=@bicou/countries-server-schema prisma generate

FROM build-env AS bootstrap

CMD pnpm --filter=@bicou/countries-server-schema bootstrap

FROM build-env AS build-server

RUN pnpm --filter=@bicou/countries-server-server build

FROM gcr.io/distroless/nodejs20-debian11 AS server
COPY --from=build-server --chown=nonroot:nonroot /app/server/.output/server /server
WORKDIR /server

USER nonroot

ENV NODE_ENV=production
ENV NITRO_SHUTDOWN=true

EXPOSE 3000
CMD ["index.mjs"]
