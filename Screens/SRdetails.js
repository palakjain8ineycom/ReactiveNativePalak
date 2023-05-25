import React, { useEffect, useState } from "react";

import { View, Text, ScrollView } from "react-native";

import { Table, Row } from "react-native-table-component";

const SRdetails = () => {
  const [srDetailsData, setSRDetailsData] = useState([]);

  useEffect(() => {
    fetchSRDetailsData();
  }, []);

  const fetchSRDetailsData = async () => {
    try {
      const response = await fetch("http://192.168.29.245:5000/srdetails");

      const data = await response.json();

      setSRdetailsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView vertical={true}>
      <ScrollView horizontal={true}>
        <View>
          {srdetailsData.length > 0 ? (
            <Table style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
              <Row
                data={["Title", "Reported By", "Severity", "Business Unit"]}
                style={{ height: 30, backgroundColor: "#30E3CA" }}
                textStyle={{ margin: 5, fontWeight: "bold" }}
                widthArr={[300, 200, 200, 100, 150]}
              />

              {srdetailsData.map((item, index) => (
                <Row
                  key={index}
                  data={[
                    item.Title,

                    item.ReportedByPartyName,

                    item.SeverityCdMeaning,

                    item.BusinessUnitName,
                  ]}
                  textStyle={{ margin: 5 }}
                  widthArr={[300, 200, 200, 100, 150]}
                  style={{ height: 35, borderColor: "grey", borderWidth: 0.5 }}
                />
              ))}
            </Table>
          ) : (
            <Text>Loading SR Details...</Text>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default SRdetails;
