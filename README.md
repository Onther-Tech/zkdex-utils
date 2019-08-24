# zkdex-utils
zkdex-utils is a utility library for zk-dex

# Spec

- Account : https://github.com/Onther-Tech/ZKDIPs/blob/master/ZKDIPs/zkdip-2.md

# Install
```
$ npm install zkdex-utils
```

# Usage

## Account
```javascript
const { Account } = require('zkdex-utils');

//Get random Account
let account = Account.createRandom();
console.log(account.dump());
// { sk: '283730080929924873539930417380046991915',
//   pubkey:
//    { x: '8134376785179039193608734207041942142438070292053423243321516244844882635788',
//      y: '16644628734174215692352200865591121051826568248988524186501560699726127215679' },
//   pubkeyHexstring: '11fbe4e409340feb598b9ba8057c50222367573f7e03d5d390244198c99f2c0c24cc86a8c45f16060a2b7ec6aa0917ccb69238f1485e2e5f7955447b646cb43f',
//   digestedPubkey: 'fc6227abd30e809e1fa66898c85a67c6508b15bde961656da11b0f27821fadd1',
//   zkAddressBase58: '3ntnZBQPzVwMosKct6MSPX9opVrG',
//   zkAddressFormat: 'zk3ntnZBQPzVwMosKct6MSPX9opVrG',
//   zkAddress: 'c85a67c6508b15bde961656da11b0f27821fadd1' }

//Create account based on sk = '20778773223370278579726443807976762714'
let account2 = Account.create('20778773223370278579726443807976762714');
console.log(account2.dump());
```

## utils
```javascript
const { utils } = require('zkdex-utils');

let hexValue = 'd16501b93aacfb4cb52413d87646f9ec45ecae7a';
let intValue = '1195431596509751261413288945812563671344183291514';

utils.hexToInt(hexValue);
//return : '1195431596509751261413288945812563671344183291514'

utils.pad0andSplit(hexValue);
//return :
//[ '000000000000000000000000d16501b9',
//  '3aacfb4cb52413d87646f9ec45ecae7a' ]

utils.pad0andSplit(hexValue);
//return : [ '3513057721', '77993395777404380459046375406321839738' ]

utils.toHashed(hexValue);
//return : 'ccb2f234308cae2c01e2277785da7ea320d5bab2c363e09a18aaeb7f5221a689'

utils.toIntHashed(hexValue);
//return : '92587991518162908190149129956315054014557365764270414047919968238243684656777'

utils.toSplittedHashed(hexValue);
//return :
//[ 'ccb2f234308cae2c01e2277785da7ea3',
//  '20d5bab2c363e09a18aaeb7f5221a689' ]

utils.toSplittedIntHashed(hexValue);
//return :
//[ '272091652458955924425974303020698730147',
//  '43645041787254754191522146263106692745' ]

utils.intToHex(intValue);
//return : '1195431596509751261413288945812563671344183291514'

utils.zComputeWitnessCommand(['a','b','c']);
//return : './zokrates compute-witness -a 10 11 12'
```

## Note
```javascript

```
