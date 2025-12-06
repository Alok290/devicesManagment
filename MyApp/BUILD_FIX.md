# Fix for "Unable to delete directory" Build Error

## Problem
Gradle build fails with error:
```
Unable to delete directory 'C:\Users\...\android\app\build\outputs\apk\debug'
```

This happens when files in the build directory are locked by another process.

## Solutions (Try in order):

### Solution 1: Close Locking Processes
1. **Close Android Studio** if it's open
2. **Close any Android Emulator** that's running
3. **Close File Explorer** windows showing the build directory
4. **Stop Metro bundler** if running (`Ctrl+C` in terminal)
5. Then try building again:
   ```bash
   cd android
   .\gradlew assembleDebug
   ```

### Solution 2: Use Clean Script
Run the cleanup script:
```bash
cd android
.\clean-build.bat
```
Or PowerShell:
```powershell
cd android
.\clean-build.ps1
```

### Solution 3: Manual Cleanup
1. Stop Gradle daemons:
   ```bash
   cd android
   .\gradlew --stop
   ```

2. Wait a few seconds, then manually delete:
   - `android\app\build\outputs\apk\debug` folder
   - Or the entire `android\app\build` folder

3. If Windows says files are in use:
   - Open Task Manager (Ctrl+Shift+Esc)
   - End any Java processes
   - End any ADB processes
   - Try deleting again

### Solution 4: Build to Different Location
Temporarily change the output directory in `android/app/build.gradle`:
```gradle
android {
    // ... existing code ...
    buildTypes {
        debug {
            // Add this to use a different output path
            applicationVariants.all { variant ->
                variant.outputs.all {
                    outputFileName = "../temp-build/${applicationId}-debug.apk"
                }
            }
        }
    }
}
```

### Solution 5: Restart Computer
If nothing else works, restart your computer to release all file locks.

## After Fixing
Once the directory is unlocked, build normally:
```bash
cd MyApp
npm run bundle-android  # Generate bundle first
cd android
.\gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`


