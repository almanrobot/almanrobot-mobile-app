import axios from 'axios';

import { RobotModel } from '@app/Models/robot.model';

import { getFreeLessonDetailUrl, getLessonDetailUrl } from '../EndPoint';

export async function getLessonDetail(
  LessonID: string,
  token: string,
): Promise<{
  error: string | null;
  result: RobotModel[];
}> {
  const axiosConfig = {
    method: 'post',
    url: getLessonDetailUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { lesson_id: LessonID },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as RobotModel[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.response?.data.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function getFreeLessonDetail(LessonID: string): Promise<{
  error: string | null;
  result: RobotModel[];
}> {
  const axiosConfig = {
    method: 'post',
    url: getFreeLessonDetailUrl,
    data: { lesson_id: LessonID },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data as RobotModel[],
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}
