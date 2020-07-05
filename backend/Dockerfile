FROM registry.gitlab.com/rushil0195/rentality/base:latest

ARG dev_mode=false
ENV PYTHONUNBUFFERED=1, PIP_DEFAULT_TIMEOUT=120

RUN apk update && \
    apk add postgresql-libs jpeg-dev zlib-dev

RUN pip install --upgrade pip

EXPOSE 8000

RUN apk add gcc musl-dev postgresql-dev build-base python-dev py-pip curl && pip install gunicorn &&\
	curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py --output /tmp/get-poetry.py && \
    python /tmp/get-poetry.py

WORKDIR /rentality/app

COPY app/poetry.lock ./
COPY app/pyproject.toml ./
COPY app/poetry.toml ./

RUN . $HOME/.poetry/env && poetry install --no-dev --no-root

COPY app/src ./src

WORKDIR /rentality

COPY ./bin ./bin

RUN ["chmod", "+x", "./bin/sync.sh", "./bin/entrypoint.sh", "./bin/entrypoint.dev.sh"]

ENTRYPOINT [ "./bin/entrypoint.sh" ]