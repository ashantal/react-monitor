import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
let counts = {};
class Term extends Component {
  render() {
      counts = this.props.counts;
    return (
        <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commandPassThrough={(cmd, print) => {
            Object.keys(counts).forEach((k)=>{
                let count = counts[k];
                let found = k==cmd;
                Object.keys(count).forEach((k)=>{
                    if(k==cmd || found){
                        print(`${count[k]} events for ${k}`);
                    }
                });
            });
          }}
          commands={{
            count: {
              method: (args, print, runCommand) => {
                let col = args._[0];
                let count = counts[col];
                if(count!==undefined){
                    Object.keys(count).forEach((k)=>{
                        print(`${count[k]} events for ${k}`);
                    });
                }
              }
            },
          }}          
          descriptions={{
            'open-google': 'opens google.com',
            showmsg: 'shows a message',
            alert: 'alert', popup: 'alert'
          }}
          msg='event cli...'
        />
    );
  }
}
export default Term