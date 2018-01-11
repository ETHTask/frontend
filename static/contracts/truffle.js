var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "NoMejwXs8cn9O4L7Worq";
var mnemonic = "goat wrong rather vendor august debate galaxy bind above shield betray magic";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4000000 // 500000
    }
  }
};
