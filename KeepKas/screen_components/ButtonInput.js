import React from 'react'
import {StyleSheet,TouchableOpacity,Text} from 'react-native'

const ButtonInput = ({titleButton,Color,Txt, ...rest}) => {
   return (
         <TouchableOpacity 
            style={
               {
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: Color,//'#3C6AE1'
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
               }}
            title={titleButton}
            {...rest}
         >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{Txt}</Text>
         </TouchableOpacity>
   )
}

export default ButtonInput