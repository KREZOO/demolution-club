import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isCreateBlogPage = pathname === '/blogs/create';
  const isEditBlogPage = pathname.endsWith('/edit');
  const isBlogDetailPage =
    pathname.startsWith('/blogs/') && !isCreateBlogPage && !isEditBlogPage;
  const isLoginPage = pathname === '/auth/login';
  const isRegisterPage = pathname === '/auth/register';
  return (
    <nav className='mt-5.5'>
      <Link href='/'>Головна</Link>

      {isCreateBlogPage && (
        <span
          onClick={() => router.back()}
          className='text-accent ml-2 cursor-pointer'
        >
          / Створення блогу
        </span>
      )}

      {isBlogDetailPage && (
        <span
          onClick={() => router.back()}
          className='text-accent ml-2 cursor-pointer'
        >
          / Блог
        </span>
      )}

      {isLoginPage && (
        <span
          onClick={() => router.back()}
          className='text-accent ml-2 cursor-pointer'
        >
          / Вхід в аккаунт
        </span>
      )}

      {isRegisterPage && (
        <span
          onClick={() => router.back()}
          className='text-accent ml-2 cursor-pointer'
        >
          / Реєстрація
        </span>
      )}

      {isEditBlogPage && (
        <span
          onClick={() => router.back()}
          className='text-accent ml-2 cursor-pointer'
        >
          / Редагування блогу
        </span>
      )}
    </nav>
  );
};

export default Navigation;
