import * as React from 'react';
import {View, StyleSheet, ColorPropType} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import Constants from 'expo-constants'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './login';
import Dashboard from './dashboarduser';
import Bayarkas from './bayarkas';
import RincianKassaya from './rinciankas'
import Profil from './profil'
import Kasmasuk from './kasmasuk'
import Kaskeluar from './kaskeluar'
import Jumlahanggota from './jumlahanggota'
import Tentang from './tentang'


const Stack = createStackNavigator();
const statusBarHeight = Constants.statusBarHeight

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View style = {styles.bar}/>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle:{backgroundColor:'#3C6AE1'}, headerTintColor: 'white', headerTitleStyle :{fontWeight: 'bold', fontSize: 22} }}>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='Home' component={Dashboard} options={{ headerShown: false}} />
          <Stack.Screen name='Profil' component={Profil} options={{ headerTitle: 'Profil'}} />
          <Stack.Screen name='Kasmasuk' component={Kasmasuk} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='Kaskeluar' component={Kaskeluar} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='Jumlahanggota' component={Jumlahanggota} options={{ headerTitle: 'Data Angota'}} />
          <Stack.Screen name='RincianKas' component={RincianKassaya} options={{ headerTitle: 'Rincian Kas Saya'}} />
          <Stack.Screen name='BayarKas' component={Bayarkas} options={{ headerTitle: 'Bayar Kas'}} />
          <Stack.Screen name='Tentang' component={Tentang} options={{ headerTitle: 'Tentang Aplikasi'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles=StyleSheet.create({
  bar:{
    marginTop: statusBarHeight,
  },
  boxDrawer: {
    backgroundColor: 'white',
    //height: 180,
    borderRadius: 2,
    marginTop: 60
  },
  HeaderNav: {
     color: 'black'
  }
})

