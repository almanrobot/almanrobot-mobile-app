import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, MD3Theme, useTheme } from 'react-native-paper';

import RobotViewModel from '@app/Presentation/Robot/RobotViewModel';

export default function ChatArea({ item }: any) {
  const { robotSpeak } = RobotViewModel();
  const theme = useTheme();
  const bite = bitex(theme);
  return (
    <View style={bite.container}>
      <TouchableOpacity onPress={() => robotSpeak(item.key)}>
        <Card.Title
          titleStyle={bite.titleRobot}
          subtitleStyle={bite.subtitleRobot}
          titleNumberOfLines={50}
          subtitleNumberOfLines={50}
          title={item.key}
          subtitle={item.key_tr}
          left={() => (
            <Avatar.Image
              size={45}
              source={require('@assets/robot/robot_chat.png')}
            />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => robotSpeak(item.value)}>
        <Card.Title
          style={bite.you}
          titleStyle={bite.titleYou}
          subtitleStyle={bite.subtitleYou}
          title={item.value_tr}
          // subtitle={item.value_tr}
          titleNumberOfLines={50}
          subtitleNumberOfLines={50}
        />
      </TouchableOpacity>
    </View>
  );
}

const bitex = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
    },
    titleRobot: {
      fontWeight: '400',
    },
    subtitleRobot: {
      color: theme.colors.outline,
    },
    titleYou: {
      paddingTop: 3,
      color: theme.colors.background,
    },
    subtitleYou: {
      color: theme.colors.outlineVariant,
      marginTop: 5,
    },
    robot: {},
    you: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      width: '55%',
      margin: 10,
      paddingTop: 5,
      paddingLeft: 30,
      paddingBottom: 5,
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 40,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 40,
      borderBottomLeftRadius: 40,
      borderRadius: 20,
      padding: 2,
    },
  });
