export interface RobotModel {
  id: string;
  lesson_id: string;
  data: RobotData[];
  image?: string;
}

export type RobotData = {
  key: string;
  key_tr: string;
  value: string;
  value_tr: string;
};
