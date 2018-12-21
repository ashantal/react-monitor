import React, { Component } from 'react'
class Txr extends Component {
  render() {
    let data = this.props.tx
    let b = data.block;
    let tx = data.transaction;
    let td = Object.keys(tx).map((val)=>
        <td key={'tx_'+b+val}>{tx[val]}</td>
    );
    return (
           <tr>
                <td>{b}</td>
               {td}
           </tr>
    )
  }
}

export default Txr