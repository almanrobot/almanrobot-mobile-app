import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { getUniqueId } from 'react-native-device-info';

import { createUserRobotUrl, getLessonUrl } from '@app/Data/EndPoint';
import { LessonModel } from '@app/Models/lesson.model';
import { RobotData } from '@app/Models/robot.model';

export async function getLesson(course_id: number): Promise<{
  error: string | null;
  result: LessonModel[];
}> {
  const axiosConfig = {
    method: 'get',
    url: getLessonUrl,
    params: { course_id: course_id },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as LessonModel[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function getUserDraftLessonFromStorage(key: string): Promise<{
  error: any;
  result: any;
}> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    let data = jsonValue != null ? JSON.parse(jsonValue) : null;
    return Promise.resolve({ error: null, result: data });
  } catch (e) {
    return Promise.resolve({
      error: 'getUserDraftLessonsFromStorageError',
      result: [],
    });
  }
}

export async function createDraftLessonToStorage(
  key: string,
  value: RobotData[] | [],
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error('storeDataError =>', e);
  }
}

export async function deleteDraftLessonToStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    console.error('deleteDataError =>', e);
  }
}

export async function createUserLessonToServer(
  course_name: string,
  course_data: any,
  _token: string,
) {
  const deviceId = await getUniqueId();
  const axiosConfig: AxiosRequestConfig = {
    method: 'post',
    url: createUserRobotUrl,
    // v2: user content is keyed by deviceId, so the token is no longer sent.
    data: {
      deviceId: deviceId,
      course_name: course_name,
      course_data: course_data.dialogs,
    },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as RobotData[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}
