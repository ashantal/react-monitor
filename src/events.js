import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'

export var Counts = {}

const socket = socketIOClient('http://localhost:3001')

export function Subscribe(cb){
socket.on('connect', (msg) => {
    Counts = {}
    socket.emit('sync', 30)
})    
socket.on('event', (msg) => {
    let tx = JSON.parse(msg.transaction)
    let tx_mapped = {}
    Object.keys(tx).forEach(
        (col)=>
        {
            let key = (mappings[col]!='undefined' ? mappings[col]:col)
            tx_mapped[key] = tx[col];
            var count = Counts[key]===undefined?{}:Counts[key];
            let cna = tx_mapped[key].split(' ')
            let name = ''
            if(cna.length>1){
                cna.forEach((n)=>{
                    name = name + n.substring(0,1)
                })
            }else{
                name = cna[0]
            }
            count[name] = count[name]===undefined ? 1 : count[name]+1
            Counts[key] = count                
        })
    msg.transaction = tx_mapped      
    cb(msg)
})      
}
export default Subscribe