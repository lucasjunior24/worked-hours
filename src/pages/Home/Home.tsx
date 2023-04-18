import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native'
// import * as Yup from 'yup';

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

export function Home() {
  const [entradaOne, setEntradaOne] = useState(0);
  const [saidaOne, setSaidaOne] = useState(0);
  const [entradaTwo, setEntradaTwo] = useState(0);
  const [saidaTwo, setSaidaTwo] = useState(0);
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
                    <Input 
                    placeholder=''
                    keyboardType='numeric' 
                    // onChangeText={setEntrada}
                    value={"07"}
                  />
                    <Input 
                      placeholder=''
                      keyboardType='numeric' 
                      // onChangeText={setEntrada}
                      value={"12"}
                    />
              </Main>
            </Form>


          
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}