@echo off
setlocal
cd /d "%~dp0"
echo ============================================================
echo   Launching Vortex Router // 1000x TokenSaver Aggregator
echo ============================================================
start "" http://localhost:7700
node server.js
pause
