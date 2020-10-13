import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import PictureProfile from '../processing/PictureProfile'

export default class ListUser extends React.Component {
   render() {
     const data = this.props.data
     return (
      <View style={styles.box}>
         <View style={{justifyContent: 'center', width: Lebar/6, alignItems: 'center'}}>
                <PictureProfile Size={Ukuran/10} UID={data.uid}/>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>

            <View style={{flexDirection: 'row', height: Panjang/17}}>

              <View style={{flex: 1,justifyContent: 'center'}}>
                <Text numberOfLines={1} style={styles.titleNama}>{data.nama}</Text>
              </View>

              <View style={styles.boxWaktu}>
                <Text style={styles.titleStatus}>{data.level}</Text>
              </View>

            </View>

            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.titleEmail}>{data.email}</Text>
            </View>

         </View>
      </View>
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: Panjang/10,
      backgroundColor: '#3C6AE1',
      elevation: 10,
      flexDirection: 'row',
      margin: Ukuran/80,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 40,
      borderBottomRightRadius: 40
   },
   titleEmail: {
     color: 'white',
     fontSize: Ukuran/60,
     marginLeft: 10,
     flex: 1,
     marginRight: 10
   },
   titleNama: {
     color: 'white',
     fontSize: Ukuran/50,
     fontWeight: 'bold',
     paddingLeft: 9,
   },
   titleStatus: {
     fontSize: Ukuran/80,
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
     paddingRight: Ukuran/80,
     paddingLeft: Ukuran/80
   },
  boxWaktu : {
    justifyContent: 'center',
    backgroundColor: '#B90303', 
    width: Lebar/4,
    height:Panjang/25,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 40,
  },
  titleStatus: {
    fontSize: Ukuran/50,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
 })