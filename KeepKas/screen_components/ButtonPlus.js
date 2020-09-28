import React from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const ButtonPlus= ({titleButton,Color,Txt, ...rest}) => {
   return (
         <TouchableOpacity title={titleButton} {...rest}>
            <Icon 
               name ='pluscircle' 
               style={{
                  fontSize: 70,
                  color: Color, //'#B90303'
                  borderRadius: 50,
                  marginBottom: 50,
                  marginRight: 30,
                  elevation: 10,
                  backgroundColor: 'white'
               }}
            />
         </TouchableOpacity>
   )
}

export default ButtonPlus