const OurCrowdSale = artifacts.require("./OurCrowdSale.sol");

contract("OurCrowdSale", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await OurCrowdSale.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});