import React from "react";
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

console.reportErrorsAsExceptions = false;

function Logo() {
  return <Image source={require("./assets/logo.png")} style={styles.logo} />;
}

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ alignItems: "center", marginBottom: 20 , width: 70, height: 70, marginTop: 50,}}>
        <Logo />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
          width: "80%",
          backgroundColor: "#fff",
        }}
        placeholder="Username"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
          width: "80%",
          backgroundColor: "#fff",
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "#000000", padding: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    // marginTop: 50,
  }
});