import { AuthContext } from '@app/AuthContext';
import React, { useContext, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
// @ts-ignore
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConfirmCode from './Steps/ConfirmCode';
import GetPhoneNumber from './Steps/GetPhoneNumber';
import Payment from './Steps/Payment/Payment';
import { RegisterModel } from '@app/Models/register.model';

import RegisterViewModel from './RegisterViewModel';

const Register: React.FC = () => {
  const { decodeAuth }: any = useContext(AuthContext);
  const { register, saveAccessToken } = RegisterViewModel();
  const [errors, setErrors] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const theme = useTheme();

  const [userNumber, setUserNumber] = useState<string>();
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const params: RegisterModel = {
    phoneNumber: userNumber,
    confirmedText: confirmationCode,
  };

  const paymentRef: React.MutableRefObject<any> = useRef();

  const goSmsStep = async () => {
    if (userNumber === undefined || userNumber === '') {
      setErrors(true);
      setErrMessage('Telefon numarası girilmedi.');
      return;
    }
    setErrMessage('');
    const waitAnswer = await askIsPhoneTrue(userNumber);
    if (waitAnswer) {
      const stepOne = await register(params);
      // "Doğrulama kodu hatalı." (wrong verification code) is expected at this
      // step, before the SMS code is entered, so it isn't shown as an error.
      if (stepOne.error && stepOne.error !== 'Doğrulama kodu hatalı.') {
        setErrors(true);
        setErrMessage(stepOne.error);
      } else {
        setErrors(false);
      }
    } else {
      setErrors(true);
    }
  };

  const askIsPhoneTrue = async (phone: any) =>
    new Promise(resolve => {
      Alert.alert(
        phone,
        'Telefon numarası doğrumu size doğrulama kodu göndereceğiz.',
        [
          {
            text: 'Kod Gönder',
            onPress: () => resolve(true),
          },
          {
            text: 'Düzenle',
            onPress: () => resolve(false),
            style: 'cancel',
          },
        ],
      );
    });

  const phoneNumber = (getNumber: any) => setUserNumber(getNumber);

  const goPaymentStep = async () => {
    setErrMessage('');
    if (confirmationCode === null || confirmationCode === '') {
      setErrors(true);
      setErrMessage('Kod girilmedi.');
      return;
    }

    const stepTwo = await register(params);
    if (stepTwo.result.access_token) {
      await saveAccessToken(stepTwo.result.access_token);
    }
    if (stepTwo.error) {
      setErrors(true);
      setErrMessage(stepTwo.error);
    } else {
      setErrors(false);
    }
  };

  const confirmCode = (code: any) => setConfirmationCode(code);

  const nextButtonTextStyle = {
    color: theme.colors.primary,
  };

  const prevButtonTextStyle = {
    color: theme.colors.secondary,
  };

  const step = decodeAuth() && decodeAuth().role === 'user' ? 2 : 0;
  const disableButton = decodeAuth() && decodeAuth().role === 'user';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProgressSteps
        activeStep={step}
        progressBarColor={theme.colors.secondary}
        completedProgressBarColor={theme.colors.primary}
        completedStepIconColor={theme.colors.primary}
        activeLabelColor={theme.colors.primary}
        labelColor={theme.colors.secondary}
        completedLabelColor={theme.colors.primary}
        disabledStepIconColor={theme.colors.secondary}
        activeStepNumColor={theme.colors.primary}
        activeStepIconBorderColor={theme.colors.primary}>
        <ProgressStep
          label="Telefon"
          onNext={() => goSmsStep()} //TODO: check here before we send code
          errors={errors}
          nextBtnText="Sonraki"
          nextBtnTextStyle={nextButtonTextStyle}
          previousBtnTextStyle={prevButtonTextStyle}>
          <HelperText type="error" visible={errMessage !== ''}>
            {errMessage}
          </HelperText>
          {/*  @ts-ignore */}
          <GetPhoneNumber phoneNumber={phoneNumber} />
        </ProgressStep>
        <ProgressStep
          label="Doğrula"
          onNext={() => goPaymentStep()}
          errors={errors}
          nextBtnText="Sonraki"
          previousBtnText="Önceki"
          nextBtnTextStyle={nextButtonTextStyle}
          previousBtnTextStyle={prevButtonTextStyle}>
          <HelperText type="error" visible={errMessage !== ''}>
            {errMessage}
          </HelperText>
          {/*  @ts-ignore */}
          <ConfirmCode confirmCode={confirmCode} phone={userNumber} />
        </ProgressStep>
        <ProgressStep
          onSubmit={() => paymentRef.current.payment()}
          label="Ödeme"
          previousBtnText="Önceki"
          finishBtnText="Tamamla"
          previousBtnDisabled={disableButton}>
          <Payment ref={paymentRef} />
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
};

export default Register;
