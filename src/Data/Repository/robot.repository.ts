import {
  getFreeLessonDetail,
  getLessonDetail,
} from '@app/Data/DataSource/robot.datasource';

export async function getRobot(LessonID: string, token: string) {
  const { result, error } = await getLessonDetail(LessonID, token);
  return { result, error };
}

export async function getFreeRobot(LessonID: string) {
  const { result, error } = await getFreeLessonDetail(LessonID);
  return { result, error };
}
