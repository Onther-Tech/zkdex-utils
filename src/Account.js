const { PublicKey, PrivateKey } = require('babyjubjub');
const BN = require('bn.js');
const crypto = require('crypto');
const bs58 = require('bs58');

class Account{

  constructor(privKey="") {
    if(privKey == ""){
      this.sk = new PrivateKey(privKey);
    } else {
      this.sk = new PrivateKey(privKey);
      this.pubkey = PublicKey.fromPrivate(this.sk);
      this.pubkeyPoint = this.pubkey.p;
      this.pubkeyHexPoint = Account._pointToHex(this.pubkeyPoint);
      this.digestPubkey = Account._toHashed(this.pubkeyHexPoint.x + this.pubkeyHexPoint.y);
      this.zkAddress = this.digestPubkey.slice(24);
      this.zkAddressBase58 = Account._hexToBase58(this.zkAddress);
      this.zkAddressFormat = "zk" + this.zkAddressBase58;
    }

  }

  static create(privKey) {
    return new Account(privKey);
  }

  static createRandom(){
    let skField = PrivateKey.getRandObj().field;
    return new Account(skField);
  }

  getZkAddress() {
    return this.zkAddress;
  }

  getZkAddressBase58() {
    return this.zkAddressBase58;
  }

  getZkAddressFormat() {
    return this.zkAddressFormat;
  }

  getPubkeyPoint() {
    return {
      x : this.pubkeyPoint.x.n.toFixed(),
      y : this.pubkeyPoint.y.n.toFixed()
    }
  }

  getPubkeyHexstring() {
    return this.pubkeyHexPoint.x + this.pubkeyHexPoint.y;
  }

  getPrivKey() {
    return this.sk.s.n.toFixed();
  }

  // getNoteAddress() {
  //
  // }

  dump(){
    return {
      sk : this.sk.s.n.toFixed(),
      pubkey : {
        x : this.pubkeyPoint.x.n.toFixed(),
        y : this.pubkeyPoint.y.n.toFixed()
      },
      pubkeyHexstring : this.pubkeyHexPoint.x + this.pubkeyHexPoint.y,
      digestedPubkey : this.digestPubkey,
      zkAddressBase58 : this.zkAddressBase58,
      zkAddressFormat : this.zkAddressFormat,
      zkAddress: this.zkAddress
    }
  }

  static _pointToHex(point){
    let pX = point.x.n.toString(16);
    let pY = point.y.n.toString(16);
    return {
      x : pX,
      y : pY
    }
  }

  static _toHashed(encodedValue){
    let buf = Buffer.from(encodedValue, 'hex');
    let digest = crypto.createHash('sha256').update(buf).digest('hex');
    // console.log('digest', digest);
    return digest;
  }

  static _hexToBase58(hexValue){
    let bytes = Buffer.from(hexValue, 'hex');
    let address = bs58.encode(bytes);
    return address;
  }
}

module.exports = {
  Account,
}
