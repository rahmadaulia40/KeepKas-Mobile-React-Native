import React, { useEffect, useState } from 'react'
import {Image} from 'react-native'
import firebase from '../database/firebase'

  const PictureProfile = ({Size,MarginRight,UID, ...rest})=>{
    const [gambar, setGambar] = useState('gambar')
    var imageRef = firebase.storage().ref('ImageProfile/'+UID+'.png')
    imageRef.getDownloadURL()
    .then((url)=>{
      setGambar(url)
   })
   .catch(() => {
      var imageRef = firebase.storage().ref('ImageProfile/user.png')
      imageRef.getDownloadURL()
      .then((url)=>{
         setGambar(url)
      })
   })
    return (
      <Image 
      source= {{uri : gambar}} 
      style={{width: Size,height: Size,borderRadius: Size, marginRight: MarginRight}}
      {...rest}
      />
     )
  }

  export default PictureProfile
