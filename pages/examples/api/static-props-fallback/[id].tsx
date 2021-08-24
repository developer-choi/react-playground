import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

interface PageProp {
  data: string;
}

export default function StaticPropsFallbackPage(props: PageProp) {
  const { isFallback } = useRouter();
  
  console.log(isFallback, props);
  
  return (
    <>
      <TabMenus/>
      <span>{props.data}</span>
    </>
  )
};

function TabMenus() {
  const { asPath } = useRouter();
  
  return (
    <Menu>
      {FALLBACK_PARAM_LIST.map(id => (
        <Link passHref prefetch={false} key={id} href={`/examples/api/static-props-fallback/${id}`}>
          <Anchor className={asPath.endsWith(id) ? 'active' : ''}>{id}</Anchor>
        </Link>
      ))}
    </Menu>
  );
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Anchor = styled.a`
  padding: 5px;
  &.active {
    color: ${props => props.theme.main};
    font-weight: bold;
  }
`;

type ParamType = {
  id: 'one' | 'two'
};

const PARAMS_LIST: ParamType['id'][] = ['one', 'two'];
const FALLBACK_PARAM_LIST: string[] = (PARAMS_LIST as string[]).concat('three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven');

export const getStaticPaths: GetStaticPaths<ParamType> = async () => {
  console.log('getStaticPaths called');
  return {
    paths: PARAMS_LIST.map(id => ({
      params: {
        id
      }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<PageProp, ParamType> = async ({ params }) => {
  console.log('getStaticProps called');
  const { id } = params as ParamType;
  
  return {
    props: {
      data: id
    }
  };
};
