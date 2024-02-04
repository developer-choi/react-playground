import React, {useCallback, useEffect, useState} from 'react';
import type {GetServerSideProps} from 'next';
import {numberWithComma} from '@util/extend/data-type/number';
import styled from 'styled-components';
import produce from 'immer';
import {randomNumber} from '@util/extend/random';
import max from 'lodash/max';
import min from 'lodash/min';

interface PageProp {
  stocksByCountries: StocksByCountry[];
}

export default function Page(props: PageProp) {
  const [countries, setCountries] = useState(props.stocksByCountries);
  
  const socketHandler = useCallback((stock: Stock) => {
    setCountries(prevState => {
      return produce(prevState, draft => {
        const target = flatStock(draft).find(({stockPk}) => stockPk === stock.stockPk);
        
        if (target) {
          Object.assign(target, stock);
        }
      });
    });
  }, []);
  
  useEffect(() => {
    const allStocks = flatStock(dummy);
    const stockPks = allStocks.map(({stockPk}) => stockPk);
    const minStockPk = min(stockPks) as number;
    const maxStockPk = max(stockPks) as number;
    
    const intervalId = setInterval(() => {
      const randomPk = randomNumber(minStockPk, maxStockPk);
      const {name, stockPk} = allStocks.find(({stockPk}) => stockPk === randomPk) as Stock;
      const value = randomNumber(0, 99999);
      console.log('target', name, value);
      socketHandler({stockPk, name, value});
    }, 2000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [socketHandler]);
  
  return (
    <>
      <div>
        {countries.map(({countryPk, name, stocks}) => (
          <div key={countryPk}>
            <CountryName>{name}</CountryName>
            {stocks.map(({stockPk, value, name}) => (
              <div key={stockPk}>
                <StockName>{name}</StockName>
                <Value>{numberWithComma(value)}</Value>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  return {
    props: {
      stocksByCountries: dummy
    }
  };
};

const CountryName = styled.span`
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
const StockName = styled.span`

`;
const Value = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.main};
  margin-left: 5px;
`;

interface StocksByCountry {
  countryPk: number;
  name: string;
  stocks: Stock[];
}

interface Stock {
  stockPk: number;
  name: string;
  value: number;
}

function flatStock(countries: StocksByCountry[]): Stock[] {
  return countries.map(({stocks}) => stocks).flat();
}

const dummy: StocksByCountry[] = [
  {
    countryPk: 1,
    name: '미국',
    stocks: [
      {
        stockPk: 1,
        name: '구글주식',
        value: 10000
      },
      {
        stockPk: 2,
        name: '애플주식',
        value: 20000
      },
      {
        stockPk: 3,
        name: '아마존주식',
        value: 30000
      }
    ]
  },
  {
    countryPk: 2,
    name: '한국',
    stocks: [
      {
        stockPk: 4,
        name: '삼성주식',
        value: 1000
      },
      {
        stockPk: 5,
        name: 'LG주식',
        value: 2000
      },
      {
        stockPk: 6,
        name: '현대주식',
        value: 3000
      }
    ]
  }
];
