import React, {useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import SortButtons from '@component/SortButtons';
import type {OnSortFunction, Sort} from '@util/custom-hooks/useSortButton';

export default function Page() {
  
  const [currentSort, setCurrentSort] = useState<Sort<BookOrder>>();
  
  const books = useMemo(() => {
    if(currentSort === undefined) {
      return INITIAL_BOOKS;
    }
  
    const key = currentSort.orderby;
  
    if (currentSort.direction === 'asc') {
      return INITIAL_BOOKS.sort((a, b) => a[key] - b[key]);
      
    } else {
      return INITIAL_BOOKS.sort((a, b) => b[key] - a[key]);
    }
    
  }, [currentSort]);
  
  const onSort = useCallback<OnSortFunction<BookOrder>>((orderby, direction) => {
    setCurrentSort({orderby, direction});
  }, []);
  
  console.log(currentSort);
  
  return (
    <>
      <Head>
        <title>sort-button</title>
      </Head>
      <div>
        <Table>
          <thead>
          <tr>
            <Th>
              이름
            </Th>
            <Th>
              <SortButtonsWrap>
                가격
                <SortButtons orderby='price' onSort={onSort} currentSort={currentSort}/>
              </SortButtonsWrap>
            </Th>
            <Th>
              <SortButtonsWrap>
                페이지수
                <SortButtons orderby='pages' onSort={onSort} currentSort={currentSort}/>
              </SortButtonsWrap>
            </Th>
          </tr>
          </thead>
          <tbody>
          {books.map(({price, pages, name}) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{price}</td>
              <td>{pages}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

type BookOrder = 'price' | 'pages';

const Table = styled.table`
  width: 300px;
  margin: 10px;
  
  th {
    background-color: yellow;
  }
  
  td, th {
    border: 1px solid gray;
    padding: 5px;
  }
`;

interface Book {
  name: string;
  price: number;
  pages: number;
}

const SortButtonsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Th = styled.th`
  .sort-button-wrap {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }
`;

const INITIAL_BOOKS: Book[] = [
  {
    name: 'BOOK1',
    price: 20000,
    pages: 600
  },
  {
    name: 'BOOK2',
    price: 15000,
    pages: 480
  },
  {
    name: 'BOOK3',
    price: 14800,
    pages: 500
  },
  {
    name: 'BOOK4',
    price: 18000,
    pages: 450
  },
  {
    name: 'BOOK5',
    price: 13200,
    pages: 350
  }
];