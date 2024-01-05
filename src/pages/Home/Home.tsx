import React, { useCallback, useState} from 'react';
import moment from 'moment'
import { Ionicons  } from '@expo/vector-icons';

import { Text, Button, Alert } from 'react-native';

import * as Notifications from 'expo-notifications';

import { Bullet } from '../../components/Bullet';
import {MyTimePicker} from '../../components/DateTimePicker/DateTimePicker';

import {
  Container,
  Header,
  HeaderContent,
  Title,
  Main,
  Form,
  FormTitle,
  HeaderSubTitle,
  HeaderTitle,
  HeaderMenu,
  HeaderNotificacao,
  HeaderUser,
  Photo
} from './styles';
import { getHoraAtual, padTo2Digits } from '../../utils/uteis';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


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

  const getVoltaDoIntervaloParent = useCallback((childdata: string) => {
    setVoltaDoIntervalo(childdata);
    calcularSaida(childdata)
    getTotalDeHorasTrabalhadas()
  }, [])

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

  const getVoltaDoIntervalo = useCallback((dtPartida: string, dtChegada: string | number = 1) => {
    if(dtPartida) {
      const horas_somadas = somarHoras(dtPartida, dtChegada)
      if (horas_somadas.includes(":")) {
        setVoltaDoIntervalo(horas_somadas)
        return horas_somadas
      }
    }
  }, [])

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
          schedulePushNotification()
        }
      }
    }
  }

  const calcularHorasUpdate = useCallback((dtChegada: string, dtPartida: string) => {
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
  },[])


  async function schedulePushNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    const horaAtual = getHoraAtual()
    const diferenca = obterDiferencaDeHoras(horaAtual, horaSaida)

    const [hora, minuto] = diferenca.split(":")
    const horasEmSegundos = Number(hora) * (60 * 60)
    const minutosEmSegundos = Number(minuto) * 60
    const tempoEmSegundos = horasEmSegundos + minutosEmSegundos;
    if (status !== 'granted') {
      Alert.alert("Você não tem permissão para receber notificações")
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Olha o ponto em! você sai as ${horaSaida} horas!`,
        body: 'Esta quase na sua hora de ir pra casa, não esqueça de bater o ponto!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: tempoEmSegundos},
    });
  }
  
  return (
        <Container>
          <Header>
            <HeaderContent>
              <HeaderTitle>
                Bem vindo!
              </HeaderTitle>
              <HeaderSubTitle>Olá, Lucas</HeaderSubTitle>
            </HeaderContent>
            <HeaderMenu>
              <HeaderNotificacao>
                <Ionicons  
                  name="notifications-circle-outline"
                  size={30}
                  color="white"
                />
              </HeaderNotificacao>
              <HeaderUser>
                <Photo source={{ uri: 'https://github.com/lucasjunior24.png' }}/> 
              </HeaderUser>
            </HeaderMenu>
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

