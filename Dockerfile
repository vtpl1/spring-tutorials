FROM ubuntu:20.04

ENV SHELL /bin/bash

RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt -y install --no-install-recommends ca-certificates

RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt -y install --no-install-recommends curl subversion wget git ssh nano iputils-ping

RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt -y install libasound2 libc6 libc6-i386 libc6-x32 libfreetype6 libxext6 libxi6 libxtst6 libxrender1

ARG JAVA_VERSION=17.0.5
RUN cd /tmp/ && wget https://download.oracle.com/java/17/archive/jdk-${JAVA_VERSION}_linux-x64_bin.deb \
    && dpkg -i jdk-${JAVA_VERSION}_linux-x64_bin.deb \
    && rm /tmp/jdk-${JAVA_VERSION}_linux-x64_bin.deb

ENV PATH="/usr/lib/jvm/jdk-17/bin:${PATH}"
ENV JAVA_HOME="/usr/lib/jvm/jdk-17"


ENV PATH=${JAVA_HOME}/bin:${PATH}

ARG MAVEN_VERSION=3.8.7
ARG BASE_URL=https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries

RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
    && curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
    && tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 \
    && rm -f /tmp/apache-maven.tar.gz \
    && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt -y install python3-pip

RUN pip3 install -U pip

RUN pip3 install loguru marshmallow_dataclass ruamel.yaml svn

RUN cd /tmp/ && wget https://downloads.mongodb.com/compass/mongodb-mongosh_1.6.0_amd64.deb \
    && dpkg -i mongodb-mongosh_1.6.0_amd64.deb \
    && rm /tmp/mongodb-mongosh_1.6.0_amd64.deb

RUN cd /tmp/ && wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-x86_64-100.6.1.deb \
    && dpkg -i mongodb-database-tools-ubuntu2004-x86_64-100.6.1.deb \
    && rm /tmp/mongodb-database-tools-ubuntu2004-x86_64-100.6.1.deb

RUN mkdir -p /usr/share/node && cd /tmp/  && curl -fsSL -o /tmp/node.tar.xz https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz \
    && tar -xf /tmp/node.tar.xz -C /usr/share/node --strip-components=1 \
    && rm -f /tmp/node.tar.xz \
    && ln -s /usr/share/node/bin/node /usr/bin/node \
    && ln -s /usr/share/node/bin/npm /usr/bin/npm \
    && ln -s /usr/share/node/bin/npx /usr/bin/npx \
    && ln -s /usr/share/node/bin/corepack /usr/bin/corepack

RUN npm install -g npm


ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME
