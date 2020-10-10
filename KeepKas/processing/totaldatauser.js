import React from 'react';
import {Text} from 'react-native';
import firebase from '../database/firebase'

export default class TotalKasMasuk extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
  componentDidMount() {
    this.fetchData()
 }
  fetchData = async () => {
    this.state={uid : firebase.auth().currentUser.photoURL}
    const db = firebase.database().ref()
    var onValueChange =(snap)=>{
      const data = snap.val()
         if(data == null || data == undefined || data == NaN)
         {
            var i = 0
            this.setState({data : i})
            console.log('user : '+ i)
         }
         else
         {
         const count_array = Object.values(data)
         var i = count_array.length
         console.log('Jumlah Anggota : '+ i)
         this.setState({data : i})
         }
    }
    const twoRef = db.child('users/'+this.state.uid+'/')
    twoRef.on('value', onValueChange)
  }
  render(){
  return (
    <Text>{this.currencyFormat(Number(this.state.data))}</Text>
  )

  }
}
