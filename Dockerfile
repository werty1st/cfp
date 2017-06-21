FROM node:7-alpine

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
COPY nodeapp/ /usr/src/app/nodeapp/
COPY node_modules/ /usr/src/app/node_modules/

RUN npm install --production

ENTRYPOINT /usr/src/app/nodeapp/entrypoint.sh

# set PW to env for setup
# dbpw=fHWs29I8n5p

#build
#docker build -t newsflash_app:1.2.0 .

# rebuild
#docker rmi -f newsflash_app:1.2.0 && docker build -t newsflash_app:1.2.0 .


# test run
#docker run -it --rm --link=newsflashdb --entrypoint=/bin/sh -e DB="http://admin:$dbpw@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.0 npm run docker:live


# debug run
#docker run -it --rm --link=newsflashdb --dns=172.23.88.40 -e DB="http://admin:$dbpw@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 -e mailserver=mail.dbc.zdf.de -e mailport=25 -e receiver=adams.r@zdf.de newsflash_app:1.2.0

# IMPORTANT
# on production build include node_modules in the .dockerignore file
# IMPORTANT

# export image
#docker save newsflash_app:1.2.0 | gzip -c > newsflash_app.tar.gz

# import image
#gunzip -c newsflash_app.tar.gz | docker load


# portainer setup
# missing link option so install from terminal
# docker run -d --link=newsflashdb --dns=172.23.88.40 -e DB="http://admin:$dbpw@newsflashdb:5984/newsflash" -e logLevel="error" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 -e mailserver=mail.dbc.zdf.de -e mailport=25 -e receiver=adams.r@zdf.de --name=newsflash_app newsflash_app:1.2.0
# run image newsflash_app:1.2.0
# link newsflashdb
# dns 172.23.88.40
# env DB=http://admin:$dbpw@newsflashdb:5984/newsflash
# env logLevel=error
# env TTX=cm2-prod-program01.dbc.zdf.de:8036
# env mailserver=mail.dbc.zdf.de
# env mailport=25
# env receiver=adams.r@zdf.de
# env receiver=adams.r@zdf.de