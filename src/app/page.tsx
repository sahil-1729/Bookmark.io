export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic';

import Header from '@/components/Header(login-signup)/Header';
import { Hero } from '@/components/Hero';

export default async function Index() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

