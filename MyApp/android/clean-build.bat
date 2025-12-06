@echo off
echo Stopping Gradle daemons...
call gradlew --stop

timeout /t 3 /nobreak >nul

echo.
echo Attempting to clean build directories...
echo.

if exist "app\build\outputs\apk\debug" (
    echo Removing debug APK directory...
    rd /s /q "app\build\outputs\apk\debug" 2>nul
)

if exist "app\build\outputs\apk" (
    echo Removing APK outputs directory...
    rd /s /q "app\build\outputs\apk" 2>nul
)

if exist "app\build\outputs" (
    echo Removing outputs directory...
    rd /s /q "app\build\outputs" 2>nul
)

echo.
echo Cleanup complete. You can now try building again.
echo Run: gradlew assembleDebug
pause


