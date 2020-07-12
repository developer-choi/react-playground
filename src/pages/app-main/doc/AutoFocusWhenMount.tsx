import React, {useState, KeyboardEvent} from 'react';
import BasicInput from '../../../components/basic/BasicInput';
import BasicButton from '../../../components/basic/BasicButton';

export default function AutoFocusWhenMount() {

  return (
      <div className="AutoFocusWhenMount-wrap">
        <Example1/>
        <Example2/>
      </div>
  );
}

function Example1() {

  const [showConfirm, setShowConfirm] = useState(false);

  return (
      <div>
        <BasicButton onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? 'Hide Input' : 'Show Input'}</BasicButton>
        {showConfirm && <BasicInput autoFocus/>}
      </div>
  );
}

function Example2() {

  const [showInput2, setShowInput2] = useState(false);

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {

    if(event.key === 'Enter') {
      event.preventDefault();
      setShowInput2(true)
    }
  };

  return (
      <div>
        <BasicInput placeholder="이 입력박스에서 Enter를 눌러보세요." onKeyDown={onEnter}/>
        { showInput2 &&
          <>
            <BasicInput/>
            <BasicButton onClick={() => setShowInput2(false)}>Hidden Input</BasicButton>
          </>
        }
      </div>
  )
}
