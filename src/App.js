import React, { Component } from 'react';

import ipfsAPI from 'ipfs-api'

var ipfs = ipfsAPI('localhost', '5001')

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: null,
			version: null,
			protocol_version: null,
			added_file_hash: null,
			added_file_contents: null
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
		ipfs.add([new Buffer("Hello World")], (err, res) => {
			this.setState({added_file_hash: res.Hash})
			ipfs.cat(res.Hash, (err, res) => {
				this.setState({added_file_contents: res})
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
				<div>
					<div>
						Added a file!<br/>
						{this.state.added_file_hash}
					</div>
					<div>
						Contents of this file:<br/>
						{this.state.added_file_contents}
					</div>
				</div>
			</div>
    );
  }
}
