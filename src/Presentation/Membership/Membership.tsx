import { AuthContext } from '@app/AuthContext';
import { PriceContext } from '@app/PriceContext';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  MD3Theme,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
// @ts-ignore
import styled from 'styled-components/native';

const Membership: React.FC = ({ navigation, route }: any) => {
  const { auth }: any = useContext(AuthContext);
  const {
    price,
    priceWithDiscount,
    withDiscount,
    resetDiscount,
    withPromoCode,
  }: any = useContext(PriceContext);
  const theme = useTheme();

  const [checkDiscount, setCheckDiscount] = useState<number | null>(
    route.params && route.params.discount,
  );
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (checkDiscount) {
      withDiscount(checkDiscount);
    } else {
      resetDiscount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkDiscount]);

  const Row = styled.View`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  `;

  const Column = styled.View`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 50%;
  `;

  const applyPromo = async (code: string) => {
    let getDC = await withPromoCode(code);
    setCheckDiscount(getDC);
    setVisible(false);
  };

  const Premium = ({ source, text }: any) => {
    return (
      <Column>
        <Card
          style={{
            alignItems: 'center',
            borderColor: theme.colors.tertiaryContainer,
            borderStyle: 'solid',
            borderRadius: 20,
            borderWidth: 1,
            margin: 10,
            minHeight: 130,
          }}>
          <Card.Cover
            style={{
              marginTop: 10,
              width: 60,
              height: 60,
              alignSelf: 'center',
            }}
            source={source}
          />
          <Text
            style={{ margin: 10, textAlign: 'center' }}
            variant="titleMedium">
            {text}
          </Text>
        </Card>
      </Column>
    );
  };

  return (
    <SafeAreaView>
      <PromoCodeModal
        visible={visible}
        hideModal={hideModal}
        applyPromo={applyPromo}
      />
      <Text style={{ textAlign: 'center' }}>
        Almanca öğrenmenin en hızlı yolu
      </Text>
      <Row>
        <Premium
          text="Konuşarak Öğrenin"
          source={require('@assets/robot/robot_ok.png')}
        />
        <Premium
          text="Cümlelerinizle Çalışın"
          source={require('@assets/robot/robot_peace.png')}
        />
        <Premium
          text="Telaffuzunuzu Düzeltin"
          source={require('@assets/robot/robot_phone.png')}
        />
        <Premium
          text="Sınavlara Hazırlanın"
          source={require('@assets/robot/robot_sleeping.png')}
        />
      </Row>

      <View style={{ marginTop: 10 }}>
        {checkDiscount && (
          <Text style={{ textAlign: 'center' }} variant="bodyLarge">
            Özel teklif 🥳
          </Text>
        )}

        <Text style={{ textAlign: 'center' }} variant="headlineSmall">
          {checkDiscount
            ? Math.floor(priceWithDiscount / 12)
            : Math.floor(price / 12)}{' '}
          ₺ / Ay
        </Text>

        {Platform.OS === 'ios' && (
          <>
            {checkDiscount && (
              <Text
                style={{
                  textAlign: 'center',
                }}
                variant="bodyLarge">
                {priceWithDiscount} ₺{' '}
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }}
                  variant="bodyLarge">
                  {price} ₺
                </Text>
                <Text variant="labelMedium"> (12 Ay)</Text>
              </Text>
            )}

            {!checkDiscount && (
              <Text
                style={{
                  textAlign: 'center',
                }}
                variant="bodyLarge">
                {price} ₺ <Text variant="labelMedium">/ 12 Ay</Text>
              </Text>
            )}
          </>
        )}
        {Platform.OS === 'android' && (
          <>
            {checkDiscount && (
              <Text
                style={{
                  textAlign: 'center',
                }}
                variant="bodyLarge">
                {priceWithDiscount} ₺{' '}
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    fontSize: 15,
                  }}>
                  {price} ₺
                </Text>
                <Text variant="labelMedium"> (12 Ay)</Text>
              </Text>
            )}

            {!checkDiscount && (
              <Text
                style={{
                  textAlign: 'center',
                }}
                variant="bodyLarge">
                {price} ₺ <Text style={{ fontSize: 14 }}>/ 12 Ay</Text>
              </Text>
            )}
          </>
        )}
      </View>
      <View>
        <Button onPress={() => showModal()}>Promosyon Kodum Var</Button>
      </View>
      <View
        style={{
          marginTop: 5,
          maxHeight: Dimensions.get('window').height,
        }}>
        <Button
          style={{ marginLeft: 25, marginRight: 25 }}
          icon="party-popper"
          mode="contained"
          onPress={() => navigation.navigate('Register')}>
          Abone Ol
        </Button>

        {!auth && (
          <Button mode="text" onPress={() => navigation.navigate('Login')}>
            Giriş Yap
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const PromoCodeModal = ({ visible, hideModal, applyPromo }: any) => {
  const theme = useTheme();
  const bite = biteStyle(theme);
  const [text, onChangeText] = React.useState('');
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} style={bite.modelStyle}>
        <Text style={{ marginBottom: 10 }}>Promosyon Kodu</Text>
        <TextInput
          mode="outlined"
          style={bite.textInput}
          onChangeText={onChangeText}
        />
        <Button
          textColor={theme.colors.primary}
          onPress={() => applyPromo(text)}>
          Uygula
        </Button>
      </Modal>
    </Portal>
  );
};

const biteStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    modelStyle: {
      marginTop: 100,
      marginBottom: 100,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 20,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
    },
    textInput: {
      height: 50,
      width: 250,
    },
  });

export default Membership;
