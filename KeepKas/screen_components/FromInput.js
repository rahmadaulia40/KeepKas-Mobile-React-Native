import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

const FromInput = ({labelValue, placeholderText,NumberOfLines,KeyboardType, ...rest}) => {
   return (
         <View style={styles.form}>
            <TextInput
               value={labelValue}
               style={styles.textInput}
               numberOfLines={NumberOfLines}
               placeholder={placeholderText}
               keyboardType={KeyboardType}
               {...rest}
            />
         </View>
   )
}

export default FromInput

const styles = StyleSheet.create ({
   form:{
      backgroundColor: '#DAEAF9',
      height: 60,
      marginTop: 12,
      marginBottom: 24,
   },
   textInput:{
      color : 'black',
      padding: 15,
      fontSize: 15
    }
})