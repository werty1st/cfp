# Newsflash CFP

The Newsflash Content Feed Provider is a service who provides Teletext Shortnews as a Content Feed to Sophora. It transforms XML to a JSON based REST Interface.
These instructions don't include how to setup Ubuntu, CouchDB, Nginx or nodeJS.

**Table of Contents**

- [Newsflash CFP](#newsflash-cfp)
  - [Installation](#installation)
    - [Cloning the repository](#cloning-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Setup default configuration](#setup-default-configuration)
    - [Deployment](#deployment)
      - [Limit revisions history](#limit-revisions-history)
    - [Cronjobs](#cronjobs)
    - [Nginx](#nginx)
  - [Runtime](#runtime)
  - [Debugging](#debugging)
  - [Configuration](#configuration)


## Installation

### Cloning the repository

```shell
svn co https://svn.zdf.de/repos/Webmaster/newsflash_cfp
```

### Install dependencies

```shell
npm install
```

### Setup default configuration

Copy .npmrc_default to .npmrc:

```shell
cp .npmrc_default .npmrc
```

Define parameters:

```ini
couchdb     = http://localhost:5984/newsflash
couchdb_int = http://localhost:5984/newsflash_int

couchdb1 = http://admin:pass@wmaiz-v-sofa01.dbc.zdf.de:5984/newsflash
couchdb1_int = http://admin:pass@wmaiz-v-sofa01.dbc.zdf.de:5984/newsflash_int

;prod TTX Server
hostname_prod = cm2-prod-program01.dbc.zdf.de:8036

;int TTX Server
hostname_int = wmaiz-isle04.dbc.zdf.de:8036
```

### Deployment

Upload CouchApp to DB then get the latest 200 Items from TTX Server and process them.

```shell
npm run deploy:s1
```

```shell
npm run deploy:s1:int
```

#### Limit revisions history

```shell
curl http://admin:pass@localhost:5984/newsflash/_revs_limit -X PUT -d 10
curl http://admin:pass@localhost:5984/newsflash_int/_revs_limit -X PUT -d 10
```

### Cronjobs

Install cronjob to update the CFP Database.

```shell
# every minute
MAILTO=HRNeueMedienWebmaster2@zdf.de
* * * * * sleep 1;  cd /opt/newsflash_cfp/; /usr/bin/npm run live >/dev/null
* * * * * sleep 10; cd /opt/newsflash_cfp_int/; /usr/bin/npm run live:int >/dev/null
```

### Nginx

```nginx
proxy_cache_path /var/lib/nginx/cache levels=1:2 keys_zone=cfp:1m max_size=1g inactive=180m;

upstream sofa01db {
    server 127.0.0.1:5984;
}

    #------------------------------------------------------------------------------#
    ################################## newsflash ###################################
    #------------------------------------------------------------------------------#

        location = /newsflash/ {
            return 301 http://$server_name/newsflash/feed;
        }

        location ^~ /newsflash/ {

        access_log /var/log/nginx/cfp_access.log;
        expires 5m;
        add_header Pragma public;
        add_header "Edge-Control" "max-age=300";
        add_header "Cache-Control" "max-age=300, public";

        add_header "X-VServer-Name" "sofa01";

        add_header 'Access-Control-Allow-Origin' $cors_header;
        #preflight request
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Max-Age' '1728000';
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' '0';
            return 204;
        }


        #cache

        proxy_cache cfp;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_lock on;
        proxy_cache_lock_timeout 5s;
        proxy_cache_valid 200 302 5m;
        proxy_cache_valid 404     1m;
        add_header rt-Fastcgi-Cache $upstream_cache_status;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://sofa01db/newsflash/_design/app/_rewrite/;
        }

    #------------------------------------------------------------------------------#
    ###############################int newsflash ###################################
    #------------------------------------------------------------------------------#

        location = /newsflash-int/ {
            return 301 http://$server_name/newsflash-int/feed;
        }

        location ^~ /newsflash-int/ {

        access_log /var/log/nginx/cfp_int_access.log;
        expires 5m;
        add_header Pragma public;
        add_header "Edge-Control" "max-age=300";
        add_header "Cache-Control" "max-age=300, public";

        add_header "X-VServer-Name" "sofa01";

        add_header 'Access-Control-Allow-Origin' $cors_header;
        #preflight request
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Max-Age' '1728000';
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' '0';
            return 204;
        }



        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://sofa01db/newsflash_int/_design/app/_rewrite/;
        }
```

## Runtime ##

Prod URL: `https://sofa01.zdf.de/newsflash/feed/current`

Int  URL: `https://sofa01.zdf.de/newsflash-int/feed/current`

## Debugging

From terminal run:

```shell
npm run debug
```

to view processing of PROD TTX Service data.

Or

```shell
npm run debug:int
```

to view processing of INT TTX Service data.

## Configuration

The package.json contains some configuration parameters.

```json
{
    "name": "mtrCFP",
    "config": {
        "version": "8",
        "age": {
            "keep": "3",
            "keepint": "60",
            "_comment": "keep latets X days of all items"
        },
        "download": {
            "items": "10",
            "_comment1": "download 10 of each category every minute",
            "firstrun": "200",
            "_comment2": "download 200 of each category at first run to fill DB"
        },
        "logLevel": "debug",
        "useragent": "request (nodejs) - Newsflash/CFP (HRNM - Webmaster/TTP)"
    }
}
```

Basic feature list:
* **config.version** defines the version number of a new NewsFlash item. Items with a lower version number will be removed from the database.
* **config.age.keep** defines the maximum age of a NewsFlash item in days. Older items will be removed from the database.
* **config.age.keepint** defines the maximum age of a NewsFlash item in days. Older items will be removed from the INT database.
* **config.download.items** defines the amount of elements to query from the TTX Service.
* **config.download.firstrun** defines the amount of elements to query from the TTX Service, if the script was invoked with the deploy parameter. **npm run deploy:s1** or **npm run deploy:s1:int**
* **config.logLevel** defines the verbosity level of debug information. Calling **npm run live** or **npm run live:int** ignore this parameter.
* **config.useragent** defines the User Agent String of the HTTP request sent to the TTX Service.
