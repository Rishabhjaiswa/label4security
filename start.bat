@echo off
title Matrix Tags Startup Utility
echo ==================================================
echo        MATRIX TAGS - LOW-MEMORY STARTUP
echo ==================================================
echo.

cd /d "e:\mtx_tags\matrix-tags"

REM Step 0: Force kill any zombie Node processes running in background
echo [1/3] Freeing up system memory...
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul
echo     Background memory freed.
echo.

:menu
echo Choose how you want to run the project:
echo.
echo [1] Production Mode (Highly Recommended for 8GB RAM)
echo     - Uses only ~50MB RAM (almost 0%% load).
echo     - Runs pre-compiled site. Best if you just want to use/view the site.
echo.
echo [2] Development Mode (For Active Coding Only)
echo     - Uses 600MB+ RAM (heavy).
echo     - Compiles pages live. Best if you are modifying code files.
echo.
set /p opt="Select option [1 or 2, default is 1]: "

if "%opt%"=="" set opt=1
if "%opt%"=="1" goto production
if "%opt%"=="2" goto development
echo Invalid option, please try again.
echo.
goto menu

:production
echo.
echo ==================================================
echo Running in Low-Memory Production Mode (~50MB RAM)
echo ==================================================
echo.

REM Ask if they want to compile changes or run instantly
set /p rebuild="Do you want to compile latest changes first? [y/n, default is n]: "
if "%rebuild%"=="y" goto build_prod
if "%rebuild%"=="Y" goto build_prod
if not exist ".next" (
  echo No compiled build found. Compiling first...
  goto build_prod
)
goto start_prod

:build_prod
echo.
echo Compiling project...
set NODE_OPTIONS=--max-old-space-size=512
call npm run build
if %errorlevel% neq 0 (
  echo.
  echo Build failed! Press any key to return to menu.
  pause >nul
  goto menu
)
echo.

:start_prod
echo Starting server on http://localhost:3001
set NODE_OPTIONS=--max-old-space-size=128
set PORT=3001
call npm run start
goto end

:development
echo.
echo ==================================================
echo Running in Live Development Mode (600MB+ RAM)
echo ==================================================
echo.
echo Clearing webpack cache to avoid memory spikes...
if exist ".next\cache\webpack" rmdir /s /q ".next\cache\webpack"

set NODE_OPTIONS=--max-old-space-size=512
call npm run dev
goto end

:end
echo.
echo Server stopped.
pause
