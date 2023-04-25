import React, { useState} from 'react';
import moment from 'moment'

import { Text } from 'react-native';

import { Bullet } from '../../components/Bullet';

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

  const [voltaDoIntervalo, setVoltaDoIntervalo] = useState('');
  const [horaSaida, setHoraSaida] = useState('');


  const getHoraDaEntradaOne = (childdata: string) => {
    setEntradaHoraOne(childdata);
    console.log("childdata", childdata)
    if (voltaDoIntervalo) {
      console.log("voltaDoIntervalo : ", voltaDoIntervalo)
      calcularHorasUpdate(childdata, saidaOne)
    }
    calcularHoras(childdata, saidaOne)
  }

  const getHoraDaSaidaOne = (childdata: string) => {
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
    const ms = moment(dtPartida,"HH:mm").diff(moment(dtChegada,"HH:mm"));
    const d = moment.duration(ms);
    const diferenca = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
    return diferenca
  }

  function somarHoras(hora_a: string, hora_b: string | number) {
    const horas_somadas = moment(hora_a,"HH:mm").add(hora_b, "hours").format("HH:mm")
    return horas_somadas
  }

  function getTotalDeHorasTrabalhadas() {
    const horas_trabalhadas = somarHoras(horasTrabalhadasOne, horasRestanteDeTrabalho)
    console.log("horas_trabalhadas: ", horas_trabalhadas)
    sethorasTrabalhadasTotal(horas_trabalhadas)

  }

  function getVoltaDoIntervalo(dtPartida: string, dtChegada: string | number = 1) {
    if(dtPartida) {
      const horas_somadas = somarHoras(dtPartida, dtChegada)
      if (horas_somadas.includes(":")) {
        setVoltaDoIntervalo(horas_somadas)
        return horas_somadas
      }
    }
  }

  function calcularSaida(nova_voltaDoIntervalo: string) {
    var horas_somadas = somarHoras(nova_voltaDoIntervalo, horasRestanteDeTrabalho)
    setHoraSaida(horas_somadas)
  }

  function calcularHoras(dtChegada: string, dtPartida: string) {
    if(dtPartida) {
      const horas_somadas = somarHoras(dtPartida, 1)
      if (horas_somadas.includes(":")) {
        setVoltaDoIntervalo(horas_somadas)

        console.log("horas_somadas", horas_somadas)
        const horasTrabalhadasOne = obterDiferencaDeHoras(dtChegada, dtPartida)
        if (horasTrabalhadasOne.includes(":")) {
          setHorasTrabalhadasOne(horasTrabalhadasOne)

          const horasRestanteDeTrabalho = obterDiferencaDeHoras(horasTrabalhadasOne, "08:13")
          setHorasRestanteDeTrabalho(horasRestanteDeTrabalho)

          const horas_trabalhadas = somarHoras(horasTrabalhadasOne, horasRestanteDeTrabalho)
          sethorasTrabalhadasTotal(horas_trabalhadas)

          const hora_saida = moment(horas_somadas ,"HH:mm").add(horasRestanteDeTrabalho, "hours").format("HH:mm")
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
        <Container>
          <Header>
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Descubra a hora{'\n'}
            da sua saida do Trabalho
          </Title>
            <FormTitle>Que horas você entrou?</FormTitle>
            <Form>
              <Main>
                <MyTimePicker childToParent={getHoraDaEntradaOne} />
                <MyTimePicker childToParent={getHoraDaSaidaOne} />
              </Main>
            </Form>
            <FormTitle>
              {horasTrabalhadasOne &&
                (
                  <>
                    Você trabalhou {horasTrabalhadasOne} horas
                  </>
                )
              }
            </FormTitle>
            {voltaDoIntervalo &&
              (
                <>
              <FormTitle>Sua volta do almoço será: </FormTitle>
              <Form>
                <Main>
                    <MyTimePicker childToParent={getVoltaDoIntervaloParent} voltaDoIntervalo={voltaDoIntervalo} />
                {horaSaida &&
                  (
                    <MyTimePicker childToParent={getVoltaDoIntervaloParent} voltaDoIntervalo={horaSaida} color="red" light={false} />
                  )
                }
                </Main>
              </Form>
              </>
              )
            }
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
  )
}