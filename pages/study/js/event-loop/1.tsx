import Button from '@component/atom/element/Button';
import {useEffect, useRef} from 'react';

export default function Page() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;

    function loop() {
      if (i >= TOTAL_TASK) {
        return;
      }

      setTimeout(loop);

      i++;

      while (i % (TOTAL_TASK / 100) !== 0) {
        i++;
      }

      console.log(i);

      if (spanRef.current) {
        spanRef.current.innerHTML = String(i * 100 / TOTAL_TASK) + '%';
      }
    }

    loop();
  }, []);

  return (
    <>
      <span ref={spanRef}></span>
      <Button onClick={() => console.log('Clicked')}>Click Me</Button>
    </>
  );
}

const TOTAL_TASK = 1e9;
