#!/bin/sh

for brand in $BRANDS_TO_BUILD; do
  echo "injecting app config into brand: ${brand} with ${config}"

  # build the name of the env variable to <brand>_app_config
  var_name=${brand}_app_config
  config=$(eval echo \$$var_name)

  # remove surrounding quotes
  config="${config%\"}"
  config="${config#\"}"

  # inject into the index.html
  sed -i "s/__APP_CONFIG_PLACEHOLDER__/${config//\//\\/}/g" /usr/share/nginx/html/$brand/index.html
done

echo "Starting nginx server..."

nginx -g "daemon off;"

/bin/sh
