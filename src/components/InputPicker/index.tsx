import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Alert, TextInputProps } from 'react-native';

import {StyleSheet, View, Text, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateByHour, getHoraAtual } from '../../utils/uteis';

import { 
  Container, 
  IconContainer,
  InputText 
} from './styles';

interface Props {
  iconName: React.ComponentProps<typeof Entypo>['name']
  value?: string;
  childToParent: (time: string) => void;
}

export function InputPicker({
  iconName,
  value,
  childToParent,
  ...rest
  }: Props) {

  const [isFocused, setFIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();
  
  function handleInputFocus() {

      setFIsFocused(true);
      showPicker()
    // } else {
    //   handleInputBlur()
    //   closePicker()
    // }
  }
  function handleInputBlur() {
    setFIsFocused(false);
    setIsFilled(!!value);
  }

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [hour, setHour] = useState('Tempo de almoço');
  console.log("HORA : ", hour)
  const [hora, minuto] = hour.split(":")
  const [date, setDate] = useState(new Date(Date.now()))
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const closePicker = () => {
    setIsPickerShow(false);
  };
  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  const onChange = (event: any, value: any) => {
    let data = new Date(value)
    if (isFocused) {

      const hoursAndMinutes = padTo2Digits(data.getHours()) + ':' + padTo2Digits(data.getMinutes());
      if(event.type !== "dismissed") {
        setHour(hoursAndMinutes);
        setDate(data)
        childToParent(hoursAndMinutes)
        console.log(hoursAndMinutes)
      }
      if (Platform.OS === 'android') {
        setIsPickerShow(false);
      } 
    }
  };
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Entypo 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onPress={handleInputFocus}
      >{hour}</InputText>

    {isPickerShow && (
        <DateTimePicker
          value={date}
          display={'spinner'}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          onTouchEnd={closePicker}
          style={styles.datePicker}
          positiveButton={{label: 'OK', textColor: 'green'}}
          negativeButton={{label: 'Cancelar', textColor: 'red'}}
        />
      )}  
    </Container>
  );
}

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
});
