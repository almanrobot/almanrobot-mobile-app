import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ForgotPassword from './Presentation/ForgotPassword/ForgotPassword';
import Help from './Presentation/Help/Help';
import { RobotView } from './Presentation/Robot/RobotView';
import { CourseCreate } from '@app/Presentation/Course/Create/CourseCreate';
import { CourseList } from '@app/Presentation/Course/List/CourseList';
import Home from '@app/Presentation/Home/Home';
import { LessonCreate } from '@app/Presentation/Lesson/Create/LessonCreate';
import { LessonList } from '@app/Presentation/Lesson/List/LessonList';
import Login from '@app/Presentation/Login/Login';
import Membership from '@app/Presentation/Membership/Membership';
import ChangePassword from '@app/Presentation/Profile/screens/ChangePassword';
import Register from '@app/Presentation/Register/Register';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
        },
        tabBarIcon: ({ focused, color, size = 20 }) => {
          let iconName: string = 'home';

          switch (route.name) {
            case 'Öğren':
              iconName = 'school';
              break;
            case 'Robotum':
              iconName = focused ? 'robot' : 'robot-dead';
              break;
            case 'Katıl':
              iconName = 'crown';
              break;
            default:
              iconName = 'account';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Öğren" component={Home} />
      <Tab.Screen name="Robotum" component={CourseCreate} />
    </Tab.Navigator>
  );
}

function App({ theme }: any): JSX.Element {
  const appState = useRef(AppState.currentState);

  const appForegroundCount = async () => {
    var foregroundcount = await AsyncStorage.getItem('@foregroundcount');
    if (foregroundcount) {
      const increaseCount = Number(foregroundcount) + 1;
      await AsyncStorage.setItem('@foregroundcount', String(increaseCount));
    } else {
      await AsyncStorage.setItem('@foregroundcount', '1');
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        appForegroundCount();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Robotum"
          component={CourseCreate}
          options={() => ({
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={() => ({
            title: 'Kayıt Ol',
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={() => ({
            title: 'Giriş Yap',
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Help"
          component={Help}
          options={() => ({
            title: 'Yardım',
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={() => ({
            title: 'Parolamı Unuttum',
            headerBackTitle: 'Geri',
          })}
        />

        <Stack.Screen
          name="Course"
          component={CourseList}
          options={({ route }: any) => ({
            title: route.params.title,
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="Lesson"
          component={LessonList}
          options={({ route }: any) => ({
            title: route.params.name,
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="Robot"
          component={RobotView}
          options={() => ({
            headerBackTitle: 'Geri',
          })}
        />
        <Stack.Screen
          name="LessonCreate"
          component={LessonCreate}
          options={({ route }: any) => ({ title: route.params.name })}
        />
        <Stack.Screen name="Katıl" component={Membership} />
        <Stack.Screen
          name="Parola"
          component={ChangePassword}
          options={() => ({
            title: 'Parola Değiştir',
            headerBackTitle: 'Profil',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
