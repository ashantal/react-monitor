import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Txh from './tx_header'
import Txr from './tx_row'
import Txc from './tx_count'
import Term from './term'
let  counts = {}

class Ecm extends Component {
  constructor() {
    super()
    this.state = {
        endpoint: "http://localhost:3001",
        data : []
    }    
    const socket = socketIOClient(this.state.endpoint)
    socket.on('connect', (msg) => {
       counts = {}
       this.setState({data:[]})
       socket.emit('sync', 30)
    })    
    socket.on('event', (msg) => {
        let tx = JSON.parse(msg.transaction)
        msg.transaction = tx
        Object.keys(tx).forEach(
            (col)=>
            {
                var count = counts[col]===undefined?{}:counts[col];
                let cna = tx[col].split(' ')
                let name = ''
                if(cna.length>1){
                    cna.forEach((n)=>{
                        name = name + n.substring(0,1)
                    })
                }else{
                    name = cna[0]
                }
                count[name] = count[name]===undefined ? 1 : count[name]+1

                counts[col] = count                
            })      
        this.setState({data : this.state.data.concat(msg)})
    })      
  }
  render() {
    let data = this.state.data;
    let header = 
                <tr><th>connecting</th></tr>
    let rows = 
                <tr><td>waiting</td></tr>
    if(data.length>0){
        header =
         <Txh key={'txh_' + data[0].block} tx={data[0]}/>
        rows = data.slice(0).reverse().map((data)=>
                <Txr key={'txr_'+data.block} tx={data}/>
                );
    }
    let counters = Object.keys(counts).map((col,key)=>
                <Txc key={'txc_'+ key}  col={col} counts={counts[col]}></Txc>
                );
    return (
        <div>
            <div id='log'>
                {counters}
            </div>
            <div id='events'>
                <table>
                {header}
                {rows}
                </table>
            </div>
            <div id='term'>
                <Term  counts={counts} data={data}/>            
            </div>
       </div>
    )
  }
}

export default Ecm