import React from 'react';
import OgMeta from '@components/atom/OgMeta';

export default function Page() {
  
  return (
    <>
      <OgMeta
        image="/images/600x600.png"
        title="Custom Facebook Title"
        description="Custom Facebook Description"
      />
      <div>
        open-graph-facebook-1-1 Page
      </div>
    </>
  );
};
