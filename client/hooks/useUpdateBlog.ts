import { useMutation } from '@tanstack/react-query';
import { updateBlog, UpdateBlogInputData } from '@/services/blogService';

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: (data: { id: string; blogData: UpdateBlogInputData }) =>
      updateBlog(data.id, data.blogData),
  });
};
