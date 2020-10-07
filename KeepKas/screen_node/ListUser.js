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

  componentDidMount() {
    this.fetchData()
 }
  fetchData = async () => {
    const data = this.props.data
    var imageRef = firebase.storage().ref('ImageProfile/'+data.uid+'.png')
   imageRef.getDownloadURL()
   .then((url)=>{
    this.setState ({gambar : url})
 })
 .catch(() => {
    var imageRef = firebase.storage().ref('ImageProfile/user.png')
    imageRef.getDownloadURL()
    .then((url)=>{
       this.setState({gambar : url})
    })
 })
  }
   render() {
     const data = this.props.data
     return (
        <TouchableOpacity style={styles.box} onPress={() => this.state.action = this.props.Nilai(data)}>
          <View style={{justifyContent: 'center', width: 100, alignItems: 'center'}}>
            <Image source= {{uri: this.state.gambar}} style={styles.picture} />
          </View>
          <View style={{flex: 1,justifyContent: 'center'}}>
            <Text style={styles.titleNama}>{data.nama}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.titleEmail}>{data.email}</Text>
            </View>
          </View>
          <View style={styles.boxWaktu}>
            <Text style={styles.titleStatus}>{data.level}</Text>
          </View>
      </TouchableOpacity>
      
     )
   }
 };

 const styles = StyleSheet.create({
   box:{
      height: 100,
      backgroundColor: '#3C6AE1',
      elevation: 10,
      flexDirection: 'row',
      margin: 10,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 35,
      borderBottomRightRadius: 40
   },
   titleEmail: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 15,
     marginLeft: 10,
     flex: 1
   },
   titleNama: {
     color: 'white',
     fontSize: 26,
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
},
boxWaktu : {
  justifyContent: 'center',
  backgroundColor: '#B90303', 
  width: 100,
  height:30,
  borderTopRightRadius: 50,
  borderBottomLeftRadius: 40,
  },
  titleStatus: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
 })