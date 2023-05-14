import React, { useState ,useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { AntDesign } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";
import Calendar from "react-native-calendars/src/calendar";

console.reportErrorsAsExceptions = false;

function LeaveForm() {
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orcName, setOrcName] = useState("");


  const renderArrow = (direction) => (
    <MaterialIcons
      name={direction === "left" ? "chevron-left" : "chevron-right"}
      size={30}
      color="black"
    />
  );

  useEffect(() => {
    fetch('http://192.168.29.245:3000/persondetails', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      setOrcName(data['orcname']);
      // console.log(orcName);
    })
  }, []);
  

  const handleSubmit = () => {
    fetch("http://192.168.29.245:3000/leavepost",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeNumber: orcName,
          leaveType: leaveType,
          reason: reason,
          startDate: startDate,
          endDate: endDate,
        }),
      })
      .then((response) => response.json())
      .then(data => {

        if (data["status"] == "success") {
          console.log(data)
          alert("Your leave has been submitted successfully")
          // navigation.navigate("Home");
        }
        else {
          console.log(data)
          alert("Incorrect Data")
        }
      })
  };

  return (
    <View style={styles.container}>
      {/* <TopBar /> */}
      <View style={styles.form}>
        <Text style={styles.label}>Employee Number *</Text>
        <Text style={styles.input}>{orcName}</Text>
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
        <TouchableOpacity
          onPress={() => setShowStartModal(true)}
          style={styles.selectDateButton}
        >
          <Text style={styles.selectDateButtonText}>
            {startDate ? `${startDate}` : "Enter the Start Date"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          onPress={() => setShowEndModal(true)}
          style={styles.selectDateButton}
        >
          <Text style={styles.selectDateButtonText}>
            {endDate ? ` ${endDate}` : "Enter the End Date "}
          </Text>
        </TouchableOpacity>
        <Button
          title="Submit"
          onPress={handleSubmit}
          color="#30E3CA"
        // Set the color prop to the desired color
        />
        <Modal visible={showStartModal} animationType="fade">
          <Calendar
            style={styles.calendar}
            renderArrow={renderArrow}
            onDayPress={(day) => {
              setStartDate(day.dateString);
              setShowStartModal(false);
            }}
          />
        </Modal>
        <Modal visible={showEndModal} animationType="fade">
          <Calendar
            style={styles.calendar}
            renderArrow={renderArrow}
            onDayPress={(day) => {
              setEndDate(day.dateString);
              setShowEndModal(false);
            }}
          />
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 16,
  },
  
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 16,
    color: "#000000",
  },
  form: {
    padding: 16,
    backgroundColor:'white',
    justifyContent:'center',
    marginTop:60,
    borderRadius:25,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#000000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderColor: "#000",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "#575756ff",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#000",
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
    borderColor: "30E3CA",
  },
  calendar: {
    borderRadius: 100,
    borderColor: "#000",
    margin: 70,
    marginTop:230,
    height: 60,
    width: 250,
    alignContent: "center",
    fontWeight: 'bold',
  },
  Picker: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    marginTop: 20,
    padding: 10,

  },
  selectDateButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "#575756ff",

  },
  selectDateButtonText: {
    color: "black",
    fontSize: 15,

  },
});
export default LeaveForm;