import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getManufacturer, getUniqueId } from 'react-native-device-info';

import { registerUrl } from '@app/Data/EndPoint';
import { RegisterModel } from '@app/Models/register.model';

export async function register(params: RegisterModel): Promise<{
  error: string | null;
  result: any;
}> {
  const manufacturer = await getManufacturer();
  const deviceId = await getUniqueId();
  const axiosConfig = {
    method: 'post',
    url: registerUrl,
    data: {
      phone_number: params.phoneNumber,
      confirmed_text: params.confirmedText,
      deviceId,
      manufacturer,
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
