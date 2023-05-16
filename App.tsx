import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { ActivityIndicator, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { 
  useFonts, 
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import { 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import theme from './src/styles/theme';
import { Home } from './src/pages/Home/Home';
import { Initial } from './src/pages/Initial/Initial';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }
  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
        />
       <Home />
    </ThemeProvider>

   </GestureHandlerRootView>
  )
}
