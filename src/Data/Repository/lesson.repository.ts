import {
  createDraftLessonToStorage,
  createUserLessonToServer,
  deleteDraftLessonToStorage,
  getLesson,
  getUserDraftLessonFromStorage,
} from '@app/Data/DataSource/lesson.datasource';
import { RobotData } from '@app/Models/robot.model';

export async function getLessons(CourseID: number) {
  const { result, error } = await getLesson(CourseID);
  return { result, error };
}

export async function getUserDraftLessons(key: string) {
  const { result, error } = await getUserDraftLessonFromStorage(key);
  return { result, error };
}

export async function createDraftLesson(key: string, value: RobotData[] | []) {
  createDraftLessonToStorage(key, value);
}

export async function deleteDraftLesson(key: string) {
  deleteDraftLessonToStorage(key);
}

export async function createUserLesson(
  course_name: string,
  course_data: any,
  token: string,
) {
  const { result, error } = await createUserLessonToServer(
    course_name,
    course_data,
    token,
  );
  return { result, error };
}
