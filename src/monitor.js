import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Txh from './tx_header'
import Txr from './tx_row'
import Txc from './tx_count'
class Ecm extends Component {
  constructor() {
    super()
    this.state = {
        endpoint: "http://localhost:3001",
        data : [],
        counts : {}
    }    
    const socket = socketIOClient(this.state.endpoint)
    socket.on('connect', (msg) => {
      this.setState({data:[], counts:{}})
      socket.emit('sync', 3)
    })    
    socket.on('event', (msg) => {
        let tx = JSON.parse(msg.transaction)
        msg.transaction = tx
        Object.keys(tx).forEach(
            (col)=>
            {
                var count = this.state.counts[col]===undefined?{}:this.state.counts[col];
                let v = tx[col].split(' ')[0];
                count[v] = count[v]===undefined ? 1 : count[v]+1

                this.state.counts[col] = count                
            })      
        this.setState({data : this.state.data.concat(msg)})
    })      
  }
  render() {
    let header = 
                <tr><th>connecting</th></tr>
    let rows = 
                <tr><td>waiting</td></tr>
    if(this.state.data.length>0){
        header =
         <Txh key={'txh_' + this.state.data[0].block} tx={this.state.data[0]}/>
        rows = this.state.data.map((data)=>
                <Txr key={'txr_'+data.block} tx={data}/>
                );
    }
    let counts = Object.keys(this.state.counts).map((col,key)=>
                <Txc key={'txc_'+ key}  col={col} counts={this.state.counts[col]}></Txc>
                );
    return (
        <div key='monitor'>
            <div id='count_holder'>
                {counts}
            </div>
            <div id='log'>
                <table>
                    <tbody>
                        {header}
                        {rows}
                    </tbody>
                </table>
            </div>
       </div>
    )
  }
}

export default Ecm