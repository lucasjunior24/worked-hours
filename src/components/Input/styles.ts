import styled, { css } from "styled-components/native";
import { TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: 4px 12px;
  height: ${RFValue(70)}px;
  width: ${RFValue(60)}px;
  border: 0;
  border-radius: 5px;
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  
  padding: 0 20px;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;