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



const Stack = createStackNavigator();
const statusBarHeight = Constants.statusBarHeight
const DrawerStack = createDrawerNavigator();

const RincianKasScreen = () => (
    <Stack.Navigator >
        <Stack.Screen name='Rinciankas' component={RincianKassaya} options={{ headerShown: false}}/>
    </Stack.Navigator>
)

const ProfilScreen = () => (
   <Stack.Navigator >
       <Stack.Screen name='Profil' component={Profil} options={{ headerShown: false}}/>
   </Stack.Navigator>
);

const Home = () => (
    <DrawerStack.Navigator drawerStyle={styles.boxDrawer} drawerPosition='right' overlayColor='transparent'>
        <DrawerStack.Screen name='Home' component={Dashboard} options={{title: 'Home'}}/>
        <DrawerStack.Screen name='Rinciankas' component={RincianKasScreen} options={{title: 'Rincian Kas Saya'}} />
        <DrawerStack.Screen name='Profil' component={ProfilScreen} options={{title: 'Profil'}} />
        <DrawerStack.Screen name='Login' component={Login} options={{title: 'Log Out'}}/>
    </DrawerStack.Navigator>
);

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View style = {styles.bar}/>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle:{backgroundColor:'#3C6AE1'}, headerTintColor: 'white', headerTitleStyle :{fontWeight: 'bold', fontSize: 22} }}>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false}} />
          <Stack.Screen name='Jumlahanggota' component={Jumlahanggota} options={{ headerTitle: 'Data Angota'}} />
          <Stack.Screen name='Kasmasuk' component={Kasmasuk} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='Kaskeluar' component={Kaskeluar} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='BayarKas' component={Bayarkas} options={{ headerTitle: 'Bayar Kas'}} />
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

