import React from 'react';
import OgMeta from '@component/atom/OgMeta';

export default function Page() {
  
  return (
    <>
      <OgMeta
        image="/images/600x314.png"
        title="Custom Facebook Title"
        description="Custom Facebook Description"
      />
      <div>
        open-graph-facebook-1.91-1 Page
      </div>
    </>
  );
};
