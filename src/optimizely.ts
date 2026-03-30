import { createInstance } from '@optimizely/react-sdk';

const optimizelyClient = createInstance({
  sdkKey: 'SbnEVE8hmcXpcSYeTD6kh',
  datafileOptions: {
    updateInterval: 1000,
    autoUpdate: true,
  },
});

export default optimizelyClient;
