import React, {Component, useEffect, useRef} from 'react';

export function Parent() {
  const ref = useRef<Child>(null);

  useEffect(() => {
    ref.current?.hello();
    console.log(ref);
    //Child클래스의 인스턴스가 찍힘.
  }, []);

  return <Child ref={ref}/>;
}

export class Child extends Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    this.hello = this.hello.bind(this);
  }

  hello() {
    console.log('hello world');
  }

  render() {
    return (
        <>
        </>
    );
  }
}
