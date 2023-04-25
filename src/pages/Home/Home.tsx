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
  const [horasRestanteDeTrabalho, setHorasRestanteDeTrabalho] = useState('');
  const [horasTrabalhadasTotal, sethorasTrabalhadasTotal] = useState('');


  const [tempoIntervalo, setTempoIntervalo] = useState('');
  const [voltaDoIntervalo, setVoltaDoIntervalo] = useState('');
  const [horaSaida, setHoraSaida] = useState('');


  const getEntradaHoraOneParent = (childdata: string) => {
    setEntradaHoraOne(childdata);
    console.log("childdata", childdata)
    if (voltaDoIntervalo) {
      console.log("voltaDoIntervalo : ", voltaDoIntervalo)
      calcularHorasUpdate(childdata, saidaOne)
    }
    calcularHoras(childdata, saidaOne)
  }

  const getSaidaOneParent = (childdata: string) => {
    setSaidaOne(childdata);
    if (voltaDoIntervalo) {
      calcularHorasUpdate(entradaHoraOne, childdata)
    }
    calcularHoras(entradaHoraOne, childdata)
  }

  const getVoltaDoIntervaloParent = (childdata: string) => {
    setVoltaDoIntervalo(childdata);
    calcularSaida(childdata)
    getTotalDeHorasTrabalhadas()
  }

  function obterDiferencaDeHoras(dtChegada: string, dtPartida: string) {
    var ms = moment(dtPartida,"HH:mm").diff(moment(dtChegada,"HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    return s
  }

  function somarHoras(hora_a: string, hora_b: string | number) {
    var horas_somadas = moment(hora_a,"HH:mm").add(hora_b, "hours").format("HH:mm")
    return horas_somadas
  }

  function getTotalDeHorasTrabalhadas() {
    console.log("entra da Hora One: ", horasTrabalhadasOne)
    console.log("horas Restante De Trabalho: ", horasRestanteDeTrabalho)
    var horas_trabalhadas = somarHoras(horasTrabalhadasOne, horasRestanteDeTrabalho)
    console.log("horas_trabalhadas: ", horas_trabalhadas)
    sethorasTrabalhadasTotal(horas_trabalhadas)

  }

  function getVoltaDoIntervalo(dtPartida: string, dtChegada: string | number = 1) {
    console.log("PARTIDA: ", dtPartida)
    if(dtPartida) {
      var horas_somadas = somarHoras(dtPartida, dtChegada)
      if (horas_somadas.includes(":")) {
        setVoltaDoIntervalo(horas_somadas)
        return horas_somadas
      }
    }
  }

  function calcularSaida(nova_voltaDoIntervalo: string) {
    console.log("nova_voltaDoIntervalo")
    console.log(nova_voltaDoIntervalo)
    var horas_somadas = somarHoras(nova_voltaDoIntervalo, horasRestanteDeTrabalho)
    console.log("Eu saio as ", horas_somadas)
    setHoraSaida(horas_somadas)
  }

  function calcularHoras(dtChegada: string, dtPartida: string) {
    if(dtPartida) {
      var horas_somadas = somarHoras(dtPartida, 1)
      if (horas_somadas.includes(":")) {
        setVoltaDoIntervalo(horas_somadas)

        console.log("horas_somadas", horas_somadas)
        const horasTrabalhadasOne = obterDiferencaDeHoras(dtChegada, dtPartida)
        if (horasTrabalhadasOne.includes(":")) {
          setHorasTrabalhadasOne(horasTrabalhadasOne)


          const horasRestanteDeTrabalho = obterDiferencaDeHoras(horasTrabalhadasOne, "08:13")
          setHorasRestanteDeTrabalho(horasRestanteDeTrabalho)

          var hora_saida = moment(horas_somadas ,"HH:mm").add(horasRestanteDeTrabalho, "hours").format("HH:mm")
          console.log("Eu saio as ", hora_saida)
          setHoraSaida(hora_saida)
        }
      }
    }
  }

  function calcularHorasUpdate(dtChegada: string, dtPartida: string) {

    const voltaDoIntervaloUpdate = getVoltaDoIntervalo(dtPartida, dtChegada)
    
    const horasTrabalhadasOne = obterDiferencaDeHoras(dtChegada, dtPartida)
    if (horasTrabalhadasOne.includes(":")) {
      setHorasTrabalhadasOne(horasTrabalhadasOne)


      const horasRestanteDeTrabalho = obterDiferencaDeHoras(horasTrabalhadasOne, "08:13")
      setHorasRestanteDeTrabalho(horasRestanteDeTrabalho)

      console.log(voltaDoIntervaloUpdate)
      var hora_saida = moment(voltaDoIntervaloUpdate,"HH:mm").add(horasRestanteDeTrabalho, "hours").format("HH:mm")
      console.log("Eu saio as ", hora_saida)
      setHoraSaida(hora_saida)
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
            <Form>
              <FormTitle>Sua volta do almoço será</FormTitle>
              <Main>
              {voltaDoIntervalo &&
                (
                  <MyTimePicker childToParent={getVoltaDoIntervaloParent} voltaDoIntervalo={voltaDoIntervalo} />
                )
              }
              {horaSaida &&
                (
                  <MyTimePicker childToParent={getVoltaDoIntervaloParent} voltaDoIntervalo={horaSaida} color="red" light={false} />
                )
              }
              </Main>
            </Form>
            <Title>
              {horaSaida &&
                (
                  <>
                   Você sairá <Text style={{backgroundColor: 'red'}}> {horaSaida} </Text>
                  </>
                )
              }
            </Title>
            <Title>
              {horasTrabalhadasTotal &&
                (
                  <>
                   Total de Horas trabalhadas <Text style={{backgroundColor: 'red'}}> {horasTrabalhadasTotal} </Text>
                  </>
                )
              }
            </Title>
        </Container>
    </KeyboardAvoidingView>
  )
}