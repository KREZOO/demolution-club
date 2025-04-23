import { useMutation } from '@tanstack/react-query';
import { createBlog, CreateBlogInputData } from '@/services/blogService';

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: (data: CreateBlogInputData) => createBlog(data),
  });
};
