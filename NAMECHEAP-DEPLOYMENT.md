# Déploiement Portfolio sur Namecheap

## Option 1: Hébergement Web Namecheap (Recommandé)

### Prérequis
- Compte Namecheap
- Domaine oussamabengamra.me (déjà acheté)
- Plan d'hébergement Namecheap (Stellar, Stellar Plus, ou Stellar Business)

### Étapes de déploiement

#### 1. Activer l'hébergement web
1. Connectez-vous à votre [compte Namecheap](https://ap.www.namecheap.com/dashboard)
2. Allez dans "Domain List" → cliquez sur votre domaine `oussamabengamra.me`
3. Si vous n'avez pas d'hébergement, achetez un plan Stellar
4. Activez l'hébergement pour votre domaine

#### 2. Préparer les fichiers pour upload
```bash
# Dans votre dossier de projet
npm run build:static
```

#### 3. Upload via cPanel File Manager
1. Accédez à cPanel depuis votre dashboard Namecheap
2. Ouvrez "File Manager"
3. Naviguez vers le dossier `public_html`
4. Supprimez tous les fichiers par défaut dans `public_html`
5. Uploadez tout le contenu de `dist/portflio/browser/` vers `public_html`

#### 4. Configuration .htaccess pour Angular
Créez un fichier `.htaccess` dans `public_html` avec le contenu suivant :

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

#### 5. Configuration DNS
Dans votre panneau Namecheap :
1. Allez dans "Domain" → "Domain List"
2. Cliquez sur "Manage" à côté de votre domaine
3. Dans l'onglet "Advanced DNS", configurez :

```
Type: A Record
Host: @
Value: [IP de votre hébergement Namecheap]
TTL: Automatic

Type: CNAME Record  
Host: www
Value: oussamabengamra.me
TTL: Automatic
```

## Option 2: Namecheap + Vercel (DNS uniquement)

Si vous préférez utiliser Vercel pour l'hébergement et Namecheap pour le DNS :

#### Configuration DNS pour Vercel
```
Type: A Record
Host: @
Value: 76.76.19.61
TTL: Automatic

Type: CNAME Record
Host: www  
Value: cname.vercel-dns.com
TTL: Automatic
```

## Option 3: Automation avec GitHub Actions

### Script d'upload automatique (pour l'hébergement Namecheap)

Créez ce workflow pour automatiser le déploiement :

```yaml
name: Deploy to Namecheap

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build:static
    
    - name: Deploy to Namecheap via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/portflio/browser/
        server-dir: public_html/
```

### Configuration des secrets GitHub
Dans votre repository GitHub :
1. Allez dans Settings → Secrets and variables → Actions
2. Ajoutez ces secrets :
   - `FTP_SERVER`: Serveur FTP Namecheap (ex: ftpupload.net)
   - `FTP_USERNAME`: Votre nom d'utilisateur cPanel
   - `FTP_PASSWORD`: Votre mot de passe cPanel

## Commandes utiles

### Build et test local
```bash
# Build pour production
npm run build:static

# Test du build localement
cd dist/portflio/browser
python -m http.server 8000
# Puis visitez http://localhost:8000
```

### Upload manuel via FTP
Si vous préférez un client FTP :
- **Serveur**: Votre serveur FTP Namecheap (trouvé dans cPanel)
- **Utilisateur**: Votre nom d'utilisateur cPanel  
- **Mot de passe**: Votre mot de passe cPanel
- **Dossier distant**: `public_html`
- **Dossier local**: `dist/portflio/browser`

## Vérification du déploiement

1. **Test DNS**: Utilisez [whatsmydns.net](https://whatsmydns.net) pour vérifier la propagation
2. **Test du site**: Visitez `https://oussamabengamra.me`
3. **Test des routes**: Vérifiez que `/blog`, `/portflio-details/1` fonctionnent
4. **Test mobile**: Vérifiez la responsivité

## Troubleshooting

### Problèmes courants
- **404 sur les routes**: Vérifiez la configuration `.htaccess`
- **CSS/JS ne se chargent pas**: Vérifiez les permissions des fichiers (644)
- **Site lent**: Activez la compression GZIP dans `.htaccess`
- **Certificat SSL**: Activez SSL gratuit dans cPanel

### Support Namecheap
- Chat support disponible 24/7
- Base de connaissances: [namecheap.com/support](https://www.namecheap.com/support/)
- Documentation cPanel: Accessible depuis votre dashboard

## Maintenance

### Mises à jour
1. Modifiez votre code localement
2. Testez avec `npm start`
3. Buildez avec `npm run build:static`
4. Uploadez les nouveaux fichiers via cPanel ou FTP
5. Videz le cache du navigateur pour tester

### Monitoring
- Utilisez Google Analytics pour suivre le trafic
- Configurez Google Search Console pour le SEO
- Surveillez les performances avec GTmetrix ou PageSpeed Insights
