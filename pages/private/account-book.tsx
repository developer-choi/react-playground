import React, {useState} from "react";
import styled from "styled-components";
import TextArea from "@component/extend/TextArea";
import {postAccountParseApi} from "@api/account-api";
import {useQuery} from "@tanstack/react-query";
import {numberWithComma} from "@util/extend/data-type/number";
import {theme} from "@util/services/style/theme";

export default function Page() {
  const [value, setValue] = useState("");
  const {data} = useQuery({
    queryKey: ["parsed-account-book", value],
    queryFn: () => postAccountParseApi(value),
    enabled: !!value,
    refetchOnWindowFocus: false
  });

  return (
    <Wrap>
      <StyledTextArea value={value} onChangeText={setValue} />
      {!data ? null : (
        <div>
          {data.list.map(({total, list, largeCategoryName}, index) => (
            <Item key={index}>
              <LargeCategory>
                <Memo>{largeCategoryName}</Memo>
                <Price style={{color: theme.main}}>{numberWithComma(total)}</Price>
              </LargeCategory>
              <ul>
                {list.map(({memo, price}, index) => (
                  <Row key={index}>
                    <Memo>{memo}</Memo>
                    <Price>{numberWithComma(price)}</Price>
                  </Row>
                ))}
              </ul>
            </Item>
          ))}

          <Total>
            총합 <Price style={{color: theme.main}}>{numberWithComma(data.total)}</Price>
          </Total>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 20px;
`;

const StyledTextArea = styled(TextArea)`
  width: 1000px;
  height: 200px;
  margin-bottom: 30px;
`;

const LargeCategory = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
`;

const Row = styled.li`
  margin-bottom: 5px;
`;

const Memo = styled.span`
  display: inline-block;
  width: 160px;
`;

const Price = styled.span`
  font-weight: bold;
`;

const Item = styled.div`
  margin-bottom: 20px;
`;

const Total = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
