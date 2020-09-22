import React from 'react'
import {StyleSheet,TouchableOpacity,Text} from 'react-native'

const FromInput = ({title, ...rest}) => {
   return (
         <TouchableOpacity 
            style={
               {
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: '#3C6AE1',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
               }}
            title={title}
            {...rest}
         />
   )
}

export default FromInput