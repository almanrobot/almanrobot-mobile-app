import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';

import { MediumBanner, StandardBanner } from '@app/Admob/BannerAd';

import LessonListViewModel from './ViewModel';

type LessonProps = {
  title: string;
  image?: string;
};

function Lesson({ title, image }: LessonProps): JSX.Element {
  return (
    <View>
      <Card.Title
        title={title}
        titleNumberOfLines={2}
        left={props => (
          <Avatar.Image
            {...props}
            size={50}
            source={{
              uri: image,
            }}
          />
        )}
      />
    </View>
  );
}

export const LessonList: React.FC = ({ route, navigation }: any) => {
  const { getLessons, lessons, error } = LessonListViewModel();
  const theme = useTheme();

  useEffect(() => {
    getLessons(route.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goRobot = (id: string) => {
    navigation.navigate('Robot', {
      id: id,
      type: route.params.type,
    });
  };

  return (
    <ScrollView>
      <StandardBanner />
      {error ? <Text>{error}</Text> : null}
      {lessons.length === 0 && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {lessons
        ? lessons.map((item, index) => {
            return (
              <>
                {index === 7 && (
                  <View style={{ alignItems: 'center' }}>
                    <MediumBanner />
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => goRobot(item.id)}
                  key={item.id}>
                  <Lesson title={item.name} image={item.image} />
                </TouchableOpacity>
              </>
            );
          })
        : null}
    </ScrollView>
  );
};
