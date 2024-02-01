import React, {useState} from "react";
import InputList from "@component/molecules/InputList";
import styled from "styled-components";

// URL: http://localhost:3000/experimental/components/form/input-list
export default function Page() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Wrap>
      <InputList list={values} onChangeList={setValues} autoFocus />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 15px;
`;
