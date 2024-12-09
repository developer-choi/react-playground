export interface ServerComponentProps {
  params: {
    [key: string]: string | undefined;
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  };
}

export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}