import React, {useCallback, useRef} from "react";
import styled from "styled-components";

export default function MultiInputFocusPage() {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const save = useCallback(() => {
    const emptyElement = inputsRef.current?.find((element) => element.value === "");
    if (emptyElement) {
      alert("Please input a mission");
      emptyElement.focus();
      return;
    }

    alert("save success");
  }, []);

  const refCallback = useCallback((element: HTMLInputElement | null, index: number) => {
    if (inputsRef.current && element) {
      inputsRef.current[index] = element;
    }
  }, []);

  return (
    <>
      <InputsWrap>
        {MISSIONS.map((value, index) => (
          <Input key={index} ref={(element) => refCallback(element, index)} />
        ))}
        <button onClick={save} type="button">
          Save
        </button>
      </InputsWrap>
    </>
  );
}

const MISSIONS = new Array(3).fill("").map((value, index) => `${index + 1}th misson`);

const InputsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  :not(:last-child) {
    margin-bottom: 10px;
  }

  padding: 5px;
  border: 2px solid lightgray;

  :hover {
    border-color: dodgerblue;
  }
`;
