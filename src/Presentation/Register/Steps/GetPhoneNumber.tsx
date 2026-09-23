import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';

const GetPhoneNumber: React.FC = ({ phoneNumber }: any) => {
  const [phone, setPhone] = useState('');
  const [turkey, setTurkey] = useState<boolean>(false);
  const [checked, setChecked] = useState('turkey');

  const changeText = (text: string) => {
    setPhone(text);
    phoneNumber(text);
  };

  useEffect(() => {
    setPhone('');
  }, [turkey]);

  useEffect(() => {
    checked === 'turkey' ? setTurkey(true) : setTurkey(false);
  }, [checked]);

  return (
    <SafeAreaView>
      {turkey ? (
        <TextInput
          keyboardType="numeric"
          label="Türkiye Numarası"
          value={phone}
          onChangeText={text => changeText(text)}
          render={props => (
            //@ts-ignore
            <TextInputMask {...props} mask="+90 [000] [000] [00] [00]" />
          )}
          left={<TextInput.Icon icon="cellphone" />}
        />
      ) : (
        <TextInput
          label="Yurt Dışı Numarası"
          value={phone}
          onChangeText={text => changeText(text)}
          left={<TextInput.Icon icon="earth" />}
        />
      )}

      <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
        <Text variant="titleSmall">Bölge</Text>

        <RadioButton.Group
          onValueChange={value => setChecked(value)}
          value={checked}>
          <RadioButton.Item label="Türkiye" value="turkey" />
          <RadioButton.Item label="Yurt Dışı" value="abroad" />
        </RadioButton.Group>
      </View>
    </SafeAreaView>
  );
};

export default GetPhoneNumber;
