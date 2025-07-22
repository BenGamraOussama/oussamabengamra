@echo off
echo ========================================
echo  Portfolio Build et Preparation Deploy
echo ========================================

echo.
echo 1. Installation des dependances...
call npm install

echo.
echo 2. Build de production...
call npm run build:static

echo.
echo 3. Verification du build...
if exist "dist\portflio\browser\index.html" (
    echo ✓ Build reussi!
    echo.
    echo Fichiers generes dans: dist\portflio\browser\
    echo.
    echo Pour deployer sur Namecheap:
    echo 1. Connectez-vous a votre cPanel Namecheap
    echo 2. Ouvrez File Manager
    echo 3. Allez dans public_html
    echo 4. Supprimez tout le contenu existant
    echo 5. Uploadez tout le contenu de dist\portflio\browser\
    echo 6. Assurez-vous que .htaccess est uploade
    echo.
    echo Voulez-vous ouvrir le dossier de build? (O/N)
    set /p choice=
    if /i "%choice%"=="O" start explorer "dist\portflio\browser"
) else (
    echo ✗ Echec du build!
    echo Verifiez les erreurs ci-dessus
)

echo.
pause
