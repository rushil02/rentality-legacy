FROM python:3.6.10-alpine3.11

WORKDIR /rentality/libs

COPY ./build-geo-lib.sh .

RUN chmod +x /rentality/libs/build-geo-lib.sh && /rentality/libs/build-geo-lib.sh

ENV LD_LIBRARY_PATH /usr/local/lib