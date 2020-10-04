import React from 'react'
import { StyleSheet, Text, View, Alert, NativeModules } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import ImageResizer from 'react-native-image-resizer'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'

export default class TambahUser extends React.Component {
  constructor() {
    super()
    this.state = {
        displayName : '',
        isLoading : false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  editProfil = () => {
    if(this.state.email === '' && this.state.password === '')
    {
       Alert.alert('Profil Error !','Data Tidak Boleh Kosong')
    }
    else 
    {
      this.setState({isLoading: true})
      const user = firebase.auth().currentUser
      user.updateProfile({
         displayName : this.state.displayName
      })
      .then(() => {
         console.log('User logged-in successfully!')
         Alert.alert('Data Profil', 'Profil telah diubah !')
         this.props.navigation.navigate('ProfilAdmin')
         this.setState({isLoading: false,displayName: '', email: '', password: ''})

      })
      .catch((error) => {
        this.setState({isLoading : false})
        Alert.alert('Ubah Profil !',String(error))
        console.log(error)
        })
      }
  }


  OpenPicture=()=>{
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) 
      {
        console.log('User cancelled image picker');
      } 
      else if (response.error) 
      {
        console.log('ImagePicker Error: ', response.error);
      } 
      else 
      {
        const uri = response.uri;
        this.setState({
          selectedPictureUri: uri,
        });
      }
    })
  }
    
   render(){

    if(this.state.isLoading){
      return(
        <Loading/>
      )
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profil</Text>
    <View style={styles.body}>

      <FromInput onChangeText={(val)=> this.updateInputVal(val, 'displayName')}
        labelValue={this.state.displayName}
        placeholderText= 'Nama Lengkap'
      />

      <ButtonInput
        onPress={() => this.editProfil()}
        titleButton = 'Edit Profil'
        Txt = 'Edit Profil'
        Color = '#3C6AE1'
      />
      <ButtonInput
        onPress={() => this.OpenPicture()}
        titleButton = 'Edit Gambar'
        Txt = 'Edit Gambar'
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
  },
  title :{
   margin: 20,
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'center'
},
});
