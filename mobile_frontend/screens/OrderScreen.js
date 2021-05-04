import React, { useContext,useState,useEffect } from 'react';
import { Platform,View, Text, StyleSheet ,FlatList,TouchableOpacity} from 'react-native';
import { Button, Overlay,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


const OrderScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [parkingLot, setParkingLot] = useState(null);
  const [description, setDescription] = useState(null);
  const [show, setShow] = useState(false);

    const { item } = route.params;
    const [ startTracking,setStartTracking ] = useState(false);
    let section2 = null;
    let section1 = <View style={styles.section1}>
    <Text style={styles.itemId}> {item.id} </Text>
    <Text style={styles.itemName}> {item.items} </Text>
    <Text style={styles.itemLocation}> Location: {item.location} </Text>
    <Text h1 style={[styles.remark, styles.remark0]}>Share your location for faster pickup service:</Text>
    <Button
title="Start my trip!"
buttonStyle={[styles.button, styles.button2]}
color="#0A4ABF"
onPress={() => {setStartTracking(true);setShow(true)
  styles.section1 = {
    display: "none",
  }
}

 }
/>

<Text h1 style={[styles.remark, styles.remark1]}>Or, enter how long it will take you to arrive here!</Text>
<Input
 placeholder="Number"
 
 onChangeText={value => {setDuration(value)}}
 style={styles.input}
/>

<Button
title="On my way!"
buttonStyle={[styles.button, styles.button3]}
color="#0A4ABF"
onPress={() => {
  styles.section1 = {
    display: "none",
  }
  console.log({minutes: parseInt(duration),location:item.location,id:item.id,items:item.items})
  
  if (parseInt(duration) > 15) {
    setTimeout(()=> axios.post(`http://localhost:5000/sendEmail`,{mins: 15,location:item.location,id:item.id,items:item.items}),(parseInt(duration)-15)*60*1000)
    setShow(true);
  } else {
    console.log("request sent")
    axios.post(`http://localhost:5000/sendEmail`,{mins: parseInt(duration),location:item.location,id:item.id,items:item.items}).then(
      res => (console.log(res))
    ).catch(err => console.log(err))
    setShow(true);
  }
}

 }
 
/>
</View>

    if(!show) { 
      section2 = null;

    }
    if(show){ 

      section2 = <View>
      <Text h1 style={[styles.remark, styles.remark2]}>Tell us which parking lot you are in!</Text>
      <Input
         placeholder="Parking lot number"
         onChangeText={value => setParkingLot(value)}
         style={styles.input}
        />
        <Text h1 style={[styles.remark, styles.remark3]}>Tell us a description of your car (optional)</Text>
        <Input
         placeholder="Model and colour"
         onChangeText={value => setDescription(value)}
         style={styles.input}
        />
        <Button
        title="I'm here!"
        buttonStyle={[styles.button, styles.button1]}
        color="#0A4ABF"
        onPress={async() => {
          console.log({id:item.id,parkingLot,description})
          await axios.post(`http://localhost:5000/sendParkingInfo`,{id:item.id,parkingLot,description});
        }
        
        
         }
         
      />
      </View>
    }
    
    const calculateTime = () => { 
      
    }

    useEffect(() => {
      console.log('hi')
      const _getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();
        let location = await Location.watchPositionAsync(
          {accuracy:Location.Accuracy.High,distanceInterval :10000},
          (loc) => {
            setLatitude(loc.coords.latitude)
            setLongitude(loc.coords.longitude)
          }
        );
         
      }
      if(startTracking) {
      _getLocationAsync()
      }
  }, [startTracking])
  useEffect(() => {
    
    const calculateDistance = async () => {
      if(longitude !=undefined && longitude !=null && latitude !=undefined && latitude !=null && item.location!=undefined && item.items!=undefined && item.id!=undefined){
        console.log({latitude,longitude,location:item.location,items:item.items,id:item.id})
      await axios.post(`http://localhost:5000/calculate`,{latitude,longitude:longitude,location:item.location,id:item.id,items:item.items});
      }
    }
    calculateDistance();
 }, [latitude,longitude]);
  
    let locationText = 'Waiting..';
    if (errorMsg) {
      locationText = errorMsg;
    } else if (location) {
      locationText = JSON.stringify(location);
    }
  return (
    
    <View style={styles.container}>
    {section1}

{section2}


<Text h1 style={styles.latLong}>{`${latitude}, ${longitude}`}</Text>

    </View>

  );
};


const styles = StyleSheet.create({
  section1: {
  },
  container: {
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  itemId: {
    display: "none",
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
  },
  itemName: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  itemLocation: {
    fontSize: 14,
    fontStyle: "italic",
    marginHorizontal: 10,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlignVertical: 'top',
  },
  remark: {
    marginTop: 30,
    fontSize: 16,
    marginHorizontal: 10,
  },
  remark0: {

  },
  remark1: {
    
  },
  remark2: {
    
  },
  remark3: {
    
  },
  latLong: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#0A4ABF",
  },
  button1: {

  },
  button2: {

  },
  button3: {

  },


});


export default OrderScreen;
