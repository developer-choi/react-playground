import React, {useState} from 'react';
import Button from '@component/atom/button/Button';
import type {PostcodeSummary} from '@util/custom-hooks/usePostcodePopup';
import usePostcodePopup from '@util/custom-hooks/usePostcodePopup';

export default function Page() {
  const [summary, setSummary] = useState<PostcodeSummary>();
  const open = usePostcodePopup(setSummary);

  return (
    <>
      <Button onClick={open}>주소 찾기</Button>
      {!summary ? null : (
        <span>({summary.zonecode}) {summary.fullAddress}</span>
      )}
    </>
  );
}
