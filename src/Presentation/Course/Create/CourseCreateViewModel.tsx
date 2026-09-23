import AsyncStorage from '@react-native-async-storage/async-storage';

import { LessonCreateRobotDialog } from '@app/Models/lesson.model';

export default function CourseCreateViewModel() {
  const storeData = async (key: string) => {
    try {
      const value: LessonCreateRobotDialog = {
        dialogs: [
          {
            key: 'Hallo!',
            key_tr: 'Merhaba',
            value: 'Hallo!',
            value_tr: 'Merhaba',
          },
        ],
      };
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('storeDataError =>', e);
    }
  };

  return { storeData };
}
