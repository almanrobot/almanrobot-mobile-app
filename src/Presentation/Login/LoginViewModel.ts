import { LoginUseCase } from '@app/Domain/Login/login';
import { LoginModel } from '@app/Models/login.model';

export default function LoginViewModel() {
  async function login(params: LoginModel) {
    const { result, error } = await LoginUseCase(params);
    return { result, error };
  }

  return {
    login,
  };
}
