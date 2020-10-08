import React from 'react'
import {StyleSheet,TouchableOpacity,Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ButtonAction = ({Txt,iconName,Color, ...rest}) => {
   return (
         <TouchableOpacity
            style={{
               height: 50,
               backgroundColor: Color,
               elevation: 10,
               flexDirection: 'row',
               margin: 10,
               borderTopLeftRadius: 50,
               borderBottomLeftRadius: 50,
               borderTopRightRadius: 35,
               borderBottomRightRadius: 40
            }}
            {...rest}
         >
            <View style={styles.picture}>
               <Icon name={iconName} size={35} color='white' />
            </View>
            <View style={{flex: 1,justifyContent: 'center', paddingLeft: 30}}>
               <Text style={styles.titleNama}>{Txt}</Text>
            </View>
         </TouchableOpacity>
   )
}

export default ButtonAction

const styles = StyleSheet.create({
   titleNama: {
     color: 'white',
     fontSize: 20,
     fontWeight: 'bold',
   },
  picture:{
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#20c720',
    justifyContent: 'center',
    alignItems: 'center'
  },
 });