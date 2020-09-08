import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Tentang extends React.Component {
   render(){

   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <Text>Tentang Aplikasi</Text>
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3C6AE1',
      justifyContent: 'space-between'
   },
   titleHeader:{
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      paddingLeft: 20
   },
   rightH:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
   },
   text:{
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
      margin: 2,
      flex: 1
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