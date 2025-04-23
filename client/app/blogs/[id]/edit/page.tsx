'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useFetchBlog } from '@/hooks/useFetchBlog'; // Импорт хука useFetchBlog
import { useUpdateBlog } from '@/hooks/useUpdateBlog'; // Импорт хука useUpdateBlog
import { useDeleteBlog } from '@/hooks/useDeleteBlog'; // Импорт хука useDeleteBlog

interface BlogData {
  title: string;
  description: string;
  content: string;
  preview: string;
  tags: string;
  created_at: string;
}

interface IFormInput {
  title: string;
  description: string;
  preview: string;
  content: string;
  tags: string;
}

const EditBlogPage = () => {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  const { data, error, isLoading } = useFetchBlog(blogId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('content', data.content);
      setValue('tags', data.tags || '');
      setValue(
        'preview',
        data.preview || `${window.location.origin}/default-blog.png`
      );
    }
  }, [data, setValue]);

  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateBlog({ id: blogId, blogData: data });
  };

  const handleDelete = () => {
    if (confirm('Ви впевнені, що хочете видалити цей блог?')) {
      deleteBlog(blogId);
    }
  };

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;

  return (
    <div
      className={
        'max-w-4xl mx-auto p-8 border border-gray-300 rounded-lg shadow-md'
      }
    >
      <h1 className='text-3xl text-center font-semibold mb-6'>
        Редагувати блог
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-lg font-medium text-gray-700'
          >
            Заголовок
          </label>
          <input
            id='title'
            type='text'
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            {...register('title', { required: "Заголовок обов'язковий" })}
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
            Опис
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
            htmlFor='content'
            className='block text-lg font-medium text-gray-700'
          >
            Зміст
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
          <label
            htmlFor='preview'
            className='block text-lg font-medium text-gray-700'
          >
            Прев'ю
          </label>
          <input
            id='preview'
            type='text'
            className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Введіть посилання на зображення'
            {...register('preview')}
          />
        </div>

        <div className='flex gap-4'>
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600'
          >
            Зберегти зміни
          </button>

          <button
            type='button'
            onClick={handleDelete}
            className='w-full py-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600'
          >
            Видалити блог
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
