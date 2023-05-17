import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Table, Row, Cell } from 'react-native-table-component';

const LeaveList = () => {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    fetchLeaveListData();
  }, []);

  const fetchLeaveListData = async () => {
    try {
      const response = await fetch('http://192.168.29.245:3000/leavelist');
      const data = await response.json();
      setLeaveData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView  vertical={true}>
      <ScrollView  horizontal={true}>
      
      <View>
        {leaveData.length > 0 ? (
          <Table style={{marginTop:10, marginLeft:10, marginRight: 10}}>
            <Row
              data={['Start Date', 'End Date', 'Absence Reason', 'Absence Status', 'Approval Status']}
              style={{ height: 40, backgroundColor: '#30E3CA' }}
              textStyle={{ margin: 5, fontWeight: 'bold' }}
              widthArr={[100, 100, 120, 120, 120]} 
            />
            {leaveData.map((item, index) => (
              <Row
                key={index}
                data={[
                  item.startDate,
                  item.endDate,
                  item.absencereason,
                  item.absenceStatusCd,
                  item.approvalStatusCd,
                ]}
                textStyle={{ margin: 5 }}
                widthArr={[100, 100, 120, 120, 120]} 
                style={{ height: 40,borderColor:'grey',borderWidth:0.5 }}
              />
            ))}
          </Table>
        ) : (
          <Text>Loading My Leaves data...</Text>
        )}
      </View>
      </ScrollView>
    </ScrollView>
  );
};

export default LeaveList;

