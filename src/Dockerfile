FROM registry.gitlab.com/rushil0195/rentality/frontend:latest as frontend-builder

FROM registry.gitlab.com/rushil0195/rentality/base:latest

ENV PYTHONUNBUFFERED=1

WORKDIR /rentality/src

COPY requirements.txt .

RUN apk update && \
    apk add postgresql-libs jpeg-dev zlib-dev && \
    apk add --virtual .build-deps gcc musl-dev postgresql-dev build-base python-dev py-pip && \
    python -m pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps

EXPOSE 8000

COPY . .

COPY --from=frontend-builder /src/static/v2/frontend/index.js ./static/v2/frontend/index.js

ENTRYPOINT [ "./entrypoint.sh" ]