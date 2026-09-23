import { AuthContext } from '@app/AuthContext';
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Card, IconButton, Text, useTheme } from 'react-native-paper';

import { MediumBanner, StandardBanner } from '@app/Admob/BannerAd';
import { DeleteUserServerCourseUseCase } from '@app/Domain/Course/delete';
// TODO: Clarify the Course vs. Lesson naming in this module.
import { DeleteUserDraftLessonUseCase } from '@app/Domain/Lesson/delete';
import {
  CourseCategory,
  CourseModel,
  CourseType,
} from '@app/Models/course.model';
import Course from '@app/Presentation/Course/List/components/Course.component';

// import Strategy from '@app/Presentation/Membership/Strategy';
import useViemModel from './CourseListViewModel';

export const CourseList: React.FC = ({ route, navigation }: any) => {
  const { auth }: any = useContext(AuthContext);
  const courseType: CourseType = route.params && route.params.type;
  const courseCategory: CourseCategory = route.params && route.params.category;
  const { getCourses, courses, error } = useViemModel();

  useEffect(() => {
    getCourses(courseType, courseCategory, auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const goLesson = (id: string, title: string, type: string) => {
    navigation.navigate('Lesson', {
      id: id,
      name: title,
      type,
    });
  };

  const goUserDraftLesson = (name: string) => {
    navigation.navigate('LessonCreate', {
      name: name,
    });
  };

  const goLessonCheck = (id: string, title: string, type: string) => {
    goLesson(id, title, type);
  };

  const goRobotForUserCourse = (robot_data: any) => {
    const formatRobotData = [{ data: robot_data }]; //we need this format for Robot.
    navigation.navigate('Robot', {
      course_type: 'userserver',
      robot_data: formatRobotData,
    });
  };

  const askBeforeDelete = async (name: string) =>
    new Promise(resolve => {
      Alert.alert(name, 'Silinecek emin misiniz?', [
        {
          text: 'Evet Sil',
          onPress: () => resolve(true),
        },
        {
          text: 'Hayır',
          onPress: () => resolve(false),
          style: 'cancel',
        },
      ]);
    });

  const deleteDraftCourse = async (name: string) => {
    const waitAnswer = await askBeforeDelete(name);
    if (waitAnswer) {
      await DeleteUserDraftLessonUseCase(name);
    }
    getCourses(courseType, courseCategory, auth);
  };

  const deleteUserCourse = async (name: string, id: string) => {
    const waitAnswer = await askBeforeDelete(name);
    if (waitAnswer) {
      await DeleteUserServerCourseUseCase(auth, id);
    }
    getCourses(courseType, courseCategory, auth);
  };

  const theme = useTheme();
  return (
    <View>
      {error && <Text>{error}</Text>}
      {courses.length === 0 && !courseType && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {courses.length === 0 && courseType === 'userdraft' && (
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          Henüz taslak oluşturmadınız.
        </Text>
      )}
      {courses.length === 0 && courseType === 'userserver' && (
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          Henüz robot oluşturmadınız.
        </Text>
      )}
      <ScrollView>
        <StandardBanner />
        {courseType === 'userdraft' &&
          courses.map((item: any, index) => {
            return (
              <TouchableOpacity
                onPress={() => goUserDraftLesson(item[0])}
                key={index}>
                <Card.Title
                  titleNumberOfLines={2}
                  title={item[0]}
                  left={props => <Avatar.Icon {...props} icon="file" />}
                  right={props => (
                    <IconButton
                      {...props}
                      icon="delete-empty"
                      onPress={() => {
                        deleteDraftCourse(item[0]);
                      }}
                    />
                  )}
                />
              </TouchableOpacity>
            );
          })}

        {courseType === 'userserver' &&
          courses.map((item: any) => {
            return (
              <TouchableOpacity
                onPress={() => goRobotForUserCourse(item.robot_data)}
                key={item.id}>
                <Card.Title
                  titleNumberOfLines={2}
                  title={item.course_name}
                  left={props => <Avatar.Icon {...props} icon="robot-love" />}
                  right={props => (
                    <IconButton
                      {...props}
                      icon="delete-empty"
                      onPress={() => {
                        deleteUserCourse(item.course_name, item.id);
                      }}
                    />
                  )}
                />
              </TouchableOpacity>
            );
          })}

        {!courseType &&
          courses.map((item: CourseModel, index) => {
            return (
              <>
                {index === 7 && (
                  <View style={{ alignItems: 'center' }}>
                    <MediumBanner />
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => goLessonCheck(item.id, item.name, item.type)}
                  key={item.id}>
                  <Course course={item} />
                </TouchableOpacity>
              </>
            );
          })}
      </ScrollView>
    </View>
  );
};
