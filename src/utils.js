const BN = require('bn.js');
const BigNumber = require('bignumber.js');

const bs58 = require('bs58');
const crypto = require('crypto');
const assert = require('assert');

class utils{

  //Hex string to Something
  static hexToInt(hexstring){
    return new BN(hexstring, 16).toString(10);
  }

  //targetHex < 256 bit to [128bit, 128bit], 0 padded hex string.
  static pad0andSplit(targetHex){
    assert(targetHex.length < 64);
    let splittedData;
    const targetLen = targetHex.length;
    const remainLen = 64 - targetLen;

    if (targetHex == '0') {
      splittedData = ['0'.repeat(32), '0'.repeat(32)];
    } else if (targetLen <= 32) {
      splittedData = ['0'.repeat(32), '0'.repeat(32 - targetLen).concat(targetHex.slice(0, 32))];
    } else if (targetLen > 32 && targetLen <= 64) {
      splittedData = ['0'.repeat(remainLen).concat(targetHex.slice(0, 32 - remainLen)), targetHex.slice(32 - remainLen)];
    } else {
      splittedData = [targetHex.slice(0, 32), targetHex.slice(32)];
    }

    return splittedData;
  }

  //targetHex < 256 bit to [128bit, 128bit], 0 padded hex string.
  static pad0andIntSplit(targetHex){
    let splittedData = utils.pad0andSplit(targetHex);
    return splittedData.map(x => utils.hexToInt(x));
  }

  //hex to sha256 digested hex.
  static toHashed(encodedValue){
    const buf = Buffer.from(encodedValue, 'hex');
    const digest = crypto.createHash('sha256').update(buf).digest('hex');
    // console.log('digest', digest);
    return digest;
  }

  //hex to sha256 digested Integer.
  static toIntHashed(encodedValue){
    const digest = utils.toHashed(encodedValue);
    return utils.hexToInt(digest);
  }

  //sha256 digested hex to splitted = [128bit, 128bit], hex format.
  static toSplittedHashed(encodedValue){
    const buf = Buffer.from(encodedValue, 'hex');
    const digest = crypto.createHash('sha256').update(buf).digest('hex');
    let splitted = [digest.slice(0, 32), digest.slice(32)];
    return splitted;
  }

  //sha256 digested hex to splitted = [128bit, 128bit], Integer format.
  static toSplittedIntHashed(encodedValue){
    let splitted = utils.toSplittedHashed(encodedValue);
    return splitted.map(x => utils.hexToInt(x));
  }

  //Int string to something
  static intToHex(intString){
    return new BigNumber(intString).toString(16);
  }

  //zokrates related

  //compute-witness -a
  //input should be <hexstring list>
  static zComputeWitnessCommand(params) {
    let cmd = './zokrates compute-witness -a ';
    params.forEach((p) => {
      cmd += `${new BN(p, 16).toString(10)} `;
    });
    // console.log(cmd);
    return cmd.slice(0, -1);
  }

  //address related

  static encodeBase58(hexString) {
    let bytes = Buffer.from(hexString, 'hex');
    let address = bs58.encode(bytes);
    return address;
  }

  static decodeBase58(base58String) {
    let bytes = bs58.decode(base58String);
    return bytes.toString('hex');
  }

  static formatToAddress(formatAddress) {
    assert.ok(formatAddress.startsWith("zk"));
    let zkSliced = formatAddress.slice(2);
    return utils.decodeBase58(zkSliced);
  }

  static addressToFormat(address){
    assert.ok(address.length == 40);
    let encoded = utils.encodeBase58(address);
    return "zk" + encoded;
  }

}

module.exports = {
  utils,
}
