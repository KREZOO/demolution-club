'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isCreateBlogPage = pathname === '/create-blog';
  const isBlogDetailPage = pathname.startsWith('/blogs/');

  return (
    <header
      className='relative text-inverted pt-12.5 pb-7.5 min-h-[174px] mb-5'
      style={{
        background:
          'linear-gradient(181deg, #0d0939 0%, #080435 12.39%, #130f3d 45.36%, #0d0939 100%)',
      }}
    >
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <Link href='/'>
            <Image src='/logo.svg' width={236} height={36} alt='logo' />
          </Link>

          <div className='flex gap-5'>
            {!isCreateBlogPage && (
              <Link
                href='/blogs/create'
                className='border-2 border-border rounded-[60px] py-2.5 px-5'
              >
                Створити блог
              </Link>
            )}

            <button className='cursor-pointer rounded-[60px] py-2.5 px-5 shadow-[0_9px_19px_0_rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.06)]'>
              Увійти
            </button>
          </div>
        </div>

        <nav className='mt-5.5'>
          <Link href='/'>Головна</Link>

          {isCreateBlogPage && (
            <span className='text-accent ml-2'>/ Створення блогу</span>
          )}
          {isBlogDetailPage && <span className='text-accent ml-2'>/ Блог</span>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
