import React from 'react';
import universal from 'react-universal-component';

const onLoadFunction = (module, info, props, context) => {
  module.initModule(context.store);
};

export const Challenge = universal(() => import('./indexSync'), {
  loading: <div>Loading...</div>,
  onLoad: onLoadFunction,
});

export const Hello = universal(() => import('./indexSync'), {
  loading: <div>Loading123...</div>,
  onLoad: onLoadFunction,
  key: 'hello',
});
