'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { FeaturedBlogs } from '@/components/FeaturedBlogs';

const fetchBlogs = async () => {
  const response = await fetch('http://localhost:8000/api/blogs/');
  if (!response.ok) {
    throw new Error('Помилка при завантаженні блогів');
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error instanceof Error) {
    return <div>Помилка: {error.message}</div>;
  }

  const allTags = new Set<string>();
  data?.forEach((blog: any) => {
    if (blog.tags) {
      blog.tags.split(',').forEach((tag: string) => {
        allTags.add(tag.trim());
      });
    }
  });

  return (
    <div className='flex flex-col gap-5'>
      <FeaturedBlogs />
      <main>
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {data?.map((blog: any) => (
              <div key={blog.id} className='bg-white rounded-xl shadow p-4'>
                <Link
                  href={`/blogs/${blog.id}`}
                  className='font-bold text-lg mb-2'
                >
                  <img
                    src={blog.preview || '/default-blog.png'}
                    alt={blog.title}
                    className='rounded-lg mb-3'
                  />

                  {blog.title}
                </Link>
                <p className='text-sm text-gray-600 mb-2'>{blog.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {blog.tags && blog.tags.trim() && (
                    <div className='flex flex-wrap gap-2'>
                      {blog.tags
                        .split(',')
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className='px-3 py-1 text-sm border border-purple-500 text-purple-500 rounded-full'
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <aside className='space-y-8'>
            <div className='bg-white p-4 rounded-xl shadow'>
              <h3 className='font-semibold text-2xl mb-4.5'>Теги</h3>
              <div className='flex flex-wrap gap-2'>
                {allTags.size > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {[...allTags].map((tag, i) => (
                      <span
                        key={i}
                        className='px-3 py-1 text-sm border border-purple-500 text-purple-500 rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-600'>Немає тегів для відображення</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
