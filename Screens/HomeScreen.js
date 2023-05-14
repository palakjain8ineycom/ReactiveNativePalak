
import { Animated, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState ,useEffect} from "react";

function TopBar({ navigation, personName }) {
  return (
    <View style={styles.TopBar}>
      <Text style={styles.title}>Welcome, {personName} !</Text>
    </View>
);
}


const HomeScreen = ({ navigation }) => {

  const [personName, setPersonName] = useState("");

  useEffect(() => {
    fetch('http://192.168.29.245:3000/persondetails', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setPersonName(data['personname']);
      })
  }, []);

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} personName={personName} />
      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave Application')}>
          <Image source={require("./assets/createleave.png")} style={[styles.tile, { width: 150, height: 150,  resizeMode: 'contain',  marginBottom:0 ,marginVertical:20}]} />
          <Text style={styles.tileText}>Apply Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave List')}>
          <Image source={require("./assets/myleave.png")} style={[styles.tile, { width: 150, height: 150,resizeMode: 'contain',  marginBottom:0 ,marginVertical:20 }]}/>
          <Text style={styles.tileText}>My Leaves</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.tile, styles.chatbotTile]} onPress={() => navigation.navigate('ChatBot')}>
        <Image source={require("./assets/chatbot2.png")} style={styles.chatbotImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:-80,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    height:'7%',
    backgroundColor:'#11999E',
    fontSize:1,
    marginVertical:1,
    
    
  },
  

  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginVertical:1,
    // backgroundColor:'grey'
    marginHorizontal:10,
    alignItems:'center',
    fontStyle:'italic',
    
    
  },
  tilesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 100,
    

  },
  tile: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 75, // Half of width or height
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tileText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 1,
    marginHorizontal:5,
    textAlign:'center',
    flexWrap: 'wrap', 

  },
  
  chatbotTile: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
    marginRight:1,
  },

  chatbotImage: {
    width: 90,
    height: 90,
  },

  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  logout: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
