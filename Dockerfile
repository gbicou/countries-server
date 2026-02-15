FROM node:24-slim@sha256:a81a03dd965b4052269a57fac857004022b522a4bf06e7a739e25e18bce45af2 AS build-env

COPY . /app
WORKDIR /app

RUN npm install -g corepack
RUN corepack enable
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm build

FROM gcr.io/distroless/nodejs22-debian12@sha256:61ac74f7ae19c65e87fdfcd5a0b0cb7172074ecbbbf0c26820ec5c09fd2ff9d1
COPY --from=build-env --chown=nonroot:nonroot /app/server/.output/server /server
WORKDIR /server

USER nonroot

ENV NODE_ENV=production
ENV NITRO_SHUTDOWN=true

EXPOSE 3000
CMD ["index.mjs"]
