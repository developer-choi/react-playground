import React from "react";
import {useScrollRestorationSolution1} from "@util/extend/legacy/legacy-scroll-restoration1";
import {ScrollRestorationTargetLinkList} from "@component/others/scroll-restoration";

// URL: http://localhost:3000/study/next/scroll-restoration/solution1/target
export default function Page() {
  useScrollRestorationSolution1();

  return <ScrollRestorationTargetLinkList />;
}
