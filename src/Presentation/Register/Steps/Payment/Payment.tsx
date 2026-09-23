// NOTE: I don't follow our pattern here for speed.
// TODO: Move the logic into a ViewModel like the other screens.
import { AuthContext } from '@app/AuthContext';
import { PriceContext } from '@app/PriceContext';
import { useNavigation } from '@react-navigation/native';
import axios, { AxiosRequestConfig } from 'axios';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { Snackbar, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputMask from 'react-native-text-input-mask';
import { WebView } from 'react-native-webview';

import { generateTokenUrl } from '@app/Data/EndPoint';

import * as PC from './Payment.constants';
import { PaymentPostRequestType, PaymentToken } from './Payment.type';

const Payment = forwardRef((props, ref) => {
  // Get IPv4 IP (priority: WiFi first, cellular second)
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    setUserIp(ipv4Address);
  });

  useImperativeHandle(ref, () => ({
    payment() {
      giveMeMoney();
    },
  }));

  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const { getAuthState, auth, decodeAuth, logout }: any =
    useContext(AuthContext);
  const [html, setHtml] = useState<any>('');
  const [userIp, setUserIp] = useState<string | null>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userAdress, setUserAdress] = useState<string>();
  const [ccOwner, setCcOwner] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [expiryMonth, setExpiryMonth] = useState<string>();
  const [expiryYear, setExpiryYear] = useState<string>();
  const [cvv, setCvv] = useState<string>();
  const [trouble, setTrouble] = useState<string | null>(null);

  const mailCheck = new RegExp(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/);

  const { priceWithDiscount, promoCode }: any = useContext(PriceContext);

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type tokenAndOid = {
    merchant_oid: string;
    token: string;
  };
  const generateTokenAndOid = async () => {
    const tokenData: PaymentToken = {
      user_ip: userIp!,
      email: userEmail!,
      payment_amount: priceWithDiscount,
      currency: PC.currency,
      test_mode: PC.test_mode,
      promo_code: promoCode,
    };

    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: generateTokenUrl,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      data: tokenData,
    };

    try {
      const tokenAndOid = await axios(axiosConfig);
      return tokenAndOid.data;
    } catch (error) {
      console.error('Token Error:', error);
    }
  };

  const checkIfFormDataIsFilled = (): boolean => {
    return (
      ccOwner != null &&
      cardNumber != null &&
      expiryMonth != null &&
      expiryYear != null &&
      cvv != null &&
      userEmail != null &&
      userAdress != null
    );
  };
  const checkCardNumber = (): boolean => cardNumber!.length !== 19;
  const checkExpiryMonth = (): boolean => expiryMonth!.length !== 2;
  const checkExpiryYear = (): boolean => expiryYear!.length !== 2;
  const checkCvv = (): boolean => cvv!.length !== 3;
  const checkUserEmail = (): boolean => !mailCheck.test(userEmail!);

  const generatePayTrPostRequest = async (data: PaymentPostRequestType) => {
    let axiosConfig: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://www.paytr.com/odeme',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data,
    };

    let response = await axios(axiosConfig);
    return response.data;
  };

  const giveMeMoney = async () => {
    if (!checkIfFormDataIsFilled()) {
      return setTrouble('Lütfen boş alanları doldurun 😇');
    }
    if (checkCardNumber()) {
      return setTrouble("Kart Numarası'nı kontrol edebilir misin? 😬");
    }
    if (checkExpiryMonth()) {
      return setTrouble('Ay Hatalı 😬');
    }
    if (checkExpiryYear()) {
      return setTrouble('Yıl Hatalı 😬');
    }
    if (checkCvv()) {
      return setTrouble('CVV Hatalı 😬');
    }
    if (checkUserEmail()) {
      return setTrouble('E-posta Hatalı 😬');
    }

    const getTokenAndOid: tokenAndOid = await generateTokenAndOid();

    const paymentData: PaymentPostRequestType = {
      merchant_id: Number(PC.merchant_id),
      paytr_token: getTokenAndOid.token,
      user_ip: userIp!,
      merchant_oid: getTokenAndOid.merchant_oid,
      email: userEmail!,
      payment_type: PC.payment_type,
      payment_amount: priceWithDiscount,
      currency: PC.currency,
      installment_count: PC.installment_count,
      non_3d: PC.non_3d,
      cc_owner: ccOwner!,
      card_number: cardNumber!.replace(/\s/g, ''),
      expiry_month: expiryMonth!,
      expiry_year: expiryYear!,
      cvv: cvv!,
      merchant_ok_url: PC.merchant_ok_url,
      merchant_fail_url: PC.merchant_fail_url,
      user_name: ccOwner!,
      user_address: userAdress!,
      user_phone: decodeAuth().username,
      user_basket: JSON.stringify([
        ['AlmanRobotMembership', priceWithDiscount, 1], // [name, unit price, quantity]
      ]),
      test_mode: PC.test_mode,
      debug_on: PC.debug_on,
    };
    const paymentRequest = await generatePayTrPostRequest(paymentData);
    setHtml(paymentRequest);
  };

  const handleWebViewNavigationStateChange = (params: any) => {
    const { url } = params;
    if (url?.includes('/success')) {
      logout();
      //@ts-ignore
      navigation.navigate('Login', {
        membership: true,
      });
    }

    if (url?.includes('/fail')) {
      setTrouble('İşlem Tamamlanamadı 😥');
      setHtml('');
    }
  };

  return (
    <SafeAreaView>
      <Snackbar
        wrapperStyle={{
          zIndex: 9999,
          bottom: Dimensions.get('window').height / 2.5,
        }}
        visible={trouble != null}
        onDismiss={() => setTrouble(null)}
        action={{
          label: 'Peki',
          onPress: () => {
            setTrouble(null);
          },
        }}>
        {trouble}
      </Snackbar>
      {html && (
        <WebView
          ref={webViewRef}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          originWhitelist={['*']}
          source={{ html: html }}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
        />
      )}
      {!html && (
        <View
          style={{
            marginLeft: 6,
            marginRight: 6,
            height: Dimensions.get('window').height - 50,
          }}>
          <TextInput
            error={ccOwner != null && ccOwner.length < 2}
            mode="outlined"
            label="Kart Üzerindeki Ad Soyad"
            value={ccOwner}
            left={<TextInput.Icon icon="account" />}
            onChangeText={text => setCcOwner(text)}
          />

          <TextInput
            error={cardNumber != null && cardNumber.length !== 19}
            keyboardType="numeric"
            mode="outlined"
            label="Kart Numarası"
            value={cardNumber}
            render={inputProps => (
              //@ts-ignore
              <TextInputMask
                {...inputProps}
                mask="[0000] [0000] [0000] [0000]"
              />
            )}
            left={<TextInput.Icon icon="credit-card" />}
            onChangeText={text => setCardNumber(text)}
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 3 }}>
              <TextInput
                error={expiryMonth != null && expiryMonth.length !== 2}
                keyboardType="numeric"
                mode="outlined"
                label="Ay"
                value={expiryMonth}
                render={inputProps => (
                  //@ts-ignore
                  <TextInputMask {...inputProps} mask="[00]" />
                )}
                onChangeText={text => setExpiryMonth(text)}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 3 }}>
              <TextInput
                error={expiryYear != null && expiryYear.length !== 2}
                keyboardType="numeric"
                mode="outlined"
                label="Yıl"
                value={expiryYear}
                render={inputProps => (
                  //@ts-ignore
                  <TextInputMask {...inputProps} mask="[00]" />
                )}
                onChangeText={text => setExpiryYear(text)}
              />
            </View>
          </View>

          <TextInput
            error={cvv != null && cvv.length !== 3}
            keyboardType="numeric"
            mode="outlined"
            label="CVV"
            value={cvv}
            render={inputProps => (
              //@ts-ignore
              <TextInputMask {...inputProps} mask="[000]" />
            )}
            left={<TextInput.Icon icon="lock-open" />}
            onChangeText={text => setCvv(text)}
          />

          <TextInput
            error={userEmail != null && !mailCheck.test(userEmail)}
            keyboardType="email-address"
            mode="outlined"
            label="E-posta"
            value={userEmail}
            left={<TextInput.Icon icon="email" />}
            onChangeText={text => setUserEmail(text)}
          />

          <TextInput
            error={userAdress != null && userAdress.length < 2}
            mode="outlined"
            label="Adres"
            value={userAdress}
            left={<TextInput.Icon icon="map-marker" />}
            onChangeText={text => setUserAdress(text)}
          />
        </View>
      )}
    </SafeAreaView>
  );
});

export default Payment;
