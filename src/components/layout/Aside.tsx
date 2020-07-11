import React, {PropsWithChildren} from 'react';
import './Aside.scss';

export default function Aside({children}: PropsWithChildren<{}>) {

  return (
      <aside className="Aside-wrap">
        {children}
      </aside>
  );
}
