import React, { Component } from 'react'
class Txc extends Component {
  render() {
    let col = this.props.col;
    let counts = this.props.counts
    let divs = Object.keys(counts).map((val)=>
        <div className='count' key={'count_'+col+val}>
            {counts[val]} {val}
        </div>
    );
    return (
           <div>
               {divs}
           </div>
    )
  }
}

export default Txc