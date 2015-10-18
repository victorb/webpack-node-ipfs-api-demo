import React, { Component } from 'react';

import ipfsAPI from 'ipfs-api'

var ipfs = ipfsAPI('localhost', '5001')

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: null,
			version: null,
			protocol_version: null
		}
	}
	componentDidMount() {
		ipfs.id((err, res) => {
			if(err) {
				console.error(err)
				return
			}
			this.setState({
				id: res.ID,
				version: res.AgentVersion,
				protocol_version: res.ProtocolVersion
			})
		})
	}
  render() {
    return (
			<div style={{textAlign: 'center'}}>
				<h1>Everything is working!</h1>
				<p>Your ID is <strong>{this.state.id}</strong></p>
				<p>Your IPFS version is <strong>{this.state.version}</strong></p>
				<p>Your IPFS protocol version is <strong>{this.state.protocol_version}</strong></p>
			</div>
    );
  }
}
