import React from 'react';
import { View } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

import { CourseModel } from '@app/Models/course.model';

type CourseProps = {
  course: CourseModel;
};

export default function Course({ course }: CourseProps): JSX.Element {
  let icon4Type = 'school';
  return (
    <View>
      <Card.Title
        title={course.name}
        subtitle={`${course.total_lesson} Ders`}
        titleNumberOfLines={2}
        left={props => (
          <Avatar.Image
            {...props}
            size={50}
            source={{
              uri: course.image,
            }}
          />
        )}
        right={props => (
          <IconButton
            {...props}
            size={15}
            icon={icon4Type}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
}
