import React, {ComponentPropsWithoutRef} from 'react';
import Link, {LinkProps} from 'next/link';
import ValidateError from '@util/services/handle-error/ValidateError';

export interface LinkOrAnchorProp extends ComponentPropsWithoutRef<'a'>, Pick<LinkProps, 'prefetch'> {
  href: string;
}

export default function LinkOrAnchor({prefetch, href, target, rel, ...rest}: LinkOrAnchorProp) {
  if (!href) {
    return <a target={target} rel={rel} {...rest} />;
  }

  const {isOurOrigin, link} = isOurOriginLink(href, OUR_ORIGINS);

  if (isOurOrigin) {
    return (
      <Link href={link} prefetch={prefetch}>
        <a {...rest}/>
      </Link>
    );
  }

  const innerProp = target !== undefined ?
    {target, rel}
    :
    {target: '_blank', rel: 'noreferrer'};

  return (
    <a href={link} target={innerProp.target} rel={innerProp.rel} {...rest}/>
  );
}

const OUR_ORIGINS = ['http://localhost:3000', 'https://react-playground-xi.vercel.app'];

function isOurOriginLink(link: string, ourOrigins: string[]) {
  try {
    const {origin} = new URL(link);

    if (!ourOrigins.some(origin => link.startsWith(origin))) {
      return {
        isOurOrigin: false,
        link
      };
    }

    /**
     * 이걸 안하면, link가 http://localhost:3000일 때
     * 결과적으로 <Link href="" 이렇게 되서 현재 페이지로 데이터만 새로고침된다.
     * 하지만 http://localhost:3000의 의미는 이 Origin의 root page를 가리키는 url이기 때문에,
     * 직접 이렇게 작성했다.
     */
    if (origin === link) {
      return {
        isOurOrigin: true,
        link: '/'
      };
    }

    return {
      isOurOrigin: true,
      link: link.replaceAll(origin, '')
    };

  } catch (error) {
    const originalMessage = (error as Error).message;
    const message = `${originalMessage}
Expected URL (example): https://some.domain.com/some/path
Link(Parameter): ${link}
    `;

    throw new ValidateError(message);
  }
}
