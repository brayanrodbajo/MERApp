#
# Python Dockerfile
#
# https://github.com/brayanrodbajo/MERApp
#

# Pull base image.
FROM ubuntu:latest

MAINTAINER Brayan Rodriguez "brayanrodbajo@gmail.com"

# Install Python and Git.
RUN \
  apt-get update -y && \
  apt-get install -y python python-dev python-pip python-virtualenv build-essential git

#Clone Repository  
RUN \
  git clone https://github.com/brayanrodbajo/MERApp

WORKDIR /MERApp 

# Install Flask
RUN pip install -r requirements.txt
VOLUME ["/data"]
ENTRYPOINT ["python"]

# Define default command.
CMD ["run.py"]
