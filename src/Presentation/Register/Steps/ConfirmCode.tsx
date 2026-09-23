import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const ConfirmCode: React.FC = ({ confirmCode, phone }: any) => {
  const [code, setCode] = useState('');

  const changeText = (text: string) => {
    setCode(text);
    confirmCode(text);
  };

  return (
    <View>
      <Text
        style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}
        variant="titleMedium">
        {phone} <Text> Kod Gönderdik 🤙</Text>
      </Text>
      <TextInput
        keyboardType="numeric"
        label="Doğrulama Kodu"
        value={code}
        onChangeText={text => changeText(text)}
      />
    </View>
  );
};

export default ConfirmCode;
