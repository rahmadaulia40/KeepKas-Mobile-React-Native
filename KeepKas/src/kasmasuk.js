import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class barang extends React.Component {
   render(){

   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
            <Text>Kas Masuk</Text>
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