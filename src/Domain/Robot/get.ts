import { getFreeRobot, getRobot } from '@app/Data/Repository/robot.repository';

export async function GetRobotUseCase(LessonID: string, token: string) {
  return await getRobot(LessonID, token);
}

export async function GetFreeRobotUseCase(LessonID: string) {
  return await getFreeRobot(LessonID);
}
