'use client';

import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/useRegister';
import { RegisterData } from '@/services/authService';

export default function RegisterPage() {
  const { register: formRegister, handleSubmit } = useForm<RegisterData>();
  const { register, isLoading, error } = useRegister();

  const onSubmit = (data: RegisterData) => {
    register(data);
  };

  return (
    <div className='flex items-center justify-center h-[calc(100vh-270px)]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4'
      >
        <h1 className='text-2xl font-bold text-center'>Реєстрація</h1>

        <input
          type='text'
          placeholder='Ім’я'
          {...formRegister('username', { required: true })}
          className='w-full p-2 border rounded-lg'
        />
        <input
          type='email'
          placeholder='Email'
          {...formRegister('email', { required: true })}
          className='w-full p-2 border rounded-lg'
        />
        <input
          type='password'
          placeholder='Пароль'
          {...formRegister('password', { required: true })}
          className='w-full p-2 border rounded-lg'
        />

        {error && (
          <p className='text-red-500 text-sm'>Помилка: {error.message}</p>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition'
        >
          {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
      </form>
    </div>
  );
}
