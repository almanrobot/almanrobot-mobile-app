import * as DataSource from '@app/Data/DataSource/register.datasource';
import { RegisterModel } from '@app/Models/register.model';

export async function register(params: RegisterModel) {
  const { result, error } = await DataSource.register(params);
  return { result, error };
}

export async function saveToken(token: string) {
  return await DataSource.saveAccessToken(token);
}
