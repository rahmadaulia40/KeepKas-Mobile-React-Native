import React from 'react';
import {Image} from 'react-native';
import firebase from '../database/firebase'

export default class PictureProfileBig extends React.Component {
  constructor() {
    super()
    this.state = {
      gambar: 'logo'
    }
  }

  componentDidMount() {
    this.fetchData()
 }
  fetchData = async () => {
    var imageRef = firebase.storage().ref('ImageProfile/'+firebase.auth().currentUser.uid+'.png')
   imageRef.getDownloadURL()
   .then((url)=>{
    this.setState ({gambar : url})
 })
 .catch(() => {
    var imageRef = firebase.storage().ref('ImageProfile/user.png')
    imageRef.getDownloadURL()
    .then((url)=>{
       this.setState({gambar : url})
    })
 })
  }
  render=()=>{
  return (
      <Image 
      source= {{uri : this.state.gambar}}
      style={{width: 230,height: 230,borderRadius: 230,}}
      />
     )

  }
}