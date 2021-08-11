import React from 'react';
import styled from 'styled-components';

export default function WordWrapBreakPage() {
  
  return (
      <Wrap>
        <h3>한국어</h3>
        <div className="display-flex flex-wrap">
          <KoreanSample title="all-normal" className="word-wrap-normal word-break-normal"/>
          <KoreanSample title="word-break-break-word" className="word-break-break-word"/>
          <KoreanSample title="word-break-break-all" className="word-break-break-all"/>
          <KoreanSample title="word-break-keep-all" className="word-break-keep-all"/>
          <KoreanSample title="word-wrap-break" className="word-wrap-break"/>
        </div>
        
        <h3>영어</h3>
        <div className="display-flex flex-wrap">
          <EnglishSample title="word-break-break-word" className="word-break-break-word"/>
          <EnglishSample title="word-break-break-all" className="word-break-break-all"/>
          <EnglishSample title="word-wrap-break" className="word-wrap-break"/>
          <EnglishSample title="all-normal" className="word-wrap-normal word-break-normal"/>
        </div>
      </Wrap>
  );
}

const Wrap = styled.div`
  .word-wrap-normal {
    word-wrap: normal;
  }
  
  .word-wrap-break {
    word-wrap: break-word;
  }
  
  .word-break-normal {
    word-break: normal;
  }
  
  .word-break-break-word {
    word-break: break-word;
  }
  
  .word-break-break-all {
    word-break: break-all;
  }
  
  .word-break-keep-all {
    word-break: keep-all;
  }
  
  .sample {
    border: 1px solid black;
    width: 400px;
  }
  
  .no-space {
    background: wheat;
  }
  
  ul {
    margin-bottom: 20px;
  }
`;

function KoreanSample({className, title}: { className: string, title: string }) {
  
  /**
   * https://developer.mozilla.org/ko/docs/Web/CSS/word-break CJK는 word-break속성을 쓰는게 의미가없다고 나와있음.
   * 하지만 keep-all은 normal하고 차이가 있긴하지만...
   * 어쨋든 한국어는 word-break속성을 쓸필요가 없어보임. keep-all써서 컨테이너를 벗어나게 해야할 일이 없을거같음.
   * 한국어는 기본값만으로도 단어하나가 아무리 길어도 줄내림이 되니까. 마치 영어를 break-all한것처럼.
   * 심지어 word-wrap의 word-break속성을 해도 단어단위로 줄내림되지 않음.
   */
  
  return (
      <div className={`sample ${className}`}>
        <h3>{title}</h3>
        <span className="no-space">17세에데뷔,1991년생으로멤버중최연소멤버.소녀시대가전성기를맞이한2009년에유일한고등학생이었다.</span>
        
        소녀시대 내에서 악기 연주에 가장 능숙한 멤버다. 플룻과 피아노를 전공하시고, 과거 피아노 학원을 운영하셨던 어머니 덕분에 어렸을 때부터 쉽게 피아노를 접하고 배울 기회가 많았으며, 그 결과 상당한
        연주 실력을 갖추고 있다. 데뷔 후에는 방송, 콘서트 등에서 피아노 연주를 하는 모습을 가끔씩 선보였다.
        
        [관련영상1](헨리_Playing TRAP Violin & Piano ver. with 서현), [관련영상2]태티서 Dear Santa, [관련영상3]김태우 의 사랑비, [관련영상4]티파니의
        Once in a Lifetime
      </div>
  );
}

function EnglishSample({className, title}: { className: string, title: string }) {
  /**
   * https://developer.mozilla.org/ko/docs/Web/CSS/overflow-wrap
   * 하지만 영어는 word-wrap속성을 쓰는게 의미없다는 말은 또 없음.
   * 그래서 CJK는 word-wrap으로 제어! 영어는 word-break으로 제어! 이런 느낌이 아니라,
   * CJK는 word-wrap으로만 가능, 영어는 word-wrap, word-break둘다 가능 이런 느낌이고,
   * 실제로 영어는 word-wrap의 break-word와 word-break의 break-word값이 같은결과를 나타냄.
   * 결론은 word-break의 break-word혹은 break-all값 딱 2가지말고 나머지 값이나 word-wrap속성은 사용할일이 없다고 판단됨.
   */
  return (
      <div className={`sample ${className}`}>
        <h3>{title}</h3>
        <span className="no-space">Debutattheageof17bornin1991theyoungestmember.Girls</span>
        
        Generation was the only high school student in 2009 when it reached its peak.
        
        He is the most proficient member of musical instruments in Girls Generation. Thanks to my mother who majored in
        flute and piano and ran a piano academy in the past, I had many chances to learn and play the piano easily from
        a young age, and as a result, I have considerable performance skills. After his debut, he occasionally showed
        playing piano at broadcasts and concerts.
        
        [Related video 1] (Henry _Playing TRAP Violin & Piano ver. With Seohyun), [Related video 2] Tatiseo Dear
        Santa, [Related video 3] Kim Tae-woo love rain, [Related video 4] Tiffany Once in a Lifetime
      </div>
  );
}
