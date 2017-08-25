import React from 'react';
import universal from 'react-universal-component';

export const Steps = universal(() => import('./indexSync'), {
  loading: <div>Loading...</div>,
  onLoad: (module, info, props, context) => {
    module.initModule(context.store);
  },
});
