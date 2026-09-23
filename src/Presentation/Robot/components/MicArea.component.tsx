import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Avatar,
  IconButton,
  MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';

type MicProps = PropsWithChildren<{
  text: string;
  volumeFunc(): void;
  tortoiseFunc(): void;
  microphoneFunc(): void;
  onAir: boolean;
  complete?: boolean;
}>;

export default function MicArea(props: MicProps): JSX.Element {
  const theme = useTheme();
  const bite = biteStyle(theme);
  return (
    <View style={bite.micArea}>
      {props.children}
      {props.complete ? <Complete /> : null}
      {!props.complete ? (
        <NotComplete
          text={'🇩🇪' + props.text}
          onAir={props.onAir}
          volumeFunc={props.volumeFunc}
          microphoneFunc={props.microphoneFunc}
          tortoiseFunc={props.tortoiseFunc}
        />
      ) : null}
    </View>
  );
}

const Complete = () => {
  const theme = useTheme();
  const bite = biteStyle(theme);
  return (
    <>
      <View style={bite.done}>
        <Avatar.Image
          style={bite.doneEmoji}
          size={70}
          source={require('@assets/emoji/done.png')}
        />
        <Text style={bite.doneText} variant="titleLarge">
          Tebrikler!
        </Text>
      </View>
      <Text style={bite.doneInfo} variant="labelMedium">
        Dersi tamamladın.
      </Text>
    </>
  );
};

const Listening = () => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          Dinliyorum (Bitir)
        </Text>
      ) : (
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          Dinliyorum
        </Text>
      )}
    </>
  );
};

const NotComplete = ({
  text,
  onAir,
  volumeFunc,
  microphoneFunc,
  tortoiseFunc,
}: MicProps) => {
  const theme = useTheme();
  const bite = biteStyle(theme);
  return (
    <>
      <Text style={bite.micText}>{text}</Text>
      {onAir ? <Listening /> : <Text style={bite.listening}>...</Text>}
      <View style={bite.buttons}>
        <IconButton
          icon="volume-high"
          iconColor={theme.colors.primary}
          mode="contained"
          onPress={volumeFunc}
        />
        <IconButton
          style={{
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
            backgroundColor: theme.colors.primaryContainer,
            width: 150,
            marginLeft: 20,
            marginRight: 20,
          }}
          size={30}
          icon={onAir ? 'waveform' : 'microphone'}
          iconColor={theme.colors.primary}
          mode="contained"
          onPress={microphoneFunc}
        />
        <IconButton
          icon="tortoise"
          iconColor={theme.colors.primary}
          mode="contained"
          onPress={tortoiseFunc}
        />
      </View>
    </>
  );
};

const biteStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    micArea: {
      display: 'flex',
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      paddingBottom: 15,
      paddingTop: 15,
    },
    micText: {
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.colors.surface,
      margin: 10,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    listening: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    done: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    doneEmoji: {},
    doneText: { paddingLeft: 10 },
    doneInfo: {
      padding: 10,
      alignSelf: 'center',
    },
  });
