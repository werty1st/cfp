FROM node:7-alpine

WORKDIR /usr/src/app/
COPY ./ /usr/src/app/

RUN npm install --production

#build
#docker build -t newsflash_app:1.2.0 .

# rebuild
#docker rmi -f newsflash_app:1.2.0 && docker build -t newsflash_app:1.2.0 .


# test run
#docker run -it --rm --link=newsflashdb --entrypoint=/bin/sh -e DB="http://admin:fHWs29I8n5p@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.0 npm run docker:live


# debug run
#docker run -it --rm --link=newsflashdb -e DB="http://admin:fHWs29I8n5p@newsflashdb:5984/newsflash" -e logLevel="debug" -e TTX=cm2-prod-program01.dbc.zdf.de:8036 newsflash_app:1.2.0 npm run docker:live



TODO script to run nodeapp if exitcode = 0 sleep 5min and rerun else terminate with error<>0 maybe sent mail
