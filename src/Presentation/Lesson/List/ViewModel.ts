import { useState } from 'react';

import { GetLessonUseCase } from '@app/Domain/Lesson/get';
import { LessonModel } from '@app/Models/lesson.model';

export default function LessonListViewModel() {
  const [error, setError] = useState<string | null>();
  const [lessons, setLessons] = useState<LessonModel[]>([]);

  async function getLessons(CourseID: number) {
    const { result, error: requestError } = await GetLessonUseCase(CourseID);
    setError(requestError);
    setLessons(result);
  }
  return {
    error,
    getLessons,
    lessons,
  };
}
