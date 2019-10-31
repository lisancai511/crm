#!/bin/sh

# Replace baidu analytics key
# readonly CURR_BAIDU_ANALYTICS_KEY="02ebcf567e4c14887d477aaf7ef7f2b4"
# readonly NEW_BAIDU_ANALYTICS_KEY="${BAIDU_ANALYTICS_KEY}"
# echo "Replace BAIDU_ANALYTICS_KEY from ${CURR_BAIDU_ANALYTICS_KEY} to ${NEW_BAIDU_ANALYTICS_KEY}"
# sed -i "s|${CURR_BAIDU_ANALYTICS_KEY}|${NEW_BAIDU_ANALYTICS_KEY}|" /usr/local/openresty/nginx/html/index.html

# Run openresty
/usr/local/openresty/bin/openresty -g 'daemon off;'