// NOTE: I don't follow our pattern here for speed.
// TODO: Move the logic into a ViewModel like the other screens.
import { AuthContext } from '@app/AuthContext';
import axios, { AxiosRequestConfig } from 'axios';
import React, { useContext, useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { changePasswordUrl } from '@app/Data/EndPoint';

const ChangePassword: React.FC = ({ navigation }: any) => {
  const { auth, logout }: any = useContext(AuthContext);
  const [oldPw, setOldPw] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [reNewPw, setReNewPw] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const change = async () => {
    setError(false);
    if (oldPw && newPw && reNewPw) {
      const axiosConfig: AxiosRequestConfig = {
        method: 'post',
        url: changePasswordUrl,
        headers: {
          Authorization: `Bearer ${auth}`,
        },
        data: {
          old: oldPw,
          new: newPw,
          renew: reNewPw,
        },
      };
      try {
        await axios(axiosConfig);
        logout();
        navigation.navigate('Login');
      } catch {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView>
      <HelperText type="error" visible={error}>
        Sanırım bir problem var. Bilgilerinizi kontrol edin.
      </HelperText>

      <TextInput
        secureTextEntry
        label="Mevcut Parola"
        value={oldPw}
        onChangeText={text => setOldPw(text)}
      />

      <TextInput
        secureTextEntry
        label="Yeni Parola"
        value={newPw}
        onChangeText={text => setNewPw(text)}
      />

      <TextInput
        secureTextEntry
        label="Yeni Parola Tekrar"
        value={reNewPw}
        onChangeText={text => setReNewPw(text)}
      />

      <Button onPress={() => change()}>Değiştir</Button>
    </SafeAreaView>
  );
};

export default ChangePassword;
