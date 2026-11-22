FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    nodejs npm \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN rm -f /usr/bin/wget /usr/bin/curl /usr/bin/apt-get /usr/bin/apt \
    /usr/bin/dpkg /usr/bin/pip /usr/bin/pip3

RUN useradd -m -d /home/sandbox sandbox

USER sandbox

WORKDIR /code
