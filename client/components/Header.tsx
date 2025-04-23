'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, login } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const isNotRenderedPath =
    pathname === '/blogs/create' ||
    pathname === '/auth/login' ||
    pathname === '/auth/register';

  useEffect(() => {
    const token = Cookies.get('access');
    if (token) {
      login(token);
    }

    setMounted(true);
  }, [login]);

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
            {!isNotRenderedPath && (
              <Link
                href='/blogs/create'
                className='border-2 border-border rounded-[60px] py-2.5 px-5'
              >
                Створити блог
              </Link>
            )}

            {mounted && (
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    useAuthStore.getState().logout();
                  } else {
                    router.push('/auth/login');
                  }
                }}
                className={`cursor-pointer flex items-center rounded-[60px] py-2.5 px-5 ${
                  isAuthenticated
                    ? 'bg-accent text-white'
                    : 'shadow-[0_9px_19px_0_rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.06)]'
                }`}
              >
                {isAuthenticated ? 'Вийти' : 'Увійти'}
              </button>
            )}
          </div>
        </div>

        <Navigation />
      </div>
    </header>
  );
};

export default Header;
