import React from 'react';
import TwitterMeta from '@component/atom/TwitterMeta';

export default function Page() {
  return (
    <>
      <TwitterMeta
        cardType="summary_large_image"
        image="/images/800x400.png"
        title="Custom Twitter Title"
        description="Custom Twitter Description"
      />
      <div>
        open-graph-twitter-summary-large Page
      </div>
    </>
  );
};
