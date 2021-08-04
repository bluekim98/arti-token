const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const MNEMONIC = process.env.MNEMONIC;
const INFURA_ACCESS_TOKEN = process.env.INFURA_ACCESS_TOKEN;

module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  mainnet: {
    provider: function () {
      return new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_ACCESS_TOKEN}`)
    },
    network_id: "1"
  },
  rinkeby: {
      provider: function() { 
       return new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_ACCESS_TOKEN}`);
      },
      network_id: 4,
      // gas: 4500000,
      // gasPrice: 10000000000,
  }
 },
 compilers: {
  solc: {
    version: "^0.8.0"
  }
 }
};