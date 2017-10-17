/* var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
*/

var SPCMNToken = artifacts.require("./SPCMNToken.sol");
var SPCMNCrowdsale = artifacts.require("./SPCMNCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
	return liveDeploy(deployer, accounts);
};

// Returns the time of the last mined block in seconds
function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}

function ether(n) {
 return new web3.BigNumber(web3.toWei(n, 'ether'))
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
};

async function liveDeploy(deployer, accounts){
	const BigNumber = web3.BigNumber;
	const RATE 		= new BigNumber(10);
	const startTime = latestTime();
    const endTime 	= startTime + duration.weeks(1);
    console.log([startTime, endTime, RATE.toNumber(), accounts[0]]);
	// (uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet))
	return deployer.deploy(SPCMNCrowdsale, startTime, endTime, RATE, accounts[0]).then(async() => {
		const inst 	= await SPCMNCrowdsale.deployed();
		const token = await inst.token.call();
		console.log("Token Address", token);
	});
}
