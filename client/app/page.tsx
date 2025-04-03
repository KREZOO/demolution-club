'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: '', content: '' },
  });

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error('Ошибка загрузки:', err));
  }, []);

  const addBlog = async (data: { title: string; content: string }) => {
    const response = await fetch('http://localhost:8000/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newBlog = await response.json();
      setBlogs([...blogs, newBlog]);
      reset();
    }
  };

  const deleteBlog = async (id: number) => {
    const response = await fetch(`http://localhost:8000/${id}/delete/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-10 bg-gray-100 text-gray-800'>
      <main className='w-full max-w-md bg-white p-6 rounded-xl shadow-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Блог</h1>

        <form
          onSubmit={handleSubmit(addBlog)}
          className='mb-4 flex flex-col gap-2'
        >
          <input
            {...register('title', { required: true })}
            type='text'
            className='w-full p-2 border rounded-md'
            placeholder='Введите заголовок'
          />
          <textarea
            {...register('content', { required: true })}
            className='w-full p-2 border rounded-md h-24 resize-none'
            placeholder='Введите содержание'
          />
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Добавить
          </button>
        </form>

        <ul className='space-y-2'>
          {blogs.map((blog) => (
            <li key={blog.id} className='p-4 bg-gray-200 rounded-md'>
              <h2 className='font-bold text-lg'>{blog.title}</h2>
              <p className='text-gray-600'>{blog.content}</p>
              <button
                onClick={() => deleteBlog(blog.id)}
                className='mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
