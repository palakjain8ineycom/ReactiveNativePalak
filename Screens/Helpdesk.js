import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { useNavigation } from "@react-navigation/native";

const Helpdesk = () => {
  const [helpDeskData, setHelpDeskData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHelpDeskData();
  }, []);

  const fetchHelpDeskData = async () => {
    try {
      const response = await fetch("http://192.168.29.245:5000/helpdesk");
      const data = await response.json();
      setHelpDeskData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSRNumberPress = (srNumber) => {
    navigation.navigate("SRdetails", { srNumber });
    fetch("http://192.168.29.245:5000/srdetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SrNumber: srNumber,
      }),
    });
  };

  const getRowStyle = (rowData, index) => {
    if (index % 2 === 0) {
      return styles.rowEven;
    }
    return styles.rowOdd;
  };

  return (
    <ScrollView vertical={true}>
      <ScrollView horizontal={true}>
        <View>
          {helpDeskData.length > 0 ? (
            <Table style={styles.table}>
              <Row
                data={[
                  "Reference Number",
                  "Title",
                  "Creation Date",
                  "Status",
                  "Assigned to",
                ]}
                style={styles.headerRow}
                textStyle={styles.headerText}
                widthArr={[150, 180, 180, 95, 180]}
              />

              {helpDeskData.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    <TouchableOpacity
                      onPress={() => handleSRNumberPress(item.SrNumber)}
                    >
                      <Text style={styles.srNumber}>{item.SrNumber}</Text>
                    </TouchableOpacity>,
                    item.Title,
                    item.CreationDate,
                    item.StatusCdMeaning,
                    item.AssigneePersonName,
                  ]}
                  textStyle={styles.rowText}
                  widthArr={[150, 180, 180, 95, 180]}
                  style={[styles.row, getRowStyle(item, index)]}
                />
              ))}
            </Table>
          ) : (
            <Text>Loading Help Desk Data...</Text>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    table: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    headerRow: {
      height: 40,
      backgroundColor: "#30E3CA",
      paddingLeft:0,
    },
    headerText: {
      margin: 5,
      fontWeight: "bold",
    },
    row: {
      borderColor: "grey",
      borderWidth: 0.5,
      minHeight: windowHeight * 0.06, // Adjust this value as needed
    },
    rowEven: {
      backgroundColor: "#F5F5F5",
    },
    rowOdd: {
      backgroundColor: "white",
    },
    rowText: {
      margin: 5,
    },
    srNumber: {
      color: "darkblue",
      paddingLeft:10,
    },
  });
  
  export default Helpdesk;