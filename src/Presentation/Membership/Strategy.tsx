import { AuthContext } from '@app/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Banner } from 'react-native-paper';

export const Strategy = (navigation: any) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [discount, setDiscount] = useState<number>(0.1);
  const [showDiscount, setShowDiscount] = useState<boolean>(true);
  const [discountMessage, setDiscountMessage] = useState<string>('');
  const { auth, decodeAuth }: any = useContext(AuthContext);

  const forGroundCount = async (): Promise<number> => {
    const foregroundcount = await AsyncStorage.getItem('@foregroundcount');
    return Number(foregroundcount);
  };

  const discountLogic = async () => {
    const foregroundcount = await forGroundCount();
    switch (true) {
      case foregroundcount === 0:
        setDiscount(10);
        setDiscountMessage(
          `Super Angebot! %${discount} indirim kazandın. İşte şimdi Almanca zamanı.🤩`,
        );
        break;
      case foregroundcount === 1:
        setDiscount(20);
        setDiscountMessage(
          `Super Angebot! %${discount} indirim kazandın. İşte şimdi Almanca zamanı.🤩`,
        );
        break;
      case foregroundcount === 3:
        setDiscount(30);
        setDiscountMessage(
          `Senin için son teklif 😍 %${discount} indirim kazandın. Bu teklifi kaçırma 😁`,
        );
        break;
      default:
        setDiscountMessage(
          `Super Angebot! %${discount} indirim kazandın. İşte şimdi Almanca zamanı.🤩`,
        );
        setShowDiscount(false);
        break;
    }
  };

  useEffect(() => {
    discountLogic();
  });

  const join = (discountRate: number) => {
    navigation.navigate('Katıl', {
      discount: discountRate,
    });
  };

  return (
    <>
      {(!auth || decodeAuth().role === 'user') && showDiscount && (
        <Banner
          visible={visible}
          actions={[
            {
              label: 'Kapat',
              onPress: () => setVisible(false),
            },
            {
              label: 'Hemen Katıl 🥳',
              onPress: () => join(discount),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={require('@assets/emoji/done.png')}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          {discountMessage}
        </Banner>
      )}
    </>
  );
};

export default Strategy;
