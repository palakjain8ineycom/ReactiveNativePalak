
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ChatBot from './Screens/ChatBot';
import LeaveApplication from './Screens/LeaveApplication';
import LeaveList from './Screens/LeaveList';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 40, height: 40, marginLeft: 10 }}
      source={require('./assets/EY-white-logo.png')}
    />
  );
};

const BackAndLogoButtons = ({ navigation }) => {
  return (
    <View style={styles.headerButtons}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const LogoutButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Login Page')}
      style={styles.headerButtons}
    >
      <Ionicons name="exit" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: () => <LogoTitle />,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: '#fff',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        >
          <Stack.Screen
            name="Login Page"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'MyAssist',
            }}
          />
          <Stack.Screen
            name="Leave Application"
            component={LeaveApplication}
            options={({ navigation }) => ({
              headerTitle: 'Apply Leave',
              headerLeft: () => (
                <BackAndLogoButtons navigation={navigation} />
              ),
              headerRight: () => <LogoutButton navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="ChatBot"
            component={ChatBot}
            options={({ navigation }) => ({
              headerTitle: 'Chatbot',
              headerLeft: () => (
                <BackAndLogoButtons navigation={navigation} />
              ),
              headerRight: () => <LogoutButton navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Leave List"
            component={LeaveList}
            options={({ navigation }) => ({
              headerTitle: 'My Leaves',
              headerLeft: () => (
                <BackAndLogoButtons navigation={navigation} />
              ),
              headerRight: () => <LogoutButton navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 3, 
  },
  header: {
    backgroundColor: '#333333',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
})
















// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import HomeScreen from './Screens/HomeScreen';
// import LoginScreen from './Screens/LoginScreen';
// import ChatBot from './Screens/ChatBot';
// import LeaveApplication from './Screens/LeaveApplication';
// import LeaveList from './Screens/LeaveList';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login Page" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Leave Application" component={LeaveApplication} />
//         <Stack.Screen name="ChatBot" component={ChatBot} />
//         <Stack.Screen name="Leave List" component={LeaveList} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
