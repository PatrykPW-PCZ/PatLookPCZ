@echo off
chcp 65001 >nul
title PatLook
echo ========================================
echo      PatLook - Uruchamianie
echo ========================================
echo.

cd /d "%~dp0"

REM Sprawdz czy Node.js jest zainstalowany
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo BLAD: Node.js nie jest zainstalowany!
    echo Pobierz Node.js z https://nodejs.org/
    pause
    exit /b 1
)

REM Sprawdz czy zaleznosci sa zainstalowane
if not exist "backend\node_modules" (
    echo Zaleznosci nie sa zainstalowane.
    echo Uruchamiam instalacje...
    echo.
    call install.bat
)

if not exist "frontend\node_modules" (
    echo Zaleznosci nie sa zainstalowane.
    echo Uruchamiam instalacje...
    echo.
    call install.bat
)

echo [1/2] Uruchamianie backendu (port 5000)...
start "PatLook Backend" cmd /k "cd /d "%~dp0backend" && npm start"

echo.
echo [2/2] Uruchamianie frontendu (port 3000)...
timeout /t 3 /nobreak >nul

start "PatLook Frontend" cmd /k "cd /d "%~dp0frontend" && npm start"

echo.
echo ========================================
echo       PatLook uruchomiony!
echo ========================================
echo.
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:3000
echo.
echo Aplikacja otworzy sie automatycznie w przegladarce.
echo Aby zatrzymac aplikacje, zamknij oba okna konsoli.
echo ========================================

timeout /t 8 /nobreak >nul
start http://localhost:3000

exit
