const { Note } = require('../src/Note.js')
const { utils } = require('../src/utils.js');
const BN = require('bn.js');
const Web3Utils = require('web3-utils');
const chai = require('chai');

chai.should();
chai.use(require('chai-bignumber')());

// const { toHashed } = require('../src/noteHelper.js');

// const owner = '17325c2fec23861ff5ed4ea51641d6bb883978b0';
const owner = "53d1cadfe54ffd6b81d45c9917325c2fec23861ff5ed4ea51641d6bb883978b0";
const value = '6';
const type = '0';
const viewKey='1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
const salt = 'c517f646255d5492089b881965cbd3da';
const acc = {
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

// var note = new Note(parentOwner, parentValue, parentType, parentViewKey)

// utils.zComputeWitnessCommand(note.getNoteParamsForCircuit())

describe('# Note.js Test', () => {
  it('#getNoteHash() test', () => {
    let note = new Note(owner, value, type, viewKey, salt);
    let result = note.getNoteHash();
    // let raw = note.getNoteRaw();
    // let hToHashed = toHashed(raw);
    // console.log("helper hashed : ", hToHashed);
    // console.log(note);
    // console.log(note.value == new BN(value, 16).toString(16,64));
    // console.log(note.type == new BN(type, 16).toString(16,32));
    // console.log(note.viewKey == new BN(viewKey, 16).toString(16,64));
    // console.log(note.salt == new BN(salt, 16).toString(16,32));
    // console.log("Note Hash : ", result);
    let command = utils.zComputeWitnessCommand(note.getNoteParamsForCircuit());
    // console.log(command);
    let exp1 = "015408440684068096143997935374484402269";
    let exp2 = "235136800491926290460213793557526229261";
    let uexp1 = utils.unmarshal(Web3Utils.toHex(exp1));
    let uexp2 = utils.unmarshal(Web3Utils.toHex(exp2));
    let expected = Web3Utils.padLeft(uexp1, 32) + uexp2;
    result.should.be.equal(expected);
  });
})
