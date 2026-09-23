import React from 'react';
import { Platform, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const showAd: boolean = true;
const androidAdUnitId: string = 'ca-app-pub-4944283165858692/7296438419';
const iosAdUnitId: string = 'ca-app-pub-4944283165858692/4786319982';

const getAdUnitId = () =>
  __DEV__
    ? TestIds.BANNER
    : Platform.OS === 'android'
    ? androidAdUnitId
    : iosAdUnitId;

const StandardBanner = (): JSX.Element => {
  return showAd ? (
    <BannerAd
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      unitId={getAdUnitId()}
      onAdFailedToLoad={error => {
        console.error('Advert failed to load: ', error);
      }}
    />
  ) : (
    <View />
  );
};

const MediumBanner = (): JSX.Element => {
  return showAd ? (
    <BannerAd
      size={BannerAdSize.MEDIUM_RECTANGLE}
      unitId={getAdUnitId()}
      onAdFailedToLoad={error => {
        console.error('Advert failed to load: ', error);
      }}
    />
  ) : (
    <View />
  );
};

export { StandardBanner, MediumBanner };
