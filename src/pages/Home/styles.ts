import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${getStatusBarHeight() + 31}px;

  border-radius: 6px;
  border: solid 1px ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.background_primary};
  elevation: 5;
`;

export const HeaderContent = styled.View`
  align-self: flex-start;
  margin: 2px;
  min-width: 63%;
  text-align: center;
`;

export const HeaderMenu = styled.View`
  min-width: 35%;
  flex-direction: row;

  align-items: center;
  justify-content: flex-end;
`;

export const HeaderNotificacao = styled.View`
  width: 40px;
  height: 40px;
  margin: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 20px;
`;

export const HeaderUser = styled.View`
  width: 40px;
  height: 40px;
  margin: 4px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.colors.white};
  border-width: 4px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.white};
`;

export const HeaderSubTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.white};
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
  align-items: center;
  justify-content: center;
`;


export const Main = styled.View`
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.background_primary};
  width: 100%;
  line-height: ${RFValue(65)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  elevation: 5;
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


export const Photo = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;