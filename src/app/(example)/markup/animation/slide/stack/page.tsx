'use client';

import {ImageProps} from 'next/image';
import styles from './page.module.scss';
import {CSSProperties} from 'react';
import CustomImage from '@/components/element/CustomImage';

// URL: http://localhost:3000/markup/animation/slide/stack
// Doc: https://drive.google.com/drive/folders/1-fuhB4JvCKlcCRbd8oiYAQY__wEdRmIO
export default function Page() {
  return (
    <StackSlide duration={SETTING.duration} delay={SETTING.delay} list={IMAGE_LIST}/>
  )
}

/**
 * 1번째 (처음부터 쌓여있는) 이미지가 처음부터 노출되고
 * 1초뒤 2번째 이미지가 2초동안 쌓이고 (합 3초)
 * 1초 뒤 (총 4초부터) 3번째 이미지가 2초동안 쌓이고 (합 6초)
 * 1초뒤 (총 7초부터) 4번쨰 이미지가 2초동안 쌓이고 (합 9초)
 */
const SETTING = {
  duration: 2,
  delay: 1
};

const IMAGE_LIST: ImageProps[] = [
  {
    src: 'https://picsum.photos/150/250',
    width: 150,
    height: 250,
    alt: '테스트 이미지'
  },
  {
    src: 'https://picsum.photos/150/250',
    width: 150,
    height: 250,
    alt: '테스트 이미지'
  },
  {
    src: 'https://picsum.photos/150/250',
    width: 150,
    height: 250,
    alt: '테스트 이미지'
  },
  {
    src: 'https://picsum.photos/150/250',
    width: 150,
    height: 250,
    alt: '테스트 이미지'
  },
  {
    src: 'https://picsum.photos/150/250',
    width: 150,
    height: 250,
    alt: '테스트 이미지'
  },
];

interface StackSlideProps {
  list: Pick<ImageProps, 'width' | 'height' | 'src' | 'alt'>[];
  duration: number; // 스택 애니메이션이 동작하는 시간
  delay?: number; // n회차 스택이 종료되고나서 n+1회차 스택이 시작하는데 걸리는 지연시간, default 0
}

function StackSlide({delay = 0, duration, list}: StackSlideProps) {
  return (
    <div className={styles.original}>
      {list.map((props, index) => (
        <CustomImage key={index} style={calculator(index, duration, delay)} className={styles.queue} {...props}/>
      ))}
    </div>
  );
}

/**
 * order = 1부터 시작. 처음부터 쌓여있는 기본 이미지는 order를 0으로 전달.
 */
function calculator(order: number, duration: number, delay: number): Pick<CSSProperties, 'animationDuration' | 'animationDelay'> {
  if(order === 0) {
    return {
      animationDelay: `0s`,
      animationDuration: `0s`
    };
  }

  return {
    animationDelay: `${(order - 1) * duration + order * delay}s`,
    animationDuration: `${duration}s`
  };
}
