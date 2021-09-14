import React from 'react';
import TwitterMeta from '@components/atom/TwitterMeta';

export default function Page() {
  
  return (
    <>
      <TwitterMeta
        cardType="summary"
        image="https://react-playground-xi.vercel.app/images/600x600.png"
        title="Custom Twitter Title"
        description="Custom Twitter Description"
      />
      <div>
        open-graph-twitter-summary Page
      </div>
    </>
  );
};
