const OurAirdrop = artifacts.require("./OurAirdrop.sol");

contract("OurAirdrop", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await OurAirdrop.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});