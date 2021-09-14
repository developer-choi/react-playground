import React from 'react';
import OgMeta from '@components/atom/OgMeta';

export default function Page() {
  
  return (
    <>
      <OgMeta
        image="/images/800x400.png"
        title="Custom Kakaotalk Title"
        description="Custom Kakaotalk Description"
      />
      <div>
        open-graph-kakaotalk Page
      </div>
    </>
  );
};
