import styled from "styled-components";

// URL: http://localhost:3000/experimental/table-merge-cell
export default function Page() {
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>상품이름</th>
            <th>밴더이름</th>
            <th>송장ID</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY.map(({pk, productName, vendorName, songjangId}) => (
            <tr key={pk}>
              <td>{productName}</td>
              <td>{vendorName}</td>
              <td>{songjangId}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <StyledTable>
        <thead>
          <tr>
            <th>상품이름</th>
            <th>밴더이름</th>
            <th>송장ID</th>
          </tr>
        </thead>
        <tbody>
          {solution(DUMMY, ["songjangId", "vendorName"]).map(({pk, productName, vendorName, songjangId, vendorNameRowSpan, songjangIdRowSpan}) => (
            <tr key={pk}>
              <td>{productName}</td>
              {vendorNameRowSpan === "invisible" ? null : <td rowSpan={vendorNameRowSpan}>{vendorName}</td>}
              {songjangIdRowSpan === "invisible" ? null : <td rowSpan={songjangIdRowSpan}>{songjangId}</td>}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
}

const StyledTable = styled.table`
  margin-bottom: 20px;
  max-width: 400px;

  td,
  th {
    border-collapse: collapse;
    border: 1px solid black;
    padding: 3px 5px;
  }

  th {
    background: lightgoldenrodyellow;
  }
`;

const ROW_SPAN_KEY = "RowSpan";
type RowSpanKey = typeof ROW_SPAN_KEY;

export type ExtendRowSpanType<T extends Record<string, any>, K extends keyof T & string> = {[key in `${K}${RowSpanKey}`]: number | "invisible"} & T;

/** 3가지 상태
 * 직전 (위) 셀이 병합의 시작점이면 아예 미노출
 * 현재 셀이 시작점이면 rowSpan 노출
 * 그 외 모두 rowSpan없이 그냥 td노출 (병합이 필요없는 단일셀인경우)
 */
function solution<T extends Record<string, any>, K extends keyof T & string>(list: T[], keys: K[]): ExtendRowSpanType<T, K>[] {
  return list.map((item, index) => {
    const entries = keys.map((key) => [key + ROW_SPAN_KEY, getRowSpan(list, index, key)]);

    return {
      ...item,
      ...Object.fromEntries(entries)
    };
  }) as ExtendRowSpanType<T, K>[];
}

function getRowSpan<T>(list: T[], index: number, key: keyof T): number | "invisible" {
  if (list.length === 0) {
    return "invisible";
  } else if (list.length === 1) {
    return 1;
  }

  const currentValue = list[index][key];

  if (index === 0) {
    return getNextSameCellCount(list, index, key);
  }

  // 0보다 큰경우
  const previousValue = list[index - 1][key];

  // 직전셀 (위셀)과 값이 같으면 현재 셀은 안나와야함.
  if (currentValue === previousValue) {
    return "invisible";
  } else {
    return getNextSameCellCount(list, index, key);
  }
}

function getNextSameCellCount<T>(list: T[], index: number, key: keyof T): number {
  const currentValue = list[index][key];
  let sameCount = 1;

  for (let i = index + 1; i < list.length; i++) {
    if (list[i][key] === currentValue) {
      sameCount++;
    } else {
      return sameCount;
    }
  }

  return sameCount;
}

interface OrderHistory {
  pk: number;
  productName: string;
  vendorName: string;
  songjangId: number;
}

const DUMMY: OrderHistory[] = [
  {
    pk: 1,
    productName: "A 상품",
    vendorName: "본사",
    songjangId: 100
  },
  {
    pk: 2,
    productName: "B 상품",
    vendorName: "본사",
    songjangId: 100
  },
  {
    pk: 3,
    productName: "C 상품",
    vendorName: "본사",
    songjangId: 101
  },
  {
    pk: 4,
    productName: "D 상품",
    vendorName: "본사",
    songjangId: 101
  },
  {
    pk: 5,
    productName: "E 상품",
    vendorName: "본사",
    songjangId: 102
  }
];
