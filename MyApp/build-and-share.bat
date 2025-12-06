@echo off
echo ========================================
echo   Building APK for WhatsApp Sharing
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Generating JavaScript bundle...
call npm run bundle-android
if errorlevel 1 (
    echo ERROR: Bundle generation failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Building Android APK...
cd android
call gradlew assembleDebug
if errorlevel 1 (
    echo ERROR: APK build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   BUILD SUCCESSFUL!
echo ========================================
echo.
echo Your APK file is located at:
echo %CD%\app\build\outputs\apk\debug\app-debug.apk
echo.
echo To share on WhatsApp:
echo 1. Open the folder above
echo 2. Find app-debug.apk
echo 3. Right-click and Share via WhatsApp
echo.
pause


