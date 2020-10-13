import React from 'react'
import {View, StyleSheet, Alert,Text, ScrollView} from 'react-native'
import {Ukuran} from '../screen_components/Dimentions'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class DetailKasMasuk extends React.Component {
   constructor() {
      super()
      this.state = {
        isLoading: false
      }
    }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    konfirmasi = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      if (data.status == 'Sukses')
      {
         this.setState({isLoading: false})
         Alert.alert('Gagal Konfirmasi Data !', 'Data telah dikonfirmasi sebelumnya')
      }
      else
      {
         firebase.database().ref('kas_masuk/'+ data.id_admin + '/'+ data.id+'/').update({status : 'Sukses'})
         .then(()=>{
            firebase.database().ref('total_kas_masuk/'+data.id_admin + '/').update({[data.id] : Number(data.nominal)})
            Alert.alert('Sukses', 'Data berhasil di Konfirmasi')
            this.setState({isLoading: false})
            
         })
         .catch((error) => {
            this.setState({isLoading: false})
            console.log(error)
            alert(error)
         })
      }
    }

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
      firebase.database().ref('total_kas_masuk/'+data.id_admin+ '/' + data.id + '/').remove()
      
      .then(()=>{
         firebase.database().ref('kas_masuk/'+ data.id_admin + '/'+ data.id+'/').remove()
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
      if (data.status == 'Sukses')
      {
         this.state.color = '#98a8d2'
      }
      else
      {
         this.state.color = '#3C6AE1'
      }
      if(this.state.isLoading){
         return(
           <Loading/>
         )
       }    
      return (
         <ScrollView style={styles.container}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.titleHeader}>Detail Kas Masuk</Text>
            </View>

            <View style={styles.box}>
               <View>
                  <Text style={styles.titleInfo}>Nama</Text>
                  <Text style={styles.titleInfo}>Nominal</Text>
                  <Text style={styles.titleInfo}>Tanggal</Text>
                  <Text style={styles.titleInfo}>Status</Text>
               </View>
               <View>
                  <Text style={styles.titleInfo}>: {data.nama}</Text>
                  <Text style={styles.titleInfo}>: {this.currencyFormat(Number(data.nominal))}</Text>
                  <Text style={styles.titleInfo}>: {data.date}</Text>
                  <Text style={styles.titleInfo}>: {data.status}</Text>
               </View>
            </View>
            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Keterangan :</Text>
                  <Text style={styles.titleInfo1} numberOfLines = {10}>{data.keterangan}</Text>
            </View>

            <ButtonInput
               onPress={() => this.konfirmasi()}
               titleButton = 'Konfirmasi'
               Txt = 'Konfirmasi'
               Color = {this.state.color}
               MarginTop = {20}
            />

            <ButtonInput
               onPress={() => this.ButtonAlertKonfirmasi()}
               titleButton = 'Hapus Data'
               Txt = 'Hapus Data'
               Color = '#B90303'
               MarginTop = {20}
            />
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: Ukuran/40
   },
   titleHeader :{
      margin: Ukuran/40,
      fontSize: Ukuran/35,
      fontWeight: 'bold',
      color: '#3C6AE1'
   },
   box:{
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      borderRadius: 20,
      padding: Ukuran/40,
      flexDirection: 'row',
      elevation: 10
   },
   titleInfo: {
      color: 'white',
      fontSize: Ukuran/40,
      fontWeight: 'bold',
      paddingRight: 5,
      marginTop: Ukuran/60,
      marginRight: Ukuran/60
   },
   box1 :{
      backgroundColor: '#3C6AE1',
      justifyContent: 'center',
      borderRadius: 20,
      padding: Ukuran/40,
      elevation: 10,
      marginTop: 10
   },
   titleInfo1 : {
      color: 'white',
      fontSize: Ukuran/40,
      fontWeight: 'bold',
      paddingLeft: 20,
      marginTop: 10,
   },
})