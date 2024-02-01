import React from "react";
import {ScrollRestorationTargetLinkList} from "@component/others/scroll-restoration";
import {useScrollRestorationSolution2} from "@util/extend/legacy/legacy-scroll-restoration2";

// URL: http://localhost:3000/study/next/scroll-restoration/solution2/target
export default function Page() {
  useScrollRestorationSolution2();

  return <ScrollRestorationTargetLinkList />;
}
