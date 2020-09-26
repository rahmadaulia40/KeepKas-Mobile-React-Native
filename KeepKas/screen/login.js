import React from 'react';
import {View, Text, TextInput, StyleSheet, Alert,TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../database/firebase'

import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class Login extends React.Component {
   constructor() {
      super()
      this.state = {
        email: '',
        password: '',
        isLoading: false
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
          this.setState({isLoading: false,email: '', password: ''})
          if (firebase.auth().currentUser.photoURL === null)
          {
            this.props.navigation.navigate('HomeAdmin')
          }
          else
          {
             this.props.navigation.navigate('HomeUser')
          }
        })
         .catch(error => this.setState({ errorMessage: error.message }))
      
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
                  secureTextEntry={true}
               />

               <ButtonInput onPress={() => this.userLogin()} title='Login' Color='#3C6AE1' Txt='Login'/>

               <Text style={styles.loginText}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  Don't have account? Click here to signup
               </Text>
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
})