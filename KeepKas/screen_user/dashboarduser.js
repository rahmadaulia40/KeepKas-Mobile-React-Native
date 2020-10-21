import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import firebase from '../database/firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FAB from 'react-native-fab'

import ButtonView from '../screen_components/ButtonView'
import ButtonView_2 from '../screen_components/ButtonView_2'
import ButtonInput from '../screen_components/ButtonInput'
import SaldoKas from '../processing/saldokas'
import KasMasuk from '../processing/totalkasmasuk'
import KasKeluar from '../processing/totalkaskeluar'
import User from '../processing/totaldatauser'
import PictureProfile from '../processing/PictureProfile'

export default class Home extends React.Component {
   constructor() {
      super()
      this.state = {
          isLoading : false,
          notifikasi : true,
          displayName: firebase.auth().currentUser.displayName,
          uid: firebase.auth().currentUser.uid,
          photoURL: firebase.auth().currentUser.photoURL,
          email : firebase.auth().currentUser.email
      }
    }

   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    ButtonAlertKonfirmasi = () =>
    Alert.alert(
      "KeepKas",
      "Apakah anda yakin ingin keluar ?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Ya", onPress: () => {this.signOut()}}
      ],
      { cancelable: false }
    )

    signOut = () => {
      firebase.auth().signOut().then(() => {this.props.navigation.navigate('Login')})
      .catch(error => this.setState({ errorMessage: error.message }))
    }

    componentDidMount(){
      this.fetchdata()
   }

   fetchdata = async()=>{
     var ref = firebase.database().ref('proses/'+this.state.photoURL+'/').orderByChild('id_user').equalTo(this.state.uid)
     ref.on('value',(snap)=>{
        var data = snap.val()
        if(data === null){
           this.setState({notifikasi : false})
        }
        else{
           this.setState({notifikasi : true})
        }
     })
   }


   render(){
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} onPress={() => {this.props.navigation.navigate('Profil',{uid : this.state.uid, displayName : this.state.displayName, email : this.state.email})}}>
                  <Text numberOfLines={1} style={styles.text}>Hai, {this.state.displayName}</Text>
                  <PictureProfile Size={Ukuran/15} MarginRight={Ukuran/40} UID={this.state.uid}/>
               </TouchableOpacity>
         </View>
         <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: Ukuran/45, fontWeight: 'bold', paddingRight: 24}}>{<SaldoKas/>}</Text>
                  </View>
               </View>

         <View style={styles.body}>
               <ScrollView style={{paddingLeft: Ukuran/70,paddingRight: Ukuran/70}}>
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasMasukUser', {photoURL: this.state.photoURL})}}
                     Txt1 = 'Kas' Txt2 = 'Masuk' Txt3 = {<KasMasuk/>} Color= '#088506'
                  />
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasKeluarUser', {photoURL: this.state.photoURL})}}
                     Txt1 = 'Kas' Txt2 = 'Keluar' Txt3 = {<KasKeluar/>} Color= '#B90303'
                  />
                  <ButtonView_2
                     onPress={() => {this.props.navigation.navigate('Jumlahanggotauser', {uid: this.state.photoURL})}}
                     Txt1 = 'Data' Txt2 = 'Anggota' Txt3 = {<User/>} Txt4 = 'Anggota' Color= '#44BAFD'
                  />

                  <ButtonInput
                     onPress={() => this.ButtonAlertKonfirmasi()}
                     titleButton = 'Keluar'
                     Txt = 'Keluar'
                     Color = '#B90303'
                     MarginTop = {Ukuran/40}
                  />
                  <TouchableOpacity style={styles.button2} onPress={() => {
                  Alert.alert('Tentang Aplikasi','KeepKas ini berguna untuk melakukan penyimpanan data kas, terutama untuk para siswa/mahasiswa yang memiliki kegiatan iuran kas kelas. Aplikasi ini masih dalam tahap prototype')
                  }}>
                     <Text style={{color: '#7a7676', fontWeight: 'bold', fontSize: Ukuran/45}}>Tentang Aplikasi</Text>
                  </TouchableOpacity>    
               </ScrollView>

               <View style={styles.keepKas}>
                     <Text style={styles.titleFooter}>@Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               </View>

               <FAB 
                  visible={this.state.notifikasi}
                  buttonColor='#dd880f' 
                  iconTextColor="#FFFFFF" 
                  onClickAction={() => {this.props.navigation.navigate('NotifikasiUser', {id_admin : this.state.photoURL, uid: this.state.uid})}}
                  iconTextComponent={
                     <View>
                        <Icon name="bell-ring" size={Ukuran/30} color='#ffffff'/>
                       
                     </View>
                  }
               />
         
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      height: Panjang / 13,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3C6AE1',
      justifyContent: 'space-between'
   },
   titleHeader:{
      color: 'white',
      fontSize: Ukuran/30,
      fontWeight: 'bold',
      paddingLeft: Ukuran/40
   },
   titleFooter:{
      color: 'white',
      fontSize: Ukuran/40,
      fontWeight: 'bold'
   },
   rightH:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
   },
   text:{
      fontSize: Ukuran/50,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
      flex: 1
   },
   box4:{
      height: Panjang / 17,
      backgroundColor: '#D49900',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
   left: {
      height: Panjang,
      width: Lebar / 3,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: Panjang,
      width: Lebar / 3,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft1: {
      fontSize: Ukuran/45,
      color: 'white',
      fontWeight: 'bold'

   },
   right1: {
      height: Panjang,
      justifyContent: 'center',
      paddingRight: 20

   },
   button2:{
      alignItems: 'center',
      justifyContent: 'center',
      margin: Ukuran/40
   },
   keepKas:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3C6AE1',
      height: Panjang / 13
   },
   picture:{
      height: Panjang,
      width: Lebar / 3,
      marginRight: 24,
      borderRadius: 50
   }
})