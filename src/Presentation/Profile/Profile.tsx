import { AuthContext } from '@app/AuthContext';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logOutUseCase } from '@app/Domain/Login/logout';

const Profile: React.FC = ({ navigation }: any) => {
  const theme = useTheme();
  let { auth, logout, decodeAuth }: any = useContext(AuthContext);

  const byee = async (token: string) => {
    await logOutUseCase(token);
    logout();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {decodeAuth() && decodeAuth().role === 'user' && (
        <View style={{ margin: 20 }}>
          <Button
            icon="party-popper"
            mode="contained"
            onPress={() => navigation.navigate('Katıl')}>
            Abone Ol
          </Button>
        </View>
      )}

      <View style={{ flex: 0.8 }}>
        <Divider />
        <Button icon={'key'} onPress={() => navigation.navigate('Parola')}>
          Parola Değiştir
        </Button>
        <Button icon={'lifebuoy'} onPress={() => navigation.navigate('Help')}>
          Yardım
        </Button>
      </View>

      <View style={{ flex: 0.2 }}>
        <Button
          textColor={theme.colors.error}
          icon="exit-to-app"
          onPress={() => byee(auth)}>
          Çıkış Yap
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
