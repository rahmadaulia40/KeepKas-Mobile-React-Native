import React from 'react'
import {View, StyleSheet, Alert, TouchableOpacity,Text } from 'react-native'
import firebase from '../database/firebase'

export default class Details extends React.Component {
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    input = () => {
      const { data } = this.props.route.params
      firebase.database().ref('kas_masuk/'+ data.id + '/').update(
         {
            id_kasmasuk : data.id_kasmasuk,
            id_user : data.id_user,
            nama : data.nama,
            jumlah : data.jumlah,
            status : 'Sukses',
            waktu : data.waktu
              
         }).catch((error) => {
            console.log(error)
           })
    }
   render() {
      const { data } = this.props.route.params
      const nilai = Object.values(data)
         console.log(data)
      
      return (
         <View style={{flex: 1}}>
            <TouchableOpacity style={styles.button} onPress={() => this.input()}>
               <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Bayar</Text>
            </TouchableOpacity>
            
         </View>
      )
   }
}

const styles = StyleSheet.create({
   text:{
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
      flex: 1,
      marginLeft: 20,
      marginRight: 20
   },
   box1:{
      height: 250,
      backgroundColor: '#00DCEA',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      borderColor: '#3C6AE1',
      borderWidth: 2,
      borderRadius: 5,
      padding: 20
   },
   title1 :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold'

   },
   title2 :{
      margin: 20,
      fontSize: 22,
      fontWeight: 'bold',
      alignItems: 'center',

   },
   titleInfo: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold'
   },
   boxInput: {
      height: 70,
      backgroundColor: '#DAEAF9',
      margin: 20
   },
   button:{
      height: 60,
      marginTop: 20,
      marginLeft: 100,
      marginRight: 100,
      borderRadius: 10,
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonLeft:{
      color: 'white',
      fontSize: 30,
      paddingLeft: 20
   }
})