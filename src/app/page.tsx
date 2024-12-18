'use client';

import business from '@/assets/images/business.svg';
import Image from 'next/image';
import Header from '../components/common/header';
import LoginForm from './modules/login-form';
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-16 md:h-20 shrink-0 items-end rounded-lg bg-sky-100 dark:bg-sky-900 p-4">
        <Header isThemeShow={false} />
      </div>
      <div className="relative mt-4 flex grow flex-col-reverse sm:flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-10 justify-center p-4 md:w-1/2">
          <div className="flex justify-center items-center">
            <Image
              src={business}
              width={400}
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 py-10 md:w-1/2 md:px-12">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
