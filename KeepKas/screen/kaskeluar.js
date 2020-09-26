import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class barang extends React.Component {
   render(){

   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>

         <View style={styles.body}>

         </View>
         <View style={styles.footer}>
            <TouchableOpacity style={styles.Button}>
               <Text style={styles.icon}>+</Text>
            </TouchableOpacity>
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({

   body:{
      flex: 1,
      backgroundColor: 'white'
   },
   footer: {
      alignItems: 'flex-end',
      backgroundColor: 'white',
   },
   Button: {
      marginBottom: 80,
      marginRight: 20,
      elevation: 10,
      backgroundColor: '#B90303',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      height: 80,
      width: 80
   },
   icon: {
      fontSize: 50,
      color: 'white',
      margin: 20
   }
})