import React, { useState, useEffect } from 'react';
import moment from 'moment'
// import { useNavigation } from '@react-navigation/native'
// import * as Yup from 'yup';
import { Text } from 'react-native';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  FlatList
} from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Bullet } from '../../components/Bullet';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  Main,
  Form,
  FormTitle
} from './styles';
import {MyTimePicker} from '../../components/DateTimePicker/DateTimePicker';

export function Home() {
  // function range(start: number, end: number) {
  //   return Array.apply(0, Array(end - 1))
  //     .map((element, index) => index + start);
  // }
  // let horas = range(0, 60)
  // let minutos = range(0, 60)
  // console.log(horas)
  // console.log(minutos)
  const [entradaHoraOne, setEntradaHoraOne] = useState('');
  const [saidaOne, setSaidaOne] = useState('');
  const [horasTrabalhadasOne, setHorasTrabalhadasOne] = useState('');
  // const [entradaTwo, setEntradaTwo] = useState('');
  // const [saidaTwo, setSaidaTwo] = useState('');

  // const [data, setData] = useState('');
  
  
  const getEntradaHoraOneParent = (childdata: string) => {
    setEntradaHoraOne(childdata);
    calcularHoras(entradaHoraOne, saidaOne)
  }

  const getSaidaOneParent = (childdata: string) => {
    setSaidaOne(childdata);
    calcularHoras(entradaHoraOne, saidaOne)
  }
  
  function calcularHoras(dtChegada: string, dtPartida: string) {
    // var dtChegada  = "07:00";
    // var dtPartida = "11:20";
  
    var ms = moment(dtPartida,"HH:mm").diff(moment(dtChegada,"HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    console.log(s)
    console.log(s.includes(":"))
    if (s.includes(":")) {
      setHorasTrabalhadasOne(s)
    }
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            {/* <BackButton onPress={handleBack} /> */}
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Informe as horas{'\n'}
            de batida de ponto
          </Title>
            <Form>
              <FormTitle>Que horas você entrou?</FormTitle>
              <Main>
                <MyTimePicker childToParent={getEntradaHoraOneParent} />
                <MyTimePicker childToParent={getSaidaOneParent}  />
              </Main>
            </Form>
            <Title>
              {horasTrabalhadasOne &&
                (
                  <Text>
                   {horasTrabalhadasOne}
                  </Text>
                )
              }
            </Title>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}