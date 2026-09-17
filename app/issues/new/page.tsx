'use client';

import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/issueForm'),
  { 
    ssr: false,
    loading: () => <p>Завантаження форми...</p>
  }
);

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;