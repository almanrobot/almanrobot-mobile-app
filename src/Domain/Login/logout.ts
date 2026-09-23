import { logout } from '@app/Data/Repository/login.repository';

export async function logOutUseCase(token: string) {
  return await logout(token);
}
