import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import Constants from 'expo-constants';

import Login from './screens/login';
import Signup from './screens/signup'
import Dashboard from './screens/dashboarduser';
import Bayarkas from './screens/bayarkas';
import RincianKassaya from './screens/rinciankas'
import Profil from './screens/profil'
import Kasmasuk from './screens/kasmasuk'
import Kaskeluar from './screens/kaskeluar'
import Jumlahanggota from './screens/jumlahanggota'
import Tentang from './screens/tentang'
import TambahUser from './screens/tambahuser';


const Stack = createStackNavigator();
const statusBarHeight = Constants.statusBarHeight

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View style = {styles.bar}/>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle:{backgroundColor:'#3C6AE1'}, headerTintColor: 'white', headerTitleStyle :{fontWeight: 'bold', fontSize: 22} }}>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='SignUp' component={Signup} options={{headerShown: false}} />
          <Stack.Screen name='Home' component={Dashboard} options={{ headerShown: false}} />
          <Stack.Screen name='Profil' component={Profil} options={{ headerTitle: 'Profil'}} />
          <Stack.Screen name='Kasmasuk' component={Kasmasuk} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='Kaskeluar' component={Kaskeluar} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='Jumlahanggota' component={Jumlahanggota} options={{ headerTitle: 'Data Angota'}} />
          <Stack.Screen name='TambahUser' component={TambahUser} options={{ headerTitle: 'Tambah Anggota'}} />
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
    borderRadius: 2,
    marginTop: 60
  },
  HeaderNav: {
     color: 'black'
  }
})

