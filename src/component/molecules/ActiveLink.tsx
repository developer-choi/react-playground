import Link from 'next/link';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {isActiveLink} from '@util/extend/router';

export default function ActiveLink() {
  const {asPath} = useRouter();

  return (
    <Wrap>
      <ParentAnchorWrap>
        {parentLinks.map(({href, activePath, name}) => (
          <Link key={href} href={href} passHref>
            <ParentAnchor active={isActiveLink(asPath, activePath)}>{name}</ParentAnchor>
          </Link>
        ))}
      </ParentAnchorWrap>

      {testLinks.map((href) => (
        <Link key={href} href={href} passHref>
          <Anchor>{href}</Anchor>
        </Link>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 15px;
`;

const ParentAnchorWrap = styled.div`
  display: flex;
`;

const ParentAnchor = styled.a<{active: boolean}>`
  padding: 7px 15px;
  margin-right: 10px;
  border-radius: 20px;
  color: white;
  
  background: ${props => props.active ? props.theme.main : 'lightgray'};
  border-color: ${props => props.active ? props.theme.main : 'lightgray'};
`;

const Anchor = styled.a`
  display: block;
  margin: 15px 0;
  font-size: 16px;
`;

interface TestLink {
  name: string;
  href: string;
  activePath: string;
}

const UPPER_PATH = '/examples/use-router/active-link'

const parentLinks: TestLink[] = [
  {
    name: 'Video',
    href: UPPER_PATH + '/video',
    activePath: UPPER_PATH + '/video'
  },
  {
    name: 'Board',
    href: UPPER_PATH + '/board',
    activePath: UPPER_PATH + '/board'
  },
  {
    name: 'Fruit',
    href: UPPER_PATH + '/fruit',
    activePath: UPPER_PATH + '/fruit'
  },
  {
    name: 'Animal',
    href: UPPER_PATH + '/animal',
    activePath: UPPER_PATH + '/animal'
  },
];

const testLinks: string[] = [
  UPPER_PATH + '/video',
  UPPER_PATH + '/video-fake',
  UPPER_PATH + '/video?key=value#hash',
  UPPER_PATH + '/video/some?key=value#hash',
  UPPER_PATH + '/board',
  UPPER_PATH + '/board?key=value#hash',
  UPPER_PATH + '/board/some?key=value#hash',
  UPPER_PATH + '/fruit/apple',
  UPPER_PATH + '/animal/lion'
];
