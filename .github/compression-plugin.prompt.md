# Task: Setup Compression plugin in Interstellar application

The Compression Plugin is an interstellar capability that can optimize the performance of the application by reducing the bundle size of the artifacts. Below are the steps to set up the Compression Plugin in your Interstellar application. Make sure you are running in agent mode

**1. Add compression.conf file under nginx folder and paste the below content.**

```
# ----------------------------------------------------------------------
# | Compression                                                        |
# ----------------------------------------------------------------------
​
# https://nginx.org/en/docs/http/ngx_http_gzip_module.html
​
# Enable gzip compression.
# Default: off
gzip on;
​
# Compression level (1-9).
# 5 is a perfect compromise between size and CPU usage, offering about 75%
# reduction for most ASCII files (almost identical to level 9).
# Default: 1
gzip_comp_level 5;
​
# Don't compress anything that's already small and unlikely to shrink much if at
# all (the default is 20 bytes, which is bad as that usually leads to larger
# files after gzipping).
# Default: 20
gzip_min_length 256;
​
# Compress data even for clients that are connecting to us via proxies,
# identified by the "Via" header (required for CloudFront).
# Default: off
gzip_proxied any;
​
# Tell proxies to cache both the gzipped and regular version of a resource
# whenever the client's Accept-Encoding capabilities header varies;
# Avoids the issue where a non-gzip capable client (which is extremely rare
# today) would display gibberish if their proxy gave them the gzipped version.
# Default: off
gzip_vary on;
​
# Compress all output labeled with one of the following MIME-types.
# `text/html` is always compressed by gzip module.
# Default: text/html
gzip_types
  application/atom+xml
  application/geo+json
  application/javascript
  application/x-javascript
  application/json
  application/ld+json
  application/manifest+json
  application/rdf+xml
  application/rss+xml
  application/vnd.ms-fontobject
  application/wasm
  application/x-web-app-manifest+json
  application/xhtml+xml
  application/xml
  font/eot
  font/otf
  font/ttf
  image/bmp
  image/svg+xml
  image/vnd.microsoft.icon
  image/x-icon
  text/cache-manifest
  text/calendar
  text/css
  text/javascript
  text/markdown
  text/plain
  text/xml
  text/vcard
  text/vnd.rim.location.xloc
  text/vtt
  text/x-component
  text/x-cross-domain-policy;
```

**2. Update default.template located inside nginx folder with below mentioned content.**

```
server {
    listen       8080;
    server_name  localhost;
​
    # access_log  /var/log/nginx/host.access.log  main;
​
    # NGINX config taken from https://gkedge.gitbooks.io/react-router-in-the-real/content/nginx.html
​
    root /usr/share/nginx/html/;
    index index.html index.htm;
​
    location ~* \.(?:manifest|appcache|html?|xml|json)$ {
        expires -1;
        # access_log logs/static.log; # I don't usually include a static log
    }
​
    location ~* \.(?:css|js)$ {
        try_files $uri $uri.gz =404;
        expires 1y;
        access_log off;
        add_header Content-Encoding gzip;
        add_header Cache-Control "public";
    }
​
    # Any route containing a file extension (e.g. /devicesfile.js)
    location ~ ^.+\..+$ {
        try_files $uri $uri.gz =404;
    }
​
    # Any route that doesn't have a file extension (e.g. /devices)
    location / {
        absolute_redirect off;
        try_files $uri $uri/ $uri.html ${BASE_PATH}/index.html;
    }
​
    error_page  404              ${BASE_PATH}/index.html;
​
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

**3. Update .env.example file and add below mentioned environment variable.**

```
# Compression Settings
IS_COMPRESSION_ENABLED=true
```

**4. Check if the device is either Mac or Windows. If it is a mac device, run the npm run prepare command in the terminal and that will copy .env.example to .env file. If it is a Windows device, prompt the user to run npm run prepare in their gitbash terminal in admin mode.**

**5. Update Dockerfile located in the root of the journey with below mentioned content ( specifically line number 15 )**

```
FROM europe-docker.pkg.dev/mgmt-bak-bld-1dd7/main/mgmt/bak/al20479/images/base_image/nginxinc/nginx-unprivileged:1.26-alpine
​
LABEL maintainer="VBP Web Team"
LABEL workstream="Voyager Banking Platform"
LABEL email="pavel.popovici@lloydsbanking.com"
​
ARG BRAND_TO_BUILD='.'
ARG BASE_PATH='/'
ENV BASE_PATH=${BASE_PATH}
​
# copy nginx conf and config

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/healthz.html /usr/share/nginx/html${BASE_PATH}/healthz.html
COPY --chown=nginx:0 nginx/default.template /etc/nginx/templates/
COPY --chown=nginx:0 nginx/compression.conf /etc/nginx/conf.d/
​
RUN envsubst "\${BASE_PATH}" < /etc/nginx/templates/default.template > /etc/nginx/conf.d/default.conf
​
COPY ./dist/${BRAND_TO_BUILD} /usr/share/nginx/html${BASE_PATH}
```

**6. Check if the device is either Mac or Windows. If it is a mac device, run npm run build command in the terminal and that will generate the build files .gz format the above setting shows how .gz content can be served via nginx. If it is a Windows device, prompt the user to run npm run build in their gitbash terminal in admin mode.**
