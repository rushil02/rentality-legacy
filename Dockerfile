FROM python:alpine

WORKDIR /rentality/libs
# RUN apk add --no-cache linux-headers build-base
# ADD lib/geos-3.6.2.tar.bz2 .
# RUN cd geos-3.6.2; ./configure; make; make install

# ADD lib/proj-4.9.3.tar.gz .
# ADD lib/proj-datumgrid-1.5.tar.gz .
# RUN cd proj-4.9.3; ./configure; make; make install

# ADD lib/gdal-2.3.0.tar.gz .
# RUN cd gdal-2.3.0; ./configure; make; make install

COPY ./build-geo-lib.sh .

RUN /rentality/libs/build-geo-lib.sh

ENV LD_LIBRARY_PATH /usr/local/lib

WORKDIR /rentality/src

COPY requirements.txt .

RUN apk update && \
    apk add postgresql-libs jpeg-dev zlib-dev && \
    apk add --virtual .build-deps gcc musl-dev postgresql-dev build-base python-dev py-pip && \
    python -m pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps

RUN pip install gunicorn

EXPOSE 8000

COPY . .

CMD [ "./entrypoint.sh" ]