ARG ARCHREPO
FROM ${ARCHREPO}/node:10-stretch

ARG QEMU_ARCH
COPY qemu-${QEMU_ARCH}-static /usr/bin/

COPY ./ /opt/hooks/
WORKDIR /opt/hooks/

RUN npm install

ENV MONGODB_HOST=""
ENV MONGODB_DB=""

CMD node app.js