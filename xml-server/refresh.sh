#!/bin/bash

#prod
#curl -s "http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Nachrichten/10" | xmllint --format - > nachrichten.xml

#int
curl -s "http://wmaiz-isle04.dbc.zdf.de:8036/Newsflash/service/news/Nachrichten/10" | xmllint --format - > nachrichten.xml