import { Account } from '@/types/account';
import { instance } from './index';
import { User } from '@/types/user';


export const login = async (account: Account): Promise<string> => {
  try {
    const response = await instance.post('/v1/auth/admin/login', account);
    if (response.data?.isSuccess && response.data?.result) {
      return response.data.result.token;
    } else {
      throw new Error('Failed to request data');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await instance.get('/auth/info');
    if (response.data?.isSuccess && response.data?.result) {
      return response.data.result;
    } else {
      throw new Error('Failed to request data');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};