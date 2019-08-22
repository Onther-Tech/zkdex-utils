# zkdex-utils
zkdex-utils is a utility library for zk-dex

# Install
```
$ npm install zkdex-utils
```

# Usage

## Account
```
const { Account } = require('zkdex-utils');

//Get random Account
let account = Account.createRandom();
console.log(account.dump());
//{ sk: '20778773223370278579726443807976762714',
//  pubkey:
//   { x:
//      '21308657927157056923426690882269952221491245850751070136936526236812650517304',
//     y:
//      '16153016515474013933365235322394994306071554003400423135753359622177885247604' },
//  pubkeyHexstring:
//   '2f1c45e2768a993f6a78d4f93a508cfbc8bba93015c75f6bf07df3c33664933823b6488a1d0f752ea1691018a4eee3b0f6a9e08f465b0da0ce027fe130b7d874',
//  digestedPubkey:
//   '92090685e0747f278fe015699e8cbae996b4fa63e606545ce624ddf1a3a17a55',
//  cif: '9e8cbae996b4fa63e606545ce624ddf1a3a17a55',
//  zkAddress: 'zk9e8cbae996b4fa63e606545ce624ddf1a3a17a55' }

//Create account based on sk = '20778773223370278579726443807976762714'
let account2 = Account.create('20778773223370278579726443807976762714');
console.log(account2.dump());
```

## Note
```
```
