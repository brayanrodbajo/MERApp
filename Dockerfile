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


#SSH
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:screencast' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22



#Clone Repository  
RUN \
  git clone https://github.com/brayanrodbajo/MERApp

WORKDIR /MERApp 

# Install Flask
RUN pip install -r requirements.txt
VOLUME ["/data"]

# Define default command.
CMD ["sh start.sh"]
