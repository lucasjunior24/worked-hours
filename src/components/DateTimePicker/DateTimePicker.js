import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../Button';

export const MyTimePicker = ({childToParent}) => {
  let hoje = new Date(Date.now())
  const hoursAndMinutes = padTo2Digits(hoje.getHours()) + ':' + padTo2Digits(hoje.getMinutes());

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(hoje);
  const [hour, setHour] = useState(hoursAndMinutes);
  const showPicker = () => {
    setIsPickerShow(true);
  };

  function padTo2Digits(num) {
    return String(num).padStart(2, '0');
  }

  const onChange = (event, value) => {
    let data = new Date(value)

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
      {!isPickerShow && 
        (
          <Button title={hour} color="#fff" light onPress={showPicker} />
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
  // pickedDate: {
  //   fontSize: 18,
  //   color: 'black',
  //   padding: 36,
  //   backgroundColor: '#888',
  //   borderRadius: 10,
  // },
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
