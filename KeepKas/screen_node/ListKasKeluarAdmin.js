import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class ListKasKeluarAdmin extends React.Component {
   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
 
   render() {
     const data = this.props.data
     return (
       <TouchableOpacity style={styles.box} onPress={() => this.props.Nilai(data)}>

          <View style={{flexDirection: 'column', flex: 1}}>

            <View style={{flexDirection: 'row'}}>

                  <View style={{flex: 1,justifyContent: 'center'}}>
                    <Text style={styles.titleHarga} numberOfLines={1}>{this.currencyFormat(Number(data.nominal))}</Text>
                  </View>

                  <View style={styles.boxWaktu}>
                      <Text style={styles.titleStatus}>{data.date}</Text>
                  </View>

            </View>

                <View style={{flexDirection: 'row'}}>
                      <Text style={styles.titleNama} numberOfLines={1}>{data.keterangan}</Text>
                </View>

          </View>
      </TouchableOpacity>

      
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 80,
      backgroundColor: '#B90303',
      paddingLeft: 20,
      flexDirection: 'row',
      margin: 5,
      borderTopRightRadius: 35,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      borderTopLeftRadius: 30

   },
   titleNama: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 14,
     flex: 1,
     paddingLeft: 10,
     paddingRight: 10
   },
   titleHarga: {
     color: 'white',
     fontSize: 24,
     fontWeight: 'bold',
     paddingLeft: 9,
     paddingTop: 10
   },
   titleStatus: {
     fontSize: 14,
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
    width: 120,
    height:30,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    }
 })