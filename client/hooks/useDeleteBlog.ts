import { useMutation } from '@tanstack/react-query';
import { deleteBlog } from '@/services/blogService';
import { useRouter } from 'next/navigation';

export const useDeleteBlog = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),

    onSuccess: () => {
      router.push('/');
    },

    onError: (error: Error) => {
      console.error('Помилка при видаленні блогу:', error);
    },
  });
};
