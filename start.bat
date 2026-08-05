@echo off
echo ==========================================
echo  Matrix Tags - Project Startup
echo ==========================================
echo.

cd /d "e:\mtx_tags\matrix-tags"

REM Step 0: Kill any previous Node.js processes to free RAM
echo [0/3] Freeing memory from previous runs...
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul
echo     Done.
echo.

REM Step 1: Smart cache management
REM  - Always delete the .next/cache/webpack folder (compilation cache)
REM    because it grows huge and causes memory spikes on reload.
REM  - Keep the rest of .next so Turbopack can do incremental builds
REM    (faster startup, lower RAM on subsequent runs).
echo [1/3] Cleaning webpack cache...
if exist ".next\cache\webpack" (
  rmdir /s /q ".next\cache\webpack"
  echo     Webpack cache cleared.
) else (
  echo     Already clean.
)
echo.

REM Step 2: Dependencies check
echo [2/3] Checking dependencies...
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
) else (
  echo     Already installed.
)
echo.

REM Step 3: Start dev server
REM
REM  WHY 512MB: Turbopack needs ~300-400MB peak at startup.
REM  512MB cap gives headroom without swallowing your 8GB system.
REM
REM  WHY NO --webpack: Turbopack (the default) compiles pages LAZILY
REM  — only when you open them in the browser. Webpack compiles ALL
REM  pages at once on startup, which is what caused the 99% memory spike.
REM
echo [3/3] Starting development server (Turbopack - lazy compile)...
echo.
echo     URL  : http://localhost:3001
echo     RAM  : capped at 512MB
echo     Mode : Turbopack (pages compile only when visited)
echo.

set NODE_OPTIONS=--max-old-space-size=512
call npx next dev --port 3001

echo.
echo Server stopped. Press any key to close.
pause >nul
