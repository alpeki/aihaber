@echo off
echo ========================================
echo Node.js Kurulum Kontrolu
echo ========================================
echo.

echo [1] Node.js versiyonu kontrol ediliyor...
node --version
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js basariyla kuruldu!
) else (
    echo [HATA] Node.js bulunamadi!
    echo Lutfen bilgisayari yeniden baslatin.
)

echo.
echo [2] npm versiyonu kontrol ediliyor...
npm --version
if %ERRORLEVEL% EQU 0 (
    echo [OK] npm basariyla kuruldu!
) else (
    echo [HATA] npm bulunamadi!
)

echo.
echo [3] pnpm kuruluyor...
call npm install -g pnpm
if %ERRORLEVEL% EQU 0 (
    echo [OK] pnpm basariyla kuruldu!
) else (
    echo [HATA] pnpm kurulamadi!
)

echo.
echo [4] pnpm versiyonu kontrol ediliyor...
pnpm --version
if %ERRORLEVEL% EQU 0 (
    echo [OK] pnpm basariyla kuruldu!
) else (
    echo [HATA] pnpm bulunamadi!
)

echo.
echo ========================================
echo Kurulum Tamamlandi!
echo ========================================
echo.
echo Artik projeyi calistirabilirsiniz:
echo   1. start.bat dosyasina cift tiklayin
echo   VEYA
echo   2. PowerShell'de: pnpm run dev
echo.

pause
