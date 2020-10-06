import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'

export default class TambahUser extends React.Component {
  constructor() {
    super()
    this.state = {
        displayName : '',
        email : '',
        password : '',
        isLoading : false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '')
    {
       Alert.alert('Login Error !','Data Tidak Boleh Kosong')
    }
    else 
    {
       this.setState({isLoading: true})
       const { uid } = this.props.route.params;
      firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {res.user.updateProfile({displayName: this.state.displayName, photoURL: uid})

        var db = firebase.database().ref('users')
        var ref = db.push({
          uidadmin : uid,
          email : this.state.email,
          nama : this.state.displayName,
          uid : firebase.auth().currentUser.uid,
          level : 'user'
        })
        var id = ref.key
        db.child(ref.key).update({id : id})
        this.ButtonAlertKonfirmasi()
        console.log('User logged-in successfully!')
        this.setState({isLoading: false,displayName: '', email: '', password: ''})
      })
      .catch((error) => {
        this.setState({isLoading : false})
        Alert.alert('Tambah Anggota !',String(error))
        console.log(error)
        })
      }
  }

  ButtonAlertKonfirmasi = () =>
    Alert.alert(
      "Tambah Anggota",
      "Data telah ditambah",
      [
        { text: "Ya", onPress: () => {this.props.navigation.navigate('HomeAdmin')}}
      ],
      { cancelable: false }
    )
    
   render(){
    if(this.state.isLoading){
      return(
        <Loading/>
      )
    }
  return (
    <View style={styles.container}>
      <View style={styles.body}>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.title1}>Tambah Anggota</Text>
        </View>

        <View style={styles.box1}>
          <Text style={styles.titleInfo}>Fitur penambahan anggota ini berfungsi agar anggota dapat melihat data kas serta membayar kas.</Text>
        </View>

        <FromInput onChangeText={(val)=> this.updateInputVal(val, 'displayName')}
          labelValue={this.state.displayName}
          placeholderText= 'Nama Lengkap'
        />

        <FromInput onChangeText={(val) => this.updateInputVal(val, 'email')}
          labelValue={this.state.email}
          placeholderText= 'Email Address'
        />

        <FromInput onChangeText={(val) => this.updateInputVal(val, 'password')}
          labelValue={this.state.password}
          placeholderText= 'Password'
          secureTextEntry= {true}
        />

        <ButtonInput
          onPress={() => this.registerUser()}
          titleButton = 'Tambah Anggota'
          Txt = 'Tambah Anggota'
          Color = '#3C6AE1'
        />
        
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body:{
      marginLeft: 40,
      marginRight: 40
  },
  title1 :{
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold'
 },
 titleInfo: {
  color: 'white',
  fontSize: 24,
  textAlign: 'center',
  fontWeight: 'bold'
 },
 box1:{
  height: 200,
  backgroundColor: '#00DCEA',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#3C6AE1',
  borderWidth: 2,
  borderRadius: 10,
  padding: 20,
  marginBottom: 20
},

});
