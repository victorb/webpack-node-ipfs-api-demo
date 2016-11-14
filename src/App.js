import React, { Component } from 'react'

import ipfsAPI from 'ipfs-api'

var ipfs = ipfsAPI('localhost', '5001')
const stringToUse = 'Hello World From Webpack'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      version: null,
      protocol_version: null,
      added_file_hash: null,
      added_file_contents: null
    }
  }
  componentDidMount () {
    ipfs.id((err, res) => {
      if (err) throw err
      this.setState({
        id: res.id,
        version: res.agentVersion,
        protocol_version: res.protocolVersion
      })
    })
    ipfs.add([new Buffer(stringToUse)], (err, res) => {
      if (err) throw err
      const hash = res[0].hash
      this.setState({added_file_hash: hash})
      ipfs.cat(hash, (err, res) => {
        if (err) throw err
        let data = ''
        res.on('data', (d) => {
          data = data + d
        })
        res.on('end', () => {
          this.setState({added_file_contents: data})
        })
      })
      ipfs.dht.findprovs(hash, (err, res) => {
        if (err) throw err
        console.log('found provs!')
        console.log(err, res)
      })
    })
  }
  render () {
    return <div style={{textAlign: 'center'}}>
      <h1>Everything is working!</h1>
      <p>Your ID is <strong>{this.state.id}</strong></p>
      <p>Your IPFS version is <strong>{this.state.version}</strong></p>
      <p>Your IPFS protocol version is <strong>{this.state.protocol_version}</strong></p>
      <div>
        <div>
          Added a file! <br />
          {this.state.added_file_hash}
        </div>
        <div>
          Contents of this file: <br />
          {this.state.added_file_contents}
        </div>
      </div>
    </div>
  }
}
