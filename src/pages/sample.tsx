import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Sample: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const greeting = locale === 'th' ? 'สวัสดี' : 'Hello World';

  return (
    <div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/sample">
          <a>Sample</a>
        </Link>
      </div>
      <p>{greeting}</p>
    </div>
  );
};

export default Sample;
