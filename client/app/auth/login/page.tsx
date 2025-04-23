'use client';

import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useLogin';
import { LoginData } from '@/services/authService';
import Link from 'next/link';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginData>();
  const { login, isLoading, error } = useLogin();

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <main className='flex items-center justify-center h-[calc(100vh-270px)]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4'
      >
        <h1 className='text-2xl font-bold text-center'>Авторизація</h1>

        <input
          type='text'
          placeholder='Ім’я'
          {...register('username', { required: true })}
          className='w-full p-2 border rounded-lg'
        />

        <input
          type='email'
          placeholder='Email'
          {...register('email', { required: true })}
          className='w-full p-2 border rounded-lg'
        />
        <input
          type='password'
          placeholder='Пароль'
          {...register('password', { required: true })}
          className='w-full p-2 border rounded-lg'
        />

        {error && (
          <p className='text-red-500 text-sm'>Помилка: {error.message}</p>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          {isLoading ? 'Авторизація...' : 'Увійти'}
        </button>

        <Link
          href='/auth/register'
          className='block text-center w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition'
        >
          Реєстрація
        </Link>
      </form>
    </main>
  );
}
