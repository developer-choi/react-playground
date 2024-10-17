import React from 'react';
import Link from 'next/link';

// URL: http://localhost:3000/staging/list/refresh/another-page/to
// Doc: https://docs.google.com/document/d/1ir7P3J1WbsIrqa2vNQ1Co39QYmkV4ef6MHcluH6m90s/edit?tab=t.0#heading=h.fsscmueprjg8
export default function Page() {
  return (
    <Link href="/staging/list/refresh/another-page/to">Go back</Link>
  );
}
