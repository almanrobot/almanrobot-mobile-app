import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Card } from 'react-native-paper';
// @ts-ignore
import styled from 'styled-components/native';

type NavType = {
  title: string;
  subtitle: string;
  goCourse?(): void;
  navImage: any;
  bgColor?: string;
  menu?: boolean;
  goMenu?(): void;
};
const Nav = ({
  title,
  subtitle,
  goCourse,
  navImage,
  bgColor,
  menu,
  goMenu,
}: NavType) => {
  const BoxView = styled.View`
    height: 95px;
    background-color: ${bgColor ?? 'white'};
    border-radius: 20px;
    margin: 8px;
    padding: 10px 10px 0 10px;
  `;

  return (
    <View>
      <TouchableOpacity onPress={() => (menu ? goMenu!() : goCourse!())}>
        <BoxView>
          <Card.Title
            titleStyle={{ color: 'white', fontSize: 20 }}
            subtitleStyle={{ color: 'white' }}
            titleVariant="titleMedium"
            subtitleVariant="labelSmall"
            title={title}
            subtitleNumberOfLines={3}
            subtitle={subtitle}
            right={() => (
              <Avatar.Image
                style={{ backgroundColor: 'white' }}
                size={60}
                source={navImage}
              />
            )}
          />
        </BoxView>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
