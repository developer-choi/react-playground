'use client';

import {useState} from 'react';
import {Button} from '@forworkchoe/core/components';
import designSystemStyles from '@forworkchoe/core/design-system.module.scss';

/**
 * URL: http://localhost:3000/markup/layout/sticky-header
 * Doc : https://docs.google.com/document/d/1oZCz1U-AKVq81TQnu2pdy-CPN4b-EYEj_OkmIq2hCdI/edit
 *
 * 조건 1. 페이지 컨텐츠(main) 높이가 뷰포트보다 작을 때 뷰포트 나머지 영역만큼 최대치로 늘어나야함.
 * 조건 2. 페이지 컨텐츠(main) 높이가 뷰포트보다 크더라도 스크롤 쭉 쭉 내려도 헤더가 상단에 계속 붙어다녀야함.
 * (상세한 헤더 필기는 같은 뎁스의 layout 파일에)
 *
 * 그래서 Add row 버튼 눌러보며 행 겟수에 따른 스티키헤더 동작 잘 되는지 확인
 */
export default function Page() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <Button size="large" style={{width: '100%'}} onClick={() => setCount(prevState => prevState + 1)}>Add row</Button>
      {new Array(count).fill('').map((_, index) => (
        <div key={index} className={designSystemStyles.rowBox}/>
      ))}
    </div>
  );
}
