import React, {PropsWithChildren} from 'react';
import './Section.scss';

export default function Section({children}: PropsWithChildren<{}>) {

  return (
      <section className="Section-wrap">
        {children}
      </section>
  );
}
