import { AuthContext } from '@app/AuthContext';
import { useContext, useState } from 'react';
import Tts, { Options } from 'react-native-tts';

import { GetFreeRobotUseCase, GetRobotUseCase } from '@app/Domain/Robot/get';
import { RobotModel } from '@app/Models/robot.model';

export default function RobotViewModel() {
  const { auth }: any = useContext(AuthContext);
  const [error, setError] = useState<string | null>();
  const [robot, setRobot] = useState<RobotModel[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  Tts.setDefaultLanguage('de-DE');
  Tts.setDefaultVoice('com.apple.voice.compact.de-DE.Anna');
  Tts.addEventListener('tts-start', () => {});
  Tts.addEventListener('tts-finish', () => {});
  Tts.addEventListener('tts-cancel', () => {});
  Tts.setDucking(true);

  type CourseType = 'free' | 'membership';
  async function getRobot(LessonID: string, type: CourseType) {
    if (type === 'membership') {
      const { result, error: requestError } = await GetRobotUseCase(
        LessonID,
        auth,
      );
      setError(requestError);
      setRobot(result);
      setTotalData(result[0].data.length - 1);
    }

    if (type === 'free') {
      const { result, error: requestError } = await GetFreeRobotUseCase(
        LessonID,
      );
      setError(requestError);
      setRobot(result);
      setTotalData(result[0].data.length - 1);
    }
  }

  function userRobotData(robot_data: RobotModel[]) {
    setRobot(robot_data);
    setTotalData(robot_data[0].data.length - 1);
  }

  function robotSpeak(speak: string, rate: number = 0.5): void {
    Tts.stop();
    Tts.speak(speak, { rate: rate } as Options);
  }

  function stopRobot() {
    Tts.stop();
  }

  function robotScore(value: string, speech: string): number | string {
    let speechData = speech.split(' ');
    let valueData = value.split(' ');

    if (valueData.length !== speechData.length) {
      return 'try again';
    }

    const unwantedChar = ['!', '?', '.', ',', ':', ';'];
    let score: number = 0;

    for (let i: number = 0; i < valueData.length; i++) {
      let spokenWord = speechData[i].toLowerCase();
      let expectedWord = valueData[i].toLowerCase();
      let valueCheck = unwantedChar.includes(
        expectedWord.charAt(expectedWord.length - 1),
      );

      if (valueCheck === true) {
        if (expectedWord.substring(0, expectedWord.length - 1) === spokenWord) {
          score = score + 1;
        }
      }

      if (expectedWord === spokenWord) {
        score = score + 1;
      }
    }

    const onePercentile = 100 / valueData.length;
    const scorePercentile: number = Math.ceil(onePercentile * score);
    return scorePercentile;
  }

  return {
    error,
    getRobot,
    userRobotData,
    robot,
    totalData,
    robotSpeak,
    robotScore,
    stopRobot,
  };
}
