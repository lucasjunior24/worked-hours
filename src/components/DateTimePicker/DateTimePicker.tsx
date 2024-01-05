import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../Button';
import { getDateByHour, getHoraAtual } from '../../utils/uteis';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const MyTimePicker = ({childToParent, voltaDoIntervalo, color, light}: any) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [hour, setHour] = useState(voltaDoIntervalo ? voltaDoIntervalo : getHoraAtual);
  console.log("HORA : ", hour)
  const [hora, minuto] = hour.split(":")
  const [date, setDate] = useState(voltaDoIntervalo ? getDateByHour(Number(hora), Number(minuto)) : new Date(Date.now()));
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
    }
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <View style={styles.container} >
      {!isPickerShow && 
        (
          <TouchableOpacity onPress={showPicker} style={{backgroundColor: color ? color : '#fff', ...styles.button}} >
            <Text style={{color: color ? '#fff': '#000'}}>{voltaDoIntervalo ? voltaDoIntervalo : hour}</Text>
          </TouchableOpacity>
        )
      }
      {isPickerShow && (
        <DateTimePicker
          value={date}
          display={'spinner'}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
          positiveButton={{label: 'OK', textColor: 'green'}}
          negativeButton={{label: 'Cancelar', textColor: 'red'}}
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
    padding: 14,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button: {
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
});
