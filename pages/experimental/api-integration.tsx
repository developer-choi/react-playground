import {useQuery, useQueryClient} from '@tanstack/react-query';

export default function Home() {
  return null
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

async function getInitialApi() {
  // const {data: {header, footer, security}} = await axios.get('/initial');
  const header = ['event-list-data', 'plan-list-data', 'hot-search-keywords'];
  const footer = ['customer-center-tel', 'company-info'];
  const security = ['auto-logout-minute'];

  return {
    header: header ? header : undefined,
    footer: footer ? footer : undefined,
    security: security ? security : undefined
  }
}

function useInitialQuery() {
  const queryClient = useQueryClient();

  const initialQuery = useQuery({
    queryKey: ['INITIAL'],
    queryFn: async () => {
      const {header, footer, security} = await getInitialApi();

      if (header) {
        queryClient.setQueryData(['header'], header);
      }
      if (footer) {
        queryClient.setQueryData(['footer'], footer);
      }
      if (security) {
        queryClient.setQueryData(['security'], security);
      }

      // ['INITIAL'] 쿼리키로는 캐시데이터가 저장되지않도록 수정
      return null;
    },

    // 통합API는 사이트 내 임의 페이지 최초 접근 시 한번만 호출하고, 이후에는 각 데이터별로 따로 최신화
    staleTime: Infinity,
    cacheTime: Infinity
  });

  const headerQuery = useQuery({
    queryKey: ['header'],
    queryFn: getHeaderApi,
    enabled: initialQuery.isFetched, // 각각의 API는 통합API가 호출되고나서 호출되게 하기위함
    staleTime: 1111 // 각 데이터별로 따로 최신화하기위함
  });

  const footerQuery = useQuery({
    queryKey: ['footer'],
    queryFn: getFooterApi,
    enabled: initialQuery.isFetched,
    staleTime: Infinity,
    cacheTime: Infinity
  });

  const securityQuery = useQuery({
    queryKey: ['security'],
    queryFn: getSecurityApi,
    enabled: initialQuery.isFetched,
    staleTime: Infinity,
    cacheTime: Infinity
  });

  return {
    headerQuery,
    footerQuery,
    securityQuery
  }
}

async function getHeaderApi() {}
async function getFooterApi() {}
async function getSecurityApi() {}