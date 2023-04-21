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

  const [entradaHoraOne, setEntradaHoraOne] = useState('');
  const [saidaOne, setSaidaOne] = useState('');
  const [horasTrabalhadasOne, setHorasTrabalhadasOne] = useState('');
  const [voltaDoIntervalo, setVoltaDoIntervalo] = useState('');

  const [horasRestanteDeTrabalho, setHorasRestanteDeTrabalho] = useState('');
  const [horaSaida, setHoraSaida] = useState('');

  const getVoltaDoIntervaloParent = (childdata: string) => {
    setVoltaDoIntervalo(childdata);
    calcularSaida(childdata)
  }

  const getEntradaHoraOneParent = (childdata: string) => {
    setEntradaHoraOne(childdata);
    console.log("childdata", childdata)
    console.log("entradaHoraOne", entradaHoraOne)
    calcularHoras(childdata, saidaOne)
  }

  const getSaidaOneParent = (childdata: string) => {
    setSaidaOne(childdata);
    calcularHoras(entradaHoraOne, childdata)
  }

  function obterDiferencaDeHoras(dtChegada: string, dtPartida: string) {
    var ms = moment(dtPartida,"HH:mm").diff(moment(dtChegada,"HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    return s
  }

  function somarHoras(hora_a: string, hora_b: any = 1) {
    var horas_somadas = moment(hora_a,"HH:mm").add(hora_b, "hours").format("HH:mm")
    return horas_somadas
  }

  
  function calcularSaida(nova_voltaDoIntervalo: string) {
    console.log("nova_voltaDoIntervalo")
    console.log(nova_voltaDoIntervalo)
    var horas_somadas = somarHoras(nova_voltaDoIntervalo, horasRestanteDeTrabalho)
    console.log("Eu saio as ", horas_somadas)
    setHoraSaida(horas_somadas)
  }

  function calcularHoras(dtChegada: string, dtPartida: string) {
    console.log("PARTIDA: ", dtPartida)
    if(dtPartida) {
      var horas_somadas = somarHoras(dtPartida)
      console.log(horas_somadas)
      const horasTrabalhadasOne = obterDiferencaDeHoras(dtChegada, dtPartida)
      if (horasTrabalhadasOne.includes(":")) {
        setHorasTrabalhadasOne(horasTrabalhadasOne)
        const horasRestanteDeTrabalho = obterDiferencaDeHoras(horasTrabalhadasOne, "08:13")
        setHorasRestanteDeTrabalho(horasRestanteDeTrabalho)
        if (horas_somadas.includes(":")) {
          setVoltaDoIntervalo(horas_somadas)
        }
        var hora_saida = moment(horas_somadas,"HH:mm").add(horasRestanteDeTrabalho, "hours").format("HH:mm")
        console.log("Eu saio as ", hora_saida)
        setHoraSaida(hora_saida)
      }
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
              {voltaDoIntervalo &&
                (
                  <>
                    {/* Sua volta do almoço será <Text style={{backgroundColor: 'red'}}> {voltaDoIntervalo} </Text> */}
                    <Form>
                      <FormTitle>Sua volta do almoço será</FormTitle>
                      <Main>
                        <MyTimePicker childToParent={getVoltaDoIntervaloParent} voltaDoIntervalo={voltaDoIntervalo} />
                      </Main>
                    </Form>
                  </>
                )
              }

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