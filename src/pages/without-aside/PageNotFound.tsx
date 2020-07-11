import React from 'react';
import './PageNotFound.scss';

export default function PageNotFound() {

  return (
      <div className="PageNotFound-wrap">
        <span className="title">PageNotFound</span>
        <span className="sub-title">We couldnt find what you were looking for.</span>
        <span className="content">Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</span>
      </div>
  );
}
