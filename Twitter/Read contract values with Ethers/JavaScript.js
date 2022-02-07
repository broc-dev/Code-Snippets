// Import ethers & ethers utils
let { ethers } = require('ethers')
let utils = require('ethers').utils

// Storing the contract ABI & address in a separate file is optional
const config = require('./config.json')
const interface = new utils.Interface(config.abi)
const contractAddress = config.address
// Replace ethers JsonRpcProvider with your provider of choice
// In this case I'm using the Moralis Avalanche RPC
const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/b28b81859210c50b438cbf9b/avalanche/mainnet")
const contract = new ethers.Contract(contractAddress, interface, provider)

async const readTotalSupply = async () => {
	let supply = await contract.totalSupply()
	// supply is returned as a BigNumber so we use formatUnits(...) to format into an integer
	supply = formatUnits(supply, 0)
}
