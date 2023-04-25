import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.white};
  
  margin-top: 22px;
  margin-bottom: 10px;
`;

export const Form = styled.View`
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
`;


export const Main = styled.View`
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.background_primary};
  width: 100%;
  line-height: ${RFValue(105)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  elevation: 5;
  padding: 10px;
`;


export const FormTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.white};

  margin-top: 18px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;
