const { Account } = require("../src/Account.js");
const chai = require('chai');

chai.should();
chai.use(require('chai-bignumber')());

describe('# Account.js Test', () => {
  it('#Account.createRandom(),create()', () => {
    let account = Account.createRandom();
    let resultSK = account.dump().sk;
    let expectedAccount = Account.create(resultSK);
    let expectedSK = expectedAccount.dump().sk;
    resultSK.should.be.equal(expectedSK);
  });
  it('#Account.getZkAddress()', () => {
    let account = Account.createRandom();
    let rZkAddress = account.getZkAddress();
    let expectedZK = account.dump().zkAddress;
    rZkAddress.should.be.equal(expectedZK);
  });
  it('#Account.getZkAddressBase58()', () => {
    let account = Account.createRandom();
    let rBase58 = account.getZkAddressBase58();
    let expectedBase58 = account.dump().zkAddressBase58;
    rBase58.should.be.equal(expectedBase58);
  });
  it('#Account.getZkAddressFormat()', () => {
    let account = Account.createRandom();
    let rAddressFormat = account.getZkAddressFormat();
    let expectedAddressFormat = account.dump().zkAddressFormat;
    rAddressFormat.should.be.equal(expectedAddressFormat);
  });
  it('#Account.getPubkeyPoint()', () => {
    let account = Account.createRandom();
    let rX = account.getPubkeyPoint().x;
    let rY = account.getPubkeyPoint().y;
    let expectedX = account.dump().pubkey.x;
    let expectedY = account.dump().pubkey.y;
    rX.should.be.equal(expectedX);
    rY.should.be.equal(expectedY);
  });
  it('#Account.getPubkeyHexstring()', () => {
    let account = Account.createRandom();
    let rHexString = account.getPubkeyHexstring();
    let expectedHex = account.dump().pubkeyHexstring;
    rHexString.should.be.equal(expectedHex);
  });
  it('#Account.getPrivKey()', () => {
    let account = Account.createRandom();
    let rSK = account.getPrivKey();
    let expectedSK = account.dump().sk;
    rSK.should.be.equal(expectedSK);
  });
})
