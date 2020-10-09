import React from 'react';
import {View, Text, StyleSheet, Alert,TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from '../database/firebase'

import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class SignUpUser extends React.Component {
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
         const { uidadmin } = this.props.route.params
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {res.user.updateProfile({displayName: this.state.displayName, photoURL: uidadmin})
          var db = firebase.database().ref('users')
          var ref = db.push({
            uidadmin : uidadmin,
            uid : firebase.auth().currentUser.uid,
            email : this.state.email,
            nama : this.state.displayName,
            level : 'user'
        })
            var id = ref.key
            db.child(ref.key).update({id : id})
          this.ButtonAlertKonfirmasi()
          this.setState({isLoading: false,displayName: '', email: '', password: ''})
        })
        .catch((error) => {
         this.setState({isLoading : false})
         Alert.alert('Login Error !','E-mail Sudah Tersedia')
         console.log(error)
      })
      }
    }

    ButtonAlertKonfirmasi = () =>
    Alert.alert(
      "Daftar Akun Admin",
      "Data telah ditambah",
      [
        { text: "Ya", onPress: () => {this.props.navigation.navigate('Login')}}
      ],
      { cancelable: false }
    )
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
               <Text style={styles.siginTitle}>Lengkapi data diri anda</Text>
            </View>
            <View style={styles.body}>

               <FromInput onChangeText={(val)=> this.updateInputVal(val, 'displayName')}
               labelValue={this.state.displayName}
               placeholderText= 'Nama Lengkap'
               MarginBottom={30}
               />

               <FromInput onChangeText={(val) => this.updateInputVal(val, 'email')}
               labelValue={this.state.email}
               placeholderText= 'Email Address'
               MarginBottom={30}
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
                     Sudah memiliki akun? klik disini untuk login
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
      paddingBottom: 20
   },
   body:{
      marginLeft: 30,
      marginRight: 30
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