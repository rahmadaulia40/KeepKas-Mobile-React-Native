import React from 'react'
import {View, StyleSheet, Alert,Text } from 'react-native'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'

export default class DetailKasKeluar extends React.Component {
   constructor() {
      super()
      this.state = {
        isLoading: false
      }
    }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

   ButtonAlertKonfirmasi = () =>
    Alert.alert(
      "Hapus Data !",
      "Apakah anda yakin ingin menghapus data ?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Ya", onPress: () => {this.delete()}}
      ],
      { cancelable: false }
    )

    delete = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      firebase.database().ref('total_kas_keluar/'+data.id_admin+ '/' + data.id + '/').remove()
      firebase.database().ref('kas_keluar/'+ data.id + '/').remove()
      
      .then(()=>{
         this.ButtonAlertSukses()
      })
      
      .catch((error) => {
         this.setState({isLoading: false})
         console.log(error)
         alert(error)
      })
    }
    ButtonAlertSukses = () =>
    Alert.alert(
      "Hapus Data !",
      "Data Berhasil Di Hapus !",
      [
        { text: "OK", onPress: () => {
           this.props.navigation.navigate('HomeAdmin') 
            this.setState({isLoading: false})
         }}
      ],
      { cancelable: false }
    )

   render() {
      const { data } = this.props.route.params   
      return (
         <View style={styles.container}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.titleHeader}>Detail Kas Keluar</Text>
            </View>

            <View style={styles.box}>
               <View>
                  <Text style={styles.titleInfo}>Nama</Text>
                  <Text style={styles.titleInfo}>Nominal</Text>
                  <Text style={styles.titleInfo}>Tanggal</Text>
               </View>
               <View>
                  <Text style={styles.titleInfo}>: {data.nama}</Text>
                  <Text style={styles.titleInfo}>: {this.currencyFormat(Number(data.nominal))}</Text>
                  <Text style={styles.titleInfo}>: {data.waktu}</Text>
               </View>
            </View>
            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Keterangan :</Text>
                  <Text style={styles.titleInfo1} numberOfLines = {10}>{data.keterangan}</Text>
            </View>

            <ButtonInput
               onPress={() => this.ButtonAlertKonfirmasi()}
               titleButton = 'Hapus Data'
               Txt = 'Hapus Data'
               Color = '#B90303'
               MarginTop = {20}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 20
   },
   kolomRincian:{
      height: 100,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius : 5
   },
   titleHeader :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#B90303'
   },
   box:{
      backgroundColor: '#B90303',
      alignItems: 'center',
      borderRadius: 20,
      padding: 20,
      flexDirection: 'row',
      elevation: 10
   },
   titleInfo: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingRight: 5,
      marginTop: 10,
      marginRight: 10
   },
   box1 :{
      backgroundColor: '#B90303',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 20,
      elevation: 10,
      marginTop: 20
   },
   titleInfo1 : {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20,
      marginTop: 10,
   },
})