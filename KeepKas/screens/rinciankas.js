import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

export default class barang extends React.Component {
   constructor() {
      super()
      this.state = {
          data : ''
      }
    }
   render(){
      const db = firebase.database().ref()
      const twoRef = db.child('kas_masuk').orderByChild('status').equalTo('NonKonfirmasi')
      twoRef.on('child_added', snap => {
         const i = snap.val()
         this.state.data = i.nama
         console.log(i.nama)
      })
      twoRef.off()
      
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
            <Text>Rincian Kas</Text>
            <Text>{this.state.data}</Text>
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      height: 90,
      flexDirection: 'row',
      alignItems: 'center',
   },
   titleHeader:{
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      paddingLeft: 20
   }
})