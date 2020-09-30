import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'

export default class barang extends React.Component {
   render(){
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         uid: firebase.auth().currentUser.uid,
         photoURL: firebase.auth().currentUser.photoURL
       }
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
            <Text>Data Anggota</Text>
         </View>
         <View>
         <ButtonInput
                     onPress={() => {this.props.navigation.navigate('TambahUser',{uid : this.state.uid, displayName: this.state.displayName})}}
                     titleButton = 'Tambah Anggota'
                     Txt = 'Tambah Anggota'
                     Color = '#3C6AE1'
                  />
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