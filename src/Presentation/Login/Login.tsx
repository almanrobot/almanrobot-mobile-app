import { AuthContext } from '@app/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import {
  Button,
  HelperText,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputMask from 'react-native-text-input-mask';

import { LoginModel } from '@app/Models/login.model';

import LoginViewModel from './LoginViewModel';

const Login: React.FC = ({ route, navigation }: any) => {
  const { login } = LoginViewModel();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [turkey, setTurkey] = useState<boolean>(false);
  const [checked, setChecked] = useState('turkey');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { getAuthState }: any = useContext(AuthContext);
  const isMembership: boolean = route.params && route.params.membership;
  const isTokenExpired: boolean = route.params && route.params.tokenExpired;

  useEffect(() => {
    checked === 'turkey' ? setTurkey(true) : setTurkey(false);
    setPhone('');
  }, [checked]);

  const signIn = async () => {
    setError('');
    setLoading(true);
    const params: LoginModel = { phone_number: phone, password: password };
    const { error: loginError } = await login(params);
    if (loginError === null) {
      setLoading(false);
      getAuthState();
      navigation.navigate('Root');
    } else {
      setError(loginError);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Image
        style={{
          width: 80,
          height: 60,
          alignSelf: 'center',
        }}
        source={require('@assets/robot/robot_hi.png')}
      />
      {isMembership && (
        <Text variant="labelLarge" style={{ padding: 10, textAlign: 'center' }}>
          Alman Robot uygulamasına katıldığınız için teşekkür ederiz.
          Etkileşimli dersler ve pratik yapma fırsatları sizi bekliyor.
          Hesabınıza giriş yapın ve Almanca öğrenme macerasına ayrıcalıklı adım
          atın. Başarılar dileriz! 🥳
        </Text>
      )}
      {isTokenExpired && (
        <Text variant="labelLarge" style={{ padding: 10, textAlign: 'center' }}>
          Oturumun süresi doldu. Lütfen tekrar giriş yapın.
        </Text>
      )}
      <HelperText type="error" visible={error !== ''}>
        {error}
      </HelperText>
      {turkey ? (
        <TextInput
          label="Türkiye Numarası"
          value={phone}
          onChangeText={text => setPhone(text)}
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
          onChangeText={text => setPhone(text)}
          left={<TextInput.Icon icon="earth" />}
        />
      )}

      <TextInput
        placeholder="Parola"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator style={{ margin: 20 }} />
      ) : (
        <Button
          style={{
            margin: 20,
          }}
          icon="lock"
          mode="contained"
          onPress={() => signIn()}>
          Giriş Yap
        </Button>
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
      <Button
        style={{ top: 90 }}
        icon="fish"
        onPress={() => navigation.navigate('ForgotPassword')}>
        Parolamı Unuttum
      </Button>
    </SafeAreaView>
  );
};

export default Login;
