import React from 'react'
import {View, StyleSheet, Alert, TouchableOpacity,Text } from 'react-native'
import firebase from '../database/firebase'

export default class Details extends React.Component {

    input = () => {
      alert('Kas Masuk', 'Data berhasil diubah')
      const { data } = this.props.route.params
      firebase.database().ref('kas_masuk/'+ data.id + '/').update(
         {
            status : 'Sukses', 
         })
         var key = data.id_user + data.waktu
         var db = firebase.database().ref('total_kas_masuk/'+data.id_kasmasuk+ '/')
         db.update({
            [key] : data.jumlah,
         })
      .catch((error) => {
            console.log(error)
           })
    }
   render() {      
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