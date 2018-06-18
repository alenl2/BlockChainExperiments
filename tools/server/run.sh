#!/bin/bash

sudo docker stop geth-bootnode
sudo docker rm geth-bootnode

sudo docker stop geth-node1
sudo docker rm geth-node1

sudo docker stop geth-node2
sudo docker rm geth-node2

sudo docker stop geth-rpc
sudo docker rm geth-rpc

sudo docker network rm eth
sudo docker network create --subnet=172.18.0.0/24 eth 

sudo docker run -d --name geth-bootnode --network eth --ip 172.18.0.2 -v /home/potato/server/:/root ethereum/client-go:alltools-stable bootnode -nodekey /root/boot.key -verbosity 9

sudo docker run -d --name geth-node1 --network eth -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node1 --syncmode 'full' --networkid 55318 --bootnodes 'enode://1d26c0d8e22e6e8fae0b647cf289c366fcffe0e55a38b5d37b99885d52306290fc2c9a73e8f6604b2f9de3596e737f392fc834531d1e09255933a29453c428e0@172.18.0.2:30301' --gasprice '1' -unlock 0xcccb34218b3397ef183b307800dc82af69c350a9 --password /root/node1/password.txt --mine

sudo docker run -d --name geth-node2 --network eth -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node2 --syncmode 'full' --networkid 55318 --bootnodes 'enode://1d26c0d8e22e6e8fae0b647cf289c366fcffe0e55a38b5d37b99885d52306290fc2c9a73e8f6604b2f9de3596e737f392fc834531d1e09255933a29453c428e0@172.18.0.2:30301' --gasprice '1' -unlock 0x9f885168b09b867da6f4105a6737a84a2efc53f7 --password /root/node2/password.txt --mine

sudo docker run -d --name geth-rpc --network eth -p 8545:8545 -v /home/potato/server/:/root ethereum/client-go:alltools-stable geth --datadir /root/node-rpc --syncmode 'full' --networkid 55318 --bootnodes 'enode://1d26c0d8e22e6e8fae0b647cf289c366fcffe0e55a38b5d37b99885d52306290fc2c9a73e8f6604b2f9de3596e737f392fc834531d1e09255933a29453c428e0@172.18.0.2:30301' --gasprice '1' --rpc "0.0.0.0" --rpcport 8545 --rpcapi 'personal,db,eth,net,web3,txpool,miner' 

