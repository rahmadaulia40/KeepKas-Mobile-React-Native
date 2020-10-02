import React from 'react';
import { Text} from 'react-native';
import firebase from '../database/firebase'
import ButtonView from '../screen_components/ButtonView'

export default class TotalKasMasuk extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  currencyFormat(num) {
   return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  };
  componentDidMount() {
    this.fetchData()
 }
  fetchData = async () => {
    this.state={uid : firebase.auth().currentUser.uid}
    const db = firebase.database().ref()
    const twoRef = db.child('total_kas_keluar/'+this.state.uid +'/')
    twoRef.on('value', snap => {
         const data = snap.val()

         if(data == null || data == undefined || data == NaN)
         {
            var i = 0
            this.setState({data : i})
            console.log('Kas Keluar : '+ i)
         }
         else
         {
         const count_array = Object.values(data)
         for(var i=0; i<count_array.length;i++) 
         count_array[i] = +count_array[i];
         var total = count_array.reduce(function(a, b){return a + b;});
         this.setState({data : total})
         console.log('Kas Keluar : '+data)
         }
      })
  }
  render(){
  return (
  <Text>{this.currencyFormat(Number(this.state.data))}</Text>
  )

  }
}
