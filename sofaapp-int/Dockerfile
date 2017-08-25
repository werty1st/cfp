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

# kanso push http://localhost:5984/newsflash_int
# curl http://localhost:5984/newsflash_int/_revs_limit -X PUT -d 5

# stop SHELL1

# Set PW
#COUCHPASS=$(date +%s | sha256sum | base64 | head -c 32)

# create Image
# docker rmi -f couchdb/newsflash:1.2 && docker build -t couchdb/newsflash:1.2 .
# docker rmi -f couchdb/newsflash_int:1.1 && docker build -t couchdb/newsflash_int:1.1 .


# export
# docker save couchdb/newsflash:1.2 | gzip -9 > couchdb_newsflash_docker_image.tar.gz
# docker save couchdb/newsflash_int:1.1 | gzip -9 > couchdb_newsflash_int_docker_image.tar.gz


# import
# docker load < couchdb_newsflash_docker_image.tar.gz
# docker load < couchdb_newsflash_int_docker_image.tar.gz


# test
# docker run -it --rm -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -P --name newsflashdb couchdb/newsflash:1.2
# docker run -it --rm -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS -P --name newsflashdb_int couchdb/newsflash_int:1.1

# run static port
# docker run -d --name newsflashdb --restart=always -p 4006:5984 -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS couchdb/newsflash:1.2
# docker run -d --name newsflashdb_int --restart=always -p 4007:5984 -v /etc/localtime:/etc/localtime:ro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=$COUCHPASS couchdb/newsflash_int:1.1

