import React from 'react';

export default function Page() {
  
  return (
      <div>
        <input type="file" accept=".jpg,.png"/> {/* 겔러리 */}
        <input type="file" capture style={{marginTop: 10}}/> {/* 카메라 */}
      </div>
  );
}
