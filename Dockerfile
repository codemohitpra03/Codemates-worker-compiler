FROM codemohitpra2103/codemates-compiler-worker-ubuntu:latest

WORKDIR '/app'

COPY package.json .
ENV NODE_ENV=localhost
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN node topic.js

EXPOSE 8000

# CMD ["node","consumer.js"]