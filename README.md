# zkdex-utils
zkdex-utils is a utility library for zk-dex

# Spec

Account : https://github.com/Onther-Tech/zk-dex/issues/38

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
//   zkAddressFormat: 'zkc85a67c6508b15bde961656da11b0f27821fadd1',
//   zkAddress: 'c85a67c6508b15bde961656da11b0f27821fadd1' }

//Create account based on sk = '20778773223370278579726443807976762714'
let account2 = Account.create('20778773223370278579726443807976762714');
console.log(account2.dump());
```

## Note
```javascript

```
