import { saveToken } from '@app/Data/Repository/register.repository';

export async function saveTokenUseCase(token: string) {
  return await saveToken(token);
}
