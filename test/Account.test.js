const { Account } = require("../src/Account.js");
const chai = require('chai');

chai.should();
chai.use(require('chai-bignumber')());

describe('# Account Test', () => {
  it('#Account.createRandom() test', () => {
    // let result = new FQ('21888242871839275222246405745257275088548364400416034343698204186575808495617');
    // let expected = 0;
    // result.n.should.be.bignumber.equal(expected);
    console.log("test");
  });
})
