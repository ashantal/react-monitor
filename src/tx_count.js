import React, { Component } from 'react'
class Txc extends Component {
  render() {
    let col = this.props.col;
    let counts = this.props.counts
    let divs = Object.keys(counts).map((val)=>
        <div className='circle' key={'count_'+col+val}>
            <span>{counts[val]}</span><br/>
            {val}  
        </div>
    );
    return (
           <td>
               {divs}
           </td>
    )
  }
}

export default Txc