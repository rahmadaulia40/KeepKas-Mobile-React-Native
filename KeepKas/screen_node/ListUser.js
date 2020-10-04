import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native'
import firebase from '../database/firebase'

export default class ListUser extends React.Component {
  constructor(){
    super()
    this.state = {
      warna : '',
      gambar : 'user.png'
    }
  }
   render() {
     const data = this.props.data
     var imageRef = firebase.storage().ref('ImageProfile/'+data.gambar)
     imageRef.getDownloadURL()
     .then((url)=>{
       this.setState({gambar: url})
      })
     .catch(() => {
       Alert.alert('Data Anggota','Gambar tidak ditemukan !')
      })
     return (
        <TouchableOpacity style={styles.box} onPress={() => this.state.action = this.props.Nilai(data)}>
          <View style={{justifyContent: 'center', width: 100, alignItems: 'center'}}>
            <Image source= {{uri: this.state.gambar}} style={styles.picture} />
          </View>
          <View style={{flex: 1,justifyContent: 'center'}}>
            <Text style={styles.titleHarga}>{data.nama}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.titleNama}>{data.email}</Text>
                <Text style={styles.titleWaktu}>{data.nohp}</Text>
              </View>
          </View>
      </TouchableOpacity>
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 100,
      backgroundColor: '#3C6AE1',
      elevation: 5,
      flexDirection: 'row',
      margin: 10,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 50
   },
   titleNama: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 18,
     margin: 8,
     flex: 1
   },
   titleHarga: {
     color: 'white',
     fontSize: 28,
     fontWeight: 'bold',
     paddingLeft: 9,
   },
   titleStatus: {
     fontSize: 20,
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
     paddingRight: 20,
     paddingLeft: 20
   },
   titleWaktu: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 8
  },
  picture:{
   height: 100,
   width: 100,
   borderRadius: 50
}
 })