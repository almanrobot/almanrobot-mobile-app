import { deleteDraftLesson } from '@app/Data/Repository/lesson.repository';

export async function DeleteUserDraftLessonUseCase(key: string) {
  return await deleteDraftLesson(key);
}
