# Capacitor Configuration Guide

## Overview
This project uses Capacitor to create native Android applications from the React web app.

## Configuration

### capacitor.config.ts
```typescript
{
  appId: 'com.planer.app',        // Unique identifier for your app
  appName: 'Planer',               // Display name of the app
  webDir: 'dist/client',           // Directory with built web assets
  server: {
    androidScheme: 'https'         // Use HTTPS scheme for Android
  }
}
```

## Customization

### Change App ID
Edit `capacitor.config.ts` and update the `appId` field. Then run:
```bash
npm run cap:sync
```

### Change App Name
Edit `capacitor.config.ts` and update the `appName` field, then sync.

### App Icons and Splash Screens
Replace the following files in `android/app/src/main/res/`:
- `mipmap-*/ic_launcher.png` - App icons
- `drawable-*/splash.png` - Splash screens

### Android Configuration
Native Android configuration can be found in:
- `android/app/build.gradle` - App build configuration
- `android/app/src/main/AndroidManifest.xml` - App manifest
- `android/variables.gradle` - Android SDK versions

## Development Workflow

1. **Make changes to web app** in `src/`
2. **Build the web app**: `npm run build`
3. **Sync with native project**: `npm run cap:sync`
4. **Open in Android Studio**: `npm run cap:open:android`
5. **Run on device/emulator** from Android Studio or `npm run cap:run:android`

## Adding Capacitor Plugins

To add native functionality:

```bash
npm install @capacitor/plugin-name
npm run cap:sync
```

Popular plugins:
- `@capacitor/camera` - Camera access
- `@capacitor/filesystem` - File system access
- `@capacitor/geolocation` - GPS location
- `@capacitor/storage` - Persistent storage
- `@capacitor/push-notifications` - Push notifications

## Debugging

### View Android Logs
In Android Studio: View → Tool Windows → Logcat

### Chrome DevTools
1. Connect Android device via USB
2. Open Chrome and navigate to `chrome://inspect`
3. Find your app and click "inspect"

## Building Release APK

1. Open Android Studio: `npm run cap:open:android`
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. APK will be in `android/app/build/outputs/apk/`

## Common Issues

### Sync Errors
- Ensure `dist/client` exists: `npm run build`
- Clean and rebuild: Delete `android/app/build` folder

### Gradle Errors
- Check Java JDK version (17+ required)
- Update Android Studio and SDK tools

### Device Not Detected
- Enable USB debugging on Android device
- Install device drivers on Windows

## Resources
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)

