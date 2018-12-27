import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
let counts = {};
let data = {};
class Term extends Component {
  render() {
      counts = this.props.counts;
      data = this.props.data;
    return (
        <Terminal
          startState = 'maximised'
          hideTopBar = 'true'
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commandPassThrough={(cmd, print) => {
            let name = '';
            Object.keys(counts).forEach((col)=>{
                let count = counts[col];
                let found = col==cmd;
                Object.keys(count).forEach((k)=>{
                    if(k==cmd || found){
                        name = col;
                        print(`${count[k]} events for ${k}`);
                    }
                });                
            });
            data.forEach((o)=>{
                if(o.transaction[name]==cmd){
                    let res = o.block + ' ';
                    Object.keys(o.transaction).forEach((c)=>{
                        res += ' '+ o.transaction[c];
                    });
                    print(res);
                }
            });

          }}
          commands={{
            list: {
              method: (args, print, runCommand) => {
                let select = args._;
                data.forEach((i)=>{
                    let res = i.block + ' ';
                    if(select.length==0){
                        Object.keys(i.transaction).forEach((c)=>{
                            res += ' '+ i.transaction[c];
                        });
                    }else{
                        select.forEach((c)=>{
                            res += ' '+ i.transaction[c];
                        });
                    }
                    print(res);
                });
              }
            },
            counts: {
                method: (args, print, runCommand) => {
                    Object.keys(counts).forEach((col)=>{
                        let count = counts[col];
                        Object.keys(count).forEach((k)=>{
                                print(`${count[k]} events for ${k}`);
                        });                
                    });
                }
              },
          }}
          msg='event cli...'
        />
    );
  }
}
export default Term