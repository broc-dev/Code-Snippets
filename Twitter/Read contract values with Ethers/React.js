import React from 'react'
import { formatUnits } from '@ethersproject/units'
import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

// Storing the contract ABI & address in a separate file is optional
const config = require('./config.json')
const interface = new utils.Interface(config.abi)
const contractAddress = config.address
// Replace ethers JsonRpcProvider with your provider of choice
// In this case I'm using the Moralis Avalanche RPC
const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/b28b81859210c50b438cbf9b/avalanche/mainnet")
const contract = new ethers.Contract(contractAddress, interface, provider)

// Though in this example I'm reading the current total supply, 
// this method can be used to read any getter functions in a contract.
class ReadTotalSupply extends React.Component {
	constructor() {
		super()
		this.state = { data: [] }
	}

  	async componentDidMount() {
	    let supply = await contract.totalSupply()
	    // supply is returned as a BigNumber so we use formatUnits(...) to format into an integer
		supply = formatUnits(supply, 0)
	    this.setState({ data: supply });
  	}

	render() {
		let supply = this.state.data
		return (
		<>
			{supply ? <span style={{"color": "#E6A543"}}>{supply}</span> : <span style={{"display": "none"}}></span>}
		</>
		)
	}
}

export default ReadTotalSupply