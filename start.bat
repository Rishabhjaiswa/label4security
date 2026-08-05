@echo off
echo ==========================================
echo  Matrix Tags - Startup
echo ==========================================
echo.

cd /d "e:\mtx_tags\matrix-tags"

REM Kill leftover Node from previous session
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul

REM Wipe ALL .next cache - prevents stale cache memory spikes
if exist ".next" rmdir /s /q ".next"

REM Install deps only if missing
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

REM Start with strict 512MB heap cap
REM Turbopack compiles only pages you visit - much lower RAM than webpack
set NODE_OPTIONS=--max-old-space-size=512
echo Starting on http://localhost:3001  [RAM cap: 512MB]
echo.
call npm run dev

pause
