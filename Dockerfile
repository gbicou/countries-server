FROM node:20-slim AS build-env
LABEL authors="bicou"

COPY . /app
WORKDIR /app

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env /app/.output/server /server
WORKDIR /server

ENV PORT=3030

EXPOSE $PORT
CMD ["index.mjs"]
