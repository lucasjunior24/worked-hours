import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native'
// import * as Yup from 'yup';
import theme from '../../styles/theme';
import { 
  KeyboardAvoidingView,

} from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Bullet } from '../../components/Bullet';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

import { InputPicker } from '../../components/InputPicker';

export function Initial() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tempoAlmoco, setTempoAlmoco] = useState('');

  function handleHorasTrabalhadas(event: any) {
    console.log(event)    

    if(event.length <= 4) {
      if(event.length === 2) {
        const test = `${event}:`
        console.log(test)
        setEmail(test)
      } else {
        setEmail(event)
        console.log("teste")
      }
    }
  }

  // const navigation = useNavigation();

  function handleBack() {
    // navigation.goBack();
  }

  async function handleNextStep() {
    // try {
    //   const schema = Yup.object().shape({
    //     driverLicense: Yup.string()
    //       .required('CNH é obrigatório'),
    //     email: Yup.string()
    //       .email('E-mail invalido')
    //       .required('E-mail é obrigatório'),
    //     name: Yup.string()
    //       .required('Nome é obrigatorio'),
    //   });

    //   const data = { name, email, driverLicense }
    //   await schema.validate(data);

    //   navigation.navigate('SignUpSecondStep', { 
    //     name,
    //     email,
    //     driverLicense
    //   });
    // } catch (error) {
    //   if(error instanceof Yup.ValidationError) {
    //     return Alert.alert('Opa', error.message);
    //   }
    // }
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled style={{flex: 1, backgroundColor: theme.colors.background_primary}}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.}> */}
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Torne sua experiencia unica 
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>
          <Subtitle>
            {email}
          </Subtitle>


          <Form>
            <FormTitle>Dados</FormTitle>
            <Input 
              iconName='user' 
              placeholder='Nome' 
              onChangeText={setName}
              value={name}
            />

            <InputPicker
              iconName='back-in-time' 
              placeholder='Horas trabalhadas' 
              value={email}
              childToParent={handleHorasTrabalhadas}
            />

            <InputPicker
              iconName='time-slot' 
              placeholder='Tempo de almoço'
              value={tempoAlmoco}
              childToParent={setTempoAlmoco}
            />

          </Form>

          <Button 
            title='Proximo'
            onPress={handleNextStep}
            color={theme.colors.purple}
            light
          />
        </Container>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}