import contract from 'truffle-contract'

import SimpleStorageContract from 'build/contracts/SimpleStorage.json'

export default {
  SimpleStorage: contract(SimpleStorageContract),
};

