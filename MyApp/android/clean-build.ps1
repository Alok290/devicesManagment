# PowerShell script to clean Android build directories
Write-Host "Stopping Gradle daemons..." -ForegroundColor Yellow
cd $PSScriptRoot
.\gradlew --stop

Start-Sleep -Seconds 3

Write-Host "Attempting to remove locked build directories..." -ForegroundColor Yellow

$buildDirs = @(
    "app\build\outputs\apk\debug",
    "app\build\outputs\apk",
    "app\build\outputs",
    "app\build"
)

foreach ($dir in $buildDirs) {
    $fullPath = Join-Path $PSScriptRoot $dir
    if (Test-Path $fullPath) {
        Write-Host "Removing: $fullPath" -ForegroundColor Cyan
        try {
            # Try to remove files first
            Get-ChildItem -Path $fullPath -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
            # Then remove directory
            Remove-Item -Path $fullPath -Force -Recurse -ErrorAction SilentlyContinue
            Write-Host "Successfully removed: $fullPath" -ForegroundColor Green
        } catch {
            Write-Host "Warning: Could not remove $fullPath - $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "You may need to close Android Studio, emulator, or file explorer and try again." -ForegroundColor Yellow
        }
    }
}

Write-Host "`nCleanup complete. You can now try building again." -ForegroundColor Green
Write-Host "Run: .\gradlew assembleDebug" -ForegroundColor Cyan


