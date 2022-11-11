import React from 'react';
import TwitterMeta from '@component/atom/TwitterMeta';

export default function Page() {
  
  return (
    <>
      <TwitterMeta
        cardType="summary"
        image="/images/600x600.png"
        title="Custom Twitter Title"
        description="Custom Twitter Description"
      />
      <div>
        open-graph-twitter-summary Page
      </div>
    </>
  );
};
