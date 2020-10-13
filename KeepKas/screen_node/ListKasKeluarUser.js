import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'

export default class ListKasKeluarAdmin extends React.Component {
   currencyFormat(num) {
     return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   };
 
   render() {
     const data = this.props.data
     return (
       <View style={styles.box}>

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
      </View>

      
      
     )
   }
 };

 const styles = StyleSheet.create({
  box:{
     height: Panjang/10,
     backgroundColor: '#B90303',
     paddingLeft: Ukuran/40,
     flexDirection: 'row',
     margin: 5,
     borderRadius: Ukuran/27

  },
  titleNama: {
    color: 'white',
    fontSize: Ukuran/50,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  titleHarga: {
    color: 'white',
    fontSize: Ukuran/35,
    fontWeight: 'bold',
    paddingLeft: 9,
    paddingTop: Ukuran/70
  },
  titleStatus: {
    fontSize: Ukuran/60,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
 boxWaktu : {
   justifyContent: 'center',
   backgroundColor: '#3C6AE1', 
   width: Lebar/3.5,
   height: Panjang/27,
   borderTopRightRadius: Ukuran/20,
   borderBottomLeftRadius: Ukuran/20,
   }
})