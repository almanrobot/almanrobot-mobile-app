import { RobotData } from './robot.model';

export interface LessonModel {
  id: string;
  course_id: string;
  name: string;
  image: string;
  is_publish: boolean;
}

export type LessonCreateRobotDialog = { dialogs: RobotData[] };
