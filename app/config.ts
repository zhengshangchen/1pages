declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export const config = {
  clientCache: {
    duration: 1000 * 60 * 5,
    maxSize: 5 * 1024 * 1024,
  },
  
  prefetch: {
    enabled: true,
    routes: ['/posts', '/about'] as const,
  },
  
  debug: process.env.NODE_ENV !== 'production',
  
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    prefetch: true,
  }
} as const 