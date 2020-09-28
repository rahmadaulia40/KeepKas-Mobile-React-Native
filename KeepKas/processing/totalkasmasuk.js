import * as React from 'react'
import firebase from '../database/firebase'

var db = firebase.database().ref()
var reff = db.child('total_kas_masuk')

export default class TotalKasMasuk extends React.Component{
   constructor(){
      super()
      this.state = {
         totalkasmasuk : ''
      }
   }
   render(){
         reff.on('child_added', snap => 
         {
            const datai = snap.val()

            if (datai == undefined)
               {
                  var total = '0'
                  return total
               }
            else
               {
                  var count_array = Object.values(datai)
                  for(var i=0; i<count_array.length;i++)
                  count_array[i] = +count_array[i];
                  var total = count_array.reduce((a, b)=>{return a + b;})
                  return total
               }
         })
         
      return reff
      
   }

}
