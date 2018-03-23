FROM centos:7 

MAINTAINER user

ENV container docker 

RUN yum -y update; yum clean all;

RUN yum -y install systemd deltarpm epel-release; yum clean all; 

RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done); \ 
rm -f /lib/systemd/system/multi-user.target.wants/*;\ 
rm -f /etc/systemd/system/*.wants/*;\ 
rm -f /lib/systemd/system/local-fs.target.wants/*; \ 
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \ 
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \ 
rm -f /lib/systemd/system/basic.target.wants/*;\ 
rm -f /lib/systemd/system/anaconda.target.wants/*; 

# Install Python and Git.
RUN yum install -y python \
    python-dev python-pip \
    python-virtualenv git \
    openssh-server openssh-clients \
    && yum -y groupinstall base "Development Tools"

RUN systemctl enable sshd

#Clone Repository  
RUN git clone https://github.com/brayanrodbajo/MERApp

WORKDIR /MERApp

# Install Flask
RUN pip install -r requirements.txt

RUN echo -e '[Unit]\n\
After=sshd.service\n\
\n\
[Service]\n\
ExecStart=/usr/bin/python /MERApp/run.py\n\
\n\
[Install]\n\
WantedBy=default.target' > /etc/systemd/system/web_service.service

RUN systemctl enable web_service.service  

VOLUME [ "/sys/fs/cgroup" ]

VOLUME ["/MERApp/data"]

CMD ["/usr/sbin/init"]
