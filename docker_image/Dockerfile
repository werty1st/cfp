# prepare DB
# docker run -rm -p 5984:5984 -v $(pwd)/db_files:/usr/local/var/lib/couchdb --name couchdb klaemo/couchdb:1.6.1
# npm run push

# create Image
# docker build -t couchdb/olympia2016 .

# export
# docker save couchdb/olympia2016 | gzip -9 > couchdb_olympia2016_docker_image.tar.gz

# import
# docker load < couchdb_olympia2016_docker_image.tar.gz

# run
# docker run -d --restart=always -p 5984:5984 --name olympia2016 couchdb/olympia2016 

FROM node:7.5-alpine

RUN mkdir -p /opt/newsflash
WORKDIR /opt/newsflash
COPY nodeapp .
COPY sofaapp .
COPY sofaapp-int .
COPY xml-server .
COPY package.json .
COPY .npmrc_default .

RUN npm install

