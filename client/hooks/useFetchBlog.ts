import { useQuery } from '@tanstack/react-query';
import { getBlog, BlogData } from '@/services/blogService';

export const useFetchBlog = (id: string) => {
  return useQuery<BlogData, Error>({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
};
