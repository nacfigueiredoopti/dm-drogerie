import { createInstance } from '@optimizely/react-sdk';

const optimizelyClient = createInstance({
  sdkKey: 'VFYLUCrJrBf3JRRTF44j7',
  datafileOptions: {
    updateInterval: 1000,
    autoUpdate: true,
  },
});

export default optimizelyClient;
