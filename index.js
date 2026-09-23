import { AuthProvider } from '@app/AuthContext';
import { PriceProvider } from '@app/PriceContext';
import * as React from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import 'react-native-url-polyfill/auto';

import App from './src/App';

import { name as appName } from './app.json';

if (__DEV__) {
  import('./Reactotron/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const themeColors = {
  colors: {
    primary: 'rgb(0, 107, 93)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(92, 250, 225)',
    onPrimaryContainer: 'rgb(0, 32, 27)',
    secondary: 'rgb(74, 99, 94)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(205, 232, 225)',
    onSecondaryContainer: 'rgb(6, 32, 27)',
    tertiary: 'rgb(68, 98, 121)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(202, 230, 255)',
    onTertiaryContainer: 'rgb(0, 30, 48)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(250, 253, 250)',
    onBackground: 'rgb(25, 28, 27)',
    surface: 'rgb(250, 253, 250)',
    onSurface: 'rgb(25, 28, 27)',
    surfaceVariant: 'rgb(218, 229, 225)',
    onSurfaceVariant: 'rgb(63, 73, 70)',
    outline: 'rgb(111, 121, 118)',
    outlineVariant: 'rgb(190, 201, 197)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(45, 49, 48)',
    inverseOnSurface: 'rgb(239, 241, 239)',
    inversePrimary: 'rgb(51, 221, 197)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 246, 242)',
      level2: 'rgb(230, 241, 237)',
      level3: 'rgb(223, 237, 233)',
      level4: 'rgb(220, 236, 231)',
      level5: 'rgb(215, 233, 228)',
    },
    surfaceDisabled: 'rgba(25, 28, 27, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 27, 0.38)',
    backdrop: 'rgba(41, 50, 48, 0.4)',
    text: 'black',
  },
  colorsDark: {
    primary: 'rgb(73, 220, 196)',
    onPrimary: 'rgb(0, 56, 47)',
    primaryContainer: 'rgb(0, 80, 69)',
    onPrimaryContainer: 'rgb(108, 249, 223)',
    secondary: 'rgb(177, 204, 197)',
    onSecondary: 'rgb(28, 53, 48)',
    secondaryContainer: 'rgb(51, 75, 70)',
    onSecondaryContainer: 'rgb(205, 232, 224)',
    tertiary: 'rgb(171, 202, 228)',
    onTertiary: 'rgb(18, 51, 72)',
    tertiaryContainer: 'rgb(43, 74, 96)',
    onTertiaryContainer: 'rgb(201, 230, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(25, 28, 27)',
    onBackground: 'rgb(224, 227, 225)',
    surface: 'rgb(25, 28, 27)',
    onSurface: 'rgb(224, 227, 225)',
    surfaceVariant: 'rgb(63, 73, 70)',
    onSurfaceVariant: 'rgb(190, 201, 197)',
    outline: 'rgb(137, 147, 143)',
    outlineVariant: 'rgb(63, 73, 70)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(224, 227, 225)',
    inverseOnSurface: 'rgb(45, 49, 48)',
    inversePrimary: 'rgb(0, 107, 93)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(27, 38, 35)',
      level2: 'rgb(29, 43, 41)',
      level3: 'rgb(30, 49, 46)',
      level4: 'rgb(31, 51, 47)',
      level5: 'rgb(32, 55, 51)',
    },
    surfaceDisabled: 'rgba(224, 227, 225, 0.12)',
    onSurfaceDisabled: 'rgba(224, 227, 225, 0.38)',
    backdrop: 'rgba(41, 50, 48, 0.4)',
    text: 'white',
  },
};
// TODO: Use text: 'white' for the header title in the dark theme.

const fontConfig = {
  fontFamily: 'NotoSans-Regular',
};

export default function Main() {
  const colorScheme = useColorScheme();
  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
    colors:
      colorScheme === 'dark' ? themeColors.colorsDark : themeColors.colors,
  };
  return (
    <PaperProvider theme={theme}>
      <PriceProvider>
        <AuthProvider>
          <App theme={theme} />
        </AuthProvider>
      </PriceProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
