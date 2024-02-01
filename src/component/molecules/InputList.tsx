import React, {Dispatch, KeyboardEvent, SetStateAction, useCallback, useState} from "react";
import styled from "styled-components";
import InputText from "@component/extend/InputText";
import type {MatchKeyboardEvent} from "@util/extend/event/keyboard-event";
import {isMatchKeyboardEvent} from "@util/extend/event/keyboard-event";

export interface InputListProp {
  list: string[];
  onChangeList: Dispatch<SetStateAction<string[]>>;
  autoFocus?: boolean;
}

export default function InputList({list, onChangeList, autoFocus = false}: InputListProp) {
  const [value, setValue] = useState("");

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!MATCH_EVENTS.some((match) => isMatchKeyboardEvent(event, match))) {
        return;
      }

      onChangeList((prevState) => (value === "" || prevState.includes(value) ? prevState : prevState.concat(value)));
      setValue("");

      if (event.key === " ") {
        event.preventDefault();
      }
    },
    [onChangeList, value]
  );

  const removeItem = useCallback(
    (target: string) => {
      onChangeList((prevState) => prevState.filter((value) => value !== target));
    },
    [onChangeList]
  );

  return (
    <Wrap>
      {list.map((value) => (
        <Item key={value}>
          {value}
          <RemoveButton onClick={() => removeItem(value)}>X</RemoveButton>
        </Item>
      ))}
      <InputText autoFocus={autoFocus} value={value} onChangeText={setValue} onKeyDown={onKeyDown} />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  border: 1.5px solid lightgray;
  padding: 5px;
  gap: 5px;
  height: 38px;
`;

const Item = styled.span`
  background: lightblue;
  padding: 5px 20px;
  position: relative;
  font-size: 13px;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 3px;
  top: 3px;
  font-size: 10px;
`;

const MATCH_EVENTS: MatchKeyboardEvent[] = [{key: " "}, {key: "Tab"}, {key: "Enter"}];
