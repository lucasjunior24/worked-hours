import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Alert, TextInputProps } from 'react-native';

import { 
  Container, 
  IconContainer,
  InputText 
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Entypo>['name']
  value?: string;
}

export function Input({
  iconName,
  value,
  ...rest
  }: Props) {
  const [isFocused, setFIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();
  
  function handleInputFocus() {
    setFIsFocused(true);
  }
  function handleInputBlur() {
    setFIsFocused(false);
    setIsFilled(!!value);
  }
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
        {...rest} 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />
    </Container>
  );
}