FROM openresty/openresty

MAINTAINER Zhanglelong <zhanglelong@daodayun.com>

RUN rm -rf /usr/local/openresty/nginx/html
ADD ./nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
ADD ./dist/ /usr/local/openresty/nginx/html
ADD ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
