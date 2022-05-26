import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled, {css} from 'styled-components';
import TextArea from '@component/extend/TextArea';
import InputText from '@component/extend/InputText';
import Form from '@component/extend/Form';

export default function CheckGiveawayPage() {
  
  const [nickname, setNickname] = useState('');
  const [registeredNicknames, setRegisteredNicknames] = useState<string[]>([]);
  const [texts, setTexts] = useState('');
  
  const addNickname = useCallback(() => {
    setRegisteredNicknames(prevState => Array.from(new Set(prevState.concat(nickname))));
    setNickname('');
  }, [nickname]);
  
  const onDelete = useCallback((toDeleteNickname: string) => {
    setRegisteredNicknames(prevState => prevState.filter(originalNickname => originalNickname !== toDeleteNickname));
  }, []);
  
  useEffect(() => {
    setRegisteredNicknames(JSON.parse(localStorage.getItem('registeredNicknames') as string));
  }, []);
  
  useEffect(() => {
    localStorage.setItem('registeredNicknames', JSON.stringify(registeredNicknames));
  }, [registeredNicknames]);
  
  const findResult = useMemo(() => {
  
    if (texts === '') {
      return '';
    }
    
    const matchNicknames = [] as string[];
  
    registeredNicknames.forEach(nickname => {
      if (texts.includes(nickname)) {
        matchNicknames.push(nickname);
      }
    });
  
    if (matchNicknames.length === 0) {
      return '일치하는 닉네임이 없습니다.';
      
    } else {
      return `일치하는 닉네임은 ${matchNicknames.join(', ')} 입니다.`
    }
    
  }, [texts, registeredNicknames]);
  
  return (
    <Wrap>
      <Form onSubmit={addNickname}>
        <StyledInput value={nickname} onChangeText={setNickname} placeholder="검색할 가문명을 추가해주세요."/>
        <StyledButton>추가</StyledButton>
      </Form>
      {registeredNicknames.length > 0 && (
        <NicknamesWrap>
          {registeredNicknames.map(nickname => (
            <Nickname key={nickname} nickname={nickname} onDelete={onDelete}/>
          ))}
        </NicknamesWrap>
      )}
      <StyledTextArea value={texts} onChangeText={setTexts} placeholder="경품 당첨자 페이지의 전체를 복사해서 붙여넣어주세요."/>
      <ResultMessage>{findResult}</ResultMessage>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const inputStyles = css`
  border: 1.5px solid ${props => props.theme.main};
  padding: 5px;
`;

const StyledInput = styled(InputText)`
  ${inputStyles};
`;

const StyledTextArea = styled(TextArea)`
  ${inputStyles};
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  ${inputStyles};
`;

const ResultMessage = styled.span`

`;

const NicknamesWrap = styled.div`
  display: flex;
`;

interface NicknameProp {
  nickname: string;
  onDelete: (nickname: string) => void;
}

function Nickname({nickname, onDelete}: NicknameProp) {
  
  const _onDelete = useCallback(() => {
    onDelete(nickname);
  }, [onDelete, nickname]);
  
  return (
    <NicknameWrap>
      <NicknameText>{nickname}</NicknameText>
      <DeleteButton onClick={_onDelete}>X</DeleteButton>
    </NicknameWrap>
  );
}

const NicknameWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border: 1px solid ${props => props.theme.main};
  border-radius: 10px;
  
  margin: 10px 5px;
`;

const NicknameText = styled.span`

`;

const DeleteButton = styled.button`
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 10px;
`;
