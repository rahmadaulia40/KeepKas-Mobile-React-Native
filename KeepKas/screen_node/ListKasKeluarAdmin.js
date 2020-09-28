import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ListKasKeluarAdmin extends React.Component {
  constructor(){
    super()
    this.state = {
      action : {}
    }
  }

   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
 
   render() {
     const data = this.props.data
     const Aksi =()=>{
       if (data.status === 'Di Proses')
       {
        this.state.action = {}//this.props.Nilai(data)
       }
       else
       {
         this.state.action = {}
       }
     }
     return (
        <TouchableOpacity style={styles.box} onPress={() => Aksi()}>
        <View style={{flex: 1,justifyContent: 'center'}}>
          <Text style={styles.titleHarga}>{this.currencyFormat(Number(data.nominal))}</Text>
          <View style={{flexDirection: 'row'}}>
               <Text style={styles.titleNama}>{data.keterangan}</Text>
               <Text style={styles.titleWaktu}>{data.nama}</Text>
            </View>
          </View>
        <View style={{justifyContent: 'center',backgroundColor: '#3C6AE1', width: 140}}>
            <Text style={styles.titleStatus}>{data.waktu}</Text>
        </View>
      </TouchableOpacity>
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 100,
      backgroundColor: '#B90303',
      elevation: 5,
      paddingLeft: 20,
      flexDirection: 'row',
      margin: 10
   },
   titleNama: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 18,
     margin: 8,
     flex: 1
   },
   titleHarga: {
     color: 'white',
     fontSize: 28,
     fontWeight: 'bold',
     paddingLeft: 9,
   },
   titleStatus: {
     fontSize: 20,
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
     paddingRight: 20,
     paddingLeft: 20
   },
   titleWaktu: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 8
  }
 })