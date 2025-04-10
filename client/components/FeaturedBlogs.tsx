'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface BlogCard {
  id: string;
  title: string;
  description: string;
  preview: string;
}

const fetchRandomBlogs = async () => {
  const response = await fetch('http://localhost:8000/api/blogs/random/');
  if (!response.ok) {
    throw new Error('Помилка при завантаженнi блогiв');
  }
  return response.json();
};

export const FeaturedBlogs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: blogPosts,
    isLoading,
    isError,
  } = useQuery<BlogCard[]>({
    queryKey: ['randomBlogs'],
    queryFn: fetchRandomBlogs,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (isLoading) {
    return <div className='text-center text-5xl'>Завантаження...</div>;
  }

  if (isError) {
    return (
      <div className='text-center text-5xl'>
        Помилка при завантаженнi блогiв.
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect='fade'
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (_index, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
      >
        {blogPosts?.slice(0, 3).map((_, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className='grid grid-cols-3 grid-rows-2 gap-4 h-[550px]'
              initial='initial'
              animate='animate'
              variants={fadeInUp}
            >
              {/* Left top card */}
              <motion.div
                className='col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg'
                variants={fadeInUp}
              >
                <img
                  src={blogPosts[index].preview}
                  alt={blogPosts[index].title}
                  className='w-full h-full object-cover rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 p-4 text-white bg-black/50'>
                  <Link
                    href={`/blogs/${blogPosts[index].id}`}
                    className='text-2xl font-bold truncate'
                  >
                    {blogPosts[index].title}
                  </Link>
                  <p className='text-sm truncate'>
                    {blogPosts[index].description}
                  </p>
                </div>
              </motion.div>

              {/* Right bottom mini-cards */}
              <motion.div
                className='row-span-1 relative rounded-xl overflow-hidden shadow border'
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={blogPosts[(index + 1) % blogPosts.length].preview}
                  alt={blogPosts[(index + 1) % blogPosts.length].title}
                  className='w-full h-full object-cover rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 text-white text-sm p-2'>
                  {blogPosts[(index + 1) % blogPosts.length].title}
                </div>
              </motion.div>

              {/* Right top mini-cards */}
              <motion.div
                className='row-span-1 relative rounded-xl overflow-hidden shadow border'
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <img
                  src={
                    blogPosts[(index + 2) % blogPosts.length].preview ||
                    '/default-blog.png'
                  }
                  alt={blogPosts[(index + 2) % blogPosts.length].title}
                  className='w-full h-full object-cover rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 text-white text-sm p-2'>
                  {blogPosts[(index + 2) % blogPosts.length].title}
                </div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-pagination flex justify-center gap-2 mt-4' />
    </div>
  );
};
