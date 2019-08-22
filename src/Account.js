const { PublicKey, PrivateKey } = require('babyjubjub');
const BN = require('bn.js');
const crypto = require('crypto');

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
      this.cif = this.digestPubkey.slice(24);
      this.zkAddress = "zk" + this.cif;
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

  getCIF() {
    return this.cif;
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

  getNoteAddress() {

  }

  dump(){
    return {
      sk : this.sk.s.n.toFixed(),
      pubkey : {
        x : this.pubkeyPoint.x.n.toFixed(),
        y : this.pubkeyPoint.y.n.toFixed()
      },
      pubkeyHexstring : this.pubkeyHexPoint.x + this.pubkeyHexPoint.y,
      digestedPubkey : this.digestPubkey,
      cif : this.cif,
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
    const buf = Buffer.from(encodedValue, 'hex');
    const digest = crypto.createHash('sha256').update(buf).digest('hex');
    // console.log('digest', digest);
    return digest;
  }
}

module.exports = {
  Account,
}
