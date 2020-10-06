import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ListKasKeluarAdmin extends React.Component {
   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
 
   render() {
     const data = this.props.data
     return (
       <View>
        <TouchableOpacity style={styles.box} onPress={() => this.props.Nilai(data)}>
        <View style={{flex: 1,justifyContent: 'center'}}>
          <Text style={styles.titleHarga} numberOfLines={1}>{this.currencyFormat(Number(data.nominal))}</Text>
          <View style={{flexDirection: 'row'}}>
               <Text style={styles.titleNama} numberOfLines={1}>{data.keterangan}</Text>
            </View>
          </View>
        <View style={styles.boxWaktu}>
            <Text style={styles.titleStatus}>{data.waktu}</Text>
        </View>
      </TouchableOpacity>
      </View>

      
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 100,
      backgroundColor: '#B90303',
      paddingLeft: 20,
      flexDirection: 'row',
      margin: 5,
      borderBottomRightRadius: 50,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50

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
  },
  boxWaktu : {
    justifyContent: 'center',
    backgroundColor: '#3C6AE1', 
    width: 150,
    height:30,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    }
 })