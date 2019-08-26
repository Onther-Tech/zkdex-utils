const { Note, OwnerType } = require('../src/Note.js')
const { utils } = require('../src/utils.js');
const BN = require('bn.js');
const Web3Utils = require('web3-utils');
const chai = require('chai');
const assert = require('assert');

chai.should();
chai.use(require('chai-bignumber')());

// const { toHashed } = require('../src/noteHelper.js');

// const owner = '17325c2fec23861ff5ed4ea51641d6bb883978b0';
const OWNER = "53d1cadfe54ffd6b81d45c9917325c2fec23861ff5ed4ea51641d6bb883978b0";
const VALUE = '6';
const TYPE = '0';
const VIEW_KEY='1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
const SALT = 'c517f646255d5492089b881965cbd3da';
const ACC = {
  sk: '23308570483326979346009455655324790223',
  pubkey:
   { x:
      '21669759072347788482381813644067457741730356871300221121818333104179411783379',
     y:
      '11774563644740807655196226977456003496673702937851408230040213437235587979398' },
  pubkeyHexstring:
   '2fe8a62459c57cee2e9f00bbc7b5c8ec8c0251eafafcac97f61a739b33318ed31a082ab6ed6591754967a86e847c863e5a3468c7358b1b484568b9f12c701886',
  digestedPubkey:
   '53d1cadfe54ffd6b81d45c9917325c2fec23861ff5ed4ea51641d6bb883978b0',
  zkAddressBase58: 'Kk9CwQ6gzbogX4rzWZjxA6esqXd',
  zkAddressFormat: 'zkKk9CwQ6gzbogX4rzWZjxA6esqXd',
  zkAddress: '17325c2fec23861ff5ed4ea51641d6bb883978b0'
};

const NOTE_HASH = '0b978ec7750e70c76c95ffd631cc705db0e5b35496dea5e6e6b0c677ea8e310d';

// var note = new Note(parentOwner, parentValue, parentType, parentViewKey)

// utils.zComputeWitnessCommand(note.getNoteParamsForCircuit())

describe('# Note.js Test', () => {
  it('#getNoteHash() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let result = note.getNoteHash();
    // let command = utils.zComputeWitnessCommand(note.getNoteParamsForCircuit());
    let expected = NOTE_HASH;
    // console.log(expected);
    result.should.be.equal(expected);
  });
  it('#getNoteRaw().length should be 256', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let result = note.getNoteRaw().length;
    // console.log(note.getNoteRaw());
    let expected = 256;
    assert.equal(result, expected);
  });
  it('#encrypt(), decrypt() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let encData = note.encrypt("abc");
    // console.log(encData);
    let decNote = Note.decrypt(encData, "abc");
    // console.log(decNote);
    note.owner.should.be.equal(decNote.owner);
  });
  it('#isSmart() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let result = note.isSmart();
    let expected = true;
    result.should.be.equal(expected);
  });
  it('#isOwnedBy() test', () => {
    let note = new Note(ACC.zkAddress, VALUE, TYPE, VIEW_KEY, SALT);
    let result = note.isOwnedBy(ACC.sk);
    let expected = true;
    result.should.be.equal(expected);
  });
  it('#isNoteHash() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let result = note.isNoteHash(NOTE_HASH);
    let expected = true;
    result.should.be.equal(expected);
  });
  it('#toString() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let result = JSON.parse(note.toString()).owner;
    // console.log(note.toString());
    let expected = note.owner;
    result.should.be.equal(expected);
  });
  it('#getNoteParamsForCircuit() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let resultType = note.getNoteParamsForCircuit()[6];
    console.log(note.getNoteParamsForCircuit());
    let expected = Web3Utils.padLeft(resultType, 32);
    resultType.should.be.equal(expected);
  });
  it('#getNoteParamsPadded() test', () => {
    let note = new Note(OWNER, VALUE, TYPE, VIEW_KEY, SALT);
    let resultOwner = note.getNoteParamsPadded()[0];
    // console.log(note.getNoteParamsPadded());
    let expected = note.owner;
    resultOwner.should.be.equal(expected);
  });
})
