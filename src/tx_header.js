import React, { Component } from 'react'
class Txh extends Component {
  render() {
    let data = this.props.tx
    let b = data.block;
    let tx = data.transaction;
    let th = Object.keys(tx).map((val)=>{
        return(
        <th key={b + val}>{val}</th>
        );
    });
    return (
       <tr>
           <th>Block</th>{th}
       </tr>
    )
  }
}

export default Txh