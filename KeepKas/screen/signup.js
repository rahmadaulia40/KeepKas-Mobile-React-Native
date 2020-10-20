import React from 'react';
import {View, Text, StyleSheet, Alert,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from '../database/firebase'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import FromInput from '../screen_components/FromInput'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

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
        .then((res) => {res.user.updateProfile({displayName: this.state.displayName, photoURL: firebase.auth().currentUser.uid})
          var db = firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/')
          var ref = db.push({
          uidadmin : firebase.auth().currentUser.uid,
          uid : firebase.auth().currentUser.uid,
          email : this.state.email,
          nama : this.state.displayName,
          level : 'admin'
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
               <Text style={styles.siginTitle}>Daftar Admin</Text>
            </View>
            <View style={styles.body}>

               <FromInput onChangeText={(val)=> this.updateInputVal(val, 'displayName')}
               labelValue={this.state.displayName}
               placeholderText= 'Nama Lengkap'
               MarginBottom={Ukuran/30}
               />

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

               <ButtonInput onPress={() => this.registerUser()} title='SignUp' Color='#3C6AE1' Txt='SignUp'/>
               
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.loginText}>
                     Sudah memiliki akun? klik disini untuk login
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