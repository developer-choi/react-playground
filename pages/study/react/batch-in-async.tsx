import React, {useEffect, useState} from "react";
import {useLogWhenRendering} from "@util/extend/test";

export default function Page() {
  const [value1, setValue1] = useState("1");
  const [value2, setValue2] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setValue1((prevState) => prevState + 1);
      console.log("setValue1 called");
      setValue2((prevState) => prevState + 1);
      console.log("setValue2 called");
    });
  }, []);

  useLogWhenRendering("re-render", value1, value2);

  return (
    <>
      {value1} {value2}
    </>
  );
}
