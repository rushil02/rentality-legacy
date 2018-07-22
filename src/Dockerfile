FROM registry.gitlab.com/rushil0195/rentality/base:latest

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

RUN ["chmod", "+x", "./entrypoint.sh"]

CMD [ "./entrypoint.sh" ]