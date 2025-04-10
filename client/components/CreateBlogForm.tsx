'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

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
    setValue,
    formState: { errors },
    control,
  } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: IFormInput) => {
      const response = await fetch('http://localhost:8000/api/blogs/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Помилка при створенні блогу');
      }

      return response.json();
    },
    onMutate: () => {
      setLoading(true);
    },

    onError: (error: any) => {
      console.error('Помилка при створенні блогу:', error);

      setLoading(false);
    },

    onSuccess: (result) => {
      alert('Блог успішно створений: ' + JSON.stringify(result));
      setLoading(false);
      if (isClient) {
        window.location.href = '/';
      }
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!data.preview) {
      data.preview = 'http://localhost:3000/default-blog.png';
    }

    mutation.mutate(data);
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
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            {...register('title', { required: "Назва обов'язкова" })}
          />
          {errors.title && (
            <p className='text-red-500 text-lg mt-1'>{errors.title.message}</p>
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
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            rows={4}
            {...register('description', { required: "Опис обов'язковий" })}
          />
          {errors.description && (
            <p className='text-red-500 text-lg mt-1'>
              {errors.description.message}
            </p>
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
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Введіть посилання на зображення'
            {...register('preview')}
          />
        </div>

        <div>
          <label
            htmlFor='content'
            className='block text-lg font-medium text-gray-700 '
          >
            Контент блогу
          </label>
          <textarea
            id='content'
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            rows={6}
            {...register('content', { required: "Контент обов'язковий" })}
          />
          {errors.content && (
            <p className='text-red-500 text-lg mt-1'>
              {errors.content.message}
            </p>
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
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Введіть теги через кому'
            {...register('tags')}
          />
        </div>

        <div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600'
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
