import Button from "@component/atom/element/Button";
import {useCallback} from "react";
import {windowPostMessage} from "@util/extend/browser/window-popup";
import type {ExampleWindowData} from "@type/services/example-window";

export default function Page() {
  const sendDataToParent = useCallback(() => {
    windowPostMessage<ExampleWindowData>("TEST", {
      fruit: "apple"
    });
    window.close();
  }, []);

  return <Button onClick={sendDataToParent}>자식창 특정버튼</Button>;
}
