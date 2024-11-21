import {ComponentPropsWithoutRef, CSSProperties} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

/**
 * muted props 기본값 정책
 * 1. muted가 지정되었다면 (true or false) 지정된 값으로 설정됨.
 * 2. muted가 따로 지정되지 않았고 AND autoPlay가 true라면 muted의 값도 true로 지정됨.
 * - [Muted autoplay is always allowed.](https://developer.chrome.com/blog/autoplay)
 * - 랭디에서는 딱 이정도 수준이면 되고,
 * - 동영상 플랫폼에서도 쓸 수 있으려면 이 시스템을 바꿔서, 일단 자동재생 시도하고 실패하면 muted로 자동재생 시켜야함. (거긴 소리켜놓고 자동재생이 가능한 조건이면 소리켜진 상태로 자동재생 시켜야하니까) << RP legacy VideoPlayer에 코드랑 필기있음.
 */

/** 기타 props 기본값
 * IOS 자동 전체화면 재생 방지를 위한 playsInline true
 */
export interface VideoProps extends ComponentPropsWithoutRef<'video'> {
  width: number;
  height: number;
}

/** 로딩중 비디오 크기지정 + LayoutShift 방지
 * 1. aspectRatio + height auto를 통해 로딩중에도 비율에 맞게 높이조정
 *
 * 2. 동영상 width 기본 스타일 보정 규칙
 * - (1) 동영상 크기 < 컨테이너 크기 = 컨테이너 너비 3000px 이고, 동영상이 1920px 이면, 원래 1920px 만큼만 늘어남. (이 특징은 유지됨. 따로 건드리지않음.)
 * - (2) 동영상 크기 > 컨테이너 크기 ==> 동영상이 컨테이너를 뚫고 나감. (이 특징은 방지하기위해 max-width: 100%를 했음)
 */
export default function Video({style, width, height, className, autoPlay, muted = autoPlay, ...rest}: VideoProps) {
  const customStyle: CSSProperties = {
    aspectRatio: `${width}/${height}`,
    ...style // 일부러 제일 마지막에 다 덮어써서, 혹시나 사용하는곳에서 커스텀을 했다면 적용될 수 있도록.
  };

  return (
    <video
      style={customStyle}
      className={classNames(styles.video, className)}
      width={width}
      height={height}
      autoPlay={autoPlay}
      muted={muted}
      playsInline
      {...rest}
    />
  );
}
