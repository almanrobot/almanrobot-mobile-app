import { register } from '@app/Data/Repository/register.repository';
import { RegisterModel } from '@app/Models/register.model';

export async function RegisterUseCase(params: RegisterModel) {
  return await register(params);
}
