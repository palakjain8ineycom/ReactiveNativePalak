import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function App() {
    return (
        
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Leaves</DataTable.Title>
            <DataTable.Title>Start Date</DataTable.Title>
            <DataTable.Title>End Date</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Reason</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
  
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>
  
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>4</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>5</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>6</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>2023-05-05</DataTable.Cell>
            <DataTable.Cell>Casual Leave</DataTable.Cell>
            <DataTable.Cell>Vacation</DataTable.Cell>
            <DataTable.Cell>Approved</DataTable.Cell>
          </DataTable.Row>
  
        </DataTable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      paddingHorizontal: 30,
    },
  });