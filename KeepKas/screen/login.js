import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from '../database/firebase'
import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'
import {Ukuran} from '../screen_components/Dimentions'

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
         Alert.alert('Login Gagal !','Data tidak boleh kosong')
      }
      else 
      {
         this.setState({isLoading: true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User logged-in successfully!')
          this.setState({isLoading: true,email: '', password: ''})
          if (firebase.auth().currentUser.photoURL === null || firebase.auth().currentUser.photoURL === firebase.auth().currentUser.uid)
          {
            this.props.navigation.navigate('HomeAdmin',this.setState({isLoading: true}))
            this.setState({isLoading: false,passwordhide: true})
          }
          else
          {
             this.props.navigation.navigate('HomeUser')
             this.setState({isLoading: false, passwordhide: true})
          }
        })
         .catch((error) => {
            this.setState({isLoading : false})
            Alert.alert('Login Gagal !',String(error))
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
                  MarginBottom={Ukuran/30}
               />

               <FromInput onChangeText={(val) => this.updateInputVal(val, 'password')}
                  labelValue={this.state.password}
                  placeholderText= 'Password'
                  maxLength={15}
                  secureTextEntry={this.state.passwordhide}
               />
               <TouchableOpacity onPress={() => this.PasswordOption()}>
                  <Text style={styles.ShowPassword}>
                     {this.state.txtpassword}
                  </Text>
               </TouchableOpacity>

               <ButtonInput onPress={() => this.userLogin()} title='Login' Color='#3C6AE1' Txt='Login'/>

               <TouchableOpacity onPress={() => this.props.navigation.navigate('ScannerSignUp')}>
                  <Text style={styles.loginText}>
                     Belum memiliki akun? Klik disini untuk mendaftar
                  </Text>
               </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', paddingTop: 30, justifyContent: 'center', flexDirection:'row'}}>
               <Text style={{fontSize: Ukuran/55, color: '#a7a7a7'}}>Dirancang dengan penuh</Text>
               <Icon name='heart' style={{fontSize: 14, color: '#a7a7a7'}}/> 
            </View>
         </View>
      )}
}



const styles = StyleSheet.create({
   judul:{
      fontWeight: 'bold',
      fontSize: Ukuran/15,
      textAlign: 'center',
      color:'#3C6AE1',
      paddingBottom: Ukuran/40
   },
   header:{
      alignItems: 'center',
      
   },
   siginTitle:{
      fontSize: Ukuran/30,
      fontWeight: 'bold',
      color: 'black',
      paddingBottom: Ukuran/40
   },
   body:{
      marginLeft: 30,
      marginRight: 30
   },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center',
      fontSize: Ukuran/55
    },
    ShowPassword: {
      color: '#3740FE',
      textAlign: 'right',
      marginBottom: 25,
      fontSize: Ukuran/55
    },
})