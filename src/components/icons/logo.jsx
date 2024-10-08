import React from 'react';

const Logo = (
  <svg viewBox="0 0 20 20" width="23" height="23" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M5.70480219,0 L10.4096044,3.41834667 L8.61252986,8.94934776 L2.79707453,8.94934776 L1,3.41834667 L5.70480219,0 Z"
        fill="darkgreen"
      />
      <path
        d="M5.70480219,20 L1,16.5816533 L2.79707453,11.0506522 L8.61252986,11.0506522 L10.4096044,16.5816533 L5.70480219,20 Z"
        fill="yellow"
      />
      <path
        d="M18.8709653,12.9678909 L13.3400514,14.7649021 L9.92167142,10.0599974 L13.3399103,5.35519519 L18.8708781,7.15237223 L18.8709653,12.9678909 Z"
        fill="lightgreen"
      />
    </g>
  </svg>
);

const dark = Logo;

const light = (
  <svg viewBox="0 0 20 20" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M5.70480219,0 L10.4096044,3.41834667 L8.61252986,8.94934776 L2.79707453,8.94934776 L1,3.41834667 L5.70480219,0 Z"
        fill="darkgreen"
      />
      <path
        d="M5.70480219,20 L1,16.5816533 L2.79707453,11.0506522 L8.61252986,11.0506522 L10.4096044,16.5816533 L5.70480219,20 Z"
        fill="lightgreen"
      />
      <path
        d="M18.8709653,12.9678909 L13.3400514,14.7649021 L9.92167142,10.0599974 L13.3399103,5.35519519 L18.8708781,7.15237223 L18.8709653,12.9678909 Z"
        fill="yellow"
      />
    </g>
  </svg>
);

export default {
  dark,
  light,
};
