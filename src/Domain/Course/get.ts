import {
  getCourses,
  getUserCourses,
  getUserServerCourses,
} from '@app/Data/Repository/course.repository';
import { CourseCategory } from '@app/Models/course.model';

export async function GetCourseUseCase(withCategory: CourseCategory) {
  return await getCourses(withCategory);
}

export async function GetUserCourseUseCase() {
  return await getUserCourses();
}

export async function GetUserServerCourseUseCase(token: string) {
  return await getUserServerCourses(token);
}
