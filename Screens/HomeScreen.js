
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { AntDesign } from "@expo/vector-icons";
import 'react-native-gesture-handler';


console.reportErrorsAsExceptions = false;

function Logo() {
  return <Image source={require("./assets/logo.png")} style={styles.logo} />;
}

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Logo />
      <Text style={styles.title}>Leave Application</Text>
    </View>
  );
}

function LeaveForm() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    fetch("https://fa-equm-test-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/11.13.18.05/absences", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeNumber: employeeNumber,
        leaveType: leaveType,
        reason: reason,
        startDate: startDate,
        endDate: endDate,
      }),
    })
      // .then((response) => response.json())
      // .then((data) => {
      //   Alert.alert("Your Leave has been submitted successfully");
      // })
      // .catch((error) => {
      //   Alert.alert(error.message);
      // });
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.form}>
        <Text style={styles.label}>Employee Number *</Text>
        <TextInput
          style={styles.input}
          value={employeeNumber}
          onChangeText={setEmployeeNumber}
          keyboardType="numeric"
          placeholder="Enter employee number"
          maxLength={10}
          required
        />
        <Text style={styles.label}>Leave Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={leaveType}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
        >
          <Picker.Item label="Select Leave Type" value="" />
          <Picker.Item
            label="Absence Regularization"
            value="Absence Regularization"
          />
          <Picker.Item label="Bereavement Leave" value="Bereavement Leave" />
          <Picker.Item label="COVID Leave" value="COVID Leave" />
          <Picker.Item
            label="Casual cum Sick Leave (CL)"
            value="Casual cum Sick Leave (CL)"
          />
          <Picker.Item
            label="Comp off - Accrual / Credit"
            value="Comp off - Accrual / Credit"
          />
          <Picker.Item label="Loss of Pay" value="Loss of Pay" />
          <Picker.Item label="On Duty" value="On Duty" />
          <Picker.Item
            label="Privilege Leave (PL)"
            value="Privilege Leave (PL)"
          />
          <Picker.Item label="Relocation" value="Relocation" />
          <Picker.Item label="Special Leave" value="Special Leave" />
        </Picker>

        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.input}
          value={reason}
          onChangeText={setReason}
          maxLength={100}
          placeholder="Enter leave reason"
          required
        />

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="Select start date"
          required
        />

        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={setEndDate}
          placeholder="Select end date"
          required
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          color="#000000"
          // Set the color prop to the desired color
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFFff",
    padding: 16,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 16,
    color: "#000000",
  },
  form: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#000000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "#575756ff",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#575756ff",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "#575756ff",
  },
  submitBtn: {
    padding: 8,
    borderRadius: 4,
  },
  inputFocused: {
    borderColor: "yellow",
  },
});
export default LeaveForm;

