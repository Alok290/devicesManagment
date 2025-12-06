@echo off
echo ========================================
echo Fixing Locked Build Directory Issue
echo ========================================
echo.

echo Step 1: Stopping Gradle daemons...
call gradlew --stop
timeout /t 2 /nobreak >nul

echo.
echo Step 2: Stopping Java and ADB processes...
taskkill /F /IM java.exe /T 2>nul
taskkill /F /IM adb.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Step 3: Attempting to remove locked directories...
if exist "app\build\outputs\apk\debug" (
    echo Removing debug APK directory...
    rd /s /q "app\build\outputs\apk\debug" 2>nul
    if exist "app\build\outputs\apk\debug" (
        echo WARNING: Could not remove directory. Please:
        echo   1. Close Android Studio
        echo   2. Close any Android Emulator
        echo   3. Close File Explorer windows showing this folder
        echo   4. Try running this script again
        pause
        exit /b 1
    ) else (
        echo Successfully removed debug directory!
    )
)

echo.
echo Step 4: Cleaning build...
call gradlew clean --no-daemon

echo.
echo ========================================
echo Cleanup complete!
echo ========================================
echo.
echo You can now build the app:
echo   gradlew assembleDebug
echo.
pause


