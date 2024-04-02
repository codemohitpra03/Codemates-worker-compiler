FROM codemohitpra2103/codemates-compiler-worker-ubuntu:latest

WORKDIR '/app'

COPY package.json .

RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN node topic.js