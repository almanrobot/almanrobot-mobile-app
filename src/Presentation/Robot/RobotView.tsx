import Voice from '@react-native-voice/voice';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { Button, ProgressBar, Text, useTheme } from 'react-native-paper';

import ChatArea from './components/ChatArea.component';
import MicArea from './components/MicArea.component';
import ScorePanel from './components/ScorePanel.component';

import RobotViewModel from './RobotViewModel';

// Interstitial Ad Setup
const androidAdUnitId: string = 'ca-app-pub-4944283165858692/4505751407';
const iosAdUnitId: string = 'ca-app-pub-4944283165858692/8769797023';

const getAdUnitId = () =>
  Platform.OS === 'android' ? androidAdUnitId : iosAdUnitId;

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : getAdUnitId();
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['german', 'language learning', 'education'],
});

export const RobotView: React.FC = ({ route }: any) => {
  interstitial.load(); //Load AD

  const isUserServer = route.params && route.params.course_type;
  const freeOrMembershipCourse = route.params && route.params.type;

  const theme = useTheme();
  const {
    getRobot,
    userRobotData,
    robot,
    error,
    totalData,
    robotSpeak,
    robotScore,
    stopRobot,
  } = RobotViewModel();

  const [onAir, setonAir] = useState<boolean>(false);
  const [robotStack, setRobotStack] = useState<JSX.Element[]>([]);
  let [chatStep, setChatStep] = useState<number>(0);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number | null | string>(null);
  const [end, setEnd] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  let [skip, setSkip] = useState<number>(0);
  let [image, setImage] = useState<string | null>(null);

  const scrollRef = useRef<any>();
  const chatStepValue = robot[0] && robot[0].data[chatStep].value;

  useEffect(() => {
    if (isUserServer === 'userserver') {
      userRobotData(route.params.robot_data);
    } else {
      getRobot(route.params.id, freeOrMembershipCourse);
    }

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    robot.length &&
      setRobotStack([<ChatArea key={0} item={robot[0].data[0]} />]);
    robot[0] && robotSpeak(robot[0].data[0].key);
    robot[0] && setImage(robot[0].image as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [robot]);

  useEffect(() => {
    onAir ? startRecording() : stopRecording();
  }, [onAir]);

  useEffect(() => {
    if (end === true) {
      setonAir(false);
      if (Platform.OS === 'ios') {
        beforeNextChat(result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      result !== '' && beforeNextChat(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  useEffect(() => {
    if (chatStep > 0) {
      robotSpeak(robot[0].data[chatStep].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStep]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // On blur: stop speech and show the interstitial ad
        stopRobot();
        interstitial.show(); //Show AD
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onSpeechStartHandler = (): void => {
    setResult('');
    setEnd(false);
  };

  const onSpeechEndHandler = (): void => {
    setEnd(true);
  };

  const onSpeechResultsHandler = (e: any): void => {
    let text = e.value[0];
    setResult(text);
  };

  const mic = (): void => setonAir(!onAir);

  async function startRecording(): Promise<void> {
    try {
      await Voice.start('de-DE');
    } catch (err) {
      console.error('error raised', err);
    }
  }

  async function stopRecording(): Promise<void> {
    try {
      await Voice.stop();
      setResult('');
    } catch (err) {
      console.error('error raised', err);
    }
  }

  function beforeNextChat(speech: string): void {
    let getScore = robotScore(chatStepValue, speech);
    const markComplete = () => setComplete(true);
    if (getScore === 'try again') {
      setScore('try again');
      setSkip(skip + 1);
    } else {
      setScore(getScore as number);
      if (totalData > chatStep) {
        (getScore as number) >= 40
          ? setTimeout(nextChat, 1500)
          : setSkip(skip + 1);
      } else {
        (getScore as number) >= 50 && setTimeout(markComplete, 1500);
      }
    }
  }

  function nextChat(): void {
    setScore(null);
    setSkip(0);
    if (totalData > chatStep) {
      setRobotStack([
        ...robotStack,
        <ChatArea key={chatStep + 1} item={robot[0].data[chatStep + 1]} />,
      ]);
      setChatStep((chatStep += 1));
    }
  }

  function beforeChat(): void {
    setScore(null);
    setSkip(0);
    if (chatStep > 0) {
      setRobotStack([
        <ChatArea key={chatStep - 1} item={robot[0].data[chatStep - 1]} />,
      ]);
      setChatStep((chatStep -= 1));
    }
  }

  function voiceButton(): void {
    robotSpeak(robot[0].data[chatStep].value);
  }

  function tortoiseButton(): void {
    robotSpeak(robot[0].data[chatStep].value, 0.4);
  }

  function progressTracker(): number {
    if (chatStep === 0) {
      return 0.0;
    }
    if (chatStep === totalData) {
      return 1;
    }
    return chatStep * 0.1;
  }

  return (
    <>
      {error ? <Text>{error}</Text> : null}
      <ProgressBar
        style={bite.pgbar}
        progress={progressTracker()}
        color={theme.colors.tertiary}
      />
      {image && (
        <Image
          style={{ margin: 5 }}
          resizeMode="center"
          source={{
            uri: `${image}`,
            height: 150,
          }}
        />
      )}
      <ScrollView
        nestedScrollEnabled={true}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
        style={{ backgroundColor: theme.colors.background }}>
        {robotStack}
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Button
          style={{ alignSelf: 'flex-start' }}
          disabled={chatStep === 0 || complete}
          onPress={() => beforeChat()}>
          Önceki
        </Button>
        <Button
          style={{ alignSelf: 'flex-end' }}
          disabled={totalData === chatStep}
          onPress={() => nextChat()}>
          Sonraki
        </Button>
      </View>
      <MicArea
        text={chatStepValue}
        volumeFunc={() => voiceButton()}
        tortoiseFunc={() => tortoiseButton()}
        microphoneFunc={() => mic()}
        onAir={onAir}
        complete={complete}>
        {score != null && !complete ? <ScorePanel score={score} /> : null}
        {skip >= 2 && totalData !== chatStep && !complete ? (
          <Button mode="text" onPress={() => nextChat()}>
            Atlamak için tıkla
          </Button>
        ) : null}
        {skip >= 3 && totalData === chatStep && !complete ? (
          <Button mode="text" onPress={() => setComplete(true)}>
            Dersi Bitir
          </Button>
        ) : null}
      </MicArea>
    </>
  );
};

const bite = StyleSheet.create({
  pgbar: {
    height: 6,
  },
  skipButton: {
    justifyContent: 'center',
  },
});
