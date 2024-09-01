'use client';

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({}: ErrorPageProps) {
  return (
    <h1>Internal Server Error</h1>
  );
}
