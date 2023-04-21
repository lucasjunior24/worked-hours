import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../Button';

export const MyTimePicker = ({childToParent, voltaDoIntervalo}: any) => {
  let hoje = new Date(Date.now())
  const hoursAndMinutes = padTo2Digits(hoje.getHours()) + ':' + padTo2Digits(hoje.getMinutes());

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(hoje);
  const [hour, setHour] = useState(voltaDoIntervalo ? voltaDoIntervalo : '');

  const showPicker = () => {
    setIsPickerShow(true);
  };

  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  const onChange = (event: any, value: any) => {
    let data = new Date(value)
    const hoursAndMinutes = padTo2Digits(data.getHours()) + ':' + padTo2Digits(data.getMinutes());
    if(event.type !== "dismissed") {
      setHour(hoursAndMinutes);
      setDate(data)
      childToParent(hoursAndMinutes)
      if (Platform.OS === 'android') {
        setIsPickerShow(false);
      }
    }
    setIsPickerShow(false);
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'red'
  },
});
