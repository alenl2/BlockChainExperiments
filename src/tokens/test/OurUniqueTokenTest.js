const OurUniqueToken = artifacts.require("./OurUniqueToken.sol");

contract("OurUniqueToken", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await OurUniqueToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});