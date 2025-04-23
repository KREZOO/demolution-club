import { useMutation } from '@tanstack/react-query';
import {
  registerUser,
  RegisterData,
  RegisterResponse,
} from '@/services/authService';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data: RegisterResponse) => {
      Cookies.set('access', data.token, { expires: 7 });

      router.push('/');
    },
    onError: (error: Error) => {
      console.error('Ошибка регистрации:', error);
    },
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.status === 'pending',
    error: mutation.error,
  };
};
