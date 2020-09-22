import React from 'react';
import {View, Text, TextInput, StyleSheet, Alert,TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../database/firebase'

import FromInput from '../components/FromInput'
import ButtonInput from '../components/ButtonInput'

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
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({isLoading: false,email: '', password: ''})
          this.props.navigation.navigate('Home')
        })
         .catch(error => this.setState({ errorMessage: error.message }))
      
      }
    }
    render() {
      if(this.state.isLoading){
         return(
           <View style={styles.preloader}>
               <Image source={require('../assets/icon.png')} style={{height: 50, width: 50}} />
               <ActivityIndicator size='large' color="#3C6AE1"/>
           </View>
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

               <ButtonInput onPress={() => this.userLogin()} title='Login'>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Login</Text>
               </ButtonInput>

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
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }

})