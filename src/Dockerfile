FROM registry.gitlab.com/rushil0195/rentality/frontend:latest as frontend-builder

FROM registry.gitlab.com/rushil0195/rentality/base:latest

ARG test_mode=false
ENV PYTHONUNBUFFERED=1 PIPENV_DEV=$test_mode

WORKDIR /rentality/src

RUN apk update && \
    apk add postgresql-libs jpeg-dev zlib-dev

RUN pip install --upgrade pip

EXPOSE 8000

COPY Pipfile Pipfile.lock ./

RUN apk add --virtual .build-deps gcc musl-dev postgresql-dev build-base python-dev py-pip && \
    pip install pipenv && \
    pipenv install --deploy --system && \
    apk --purge del .build-deps

COPY . .

COPY --from=frontend-builder /app/dist/ ./static/v2/frontend/

ENTRYPOINT [ "./entrypoint.sh" ]