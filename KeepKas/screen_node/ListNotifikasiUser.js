import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'

export default class ListNotifikasiUser extends React.Component {

   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
   render() {

     const data = this.props.data
     return (
        <TouchableOpacity style={styles.box} onPress={() => this.props.Nilai(data)}>
        <View style={{flex: 1,justifyContent: 'center', paddingTop: 5}}>
          <Text numberOfLines={1} style={styles.titleHarga}>{this.currencyFormat(Number(data.nominal))}</Text>
          <View style={{flexDirection: 'row'}}>
               <Text style={styles.titleNama}>{data.nama}</Text>
               <Text style={styles.titleWaktu}>{data.date}</Text>
            </View>
          </View>
        <View style={{
          justifyContent: 'center',
          backgroundColor: '#B90303', 
          width: Lebar/6,
          borderRadius: Ukuran/50
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
      height: Panjang/10,
      backgroundColor: '#3C6AE1',
      paddingLeft: Ukuran/40,
      flexDirection: 'row-reverse',
      margin: 5,
      borderTopLeftRadius: 50,
      borderTopRightRadius: Ukuran/30,
      borderBottomRightRadius: Ukuran/30,
      borderBottomLeftRadius: 50

   },
   titleNama: {
     color: 'white',
     fontSize: Ukuran/55,
     margin: 8,
     flex: 1
   },
   titleHarga: {
     color: 'white',
     fontSize: Ukuran/33,
     fontWeight: 'bold',
     paddingLeft: 9,
   },
   titleStatus: {
     fontSize: Ukuran/75,
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
     paddingRight: 5,
     paddingLeft: 5
   },
   titleWaktu: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Ukuran/55,
    margin: 8
  }
 })