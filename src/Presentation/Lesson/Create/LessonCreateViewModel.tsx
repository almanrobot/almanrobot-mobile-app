import {
  CreateDraftLessonUseCase,
  CreateUserLessonToServerUseCase,
} from '@app/Domain/Lesson/create';
import { DeleteUserDraftLessonUseCase } from '@app/Domain/Lesson/delete';
import { GetUserDraftLessonUseCase } from '@app/Domain/Lesson/get';

export default function LessonCreateViewModel() {
  const storeLesson = async (key: string, value: any) => {
    CreateDraftLessonUseCase(key, value);
  };

  const getLesson = async (key: string) => {
    const { result, error } = await GetUserDraftLessonUseCase(key);
    console.error('LessonCreateVM', error);
    return result;
  };

  const deleteLesson = async (key: string) => {
    DeleteUserDraftLessonUseCase(key);
  };

  const sendServer = async (
    key: string,
    token: any,
  ): Promise<{ error?: string; success?: string }> => {
    const draftLesson = await getLesson(key);
    const { error } = await CreateUserLessonToServerUseCase(
      key,
      draftLesson,
      token,
    );
    if (error) {
      console.error('LessonCreateVM->SendServerError', error);
      return Promise.resolve({ error: error });
    }
    return Promise.resolve({ success: 'done' });
  };

  return { storeLesson, getLesson, sendServer, deleteLesson };
}
