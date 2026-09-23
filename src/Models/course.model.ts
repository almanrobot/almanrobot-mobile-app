export interface CourseModel {
  id: string;
  type: string;
  name: string;
  total_lesson: number;
  category: string;
  is_publish: boolean;
  image: string;
}

export type CourseCategory =
  | 'general'
  | 'image-describe'
  | 'interview'
  | 'exam-preparation';

export type CourseType = 'userdraft' | 'userserver';
