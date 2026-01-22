@echo off
chcp 65001 >nul
title PatLook - Instalacja
echo ========================================
echo        PatLook - Instalacja
echo ========================================
echo.

cd /d "%~dp0"

REM Sprawdz czy Node.js jest zainstalowany
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo BLAD: Node.js nie jest zainstalowany!
    echo Pobierz Node.js z https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js znaleziony:
node --version
echo.

REM Instalacja backendu
echo [1/4] Instalowanie zaleznosci backendu...
cd /d "%~dp0backend"
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo BLAD: Nie udalo sie zainstalowac zaleznosci backendu!
    pause
    exit /b 1
)
echo Backend - zaleznosci zainstalowane!
echo.

REM Tworzenie .env dla backendu
echo [2/4] Tworzenie pliku konfiguracyjnego backendu...
if not exist ".env" (
    echo PORT=5000> .env
    echo JWT_SECRET=patlook_secret_key_change_in_production>> .env
    echo DB_PATH=./database.sqlite>> .env
    echo NODE_ENV=development>> .env
    echo Plik .env utworzony!
) else (
    echo Plik .env juz istnieje - pomijam.
)
echo.

REM Instalacja frontendu
echo [3/4] Instalowanie zaleznosci frontendu...
cd /d "%~dp0frontend"
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo BLAD: Nie udalo sie zainstalowac zaleznosci frontendu!
    pause
    exit /b 1
)
echo Frontend - zaleznosci zainstalowane!
echo.

REM Tworzenie .env dla frontendu
echo [4/4] Tworzenie pliku konfiguracyjnego frontendu...
if not exist ".env" (
    echo REACT_APP_API_URL=http://localhost:5000> .env
    echo Plik .env utworzony!
) else (
    echo Plik .env juz istnieje - pomijam.
)
echo.

echo ========================================
echo   PatLook - Instalacja zakonczona!
echo ========================================
echo.
echo Aby uruchomic aplikacje, uzyj: start.bat
echo.
pause
