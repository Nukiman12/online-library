import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.planer.app',
  appName: 'Planer',
  webDir: 'dist/client',
  server: {
    androidScheme: 'https'
  }
};

export default config;

