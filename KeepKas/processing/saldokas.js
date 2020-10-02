import React from 'react';
import { Text} from 'react-native';
import firebase from '../database/firebase'
import ButtonView from '../screen_components/ButtonView'

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
    this.state={uid : firebase.auth().currentUser.uid}
    const db = firebase.database().ref()
    const twoRef = db.child('total_kas_masuk/'+this.state.uid +'/')
    twoRef.on('value', snap => {
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
      })
  }
  fetchDataKeluar = async () => {
   this.state={uid : firebase.auth().currentUser.uid}
   const db = firebase.database().ref()
   const twoRef = db.child('total_kas_keluar/'+this.state.uid +'/')
   twoRef.on('value', snap => {
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
     })
 }
  render(){
  return (
  <Text>{this.currencyFormat(Number(this.state.datamasuk - this.state.datakeluar))}</Text>
  )

  }
}