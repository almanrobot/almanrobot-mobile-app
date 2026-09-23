import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
// @ts-ignore
import styled from 'styled-components/native';

import { homeAdUrl } from '@app/Data/EndPoint';

const HomeAd: React.FC = () => {
  const [showAd, setShowAd] = useState<boolean>();
  const [url, setUrl] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [subtitle, setSubTitle] = useState<string>();

  useEffect(() => {
    const checkHomeAd = async () => {
      try {
        const response = await fetch(homeAdUrl);
        const data = await response.json();
        const show = data.showAd === 'start' ? true : false;
        setShowAd(show);
        setUrl(data.url);
        setTitle(data.title);
        setSubTitle(data.subtitle);
      } catch (error) {
        console.error('Error checking update:', error);
        setShowAd(false);
      }
    };

    checkHomeAd();
  }, []);

  const bgColor: string = '#836FFF';
  const BoxView = styled.View`
    width: ${Dimensions.get('window').width};
    height: 100px;
    background-color: ${bgColor ?? 'white'};
    border-radius: 20px;
    margin: 8px;
    padding: 10px 10px 0 10px;
  `;

  const StyledCardTitle = styled(Card.Title)`
    color: white;
    font-size: 20px;
  `;

  return (
    <View>
      {showAd && (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(url as string);
          }}>
          <BoxView>
            <StyledCardTitle
              titleStyle={{ color: 'white', fontSize: 19 }}
              subtitleStyle={{ color: 'white' }}
              title={title}
              subtitle={subtitle}
              titleNumberOfLines={2}
              subtitleNumberOfLines={3}
            />
          </BoxView>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeAd;
