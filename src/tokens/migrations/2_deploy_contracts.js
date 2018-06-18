var OurCrowdSale = artifacts.require("./OurCrowdSale.sol");
var OurToken = artifacts.require("./OurToken.sol");
var OurUniqueToken = artifacts.require("./OurUniqueToken.sol");
var OurAirdrop = artifacts.require("./OurAirdrop.sol");
var TokenPurchaseFactory = artifacts.require("./TokenPurchaseFactory.sol");
var TokenSaleFactory = artifacts.require("./TokenSaleFactory.sol");

var abi = require('ethereumjs-abi')

const getLatestBlock = async () => new Promise((resolve, reject) => {
  web3.eth.getBlock('latest', (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

module.exports = async (deployer, network, accounts) => {
    const tokenCap = web3.toWei(100000, "ether");//max amount of tokens to exist
  
    return deployer.deploy(OurToken, tokenCap).then(async () =>{
      const tokenInstance = await OurToken.deployed();
      await tokenInstance.addMinter(accounts[0]);

      return deployer.deploy(OurUniqueToken, OurToken.address).then(async () =>{
        const uniqueTokenInstance = await OurUniqueToken.deployed();
        await tokenInstance.addMinter(uniqueTokenInstance.address);

        return deployer.deploy(OurAirdrop, OurToken.address).then(async () =>{
          const airdropInstance = await OurAirdrop.deployed();
          await tokenInstance.addMinter(airdropInstance.address);

          return deployer.deploy(TokenSaleFactory).then(async () =>{
            const tokenSaleFactory = await TokenSaleFactory.deployed();

            return deployer.deploy(TokenPurchaseFactory).then(async () =>{
              const tokenPurchaseFactory = await TokenPurchaseFactory.deployed();
              
              const benifactor = "0x07a733e2d173cb03b15dcecc20181a0d5d632280";
              await tokenInstance.addMinter(benifactor);
              
              return getLatestBlock().then(async (res) => {
                const RATE = 1; //1 token for 1 wei
                const startTime = res.timestamp+ duration.minutes(10);//start in 
                const endTime =  startTime + duration.days(500);//run for 
                const minFunding = web3.toWei(10, "ether");//refund if collected less then 

                const args = [OurToken.address, startTime, endTime, RATE, benifactor, minFunding];
                return deployer.deploy(OurCrowdSale, OurToken.address, startTime, endTime, RATE, benifactor, minFunding).then( async () => {
                  const instance = await OurCrowdSale.deployed();
                  await tokenInstance.addMinter(instance.address);
                  console.log("ABI encoded> "+abi.rawEncode([ "address", "uint256", "uint256", "uint256", "address", "uint256" ], args).toString('hex'))
                });
              });
            });
          });
        });
      });
    });
};


const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)} 
};
