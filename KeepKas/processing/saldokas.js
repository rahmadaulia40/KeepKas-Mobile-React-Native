import React from 'react';
import { Text} from 'react-native';
import firebase from '../database/firebase'

export default class TotalKasMasuk extends React.Component {
  constructor() {
    super()
    this.state = {
      datamasuk: '',
      datakeluar: ''
    }
  }
  currencyFormat(num) {
   return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  };
  componentDidMount() {
    this.fetchDataMasuk(),
    this.fetchDataKeluar()
 }
  fetchDataMasuk = async () => {
    this.state={uid : firebase.auth().currentUser.photoURL}
    const db = firebase.database().ref()
    var onValueChange =(snap)=>{
      const data = snap.val()

         if(data == null || data == undefined || data == NaN)
         {
            var i = 0
            this.setState({data : i})
         }
         else
         {
         const count_array = Object.values(data)
         for(var i=0; i<count_array.length;i++) 
         count_array[i] = +count_array[i];
         var total = count_array.reduce(function(a, b){return a + b;});
         this.setState({datamasuk : total})
         }
    }
    const twoRef = db.child('total_kas_masuk/'+this.state.uid +'/')
    twoRef.on('value', onValueChange)
  }
  fetchDataKeluar = async () => {
   this.state={uid : firebase.auth().currentUser.photoURL}
   const db = firebase.database().ref()
   var onValueChange =(snap)=>{
    const data = snap.val()
    if(data == null || data == undefined || data == NaN)
     {
        var i = 0
        this.setState({data : i})
     }
     else
     {
     const count_array = Object.values(data)
     for(var i=0; i<count_array.length;i++) 
     count_array[i] = +count_array[i];
     var total = count_array.reduce(function(a, b){return a + b;});
     this.setState({datakeluar : total})
     }
   }
   const twoRef = db.child('total_kas_keluar/'+this.state.uid +'/')
   twoRef.on('value', onValueChange)
   console.log('Saldo Kas : '+this.state.datamasuk - this.state.datakeluar)
 }
  render(){
    var Total = this.state.datamasuk - this.state.datakeluar
  return (
  <Text>{this.currencyFormat(Number(Total))}</Text>
  )

  }
}