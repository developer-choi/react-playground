import React, {ComponentPropsWithoutRef, useEffect, useState} from 'react';
import Link, {LinkProps} from 'next/link';

/**
 * href: FULL URL (관리자페이지에서 무언가를 등록할 때 (이미지배너 등) 연결될 URL을 입력하게되는데 그 때 입력되는 FULL URL
 * @example ("https://www.naver.com") ==> <a href="https://www.naver.com" target="입력값">으로 작동
 * @example ("https://some.production.com/some/directory") ==> <Link href="/some/directory">으로 작동
 * @example ("") ==> <a>으로 작동
 */
export interface LinkOrAnchorProp extends ComponentPropsWithoutRef<'a'>, Pick<LinkProps, 'prefetch'> {
  href: string;
}

export default function LinkOrAnchor({prefetch, href, target, rel, ...rest}: LinkOrAnchorProp) {
  const originLink = useOriginLink(href);

  if (originLink === 'initial' || !originLink.href) {
    return <a {...rest} />;
  }

  if (originLink.isOurOrigin) {
    return (
      <Link href={originLink.href} prefetch={prefetch}>
        <a {...rest}/>
      </Link>
    );
  }

  const innerProp = target !== undefined ?
    {target, rel}
    :
    {target: '_blank', rel: 'noreferrer'};

  return (
    <a href={originLink.href} target={innerProp.target} rel={innerProp.rel} {...rest}/>
  );
}

function useOriginLink(href: string) {
  const [originLink, setOriginLink] = useState<'initial' | {href: string, isOurOrigin: boolean}>('initial');

  useEffect(() => {
    try {
      //이 값은 항상 origin 맽 끝에 /가 없음
      const {origin} = new URL(href);

      if (origin !== location.origin) {
        setOriginLink({
          isOurOrigin: false,
          href
        });
        return;
      }

      /**
       * 이걸 안하면, link가 http://localhost:3000일 때
       * 결과적으로 <Link href="" 이렇게 되서 현재 페이지로 데이터만 새로고침된다.
       * 하지만 http://localhost:3000의 의미는 이 Origin의 root page를 가리키는 url이기 때문에,
       * 직접 이렇게 작성했다.
       */
      if (origin === href || origin + '/' === href) {
        setOriginLink({
          isOurOrigin: true,
          href: '/'
        });
        return;
      }

      setOriginLink({
        isOurOrigin: true,
        href: href.replaceAll(origin, '')
      });

    } catch (error) {
      const originalMessage = (error as Error).message;
      const message = `${originalMessage}
Expected URL (example): https://some.domain.com/some/path
Link(Parameter): ${href === '' ? '(empty string)' : href}
    `;
      console.error(message);

      setOriginLink({
        isOurOrigin: false,
        href: ''
      });
    }
  }, [href]);

  return originLink;
}
