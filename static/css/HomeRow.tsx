import React, {ComponentProps, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {ROOT_HORIZONTAL} from '../utils/style';
import usePrevious from '../utils/usePrevious';

export interface HomeRowProp extends Omit<ComponentProps<'section'>, 'ref'> {
  fillColor?: boolean;
  onShow?: () => void;
  onHidden?: () => void;
}

export default function HomeRow({style, onHidden, onShow, ...rest}: HomeRowProp) {

  const [show, setShow] = useState(false);
  const prevShow = usePrevious(show);

  const wrapRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {

    if (!wrapRef.current) {
      return;
    }

    const {scrollY, innerHeight} = window;
    const {offsetTop, clientHeight} = wrapRef.current;

    if(scrollY > offsetTop + clientHeight) {
      setShow(false);

    } else if (innerHeight + scrollY > offsetTop) {
      setShow(true);

    } else {
      setShow(false);
    }

  }, []);

  useEffect(() => {

    if (prevShow === false && show) {
      onShow?.();

    } else if (prevShow === true && !show) {
      onHidden?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {

    if (onShow || onHidden) {
      window.addEventListener('scroll', onScroll);

      if (!wrapRef.current) {
        return;
      }

      const {scrollY, innerHeight} = window;
      const {offsetTop, clientHeight} = wrapRef.current;

      if(scrollY > offsetTop + clientHeight) {
        onHidden?.();

      } else if (innerHeight + scrollY > offsetTop) {
        onShow?.();

      } else {
        onHidden?.();
      }
    }

    return () => {

      if (onShow || onHidden) {
        window.removeEventListener('scroll', onScroll);
      }
    };

  }, [onScroll, onShow, onHidden]);

  return (
      <HomeRowStyle ref={wrapRef} style={{...style}} {...rest}/>
  );
}

const RESPONSIVE_1 = 1380;
const RESPONSIVE_2 = 1270;
const RESPONSIVE_DIRECTION_COLUMN = 1200;
const RESPONSIVE_450 = 450;

const HomeRowStyle = styled.section<HomeRowProp>`
  height: 600px;
  background-color: ${props => props.fillColor ? props.theme.colors.main : 'white'};
  padding: 150px ${ROOT_HORIZONTAL}px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${RESPONSIVE_1}px) {
    height: 500px;
  }
  
  @media(max-width: ${RESPONSIVE_DIRECTION_COLUMN}px) {
    flex-direction: column;
    padding: 70px 0;
    justify-content: center;
  }
`;

export const Image = styled.img`
  border-radius: 100%;
  width: 600px;
  
  @media (max-width: ${RESPONSIVE_1}px) {
    width: 500px;
  }
  
  @media (max-width: ${RESPONSIVE_2}px) {
    width: 400px;
  }
  
  @media(max-width: ${RESPONSIVE_DIRECTION_COLUMN}px) {
    max-width: 400px;
    width: 80%;
  }
`;

export const RightWrap = styled.div`
  height: 100%;
  text-align: center;
  flex-shrink: 0;
  width: 550px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: ${RESPONSIVE_2}px) {
  }
  
  @media(max-width: ${RESPONSIVE_DIRECTION_COLUMN}px) {
    height: auto;  
    margin-top: 40px;
    max-width: 450px;
    width: 90%;
  }
`;

export const Title = styled.span`
  font-size: 25px;
  white-space: pre-line;
  line-height: 1.3em;
  
  @media (max-width: ${RESPONSIVE_2}px) {
    font-size: 22px;
  }
  
  @media (max-width: ${RESPONSIVE_450}px) {
    font-size: 18px;
  }
`;

export const Content = styled.span`
  font-size: 30px;
  font-weight: bold;
  
  @media (max-width: ${RESPONSIVE_2}px) {
    font-size: 25px;
  }
  
  @media(max-width: ${RESPONSIVE_DIRECTION_COLUMN}px) {
    margin-top: 20px;
  }
  
  @media (max-width: ${RESPONSIVE_450}px) {
    font-size: 22px;
  }
`;

export const VirtualBox = styled.div`
  max-width: 200px;
  width: 10%;
  min-width: 30px;
  height: 1px;
  
  @media (max-width: ${RESPONSIVE_2}px) {
    display: none;
  }
`;
