@echo off
echo ========================================
echo AI News - Gelistirme Sunucusu
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js kurulu degil!
    echo Lutfen Node.js'i su adresten indirin: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [UYARI] pnpm kurulu degil. Kuruluyor...
    call npm install -g pnpm
    if %ERRORLEVEL% NEQ 0 (
        echo [HATA] pnpm kurulamadi!
        pause
        exit /b 1
    )
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [BILGI] Bagimlilklar yukleniyor...
    call pnpm install
    if %ERRORLEVEL% NEQ 0 (
        echo [HATA] Bagimlilklar yuklenemedi!
        pause
        exit /b 1
    )
)

echo.
echo [BASARILI] Sunucu baslatiliyor...
echo.
echo Tarayicinizda su adresi acin: http://localhost:5173
echo.
echo Sunucuyu durdurmak icin CTRL+C basin
echo.

call pnpm run dev

pause
