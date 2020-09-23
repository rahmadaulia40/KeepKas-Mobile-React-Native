import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

export default class Home extends React.Component {
    signOut = () => {
      firebase.auth().signOut().then(() => {this.props.navigation.navigate('Login')})
      .catch(error => this.setState({ errorMessage: error.message }))
    }
   render(){
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         uid: firebase.auth().currentUser.uid,
         photoURL: firebase.auth().currentUser.photoURL
       }
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} onPress={() => {this.props.navigation.navigate('Profil')}}>
                  <Text style={styles.text}>Hai, {this.state.displayName}</Text>
                  <Icon name='account-circle' style={{color: 'white', fontSize: 34, paddingRight: 24}} />
               </TouchableOpacity>
         </View>

         <View style={styles.body}>
            <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', paddingRight: 24}}>Rp.10.000.000</Text>
                  </View>
               </View>
               <ScrollView>

                  <TouchableOpacity style={styles.box2} onPress={() => {this.props.navigation.navigate('Kasmasuk', {photoURL: this.state.photoURL})}}>
                     <View style={styles.left}>
                        <Text style={styles.titleLeft}>Kas</Text>
                        <Text style={styles.titleLeft}>Masuk</Text>
                     </View>
                     <View style={styles.right1}>
                        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Rp.</Text>
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

                  <TouchableOpacity style={styles.box5} onPress={() => {this.props.navigation.navigate('RincianKas', {uid : this.state.uid})}}>
                     <View style={styles.left}>
                        <Text style={styles.titleLeft}>Rincian</Text>
                        <Text style={styles.titleLeft}>Kas Saya</Text>
                     </View>
                     <View style={styles.right1}>
                        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Rp.12.000.000</Text>
                     </View>
                  </TouchableOpacity>
                  
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

                  <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('BayarKas',{uid : this.state.uid, displayName: this.state.displayName, photoURL: this.state.photoURL})}}>
                     <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Bayar Kas</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button1} onPress={() => this.signOut()}>
                     <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Keluar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button2} onPress={() => {this.props.navigation.navigate('Tentang')}}>
                     <Text style={{color: '#7a7676', fontWeight: 'bold', fontSize: 18}}>Tentang Aplikasi</Text>
                  </TouchableOpacity>

                  <View style={styles.keepKas}>
                     <Text style={styles.titleHeader}>@Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
                  </View>
               </ScrollView>
            
         
         </View>

         
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
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
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
      height: 50,
      backgroundColor: '#D49900',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
   box5:{
      height: 120,
      backgroundColor: '#269cae',
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
   titleLeft1: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'

   },
   right1: {
      height: 120,
      justifyContent: 'center',
      paddingRight: 20

   },
   button:{
      height: 60,
      borderRadius: 10,
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20
   },
   button1:{
      height: 60,
      margin: 20,
      borderRadius: 10,
      backgroundColor: '#B90303',
      alignItems: 'center',
      justifyContent: 'center'
   },
   button2:{
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
   },
   keepKas:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3C6AE1',
      height: 60
   },
})