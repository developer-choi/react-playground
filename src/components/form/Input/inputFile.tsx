import React, {ChangeEvent, ComponentPropsWithoutRef, forwardRef, useCallback} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

/**
 * hooks / Component를 너무 강하게 결합하는건 좋지않아서 적당히 분리해야헀음.
 * 굳이 useFileImagePreview()와 같이 안쓴다 하더라도 이거 자체로도 쓸만큼만 기본 <input type file>을 확장했음.
 */
export interface InputFileProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'accept'> {
  onChangeFiles?: (file: File[]) => void;

  /**
   * image/*,video/*,audio/*
   * .doc,.docx
   *
   * 여러개 할 때 구분자는 comma 사용
   */
  accept?: string;
}

/**
 * 1. 자식으로 전달되는 요소의 크기만큼 container의 너비가 늘어나며,
 * 2. container에 전달되는 classname과 style props로 스타일 하면되며,
 * 3. <input type file>은 container 너비만큼 늘어나지만, 겉으로는 보이지않고 이벤트는 받을 수 있음. (Click, Drag And Drop)
 * 셋다 예제 페이지 참고 (default 키워드에 키보드 커서 놓고 Ctrl G)
 */
export default forwardRef<HTMLInputElement, InputFileProps>(function InputFile(props, ref) {
  const {onChangeFiles, children, className, style, ...rest} = props;

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    /**  event.target.value = '' 안쓰면 생기는 Scenario 1
     * https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file#answer-60886920
     * 1. a.png 파일 선택
     * 2. (미리보기 기능 구현한 경우) UI상으로 a.png파일이 목록에 추가됨
     * 3. 해당 파일목록을 미리보기 목록에서 삭제
     * 4. 다시 파일탐색기 열어서 (같은파일) a.png 추가
     * ==> 추가안됨
     */

    /**  event.target.value = '' 안쓰면 생기는 Scenario 2
     * 1. a.png 파일 선택
     * 2. 다시 파일탐색기 열고
     * 3. 파일탐색기를 그냥 닫아버리면
     * 4. onChange handler는 호출되긴 하는데, files가 빈배열로 나옴.
     */

    // eslint-disable-next-line no-param-reassign
    event.target.value = '';

    /** event.target.value = '' 를 쓰면 생기는 Scenario
     * 근데, event.target.value = '' 을 추가하면 파일탐색기를 닫았을 때 빈 배열로 나오는 일이 안생기고 걍 이 케이스에서 onChange() 자체가 호출이 안됨.
     * 데스크탑 PC 크롬에서만 해봤기 때문에, 다른 모바일기기, 아이폰같은데서는 안해봤음.
     * 그래서 일단 files가 빈배열이면 callback 호출 안하기로 했음.
     */
    if (onChangeFiles && files.length) {
      onChangeFiles(files);
      return;
    }

  }, [onChangeFiles]);

  return (
    <label className={classNames(styles.inputFileWrap, className)} style={style}>
      <input ref={ref} type="file" onChange={onChange} className={styles.inputFile} {...rest} />
      {children}
    </label>
  );
})
