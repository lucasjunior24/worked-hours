import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../Button';

export const MyTimePicker = ({childToParent}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [hour, setHour] = useState('00:00');
  const showPicker = () => {
    setIsPickerShow(true);
  };


  function padTo2Digits(num) {
    return String(num).padStart(2, '0');
  }
  const onChange = (event, value) => {
    let data = new Date(value)
    console.log(data);
    const hoursAndMinutes = padTo2Digits(data.getHours()) + ':' + padTo2Digits(data.getMinutes());
    console.log(hoursAndMinutes);
    setHour(hoursAndMinutes);
    setDate(data)
    childToParent(hoursAndMinutes)
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isPickerShow && (
      <View style={styles.pickedDateContainer}>
        <Button title={hour} color="#fff" light style={styles.pickedDate} onPress={showPicker} >

        </Button>
      </View>
      )
      }
      {isPickerShow && (
        <DateTimePicker
          value={date}
          display={'spinner'}
          mode={'time'}
          themeVariant='light'
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
        />
        
      )}
    </View>
  );
};

// Kindacode.com
// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  pickedDateContainer: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
    padding: 36,
    backgroundColor: '#888',
    borderRadius: 10,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'red'
  },
});
