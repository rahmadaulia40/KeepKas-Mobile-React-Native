import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../database/firebase'

import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends React.Component {
   constructor() {
      super()
      this.state = {
        email: '',
        password: '',
        passwordhide : true, 
        txtpassword : 'Show Password',
        isLoading: false
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

    userLogin = () => {
      if(this.state.email === '' && this.state.password === '')
      {
         Alert.alert('Login Error !','Username/Password Tidak Terdeteksi')
      }
      else 
      {
         this.setState({isLoading: true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User logged-in successfully!')
          this.setState({isLoading: true,email: '', password: ''})
          if (firebase.auth().currentUser.photoURL === null || firebase.auth().currentUser.photoURL === 'account-circle')
          {
            this.props.navigation.navigate('HomeAdmin',this.setState({isLoading: true}))
            this.setState({isLoading: false})
          }
          else
          {
             this.props.navigation.navigate('HomeUser')
             this.setState({isLoading: false})
          }
        })
         .catch((error) => {
            this.setState({isLoading : false})
            Alert.alert('Login Error !','E-mail/Password Salah')
            console.log(error)
         })
      
      }
    }
    render() {
      if(this.state.isLoading){
         return(
           <Loading/>
         )
       }
      return (
         <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={styles.judul}>KeepKas</Text>
            <View style={styles.header}>
               <Text style={styles.siginTitle}>Login</Text>
            </View>
            <View style={styles.body}>

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

               <ButtonInput onPress={() => this.userLogin()} title='Login' Color='#3C6AE1' Txt='Login'/>

               <TouchableOpacity>
                  <Text style={styles.loginText}
                     onPress={() => this.props.navigation.navigate('SignUp')}>
                     Don't have account? Click here to signup
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
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: 70
   },
   body:{
      marginLeft: 60,
      marginRight: 60
   },
    button:{
       height: 50,
       width: 130,
       backgroundColor: '#3C6AE1',
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 5
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