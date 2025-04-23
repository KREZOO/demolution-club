'use client';

import { useParams } from 'next/navigation';
import { useFetchBlog } from '@/hooks/useFetchBlog';
import { useDeleteBlog } from '@/hooks/useDeleteBlog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BlogPage = () => {
  const params = useParams();
  const blogId =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';
  const { data, error, isLoading } = useFetchBlog(blogId);

  const { mutate: deleteBlog } = useDeleteBlog();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteBlog(blogId);
      router.push('/');
    } catch (error) {
      console.error('Ошибка при удалении блога:', error);
    }
  };

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
    <div
      className='max-w-7xl mx-auto p-8 font-rubik'
      style={{ whiteSpace: 'pre-line' }}
    >
      <img
        src={data.preview}
        alt={data.title}
        className='mb-4 mx-auto max-h-[500px]'
      />
      <h1 className='text-3xl font-semibold mb-2.5 text-center'>
        {data.title}
      </h1>
      <div className='text-lg text-justify'>{data.content}</div>

      <div className='text-sm mt-4 font-bold'>Автор: {data.author}</div>
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

      <div className='mt-4 flex gap-4'>
        <Link href={`/blogs/${blogId}/edit`}>
          <button className='px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer hover:bg-purple-600'>
            Редагувати
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className='px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600'
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
