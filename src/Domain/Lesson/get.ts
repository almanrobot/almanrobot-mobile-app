import {
  getLessons,
  getUserDraftLessons,
} from '@app/Data/Repository/lesson.repository';

export async function GetLessonUseCase(CourseID: number) {
  return await getLessons(CourseID);
}

export async function GetUserDraftLessonUseCase(key: string) {
  return await getUserDraftLessons(key);
}
