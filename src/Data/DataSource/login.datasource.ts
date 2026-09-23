import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getManufacturer, getUniqueId } from 'react-native-device-info';

import { loginUrl, logoutUrl } from '@app/Data/EndPoint';
import { LoginModel } from '@app/Models/login.model';

export async function login(params: LoginModel): Promise<{
  error: string | null;
  result: any;
}> {
  const manufacturer = await getManufacturer();
  const deviceId = await getUniqueId();
  const axiosConfig = {
    method: 'post',
    url: loginUrl,
    data: {
      phone_number: params.phone_number,
      password: params.password,
      deviceId,
      manufacturer,
    },
  };
  try {
    const response = await axios(axiosConfig);
    saveAccessToken(response.data.access_token);
    return Promise.resolve({
      error: null,
      result: response.data,
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.response?.data.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function logout(token: string) {
  const axiosConfig = {
    method: 'post',
    url: logoutUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(axiosConfig);
    return Promise.resolve({
      error: null,
      result: response.data,
    });
  } catch (error) {
    let errMsg = axios.isAxiosError(error)
      ? String(error.response?.data.message)
      : 'Beklenmedik Hata.';
    return Promise.resolve({ error: errMsg, result: [] });
  }
}

export async function saveAccessToken(token: string) {
  try {
    await AsyncStorage.setItem('access_token', token);
  } catch (e) {
    // saving error
    console.error('saveAccessTokenError =>', e);
  }
}
