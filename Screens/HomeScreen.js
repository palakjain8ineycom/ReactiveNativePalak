import React from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function TopBar({ navigation }) {
  return (
    <View style={styles.topBar}>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave Application')}>
        <Text style={styles.tileText}>Create Leave</Text>
          <Image source={require("./assets/createleave.png")} style={[styles.tile, { width: 150, height: 150 }]} />
    
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave List')}>
        <Text style={styles.tileText}>My Leaves</Text>
          <Image source={require("./assets/myleave.png")} style={[styles.tile, { width: 150, height: 150 }]}/>
          
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.tile, styles.chatbotTile]} onPress={() => navigation.navigate('ChatBot')}>
        <Image source={require("./assets/cbot.png")} style={styles.chatbotImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor:'#333333'
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  tilesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 100,

  },
  tile: {
    width: '50%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 10,
    marginHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
     marginVertical: 5,
    // marginHorizontal:10,
    textAlign:'center',
    flexWrap: 'wrap', 

  },
  chatbotTile: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffe600',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatbotImage: {
    width: 40,
    height: 40,
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










// import React from 'react';
// import { Animated, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// function Logo() {
//   return <Image source={require("./assets/logo.png")} style={styles.logo} />;
// }

// function TopBar() {
//   return (
//     <View style={styles.topBar}>
//       <Logo />
//       <Text style={styles.title}>Leave Application</Text>
//       <Text style={styles.title}>My Leaves</Text>
//     </View>
//   );
// }

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave Application')}>
//         <Text style={styles.tileText}>Leave Application</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Leave List')}>
//         <Text style={styles.tileText}>My Leaves</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.tile, styles.chatbotTile]} onPress={() => navigation.navigate('ChatBot')}>
//         <Image source={require("./assets/cbot.png")} style={styles.chatbotImage} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     marginBottom: 20,
//     color:"#cccccc",
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   tile: {
//     width: '80%',
//     height: 150,
//     backgroundColor: '#ffe600',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tileText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   chatbotTile: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#ffe600',
//     borderRadius: 50,
//     width: 70,
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chatbotImage: {
//     width: 40,
//     height: 40,
//   },
// });

// export default HomeScreen;