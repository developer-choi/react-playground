import React, {PropsWithChildren} from 'react';
import './AppMain.scss';

export default function AppMain({children}: PropsWithChildren<{}>) {

  return (
      <div className="AppMain-wrap">
        {children}
      </div>
  );
}
