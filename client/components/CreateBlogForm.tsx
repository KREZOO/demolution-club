'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IFormInput {
  title: string;
  description: string;
  preview: string;
  content: string;
  tags: string;
}

const CreateBlogForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate: createBlog } = useCreateBlog();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);

    createBlog(data, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (err: any) => {
        console.error('Помилка при створенні блогу:', err);
        alert('Щось пішло не так при створенні блогу');
        setLoading(false);
      },
    });
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-8 border border-gray-300 rounded-lg shadow-md ${
        loading ? 'opacity-50' : ''
      }`}
    >
      <h1 className='text-3xl text-center font-semibold mb-6'>
        Створення нового блогу
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-lg font-medium text-gray-700'
          >
            Назва блогу
          </label>
          <input
            id='title'
            type='text'
            {...register('title', { required: "Назва обов'язкова" })}
            className='mt-1 block w-full p-3 border rounded-md'
          />
          {errors.title && (
            <p className='text-red-500'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-lg font-medium text-gray-700'
          >
            Опис блогу
          </label>
          <textarea
            id='description'
            rows={4}
            {...register('description', { required: "Опис обов'язковий" })}
            className='mt-1 block w-full p-3 border rounded-md'
          />
          {errors.description && (
            <p className='text-red-500'>{errors.description.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='preview'
            className='block text-lg font-medium text-gray-700'
          >
            Прев'ю блогу
          </label>
          <input
            id='preview'
            type='text'
            placeholder='Введіть посилання на зображення'
            {...register('preview')}
            className='mt-1 block w-full p-3 border rounded-md'
          />
        </div>

        <div>
          <label
            htmlFor='content'
            className='block text-lg font-medium text-gray-700'
          >
            Контент блогу
          </label>
          <textarea
            id='content'
            rows={6}
            {...register('content', { required: "Контент обов'язковий" })}
            className='mt-1 block w-full p-3 border rounded-md'
          />
          {errors.content && (
            <p className='text-red-500'>{errors.content.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block text-lg font-medium text-gray-700'
          >
            Теги
          </label>
          <input
            id='tags'
            type='text'
            placeholder='Введіть теги через кому'
            {...register('tags')}
            className='mt-1 block w-full p-3 border rounded-md'
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600'
            disabled={loading}
          >
            {loading ? 'Створення...' : 'Створити'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
