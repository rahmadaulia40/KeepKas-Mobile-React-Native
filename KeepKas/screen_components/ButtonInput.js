import React from 'react'
import {TouchableOpacity,Text, Dimensions} from 'react-native'

const ButtonInput = ({titleButton,Color,Txt,MarginTop, ...rest}) => {
   return (
         <TouchableOpacity 
            style={
               {
                  height: Dimensions.get('window').height /13,
                  borderRadius: 10,
                  backgroundColor: Color,//'#3C6AE1'
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: MarginTop,
               }}
            title={titleButton}
            {...rest}
         >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{Txt}</Text>
         </TouchableOpacity>
   )
}

export default ButtonInput