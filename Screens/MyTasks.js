import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const TaskList = () => {
  const [leaveData, setLeaveData] = useState([]);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;


  useEffect(() => {
    fetchLeaveListData();
  }, []);

  const fetchLeaveListData = async () => {
    try {
      const response = await fetch('http://192.168.29.245:5000/tasklist');
      const data = await response.json();
      setLeaveData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ScrollView vertical={true}>
      <ScrollView horizontal={true}>
        <View>
          {leaveData.length > 0 ? (
            <Table style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
              <Row
                data={['Task', 'Assigned Date']}
                style={{ height: windowHeight * 0.05, backgroundColor: '#30E3CA' }}
                textStyle={{ margin: 5, fontWeight: 'bold' }}
                widthArr={[windowWidth * 0.9, windowWidth * 0.4]}
              />
              {leaveData.map((item, index) => (
                <Row
                  key={index}
                  data={[item.title, item.assignedDate]}
                  textStyle={{ margin: 5 }}
                  widthArr={[windowWidth * 0.9, windowWidth * 0.4]}
                  style={{ height: 60, borderColor: 'grey', borderWidth: 0.5 }}
                />
              ))}
            </Table>
          ) : (
            <Text>Loading My Tasks...</Text>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default TaskList;
