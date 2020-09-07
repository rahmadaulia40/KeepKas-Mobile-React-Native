import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default class barang extends React.Component {
   render(){
      const  userName = this.props.userName
console.log(userName)
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <View style={styles.rightH}>
                  <Text style={styles.text}>Hai,</Text>
                  <Icon name='account-circle' style={{color: 'white', fontSize: 24}} />
                  <TouchableOpacity onPress ={ ( ) => this.props.navigation.openDrawer()}>
                     <Icon name='dots-vertical' style={{color: 'white', fontSize: 24, padding: 10}}/>
                  </TouchableOpacity>
               </View>
         </View>

         <ScrollView style={styles.body}>

            <TouchableOpacity style={styles.box1} onPress={() => {this.props.navigation.navigate('Jumlahanggota')}}>
               <View style={styles.left}>
                  <Text style={styles.titleLeft}>Data</Text>
                  <Text style={styles.titleLeft}>Anggota</Text>
               </View>
               <View style={styles.right}>
                  <Text style={{color: 'white', fontSize: 50, fontWeight: 'bold'}}>8</Text>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Anggota</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box2} onPress={() => {this.props.navigation.navigate('Kasmasuk')}}>
               <View style={styles.left}>
                  <Text style={styles.titleLeft}>Kas</Text>
                  <Text style={styles.titleLeft}>Masuk</Text>
               </View>
               <View style={styles.right1}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Rp.22.000.000</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box3} onPress={() => {this.props.navigation.navigate('Kaskeluar')}}>
               <View style={styles.left}>
                  <Text style={styles.titleLeft}>Kas</Text>
                  <Text style={styles.titleLeft}>Keluar</Text>
               </View>
               <View style={styles.right1}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Rp.12.000.000</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box4}>
               <View style={styles.left}>
                  <Text style={styles.titleLeft}>Saldo</Text>
                  <Text style={styles.titleLeft}>Kas</Text>
               </View>
               <View style={styles.right1}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Rp.10.000.000</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('BayarKas')}}>
               <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Bayar Kas</Text>
            </TouchableOpacity>

         </ScrollView>

         
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
      height: 120,
      backgroundColor: '#44BAFD',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
      elevation: 10
   },
   box2:{
      height: 120,
      backgroundColor: '#088506',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
      elevation: 10
   },
   box3:{
      height: 120,
      backgroundColor: '#B90303',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
      elevation: 10
   },
   box4:{
      height: 120,
      backgroundColor: '#D49900',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
      elevation: 10
   },
   left: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
   right1: {
      height: 120,
      justifyContent: 'center',
      paddingRight: 20

   },
   button:{
      height: 60,
      margin: 20,
      borderRadius: 10,
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      justifyContent: 'center'
   },
})