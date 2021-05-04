import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from './screens/OrdersScreen'
import OrderScreen from './screens/OrderScreen'

import { Provider as AuthProvider } from './context/AuthContext';


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{
        width: 50,
        height: 50,
      }}
      // source={require('./assets/bestbuy-logo-wh.png')}
      source={{
        uri: './assets/bestbuy-logo-wh.png',
      }}
    />
  );
}

function App() {
  return (// name on Stack.Screen is the tab name
    <AuthProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrdersScreen">
        <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          // headerTitle: props => <LogoTitle {...props} />,
          title: "Orders Ready for Pickup",
          headerStyle: {
            backgroundColor: '#0A4ABF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        /> 
        <Stack.Screen
        name="OrderScreen"
        component={OrderScreen} 
        options={{
          title: "Your Order",
          headerStyle: {
            backgroundColor: '#0A4ABF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        /> 

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>

  );
}

export default App;