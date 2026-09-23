import { RegisterUseCase } from '@app/Domain/Register/register';
import { saveTokenUseCase } from '@app/Domain/Register/save_token';
import { RegisterModel } from '@app/Models/register.model';

export default function RegisterViewModel() {
  async function register(params: RegisterModel) {
    const { result, error } = await RegisterUseCase(params);
    return { result, error };
  }

  async function saveAccessToken(token: string) {
    await saveTokenUseCase(token);
  }

  return {
    register,
    saveAccessToken,
  };
}
