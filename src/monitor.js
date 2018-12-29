import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Txh from './tx_header'
import Txr from './tx_row'
import Txc from './tx_count'
import Term from './term'
import Subscribe, {Counts} from './events'

class Ecm extends Component {
  constructor() {
    super()
    this.state = {
        data : []
    }    
    Subscribe((msg) => {
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
    let counters = Object.keys(Counts).map((col,key)=>
                <Txc key={'txc_'+ key}  col={col} counts={Counts[col]}></Txc>
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
                <Term  counts={Counts} data={data}/>            
            </div>
       </div>
    )
  }
}

export default Ecm