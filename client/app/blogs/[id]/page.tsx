'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogData {
  title: string;
  description: string;
  content: string;
  preview: string;
  tags: string;
  created_at: string;
}

const fetchBlog = async (id: string) => {
  const response = await fetch(`http://localhost:8000/api/blogs/${id}/`);
  if (!response.ok) {
    throw new Error('Помилка при отриманні даних блогу');
  }
  return response.json();
};

const BlogPage = () => {
  const params = useParams();
  const blogId =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';

  const { data, error, isLoading } = useQuery<BlogData, Error>({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlog(blogId),
    enabled: !!blogId,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;
  if (!data) return <p>Блог не знайдений</p>;

  const createdDate = new Date(data.created_at);
  const formattedDate = createdDate.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tags = data.tags ? data.tags.split(',') : [];

  return (
    <div className='max-w-7xl mx-auto p-8 font-rubik'>
      <img src={data.preview} alt={data.title} className='mb-4 mx-auto' />
      <h1 className='text-3xl font-semibold mb-2.5'>{data.title}</h1>
      <div className='text-lg text-justify'>{data.content}</div>
      <div className='text-sm mt-4 font-bold'>Створено: {formattedDate}</div>
      {tags.length > 0 && (
        <div className='mt-4 flex gap-2.5'>
          <strong>Теги: </strong>
          <div className='flex gap-1.5'>
            {tags.map((tag, index) => (
              <span
                key={index}
                className='px-3 py-1 text-sm border border-purple-500 text-purple-500 rounded-full'
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link href={`/blogs/${blogId}/edit`}>
        <button className='mt-4 px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer hover:bg-purple-600'>
          Редагувати
        </button>
      </Link>
    </div>
  );
};

export default BlogPage;
