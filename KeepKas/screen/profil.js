import * as React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {Ukuran} from '../screen_components/Dimentions'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import firebase from '../database/firebase'
import Loading from '../screen_components/Loading'
import PictureProfile from '../processing/PictureProfile'

export default class Profil extends React.Component {
   constructor(){
      super()
      this.state = {
        warna : '',
        gambar : 'user.png',
        isLoading : false
      }
    }

    componentDidMount() {
      this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
  
    _pickImage = async () => {
       
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.3
        })

        if (!result.cancelled) {
         this.setState({isLoading : true})
         const { uid } = this.props.route.params;
          this.uploadeImage(result.uri, uid)
          .then(()=>{
            this.setState({isLoading : false})
            Alert.alert('Uploade Image','Sukses !')
          })
          .catch((error)=>{
            alert(error)
            this.setState({isLoading : false})
          })
        }
  
       
    }
    uploadeImage = async (uri,ImageName) =>{
      const response = await fetch(uri)
      const blob = await response.blob()
      var ref = firebase.storage().ref().child('ImageProfile/'+ImageName+'.png')
      return ref.put(blob)
    }

   render(){
      if(this.state.isLoading){
         return(
           <Loading/>
         )
       }
       const { uid,displayName, email } = this.props.route.params;
      
   return (
      <View style={{flex:1, margin: 20}}>
         <View style={styles.header}>
            <View style={{alignItems: 'center', marginTop: 20}}>

               <PictureProfile Size={Ukuran/3} UID={uid}/>

               <TouchableOpacity
               style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
               onPress={this._pickImage}>
                  <Text style={{color: '#3C6AE1', fontSize: Ukuran/55}}>Ubah Gambar</Text>
                  <Icon name='pencil-circle' color='#3C6AE1' size={35}/>
               </TouchableOpacity>
            
            </View>
            <View style={styles.box}>
               <View>
                  <Text style={styles.title2}>E-mail</Text>
                  <Text style={styles.title2}>Nama</Text>
               </View>
               <View>
                  <Text style={styles.title2}>: {email}</Text>
                  <Text style={styles.title2}>: {displayName}</Text>
               </View>
            </View>
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      flexDirection: 'column',
   },
   title2 :{
      fontSize: Ukuran/60,
      fontWeight: 'bold',
      color: 'white',
      padding: Ukuran/60,
   },
   box:{
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row',
      elevation: 10,
      margin: 20,
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20
   },
})