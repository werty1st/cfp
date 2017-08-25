FROM node:7-alpine

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
COPY nodeapp/ /usr/src/app/nodeapp/
COPY node_modules/ /usr/src/app/node_modules/

RUN npm install --production

ENTRYPOINT /usr/src/app/nodeapp/entrypoint.sh

# set PW to env for setup
# COUCHPASS=$COUCHPASS

#build
# docker build -t newsflash_app:1.2.2 .

# rebuild
# docker rmi -f newsflash_app:1.2.2 && docker build -t newsflash_app:1.2.2 .
# docker rmi -f newsflash_int_app:1.2.1 && docker build -t newsflash_int_app:1.2.1 .


# test run
# docker run -it --rm --link=newsflashdb --entrypoint=/bin/sh -v /etc/localtime:/etc/localtime:ro-e DB="http://admin:$COUCHPASS@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.2 npm run docker:live


# debug run
# docker run -it --rm --link=newsflashdb --dns=172.23.88.40 -v /etc/localtime:/etc/localtime:ro -e DB="http://admin:$COUCHPASS@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 -e mailserver=mail.dbc.zdf.de -e mailport=25 -e receiver=adams.r@zdf.de newsflash_app:1.2.2

# debug run localhost
# docker run -it --rm --net=host -v /etc/localtime:/etc/localtime:ro -e DB="http://localhost:5984/newsflash" -e logLevel="debug" -e TTX=172.23.61.118:8036 newsflash_app:1.2.2


# IMPORTANT
# on production build include node_modules in the .dodocker run -d --name=newsflash_int_app --restart=always --link=newsflashdb_int --dns=172.23.88.40 -v /etc/localtime:/etc/localtime:ro -e DB="http://admin:$COUCHPASS@newsflashdb_int:5984/newsflash_int" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.1ckerignore file
# IMPORTANT

# export image
# docker save newsflash_app:1.2.2 | gzip -c > newsflash_app.tar.gz
# docker save newsflash_int_app:1.2.1 | gzip -c > newsflash_int_app.tar.gz

# import image
# gunzip -c newsflash_app.tar.gz | docker load
# gunzip -c newsflash_int_app.tar.gz | docker load


# portainer setup
# missing link option so install from terminal
# docker run -d --name=newsflash_app --restart=always --link=newsflashdb --dns=172.23.88.40 -v /etc/localtime:/etc/localtime:ro -e DB="http://admin:$COUCHPASS@newsflashdb:5984/newsflash" -e logLevel="error" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 -e mailserver=mail.dbc.zdf.de -e mailport=25 -e receiver=adams.r@zdf.de -e NODE_ENV=production newsflash_app:1.2.2


# portainer setup INT
# missing link option so install from terminal
# docker run -d --name=newsflash_int_app --restart=always --link=newsflashdb_int --dns=172.23.88.40 -v /etc/localtime:/etc/localtime:ro -e DB="http://admin:$COUCHPASS@newsflashdb_int:5984/newsflash_int" -e logLevel="debug" -e TTX=wmaiz-isle04.dbc.zdf.de:8036 -e mailserver=mail.dbc.zdf.de -e mailport=25 -e receiver=adams.r@zdf.de newsflash_app:1.2.2

# docker run -d --name=newsflash_int_app --restart=always --link=newsflashdb_int --dns=172.23.88.40 -v /etc/localtime:/etc/localtime:ro -e DB="http://admin:$COUCHPASS@newsflashdb_int:5984/newsflash_int" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.2

