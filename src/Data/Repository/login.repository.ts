import * as DataSource from '@app/Data/DataSource/login.datasource';
import { LoginModel } from '@app/Models/login.model';

export async function login(params: LoginModel) {
  const { result, error } = await DataSource.login(params);
  return { result, error };
}

export async function logout(token: string) {
  const { result, error } = await DataSource.logout(token);
  return { result, error };
}
