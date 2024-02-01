import React, {useState} from "react";
import Button from "@component/atom/element/Button";
import type {PostcodeSummary} from "@util/services/daum-postcode";
import usePostcodePopup from "@util/services/daum-postcode";

// URL: http://localhost:3000/solution/daum-postcode
export default function Page() {
  const [summary, setSummary] = useState<PostcodeSummary>();
  const open = usePostcodePopup(setSummary);

  return (
    <>
      <Button onClick={open}>주소 찾기</Button>
      {!summary ? null : (
        <span>
          ({summary.zonecode}) {summary.fullAddress}
        </span>
      )}
    </>
  );
}
