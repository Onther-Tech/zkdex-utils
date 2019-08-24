const { Account } = require("../src/Account.js");
const { utils } = require("../src/utils.js");
const chai = require('chai');

chai.should();
chai.use(require('chai-bignumber')());

describe('# utils.js Test', () => {
  it('hexToInt() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected = '1195431596509751261413288945812563671344183291514';
    let result = utils.hexToInt(hexValue);
    result.should.be.equal(expected);
  });
  it('pad0andSplit() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected0 = '000000000000000000000000d16501b9';
    let expected1 = '3aacfb4cb52413d87646f9ec45ecae7a';
    let result = utils.pad0andSplit(hexValue);
    result[0].should.be.equal(expected0);
    result[1].should.be.equal(expected1);
  });
  it('pad0andIntSplit() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected0 = '3513057721';
    let expected1 = '77993395777404380459046375406321839738';
    let result = utils.pad0andIntSplit(hexValue);
    result[0].should.be.equal(expected0);
    result[1].should.be.equal(expected1);
  });
  it('toHashed() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected = 'ccb2f234308cae2c01e2277785da7ea320d5bab2c363e09a18aaeb7f5221a689';
    let result = utils.toHashed(hexValue);
    result.should.be.equal(expected);
  });
  it('toIntHashed() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected = '92587991518162908190149129956315054014557365764270414047919968238243684656777';
    let result = utils.toIntHashed(hexValue);
    result.should.be.equal(expected);
  });
  it('toSplittedHashed() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected0 = 'ccb2f234308cae2c01e2277785da7ea3';
    let expected1 = '20d5bab2c363e09a18aaeb7f5221a689';
    let result = utils.toSplittedHashed(hexValue);
    result[0].should.be.equal(expected0);
    result[1].should.be.equal(expected1);
  });
  it('toSplittedIntHashed() test', () => {
    let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let expected0 = '272091652458955924425974303020698730147';
    let expected1 = '43645041787254754191522146263106692745';
    let result = utils.toSplittedIntHashed(hexValue);
    result[0].should.be.equal(expected0);
    result[1].should.be.equal(expected1);
  });
  it('intToHex() test', () => {
    let intValue = '1195431596509751261413288945812563671344183291514';
    let expected = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
    let result = utils.intToHex(intValue);
    result.should.be.equal(expected);
  });
  it('zComputeWitnessCommand() test', () => {
    let inputs = ["a","b","c"];
    let expected = './zokrates compute-witness -a 10 11 12';
    let result = utils.zComputeWitnessCommand(inputs);
    result.should.be.equal(expected);
  });
})
