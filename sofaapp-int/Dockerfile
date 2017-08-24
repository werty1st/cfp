FROM klaemo/couchdb:1.6.1

WORKDIR sofaapp
ADD db_files /usr/local/var/lib/couchdb

#couchdb image build on debian => super large+super slow install nodejs :(
#take couchdb image as is and add couchapp files instead of installing it

# prepare DB SHELL1
# docker run --rm -p 5984:5984 -v $(pwd)/db_files:/usr/local/var/lib/couchdb --name couchdb_temp klaemo/couchdb:1.6.1
# install couchapp SHELL2
# kanso push http://localhost:5984/newsflash_int
# curl http://localhost:5984/newsflash_int/_revs_limit -X PUT -d 5
# stop SHELL1

# Set PW
#COUCHPASS=$(date +%s | sha256sum | base64 | head -c 32)

# create Image
# docker rmi -f couchdb/newsflash_int:1.1 && docker build -t couchdb/newsflash_int:1.1 .

# export
# docker save couchdb/newsflash_int:1.1 | gzip -9 > couchdb_newsflash_int_docker_image.tar.gz

# import
# docker load < couchdb_newsflash_int_docker_image.tar.gz


# test
# docker run -it --rm -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -P --name newsflashdb_int couchdb/newsflash_int:1.1

# run
# docker run -d --name newsflashdb_int --restart=always -P -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -e VIRTUAL_HOST=wmaiz-v-sofa-prod-03.dbc.zdf.de -e VIRTUAL_PATH=newsflash-int -e VIRTUAL_PATH_TARGET=newsflash_int/_design/app/_rewrite couchdb/newsflash_int:1.1

# run static port
# docker run -d --name newsflashdb_int --restart=always -p 4007:5984 -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS couchdb/newsflash_int:1.1



# portainer setup
# name newsflashdb_int
# Always pull the image: no
# Publish all exposed ports: yes
# run image couchdb/newsflash_int:1.1
# env COUCHDB_USER=admin
# env COUCHDB_PASSWORD=****
# restart always

