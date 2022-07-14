import {useCallback, useState} from 'react';
import {replace} from '@util/extend/array';

interface CoreTerm {
  pk: number;
  required: boolean;
}

interface UseTermsResult<T extends CoreTerm> {
  allChecked: boolean;
  allRequiredChecked: boolean;
  toggleAgree: (changePk: number) => void;
  toggleAllAgree: () => void;
  isAgree: (pk: number) => boolean
}

export function useTerms<T extends CoreTerm>(terms: T[]): UseTermsResult<T> {
  const [agrees, setAgrees] = useState<{ pk: number, agree: boolean; required: boolean }[]>(terms.map(({pk, required}) => ({pk, agree: false, required})));
  
  const allChecked = agrees.every(({agree}) => agree);
  
  const allRequiredChecked = agrees.every(({agree, required}) => {
    if (!required) {
      return true;
    } else {
      return agree;
    }
  });
  
  const toggleAgree = useCallback((changePk: number) => {
    setAgrees(prevState => replace(prevState, ({pk}) => pk === changePk, ({pk, agree, required}) => ({
      pk,
      agree: !agree,
      required
    })));
  }, []);
  
  const toggleAllAgree = useCallback(() => {
    setAgrees(prevState => prevState.map(({pk, required}) => ({pk, agree: !allChecked, required})));
  }, [allChecked]);
  
  const isAgree = useCallback((targetPk: number) => {
    const item = agrees.find(({pk}) => pk === targetPk);
  
    if (!item) {
      console.error('useTerms()에 전달된 terms에 없는 pk를 isAgree()로 전달하였음.');
      return false;
    }
  
    return item.agree;
  }, [agrees]);
  
  return {
    allChecked,
    allRequiredChecked,
    toggleAgree,
    toggleAllAgree,
    isAgree
  };
}
