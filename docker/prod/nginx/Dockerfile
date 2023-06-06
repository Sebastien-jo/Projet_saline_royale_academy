ARG api_image_url=ghcr.io/sebastien-jo/projet_saline_royale_academy-symfony:latest

FROM ${api_image_url} as api

FROM nginx:1.23.1

ENV PUBLIC_ASSETS_PATH /var/www/symfony/public
ENV LISTEN_PORT 80
ENV UPSTREAM_TIMEOUT_SECONDS 5
ENV UPSTREAM_MAX_FAILS 5
ENV UPSTREAM_URL symfony:9000
ENV ENV_NAME prod
ENV DYNENV_NAME prod
ENV SYSLOG_SERVER 172.17.0.1
ENV SYSLOG_PORT 10514

COPY docker/prod/nginx/files/entrypoint.sh /
RUN chmod a+x /entrypoint.sh

COPY docker/prod/nginx/files/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/prod/nginx/files/nginx.conf.template /etc/nginx/nginx.conf.template

COPY --from=api --chown=nginx:nginx /var/www/symfony/public ${PUBLIC_ASSETS_PATH}

ENTRYPOINT ["/entrypoint.sh"]
