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
  const [voltaDoIntervalo, setVoltaDoIntervalo] = useState('');

  // const [saidaTwo, setSaidaTwo] = useState('');

  const [horaSaida, setHoraSaida] = useState('');
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
  function obterDiferencaDeHoras(dtChegada: string, dtPartida: string) {
    var ms = moment(dtPartida,"HH:mm").diff(moment(dtChegada,"HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    return s
  }

  function somarHoras(hora_a: string, hora_b: number = 1) {
    var horas_somadas = moment(hora_a,"HH:mm").add(hora_b, "hours").format("HH:mm")
    return horas_somadas
  }

  function calcularHoras(dtChegada: string, dtPartida: string) {
    console.log("____ partida_________")
    console.log(dtPartida)
    console.log("volta_almoco")

    var horas_somadas = somarHoras(dtPartida)

    console.log(horas_somadas)


    const horasTrabalhadasOne = obterDiferencaDeHoras(dtChegada, dtPartida)
    console.log(horasTrabalhadasOne)
    console.log("----------------------------------------------------------")
    console.log(horas_somadas.includes(":"))
    if (horasTrabalhadasOne.includes(":")) {
      setHorasTrabalhadasOne(horasTrabalhadasOne)
      const horasRestanteDeTrabalho = obterDiferencaDeHoras(horasTrabalhadasOne, "08:13")
      console.log(`Faltam ${horasRestanteDeTrabalho} horas de trabalho`)
      console.log(horasRestanteDeTrabalho)
      console.log(horas_somadas)

      var hora_saida = moment(horas_somadas,"HH:mm").add(horasRestanteDeTrabalho, "hours").format("HH:mm")
      // var hora_saida = somarHoras(horas_somadas, Number(horasRestanteDeTrabalho))
      console.log("Eu saio as ")

      console.log(hora_saida)
      setHoraSaida(hora_saida)
      // if (horasRestanteDeTrabalho.includes(":")) {
      //   setVoltaDoIntervalo(volta_almoco)
      // }
    }
    if (horas_somadas.includes(":")) {
      setVoltaDoIntervalo(horas_somadas)
    }
    
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <Container>
          <Header>
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
                <MyTimePicker childToParent={getSaidaOneParent} />
              </Main>
            </Form>
            <Title>
              {horasTrabalhadasOne &&
                (
                  <Text>
                   Horas Trabalhadas até o momento {horasTrabalhadasOne}
                  </Text>
                )
              }
            </Title>
            <Title>
              {voltaDoIntervalo &&
                (
                  <>
                   Sua volta do almoço será <Text style={{backgroundColor: 'red'}}> {voltaDoIntervalo} </Text>
                  </>
                )
              }
            </Title>
            <Title>
              {horaSaida &&
                (
                  <>
                   Você sairá <Text style={{backgroundColor: 'red'}}> {horaSaida} </Text>
                  </>
                )
              }
            </Title>
        </Container>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}