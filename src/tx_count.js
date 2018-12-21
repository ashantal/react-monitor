import React, { Component } from 'react'
class Txc extends Component {
  render() {
    let col = this.props.col;
    let counts = this.props.counts
    let divs = Object.keys(counts).map((val)=>
        <div className='circle' key={'count_'+col+val}>
            <span>{counts[val]}</span><br/>
            {val}<br/>   
            {col}  
        </div>
    );
    return (
           <div key={'count_' + col}>
               {divs}
           </div>
    )
  }
}

export default Txc