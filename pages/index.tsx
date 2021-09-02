import React from 'react';
import OgMeta from '@components/atom/OgMeta';

export default function Page() {
  return (
    <>
      <OgMeta
        title="Custom Title"
        image="/images/next-logo.png"
        description="Custom Description"
      />
      <div>
        Hello World
      </div>
    </>
  );
}
