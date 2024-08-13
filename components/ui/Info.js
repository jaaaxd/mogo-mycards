import React, { useState } from 'react';

export default function Info() {
  const [info, setInfo] = useState(true);

  return (
    <>
      {info && (
        <div className="self-center w-full px-[44px] sticky top-0 mb-6 z-50">
          <div role="alert" className="alert alert-info px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-textarea">UI Design & Responsive In Process</span>
            <button
              className="btn btn-sm font-textarea"
              onClick={() => setInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
