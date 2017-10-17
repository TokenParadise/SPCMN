// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
            host: '127.0.0.1', // Connect to geth on the specified
            port: 8545,
            from: "0x5Be0E52bbe27e08F29467c712d7ff4cda8E75842", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
             gas: 4412388 // Gas limit used for deploys
     }
  }
}
