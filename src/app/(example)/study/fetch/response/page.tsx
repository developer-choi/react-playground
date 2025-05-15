'use client';

import {useCallback} from 'react';
import {customFetchOnClientSide} from '@/utils/extend/library/fetch/client';
import Button from '@/components/element/Button';

// URL: http://localhost:3000/study/fetch/response
// Doc: https://docs.google.com/document/d/1Mi1vh2OR45EOhj63jl3cq_5ZKscFb1uVMkVYn180IMw/edit?pli=1&tab=t.0#heading=h.jdcuemqp6ojl
export default function Home() {
  const test = useCallback(async (type: ConvertType) => {
    await customFetchOnClientSide('/api/test/json', {
      method: 'GET',
      authorize: 'none',
      query: {
        type
      }
    });
  }, []);

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 200px)', gap: 20}}>
      {TYPES.map(type => (
        <Button key={type} onClick={() => test(type)}>{type}</Button>
      ))}
    </div>
  );
}

/**
 * [제일 일반적인 케이스 1]
 * application/json + object
 * json() ==> object
 * text() ==> string
 *
 * [제일 일반적인 케이스 2]
 * text/plain + string
 * json() ==> SyntaxError 뜨고, json으로 변환 못한다고 나와있음.
 * text() ==> string
 *
 * application/json + number
 * json() ==> number
 * text() ==> string
 *
 * application/json + string
 * json() ==> string
 * text() ==> string
 *
 * application/json + null
 * json() ==> null (typeof object임)
 * text() ==> 'null'
 *
 * application/json + undefined
 * json() ==> SyntaxError 나서 애초에 메소드 호출이 실패함.
 * text() ==> '' (빈문자열이고, API는 500에러나지만, .text() 호출 자체가 성공하긴...함)
 */
type ConvertType = 'json' | 'json-number' | 'json-string' | 'json-null' | 'json-undefined' | 'string';
const TYPES: ConvertType[] = ['json', 'json-number', 'json-string', 'json-null', 'json-undefined', 'string'];
