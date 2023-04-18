import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Alert, TextInputProps } from 'react-native';

import { 
  Container, 
  InputText 
} from './styles';

interface Props extends TextInputProps {
  value?: string;
}

export function Input({
  value,
  ...rest
  }: Props) {
  const [isFocused, setFIsFocused] = useState(false);

  const theme = useTheme();
  
  function handleInputFocus() {
    setFIsFocused(true);
  }

  return (
    <Container>
      <InputText
        {...rest} 
        onFocus={handleInputFocus}
        isFocused={isFocused}
      />
    </Container>
  );
}