# Global Install
git,node,geth,vs-code,truffle,remixd,yarn,build tools for your OS

## Windows (powershell) 
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install git nodejs vscode yarn tortoisegit kubernetes-cli minikube -y
npm install -g --production windows-build-tools
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
minikube start --vm-driver hyperv --hyperv-virtual-switch "Default Switch"

lxrun /install /y
bash -c "sudo do-release-upgrade"
bash -c "sudo apt-get update"
bash -c "sudo apt-get upgrade -y"
```

## Linux
```
# TODO
```

# Developing
```
# start truffle develop in the contracts folder
cd contracts
npm install
truffle develop

# add rpc from the console to metamask custom rpc
# import the private key provided in the console

# inside the truffle develop console run when you made changes in the contracts
migrate --reset --all

# open a new terminal
# start react development server

cd gui
npm install
npm run start
# no need to do anything anymore since auto reload is working
```

# Debugging
## Truffle
```
# In truffle develop console get the latest transcaction hash
web3.eth.getBlock("latest").transactions
# To open the debugger run
debug {tx}
# Folow onscreen instuctions
```
## Gui
Use https://remix.ethereum.org/ for contracts and chrome debugger for gui
```
# to share local files to remix you need to start remix deamon
npm run remix
```

# Testing
```
# Run unit tests
npm run test
```

#Deployment
```
# sync your deisred chain using the correct script in the tools folder 

# run truffle migrations from contracts folder
cd contracts
truffle migrate --reset --all
cd ..

# compile gui inside the gui folder
cd gui
# Set homepage to something like /test in package.json in gui folder so that your app runs inside a subfolder
npm run build
cd ..

# deploy gui to the server
npm install
npm run deploy
```






# Knowledge base

## Wallet unlock
web3.personal.unlockAccount(web3.personal.listAccounts[0],"123321qweewq", 15000)

## Combine sol-s for etherscan
```
cd solidity-flattener
npm install
npm start "..\contracts\contracts\Combined.sol"
```

## Create symlink on windows
```
# Run cmd as administrator
cd src\admin\src\contracts
mklink /d tokens ..\..\..\tokens\build\contracts
```