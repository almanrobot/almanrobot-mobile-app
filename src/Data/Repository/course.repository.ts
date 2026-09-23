import * as DataSource from '@app/Data/DataSource/course.datasource';
import { CourseCategory } from '@app/Models/course.model';

export async function getCourses(withCategory: CourseCategory) {
  const { result, error } = await DataSource.getAllCourses(withCategory);
  return { result, error };
}

export async function getUserCourses() {
  const { result, error } = await DataSource.getStoreAll();
  return { result, error };
}

export async function getUserServerCourses(token: string) {
  const { result, error } = await DataSource.getUserCoursesFromServer(token);
  return { result, error };
}

export async function deleteUserServerCourses(token: string, id: string) {
  await DataSource.deleteUserCoursesFromServer(token, id);
}
