import { login } from '@app/Data/Repository/login.repository';
import { LoginModel } from '@app/Models/login.model';

export async function LoginUseCase(params: LoginModel) {
  return await login(params);
}
