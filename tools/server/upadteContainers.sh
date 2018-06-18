#!/bin/bash

sudo docker pull sublime.zapto.org/our-ico
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter name=our-ico --format="{{.ID}}"))
sudo docker run -d -p 8080:80 --restart=always --name our-ico sublime.zapto.org/our-ico

sudo docker pull sublime.zapto.org/our-admin
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter name=our-admin --format="{{.ID}}"))
sudo docker run -d -p 8081:80 --restart=always --name our-admin sublime.zapto.org/our-admin

sudo docker pull sublime.zapto.org/our-market
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter name=our-market --format="{{.ID}}"))
sudo docker run -d -p 8082:80 --restart=always --name our-market sublime.zapto.org/our-market

sudo docker pull sublime.zapto.org/our-backend
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter name=our-backend --format="{{.ID}}"))
sudo docker run -d -p 8083:80 --restart=always --name our-backend sublime.zapto.org/our-backend

sudo docker ps
