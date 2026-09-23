import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';

type emojiText = {
  emoji: AvatarImageSource;
  text: string;
};
function scoreEmojiText(score: number): emojiText {
  let emoji: AvatarImageSource = require('@assets/robot/robot.png');
  let text: string = 'Hello';

  switch (true) {
    case score >= 0 && score < 20:
      emoji = require('@assets/emoji/0-20.png');
      text = 'Schlecht';
      break;
    case score >= 20 && score < 50:
      emoji = require('@assets/emoji/20-50.png');
      text = 'Gut';
      break;
    case score >= 50 && score < 80:
      emoji = require('@assets/emoji/50-80.png');
      text = 'Sehr gut';
      break;
    case score >= 80 && score <= 100:
      emoji = require('@assets/emoji/80-100.png');
      text = 'Wunderbar';
      break;
    default:
      emoji;
      text;
  }

  return { emoji, text };
}

type ScoreProps = {
  score: number | string;
};

export default function ScorePanel({ score }: ScoreProps): JSX.Element {
  return (
    <View style={bite.container}>
      {score === 'try again' ? <TryAgain /> : null}
      {score !== 'try again' ? <Score score={score} /> : null}
    </View>
  );
}

const TryAgain = () => {
  return (
    <>
      <Avatar.Image
        style={bite.emoji}
        size={45}
        source={require('@assets/emoji/try-again.png')}
      />
      <Text>Tekrar Dene!</Text>
    </>
  );
};

const Score = ({ score }: ScoreProps) => {
  const { emoji, text } = scoreEmojiText(score as number);
  return (
    <>
      <Avatar.Image style={bite.emoji} size={45} source={emoji} />
      <Text>{text}</Text>
    </>
  );
};

const bite = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  emoji: {
    backgroundColor: 'white',
    marginRight: 5,
  },
});
