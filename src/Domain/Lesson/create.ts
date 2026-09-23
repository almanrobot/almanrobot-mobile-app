import {
  createDraftLesson,
  createUserLesson,
} from '@app/Data/Repository/lesson.repository';
import { RobotData } from '@app/Models/robot.model';

export const CreateDraftLessonUseCase = async (
  key: string,
  value: RobotData[] | [],
) => {
  createDraftLesson(key, value);
};

export const CreateUserLessonToServerUseCase = async (
  course_name: string,
  course_data: any,
  token: string,
) => {
  const { result, error } = await createUserLesson(
    course_name,
    course_data,
    token,
  );

  return { result, error };
};
