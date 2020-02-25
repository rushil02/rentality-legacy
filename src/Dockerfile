FROM registry.gitlab.com/rushil0195/rentality/frontend:latest as frontend-builder

FROM registry.gitlab.com/rushil0195/rentality/base:latest

ARG dev_mode=false
ENV PYTHONUNBUFFERED=1

WORKDIR /rentality/src

RUN apk update && \
    apk add postgresql-libs jpeg-dev zlib-dev

RUN pip install --upgrade pip

EXPOSE 8000

RUN apk add gcc musl-dev postgresql-dev build-base python-dev py-pip curl && pip install gunicorn &&\
	curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py --output /tmp/get-poetry.py && \
    python /tmp/get-poetry.py

COPY poetry.lock pyproject.toml poetry.toml ./

RUN . $HOME/.poetry/env && poetry install --no-dev --no-root

COPY . .

COPY --from=frontend-builder /app/dist/ ./static/v2/frontend/

ENTRYPOINT [ "./entrypoint.sh" ]