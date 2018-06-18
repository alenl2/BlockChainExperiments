#!/bin/bash

sudo docker stop geth-bootnode
sudo docker rm geth-bootnode

sudo docker stop geth-node1
sudo docker rm geth-node1

sudo docker stop geth-node2
sudo docker rm geth-node2

sudo docker stop geth-rpc
sudo docker rm geth-rpc

sudo rm -rf node1/geth
sudo rm -rf node2/geth
sudo rm -rf node-rpc/geth

# uncomment if you want to regenerate genesis and bootnode
# sudo docker run -it --name geth-puppeth -v /home/potato/server/:/root ethereum/client-go:alltools-stable puppeth
# sudo docker run -it --name geth-bootnode -v /home/potato/server/:/root ethereum/client-go:alltools-stable bootnode -genkey boot.key

sudo docker run --name geth-node1 -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node1 init /root/privatenet.json

sudo docker run --name geth-node2 -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node2 init /root/privatenet.json

sudo docker run --name geth-rpc -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node-rpc init /root/privatenet.json

