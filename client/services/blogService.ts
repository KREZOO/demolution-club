import api from '@/lib/api';

export interface CreateBlogInputData {
  title: string;
  description: string;
  preview?: string;
  content: string;
  tags?: string;
}

export interface UpdateBlogInputData {
  title: string;
  description: string;
  preview?: string;
  content: string;
  tags?: string;
}

export interface BlogData {
  title: string;
  description: string;
  content: string;
  preview: string;
  tags: string;
  created_at: string;
  author: string;
}

export const createBlog = async (data: CreateBlogInputData) => {
  if (!data.preview) {
    data.preview = 'https://demolution-club.onrender.com/default-blog.png';
  }

  try {
    const response = await api.post('/blogs/create/', data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Помилка при створеннi блогу:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateBlog = async (id: string, data: UpdateBlogInputData) => {
  try {
    const response = await api.put(`/blogs/${id}/update/`, data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Помилка при оновленні блогу:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await api.delete(`/blogs/${id}/delete/`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Помилка при видаленні блогу:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlog = async (id: string): Promise<BlogData> => {
  try {
    const response = await api.get(`/blogs/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Помилка при отриманні даних блогу:',
      error.response?.data || error.message
    );
    throw error;
  }
};
