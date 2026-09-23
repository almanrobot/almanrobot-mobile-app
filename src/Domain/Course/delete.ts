import { deleteUserServerCourses } from '@app/Data/Repository/course.repository';

export async function DeleteUserServerCourseUseCase(token: string, id: string) {
  await deleteUserServerCourses(token, id);
}
