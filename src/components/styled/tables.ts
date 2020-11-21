import styled, {css} from 'styled-components';

const tr1 = css`
  tr {
    border-bottom: 1px solid ${props => props.theme.generalBorder};
  }
`;

const td1 = css`
  td {
    padding: 10px;
  }
`;

export const Table1 = styled.table`
  border-top: 1px solid ${props => props.theme.generalBorder};
  font-size: 14px;
  
  ${tr1}
  ${td1};
`;
