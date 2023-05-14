import React from "react";
import { useState, useRef,useEffect } from "react";
import { Animated, View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

console.reportErrorsAsExceptions = false;

function Logo() {
  return <Image source={require("./assets/LogoIcon.png")} style={styles.logo} />;
}

export default function LoginScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const zoomOut = useRef(new Animated.Value(1)).current;
  const [showLoginForm, setShowLoginForm] = useState(false); // added state to control the visibility of the login form
  const navigation = useNavigation();

  const handleLogin = (event) => {
    event.preventDefault();

    setIsLoading(true);

    fetch('http://192.168.29.245:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data["status"] == "correct") {
          console.log(data)
          console.log(username)
          console.log(password)
          // animate the logo out
          Animated.timing(zoomOut, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            // navigate to the Home screen
            navigation.navigate("Home");
            // reset the visibility of the login form and the scale of the logo
            setShowLoginForm(true);
            setUserName(""); 
            setPassword("");
            zoomOut.setValue(1);
          });
        }
        else {
          alert("Wrong username or password")
        }
      })
      .catch(error => alert(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // show the login form after 1 second
    const timeout = setTimeout(() => {
      setShowLoginForm(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Animated.View
          style={{
            transform: [{ scale: zoomOut }],
            alignItems: "center",
            marginBottom: 20,
            width: 70,
            height: 70,
            // justifyContent:'center',
            marginTop: showLoginForm ? 50 : 'auto',
            opacity: showLoginForm ? 0 : 1, // hide the logo if the login form is visible
          }}
        >
          <Logo />
        </Animated.View>
        {showLoginForm && (
          <Logo style={{ opacity: 0 }} /> // show the logo again, but hide it with opacity
        )}
      </View>
      {showLoginForm && (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUserName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonContainer}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:50,
    // justifyContent: "center",
    backgroundColor: "white"
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  formContainer: {
    width: "80%",
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderWidth: 1,
    borderColor: "#30E3CA"
  },
  input: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    width: "100%"
  },
  buttonContainer: {
    backgroundColor: "#30E3CA",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#11999E"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});