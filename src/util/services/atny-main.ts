import {useQuery} from '@tanstack/react-query';
import CourseApi from '@api/CourseApi';

export function useAtnyMainFullQuery() {
  return useQuery(ATNY_MAIN_QUUERY_OPTION.full).data?.list ?? [];
}

export function useAtnyMainTwoStepQuery() {
const firstQuery = useQuery(ATNY_MAIN_QUUERY_OPTION.first);
  const secondQuery = useQuery(ATNY_MAIN_QUUERY_OPTION.second);

  const firstList = firstQuery.data?.list ?? [];
  const secondList = secondQuery.data?.list ?? [];
  return firstList.concat(secondList);
}

export const ATNY_MAIN_QUUERY_OPTION = {
  full: {
    queryKey: ['atny-main-full'],
    queryFn: () => getAtnyMainApi(1, 10000),
    refetchOnWindowFocus: false,
    staleTime: 10000, //이거 안하면 SSR단계에서 1페이지 호출하고 CSR단계에서 또 1페이지호출함.
  },
  first: {
    queryKey: ['atny-main-first'],
    queryFn: () => getAtnyMainApi(1, 5000),
    staleTime: 10000, //이거 안하면 SSR단계에서 1페이지 호출하고 CSR단계에서 또 1페이지호출함.
    refetchOnWindowFocus: false
  },
  second: {
    queryKey: ['atny-main-second'],
    queryFn: () => getAtnyMainApi(2, 5000),
    refetchOnWindowFocus: false
  }
};

async function getAtnyMainApi(page: number, articlePerPage: number) {
  const api = new CourseApi();
  const {data} = await api.getList({page, articlePerPage});
  return data;
}
