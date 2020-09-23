import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'

import ButtonInput from '../components/ButtonInput'
import FromInput from '../components/FromInput'
import Loading from '../components/Loading'

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
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {res.user.updateProfile({displayName: this.state.displayName, photoURL: uid})
        console.log('User logged-in successfully!')
        Alert.alert('Data User', 'data telah ditambah !')
        this.setState({isLoading: false,displayName: '', email: '', password: ''})
        console.log(res)
      })
      .catch(error => this.setState({ errorMessage: error.message }))
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

      <ButtonInput onPress={() => this.registerUser()}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Input</Text>
      </ButtonInput>
      
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
