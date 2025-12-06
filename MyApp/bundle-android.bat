@echo off
echo Creating assets directory...
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"

echo Bundling JavaScript for Android...
call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res --minify true

echo Bundle created successfully!
echo You can now build the app and it will work offline.


