import { useState } from 'react';

import {
  GetCourseUseCase,
  GetUserCourseUseCase,
  GetUserServerCourseUseCase,
} from '@app/Domain/Course/get';
import { CourseCategory, CourseModel } from '@app/Models/course.model';
import { CourseType } from '@app/Models/course.model';

export default function CourseListViewModel() {
  const [error, setError] = useState<string | null>();
  const [courses, setCourses] = useState<CourseModel[]>([]);

  async function getCourses(
    courseType: CourseType,
    withCategory: CourseCategory = 'general',
    auth: string,
  ): Promise<void> {
    if (courseType === 'userdraft') {
      const { result, error: requestError } = await GetUserCourseUseCase();
      setError(requestError);
      setCourses(result);
    } else if (courseType === 'userserver') {
      const { result, error: requestError } = await GetUserServerCourseUseCase(
        auth,
      );
      setError(requestError);
      setCourses(result);
    } else {
      const { result, error: requestError } = await GetCourseUseCase(
        withCategory,
      );
      setError(requestError);
      setCourses(result);
    }
  }
  return {
    error,
    getCourses,
    courses,
  };
}
