FROM python:3.5-alpine

WORKDIR /rentality/libs

COPY ./build-geo-lib.sh .

RUN ["chmod", "+x", "/rentality/libs/build-geo-lib.sh"]
RUN /rentality/libs/build-geo-lib.sh

ENV LD_LIBRARY_PATH /usr/local/lib