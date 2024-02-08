ARG NODE_IMAGE=public.ecr.aws/docker/library/node
ARG NODE_VERSION=21.6.1
FROM ${NODE_IMAGE}:${NODE_VERSION}-alpine as deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM ${NODE_IMAGE}:${NODE_VERSION}-alpine as builder
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM ${NODE_IMAGE}:${NODE_VERSION}-alpine as runner
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ENV INTERNAL_PORT 8080
ENV PORT 8080
ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY server.js /app

USER node
EXPOSE 8080

CMD ["npm", "run" ,"start"]
