import React, {forwardRef, Ref, useEffect, useImperativeHandle, useRef} from 'react';

export function Parent() {
  const ref = useRef<ChildMethod>(null);

  useEffect(() => {
    ref.current?.hello();
    console.log(ref);
    //Child컴포넌트가 부모컴포넌트에게 노출시킨 인스턴스만 찍힘.
  }, []);

  return <Child ref={ref}/>;
}

export interface ChildMethod {
  hello: () => void;
}

export const Child = forwardRef(function ChildInternal(props: {}, ref: Ref<ChildMethod>) {

  useImperativeHandle(ref, () => ({
    hello: () => {
      console.log('hello world');
    }
  }));

  return (
      <>
      </>
  );
});
