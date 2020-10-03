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
          gambar : 'user.png'
        })
        var id = ref.key
        db.child(ref.key).update({id : id})

        console.log('User logged-in successfully!')
        Alert.alert('Data User', 'data telah ditambah !')
        this.props.navigation.navigate('Jumlahanggota')
          this.setState({isLoading: false,displayName: '', email: '', password: ''})
      })
      .catch((error) => {
        this.setState({isLoading : false})
        Alert.alert('Tambah Anggota !',String(error))
        console.log(error)
        })
      }
  }
    
   render(){
    if(this.state.isLoading){
      return(
        <Loading/>
      )
    }
  return (
    <View style={styles.container}>
      <Text>Input Data</Text>
    <View style={styles.body}>

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
      />

      <ButtonInput
        onPress={() => this.registerUser()}
        titleButton = 'Tambah Anggota'
        Txt = 'Tambah Anggota'
        Color = '#3C6AE1'
      />
      
      </View>
      
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body:{
      marginLeft: 60,
      marginRight: 60
  }
});
