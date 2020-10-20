import React from 'react'
import {TouchableOpacity,Text} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'

const ButtonInput = ({titleButton,Color,Txt,MarginTop, ...rest}) => {
   return (
         <TouchableOpacity 
            style={
               {
                  height: Panjang/13,
                  borderRadius: 10,
                  backgroundColor: Color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: MarginTop,
               }}
            title={titleButton}
            {...rest}
         >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: Ukuran/45}}>{Txt}</Text>
         </TouchableOpacity>
   )
}

export default ButtonInput