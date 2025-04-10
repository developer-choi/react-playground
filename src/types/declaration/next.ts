import {PropsWithChildren, ReactNode} from 'react';

export interface PageServerComponentProps {
  params: Record<string, string | undefined>;
  searchParams: Record<string, string | string[] | undefined>;
}

// Layout 컴포넌트를 Server Component로 만드는 경우 전달될 수 있는 props
export type LayoutProps = PropsWithChildren<Pick<PageServerComponentProps, 'params'>>;

// Layout 컴포넌트를 Parallel Route 기반에서 사용하는 경우 전달될 수 있는 props
export type ParallelRouteLayoutProps<T extends string> = Record<T, ReactNode>;

export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}