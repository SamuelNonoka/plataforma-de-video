import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Layout wrapper</h1>
      <div className='scrollbar-hide bg-[#141414] text-white'>{children}</div>
    </div>
  );
}
