import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginData, LoginResponse } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      Cookies.set('access', data.access, { expires: 7 });
      Cookies.set('refresh', data.refresh, { expires: 7 });

      router.push('/');
    },
    onError: (error: Error) => {
      console.error('Ошибка входа:', error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.status === 'pending',
    error: mutation.error,
  };
};
