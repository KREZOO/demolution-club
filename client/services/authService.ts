import axios from 'axios';

const API_URL = 'https://demolution-club.onrender.com/api/auth';

export interface LoginData {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResponse {
  token: string;
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register/`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Помилка при реєстраціі:', error.response?.data);
      throw new Error(
        error.response?.data?.email?.[0] ||
          error.response?.data?.username?.[0] ||
          error.response?.data?.password?.[0] ||
          'Невідома помилка при реєстраціі'
      );
    }
    throw new Error('Помилка при реєстраціі');
  }
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login/`, data);
    console.log(`${API_URL}/login/`, response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка входу:', error);
    throw new Error('Помилка входу');
  }
};
