import React from "react";
import {ScrollRestorationTargetLinkList} from "@component/others/scroll-restoration";
import {useScrollRestoration} from "@util/extend/scroll-restoration";

// URL: http://localhost:3000/solution/scroll-restoration/target
export default function Page() {
  useScrollRestoration();

  return <ScrollRestorationTargetLinkList />;
}
