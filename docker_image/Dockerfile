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


#docker build -t node_cfp https://github.com/werty1st/cfp.git
FROM node:7.5-alpine

RUN mkdir -p /opt/newsflash
WORKDIR /opt/newsflash
COPY nodeapp nodeapp
COPY sofaapp sofaapp
COPY sofaapp-int sofaapp-int
COPY package.json .
#COPY .npmrc_default .npmrc

RUN npm install kanso -g
COPY node_modules node_modules
#RUN npm install


#execute
#docker run -it --rm -e DB="http://localhost:5984/newsflash" -e HOSTNAME="ttx1.zdi.de:80"  node_cfp "npm run debug""
#docker run -it --rm -e DB="http://localhost:5984/newsflash" -e HOSTNAME="cm2-prod-program01.dbc.zdf.de:8036" -e logLevel="debug" node_cfp npm run debug