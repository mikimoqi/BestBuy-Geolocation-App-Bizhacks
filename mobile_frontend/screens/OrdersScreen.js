import React, { useContext,useState,useEffect } from 'react';
import { View, StyleSheet, Text ,FlatList,TouchableOpacity} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const OrdersScreen = ({navigation}) => {
  const [ orders, setOrders ] = useState(0);
  const [ modalVisible, setModalVisible ] = useState(true);

   useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://bestbuy-database-default-rtdb.firebaseio.com/orders.json');
      setOrders(response.data)

  
    }
    fetchData()
  },[]);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={({item} ) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderScreen', {item})}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                 Order {item.id+1} 
                                  </Text>

              </View>
            </TouchableOpacity>
          );
        }}
      />

    </View>
  );
};



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default OrdersScreen;
