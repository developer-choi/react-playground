import React from 'react';
import styled from 'styled-components';

export default function FileHandlePage() {

  /**
   * Single File Upload Button
   * Multi File Upload Button
   * 이렇게 2가지 컴포넌트를 만들어야함.
   *
   * 요구조건 (공통)
   * 1. 확장자 체크 (accept만으로는 한계가있음)
   * 2. file size api (1231233123byte 이런거 123MB 같이 이쁘게)
   * 3. 미리보기
   * 4. drag and drop
   *
   * 요구조건 (Single)
   * 1. onChangeFile 개선 (파일 하나 받을 수 있게. 항상 files: File[]로 나오더만 이거 매번 index 1로 접근하기 싫어.
   *
   * 즉 둘 다 BasicSingleFileInput이런거 만들어야겠다.
   *
   * onChange는 파일 선택했다가 취소하는경우도 있기 떄문에, event.files의 배열은 빈배열(?) 빈값? udefined?일지도 모르겠다. 이부분 고려.
   */

  return (
      <Wrap>
      </Wrap>
  );
}

type FileType = 'audio/*' | 'video/*' | 'image/*' | '.jpg' | '.png';

type SIUnit = 'K';
type SIByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';

interface SIByte {
  value: number;
  unit: SIByteUnit;
}

declare function getByteWithSI(value: number, unit: SIUnit): SIByte;
declare function getBestByteWithSI(value: number): SIByte;

const Wrap = styled.div`
`;
