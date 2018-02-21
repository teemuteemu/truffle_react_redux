export const deployContracts = (web3, contracts) => {
  // Set web3 provider for each contract
  Object.keys(contracts)
    .forEach(contract => contracts[contract].setProvider(web3.currentProvider));

  // Deploy each contract and store instances in the contracts object (not the nicest way)
  const deploys = Object.keys(contracts)
    .map(contract => {
      return contracts[contract].deployed()
        .then(instance => {
          contracts[contract] = instance;
          return Promise.resolve(instance);
        });
    });

  return Promise.all(deploys)
    .then(instances => ({ web3, contracts }));
}
