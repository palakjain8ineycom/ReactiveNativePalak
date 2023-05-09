import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
    <View>
      {leaveData.length > 0 ? (
        <Table>
          <Row
            data={['Leaves', 'Start Date', 'End Date', 'Duration', 'Absence Status', 'Approval Status']}
            style={{ height: 40, backgroundColor: '#f1f8ff' }}
            textStyle={{ margin: 6, fontWeight: 'bold' }}
          />
          {leaveData.map((item, index) => (
            <Row
              key={index}
              data={[
                index + 1, 
                item.startDate,
                item.endDate,
                item.duration,
                item.absenceStatusCd,
                item.approvalStatusCd,
              ]}
              textStyle={{ margin: 6 }}
            />
          ))}
        </Table>
      ) : (
        <Text>Loading leave data...</Text>
      )}
    </View>
  );
};

export default LeaveList;