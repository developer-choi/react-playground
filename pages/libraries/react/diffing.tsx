import React, {PropsWithChildren, useEffect, useState} from 'react';
import RadioGroup from '@component/atom/forms/RadioGroup';
import RadioLabel from '@component/atom/forms/RadioLabel';
import useLogMount from '@util/custom-hooks/useLogMount';

/**
 * A <==> B 갈떄는 unmount, mount됨.
 * A <==> C 갈때는 re-rendering만 됨.
 * 함수이름이 대문자로 시작하냐 마냐에 따라 별도의 컴포넌트인지 아닌지로 체크하는것같고,
 * 함수이름이 소문자로 시작하면 각종 hooks를 사용하지못하기때문에 합리적이라고 판단이 들었음.
 */
export default function Page() {
  const [abc, setAbc] = useState<'A' | 'B' | 'C'>('A');

  return (
    <>
      <RadioGroup name="abc" value={abc} onChange={setAbc}>
        <RadioLabel value="A" label="AAAAAAA"/>
        <RadioLabel value="B" label="BBBBBBB"/>
        <RadioLabel value="C" label="CCCCCCC"/>
        {abc === 'A' ? (
            <OriginalLayout>
              A 페이지
            </OriginalLayout>
          )
          : abc === 'B' ? (
              <CustomLayout>
                B 페이지
              </CustomLayout>
            )
            : (
              funcLayout({children: 'C 페이지'})
            )
        }
      </RadioGroup>
    </>
  );
}

function OriginalLayout({children}: PropsWithChildren) {
  useLogMount('original-layout');
  useEffect(() => {
    console.log('re-render', children);
  }, [children]);
  return (
    <div>{children}</div>
  );
}

function CustomLayout({children}: PropsWithChildren) {
  return (
    <OriginalLayout>{children}</OriginalLayout>
  );
}

function funcLayout({children}: PropsWithChildren) {
  return (
    <OriginalLayout>{children}</OriginalLayout>
  );
}
