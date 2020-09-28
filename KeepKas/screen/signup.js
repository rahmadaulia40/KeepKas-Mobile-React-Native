import React from 'react';
import {View, Text, StyleSheet, Alert,TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../database/firebase'

import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'

export default class SignUp extends React.Component {
   constructor() {
      super()
      this.state = {
        displayName: '',
        email: '',
        password: '',
        isLoading: false,
        passwordhide : true, 
        txtpassword : 'Show Password',
      }
    }
    PasswordOption = () =>{
      if (this.state.passwordhide == true)
      {
         this.setState({passwordhide : false, txtpassword : 'Hide Password'})
      }
      else{
        this.setState({passwordhide : true, txtpassword : 'Show Password'})
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
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {res.user.updateProfile({displayName: this.state.displayName})
          console.log('User logged-in successfully!')
          Alert.alert('Daftar', 'Akun anda telah ditambah !')
          this.props.navigation.navigate('Login')
          this.setState({isLoading: false,displayName: '', email: '', password: ''})
        })
        .catch((error) => {
         this.setState({isLoading : false})
         Alert.alert('Login Error !','E-mail Sudah Tersedia')
         console.log(error)
      })
      }
    }
    render() {
      if(this.state.isLoading){
         return(
           <View style={styles.preloader}>
             <ActivityIndicator size="large" color="#9E9E9E"/>
           </View>
         )
       }
      return (
         <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={styles.judul}>KeepKas</Text>
            <View style={styles.header}>
               <Text style={styles.siginTitle}>Daftar Admin</Text>
            </View>
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
               maxLength={15}
               secureTextEntry={this.state.passwordhide}
               />
               <TouchableOpacity>
                  <Text style={styles.ShowPassword}
                     onPress={() => this.PasswordOption()}>
                     {this.state.txtpassword}
                  </Text>
               </TouchableOpacity>

               <ButtonInput onPress={() => this.registerUser()} title='SignUp' Color='#3C6AE1' Txt='SignUp'/>
               
               <TouchableOpacity>
                  <Text style={styles.loginText}
                     onPress={() => this.props.navigation.navigate('Login')}>
                     Already Registered? Click here to login
                  </Text>
               </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', paddingTop: 70, justifyContent: 'center'}}>
            <Text style={{fontSize: 14}}>Dirancang Dengan <Icon name='attach-money' style={{fontSize: 14}}/> </Text>
            
            </View>
         </View>
      )}
}



const styles = StyleSheet.create({
   judul:{
      fontWeight: 'bold',
      fontSize: 50,
      textAlign: 'center',
      color:'#3C6AE1',
      paddingBottom: 50
   },
   header:{
      alignItems: 'center',
      
   },
   siginTitle:{
      fontSize: 27,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: 70
   },
   body:{
      marginLeft: 60,
      marginRight: 60
   },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    ShowPassword: {
      color: '#3740FE',
      textAlign: 'right'
    },

})