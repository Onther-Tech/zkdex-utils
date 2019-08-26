const { utils } = require('./utils.js');
const { Account } = require('./Account.js');
const { PublicKey, PrivateKey } = require('babyjubjub');
const BN = require('bn.js');
const crypto = require('crypto');
const Web3Utils = require('web3-utils');

const mode = 'aes-256-cbc';
const ETH_TOKEN_TYPE = Web3Utils.padLeft('0x0', 32);
//TODO : Should check whether this IV it is safe or not
const IV = Buffer.alloc(16, 0);

const OwnerType = {
  External: Web3Utils.toBN('0'),
  Note: Web3Utils.toBN('1'),

  toString(s) {
    if (this.External.cmp(s) === 0) { return 'External'; }
    if (this.Note.cmp(s) === 0) { return 'Note'; }

    throw new Error(`Undefined state: ${s}`);
  },
};


class Note{
  constructor(owner, value, type="0x0", viewKey="0x01", salt="0x01") {
    //note variables
    this.owner = Web3Utils.padLeft(utils.unmarshal(owner), 64); //256 bit
    this.value = Web3Utils.padLeft(utils.unmarshal(value), 64); //256 bit
    this.type = Web3Utils.padLeft(utils.unmarshal(type), 32); //128 bit
    this.viewKey = Web3Utils.padLeft(utils.unmarshal(viewKey), 64); //256 bit
    this.salt = Web3Utils.padLeft(utils.unmarshal(salt), 32); //128 bit
  }

  getNoteHash() {
    let target = this.owner+this.value+this.type+this.viewKey+this.salt;
    // console.log("target length : ", target.length);
    // console.log("hash target: ", target);
    let noteHash = utils.toHashed(target);
    return noteHash;
  }

  getNoteRaw(){
    return this.owner+this.value+this.type+this.viewKey+this.salt;
  }

  encrypt(password = this.viewKey){
    const key = crypto.scryptSync(password, password, 32);
    const cipher = crypto.createCipheriv(mode, key, IV);

    const r1 = cipher.update(this.toString(), 'utf8', 'base64');
    const r2 = cipher.final('base64');

    return utils.marshal(
      Web3Utils.fromAscii(r1 + r2),
    );
  }

  isSmart() {
    let oType = Note.checkOwnerType(this.owner);
    if(oType === OwnerType.External) {
      return false;
    } else {
      return true;
    }
  }

  isOwnedBy(sk) {
    let rAccount = new Account(sk);
    let rAddress = rAccount.zkAddress;
    let cAddress = utils.delLeftPad(this.owner);
    return cAddress == rAddress;
  }

  isNoteHash(hash) {
    return this.getNoteHash() == utils.unmarshal(hash);
  }

  toString() {
    return JSON.stringify(this);
  }

  //Return : [noteHash1, noteHash2, owner1, owner2, value1, value2, type, viewKey1, viewKey2, salt]
  //TODO : NoteHash should included
  getNoteParamsForCircuit() {
    let sNoteHash = utils.pad0andSplit(this.getNoteHash());
    let sOwner = utils.pad0andSplit(this.owner);
    let sValue = utils.pad0andSplit(this.value);
    let sVK = utils.pad0andSplit(this.viewKey);
    let paramList =  sNoteHash.concat(sOwner, sValue, this.type, sVK, this.salt);
    return paramList.map(x => utils.unmarshal(x));
  }

  //Return : [NoteHash, Value, Type, viewKey, salt], left 0 padded
  getNoteParamsPadded(){
    return [this.owner].concat(
      this.value,
      this.type,
      this.viewKey,
      this.salt
    );
  }

  //Return : [NoteHash, Value, Type, viewKey, salt], no padded
  //TODO : if 0 --> "", not expected
  // getNoteParams(){
  //   return this.getNoteParamsPadded().map(x => utils.delLeftPad(x));
  // }

  static decrypt(v, password){
    if (!v) {
      throw new Error(`invalid value to decrypt: ${v}`);
    }
    const key = crypto.scryptSync(password, password, 32);
    const decipher = crypto.createDecipheriv(mode, key, IV);

    const r1 = decipher.update(Web3Utils.toAscii(v), 'base64', 'utf8');
    const r2 = decipher.final('utf8');

    const note = JSON.parse(r1 + r2);
    return new Note(
      note.owner, note.value, note.token, note.viewingKey, note.salt
    );
  }

  static checkOwnerType(owner) {
    let noLeadingZeroOwner = utils.delLeftPad(utils.unmarshal(owner));
    if(noLeadingZeroOwner.length == 64) { return OwnerType.Note };
    if(noLeadingZeroOwner.length < 64) { return OwnerType.External };
  }
}


module.exports = {
  Note,
  OwnerType,
}
