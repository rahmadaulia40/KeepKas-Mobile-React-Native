import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import Constants from 'expo-constants';

import Login from './screen/login';
import Signup from './screen/signup'
import DashboardUser from './screen_user/dashboarduser';
import DashboardAdmin from './screen_admin/dashboardadmin';
import BayarKasUser from './screen_user/bayarkas';
import RincianKas from './screen_user/rinciankas'
import Profil from './screen/profil'
import KasMasukUser from './screen_user/kasmasuk'
import KasMasukAdmin from './screen_admin/kasmasukadmin'
import DetailAdmin from './screen_admin/detailadmin'
import KasKeluar from './screen/kaskeluar'
import Jumlahanggota from './screen/jumlahanggota'
import Tentang from './screen/tentang'
import TambahUser from './screen_admin/tambahuser';


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
          <Stack.Screen name='HomeUser' component={DashboardUser} options={{ headerShown: false}} />
          <Stack.Screen name='HomeAdmin' component={DashboardAdmin} options={{ headerShown: false}} />
          <Stack.Screen name='Profil' component={Profil} options={{ headerTitle: 'Profil'}} />
          <Stack.Screen name='KasMasukUser' component={KasMasukUser} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='KasMasukAdmin' component={KasMasukAdmin} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='DetailAdmin' component={DetailAdmin} options={{ headerTitle: 'Detail'}} />
          <Stack.Screen name='Kaskeluar' component={KasKeluar} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='Jumlahanggota' component={Jumlahanggota} options={{ headerTitle: 'Data Angota'}} />
          <Stack.Screen name='TambahUser' component={TambahUser} options={{ headerTitle: 'Tambah Anggota'}} />
          <Stack.Screen name='RincianKas' component={RincianKas} options={{ headerTitle: 'Rincian Kas Saya'}} />
          <Stack.Screen name='BayarKasUser' component={BayarKasUser} options={{ headerTitle: 'Bayar Kas'}} />
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

