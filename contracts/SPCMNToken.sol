pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract SPCMNToken is MintableToken{
	string public constant name = "Speculative Mania";
	string public constant symbol ="SPCMN";
	uint8  public constant decimals = 18;
}