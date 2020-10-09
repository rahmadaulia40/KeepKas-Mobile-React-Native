import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ListKasMasukAdmin extends React.Component {
  constructor(){
    super()
    this.state = {
      warna : '',
      action : {}
    }
  }

   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
   render() {
     const data = this.props.data
     if (data.status === 'Di Proses')
     {
       this.state.warna='#B90303'
     }
     else
     {
       this.state.warna='#44BAFD'
     }
     return (
        <TouchableOpacity style={styles.box} onPress={() => this.state.action = this.props.Nilai(data)}>
        <View style={{flex: 1,justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.titleHarga}>{this.currencyFormat(Number(data.jumlah))}</Text>
          <View style={{flexDirection: 'row'}}>
               <Text style={styles.titleNama}>{data.nama}</Text>
               <Text style={styles.titleWaktu}>{data.waktu}</Text>
            </View>
          </View>
        <View style={{
          justifyContent: 'center',
          backgroundColor: this.state.warna, 
          width: 80,
          borderRadius: 80
          }}
        >
          <Text style={styles.titleStatus}>{data.status}</Text>
        </View>
      </TouchableOpacity>
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 80,
      backgroundColor: '#3C6AE1',
      //elevation: 5,
      paddingLeft: 20,
      flexDirection: 'row-reverse',
      margin: 5,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 50

   },
   titleNama: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 14,
     margin: 8,
     flex: 1
   },
   titleHarga: {
     color: 'white',
     fontSize: 24,
     fontWeight: 'bold',
     paddingLeft: 9,
   },
   titleStatus: {
     fontSize: 14,
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
     paddingRight: 5,
     paddingLeft: 5
   },
   titleWaktu: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    margin: 8
  }
 })