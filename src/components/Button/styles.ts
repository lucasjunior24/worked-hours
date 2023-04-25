import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  color?: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;
    padding: 15px;
    align-items: center;
    justify-content: center;
    background-color: ${({ color }) => color };
    border-radius: 10px;
`;

export const Title = styled.Text<ButtonTextProps>`
    font-size: ${RFValue(13)}px;
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`;