FROM klaemo/couchdb:1.6.1

WORKDIR sofaapp
ADD db_files /usr/local/var/lib/couchdb

#couchdb image build on debian => super large+super slow install nodejs :(
#take couchdb image as is and add couchapp files instead of installing it

# prepare DB SHELL1
# docker run --rm -p 5984:5984 -v $(pwd)/db_files:/usr/local/var/lib/couchdb --name couchdb_temp klaemo/couchdb:1.6.1
# install couchapp SHELL2
# kanso push http://localhost:5984/newsflash
# curl http://localhost:5984/newsflash/_revs_limit -X PUT -d 5
# stop SHELL1

# Set PW
#COUCHPASS=$(date +%s | sha256sum | base64 | head -c 32)

# create Image
# docker rmi -f couchdb/newsflash:1.0 && docker build -t couchdb/newsflash:1.0 .

# export
# docker save couchdb/newsflash:1.0 | gzip -9 > couchdb_newsflash_docker_image.tar.gz

# import
# docker load < couchdb_newsflash_docker_image.tar.gz


# test
# docker run -it --rm -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -P --name newsflashdb couchdb/newsflash:1.0

# run
# docker run -d --name newsflashdb --restart=always -P -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -e VIRTUAL_HOST=wmaiz-v-sofa-prod-03.dbc.zdf.de -e VIRTUAL_PATH=newsflash -e VIRTUAL_PATH_TARGET=newsflash/_design/app/_rewrite couchdb/newsflash:1.0


# portainer setup
# name newsflashdb
# Always pull the image: no
# Publish all exposed ports: yes
# run image couchdb/newsflash:1.0
# env COUCHDB_USER=admin
# env COUCHDB_PASSWORD=****
# restart always

