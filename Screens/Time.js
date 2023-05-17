import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ClockPage = () => {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  const handleTimeIn = () => {
    const time = new Date().toLocaleTimeString();
    setTimeIn(time);
  };

  const handleTimeOut = () => {
    const time = new Date().toLocaleTimeString();
    setTimeOut(time);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/time.png')} style={styles.clockImage} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTimeIn}>
          <Text style={styles.buttonText}>Time In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTimeOut}>
          <Text style={styles.buttonText}>Time Out</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellTitle}>Time In</Text>
          <Text style={styles.cellValue}>{timeIn}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellTitle}>Time Out</Text>
          <Text style={styles.cellValue}>{timeOut}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop:-350
  },
  clockImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginleft:10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingVertical: 10,
  },
  cellTitle: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 100,
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
    alignContent:'center'
  },
  cell: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#333',
    alignContent:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#11999E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cellValue:{
    justifyContent: 'center',

  }
});

export default ClockPage;

// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// const ClockPage = () => {
//   const [timeIn, setTimeIn] = useState('');
//   const [timeOut, setTimeOut] = useState('');

//   const handleTimeIn = () => {
//     const time = new Date().toLocaleTimeString();
//     setTimeIn(time);
//   };

//   const handleTimeOut = () => {
//     const time = new Date().toLocaleTimeString();
//     setTimeOut(time);
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('./assets/time.png')} style={styles.clockImage} />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleTimeIn}>
//           <Text style={styles.buttonText}>Time In</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleTimeOut}>
//           <Text style={styles.buttonText}>Time Out</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.table}>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text style={styles.cellTitle}>Time In</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.cellValue}>{timeIn}</Text>
//           </View>
//         </View>
//         <View style={styles.row}>
//           <View style={styles.cell}>
//             <Text style={styles.cellTitle}>Time Out</Text>
//           </View>
//           <View style={styles.cell}>
//             <Text style={styles.cellValue}>{timeOut}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     marginTop: -350,
//   },
//   clockImage: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//     marginLeft: 10,
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#999',
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#999',
//   },
//   cell: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   cellTitle: {
//     backgroundColor: '#F0F0F0',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   cellValue: {
//     textAlign: 'center',
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#11999E',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
// });

// export default ClockPage;
