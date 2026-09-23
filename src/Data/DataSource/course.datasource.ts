import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';

import {
  deleteUserCoursesFromServerUrl,
  getAllCoursesUrl,
  getUserCoursesFromServerUrl,
} from '@app/Data/EndPoint';
import { CourseCategory, CourseModel } from '@app/Models/course.model';

export async function getAllCourses(
  withCategory: CourseCategory = 'general',
): Promise<{
  error: string | null;
  result: CourseModel[] | [];
}> {
  const axiosConfig = {
    method: 'get',
    url: getAllCoursesUrl,
    params: { category: withCategory },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as CourseModel[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function getUserCoursesFromServer(_token: string): Promise<{
  error: string | null;
  result: CourseModel[] | [];
}> {
  const deviceId = await getUniqueId();
  const axiosConfig = {
    method: 'post',
    url: getUserCoursesFromServerUrl,
    // v2: user content is keyed by deviceId, so the token is no longer sent.
    data: {
      deviceId: deviceId,
    },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as CourseModel[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function deleteUserCoursesFromServer(
  token: string,
  course_id: string,
): Promise<void> {
  const deviceId = await getUniqueId();
  const axiosConfig = {
    method: 'post',
    url: deleteUserCoursesFromServerUrl,
    // v2: user content is keyed by deviceId, so the token is no longer sent.
    data: {
      deviceId,
      course_id,
    },
  };
  try {
    await axios(axiosConfig);
  } catch (error) {
    console.error('deleteUserCoursesFromServerError', error);
  }
}

export async function getStoreAll(): Promise<{
  error: any;
  result: any;
}> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keyToBeRemoved = ['access_token', '@foregroundcount'];
    const filteredKey = keys.filter(item => !keyToBeRemoved.includes(item));
    const items = await AsyncStorage.multiGet(filteredKey);
    return Promise.resolve({ error: null, result: items });
  } catch (error: any) {
    return Promise.resolve({ error: error, result: [] });
  }
}
