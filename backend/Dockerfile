FROM python:3.11.7-alpine3.19

LABEL maintainer="linkedin.com/in/pavlo-myskov"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /tmp/requirements.txt
COPY ./scripts /scripts
COPY . /app
WORKDIR /app

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    rm -rf /tmp && \
    apk del .tmp-build-deps && \
    chmod -R +x /scripts && \
    pip3 list

ENV PATH="/scripts:/py/bin:$PATH"

# ENTRYPOINT [ "start_dev.sh" ]