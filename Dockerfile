#
# Python Dockerfile
#
# https://github.com/dockerfile/python
#

# Pull base image.
FROM ubuntu:latest

MAINTANER Brayan Rodriguez "brayanrodbajo@gmail.com"

# Install Python.
RUN \
  apt-get update -y && \
  apt-get install -y python python-dev python-pip python-virtualenv build-essential
  
COPY . /MERApp 
WORKDIR /MERApp 

# Install Flask
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]

# Define default command.
CMD ["run.py"]
