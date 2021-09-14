import React from 'react';
import OgMeta from '@components/atom/OgMeta';
import TwitterMeta from '@components/atom/TwitterMeta';

export default function Page() {
  return (
    <>
      <OgMeta
        image="/images/next-logo.png"
        title="Custom Title"
        description="Custom Description"
      />
      <TwitterMeta
        image="/images/react-logo.png"
        title="Custom Title"
        description="Custom Description"
      />
      <div>
        Hello World
      </div>
    </>
  );
}
