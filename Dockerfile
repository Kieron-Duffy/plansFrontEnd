FROM europe-docker.pkg.dev/mgmt-bak-bld-1dd7/main/mgmt/bak/al20479/images/base_image/nginxinc/nginx-unprivileged:1.26-alpine

LABEL cmdb_appid="AL00000"
LABEL maintainer="InterStellar Team"
LABEL workstream="Digital Frameworks Platform"
LABEL email="interstellar@lloydsbanking.com"

ARG BRAND_TO_BUILD='.'
ARG BASE_PATH='/'
ENV BASE_PATH=${BASE_PATH}

RUN rm -f /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/includes

# copy required configuration files
COPY --chown=nginx:0 nginx/healthz.html /usr/share/nginx/html${BASE_PATH}/healthz.html
COPY --chown=nginx:0 nginx/404.html /usr/share/nginx/html/404.html
COPY --chown=nginx:0 nginx/default.conf.template /etc/nginx/templates/

# enforce default security headers as mandated by the security team, allowing teams to modify them where justified
COPY --chown=nginx:0 nginx/securityheaders.conf /etc/nginx/includes/securityheaders.conf

# uncomment to switch on compression, refer to InterStellar documentation
# https://interstellar.lloydsbanking.com/docs/documentation/features/compression-plugin
# COPY --chown=nginx:0 nginx/compression.conf /etc/nginx/conf.d/

# uncomment for old version of nginx base image, otherwise 20-envsubst-on-templates.sh will handle env substitution
# RUN envsubst "\${BASE_PATH}" < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

COPY ./dist/${BRAND_TO_BUILD} /usr/share/nginx/html${BASE_PATH}
