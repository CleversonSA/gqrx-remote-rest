# Main nodejs backend
FROM node:14-alpine AS node

# Create app dirs
RUN mkdir -p /usr/src/app
RUN mkdir /usr/src/app/logs

# Second stage, modules
FROM node AS node-modules
WORKDIR /usr/src/app
RUN mkdir -p config
RUN mkdir -p public
RUN mkdir -p src
RUN mkdir -p data
COPY package*.json ./
RUN npm install --unsafe-perm

# Third stage, application
FROM node-modules AS node-app
WORKDIR /usr/src/app
COPY config ./config
COPY public ./public
COPY src ./src

# Final definitions
EXPOSE 3030
CMD [ "npm", "start" ]
