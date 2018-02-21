import Web3 from 'web3'

function getCurrentProvider() {
  console.log('Using injected web3 provider');
  return window.web3.currentProvider;
}

function getLocalProvider() {
  console.log('Using local web3 connection');
  return new Web3.providers.HttpProvider('http://127.0.0.1:9545');
}

export const getWeb3 = () => {
  return new Promise(function(resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function() {
      const provider = typeof window.web3 !== 'undefined'
        ? getCurrentProvider()
        : getLocalProvider();
      const web3 = new Web3(provider)

      resolve(web3)
    })
  })
}
