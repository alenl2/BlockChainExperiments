const OurToken = artifacts.require("./OurToken.sol");

contract("OurToken", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await OurToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});