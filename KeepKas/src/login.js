import React from 'react';
import {View, Text, TextInput, StyleSheet, Alert,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Login extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
        userName: '',
        password: ''
      }
    }

    loginHandler() {
      if (this.state.userName === '' && this.state.password === '1') {

         console.log("login bener")
         this.props.navigation.navigate('Home', {
         userName : this.state.userName
          })
   
       } else {
         console.log("Login salah")
         Alert.alert('Login','Username / Password salah')
       }

    }
    render() {
      return (
         <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={styles.judul}>KeepKas</Text>
            <View style={styles.header}>
               <Text style={styles.siginTitle}>Login</Text>
            </View>
            <View style={styles.body}>
               <Text style={styles.title}>Username</Text>
               <View style={styles.form}>
                  <TextInput
                     style={styles.textInput}
                     onChangeText={userName => this.setState({ userName })}
                  />
               </View>
               <Text style={styles.title}>Password</Text>
               <View style={styles.form}>
                  <TextInput
                     style={styles.textInput}
                     secureTextEntry={true}
                     onChangeText={password => this.setState({ password })}
                  />
               </View>
               <View style={{alignItems: 'center', margin: 30}}>
                  <TouchableOpacity
                     style={styles.button}
                     title='Login'
                     onPress={() => this.loginHandler()} 
                  >
                     <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Login</Text>
                  </TouchableOpacity>
               </View>
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
   icon:{
      color: '#057251',
      fontSize: 91
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
   form:{
      backgroundColor: '#DAEAF9',
      height: 60,
      marginTop: 12,
      marginBottom: 24
   },
   textInput:{
      color : 'black',
      padding: 15,
      fontSize: 15
    },
    button:{
       height: 50,
       width: 130,
       backgroundColor: '#3C6AE1',
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 5
       
    },
    title: {
       fontWeight: 'bold',
       fontSize: 16,
    }

})