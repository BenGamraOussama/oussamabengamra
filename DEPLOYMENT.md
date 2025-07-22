# Portfolio Deployment Guide

## Déploiement avec Vercel et domaine personnalisé oussamabengamra.me

### Prérequis
- Compte Vercel (gratuit)
- Domaine oussamabengamra.me configuré
- Repository GitHub

### Étapes de déploiement

#### 1. Push du code vers GitHub
```bash
git add .
git commit -m "Configuration pour déploiement Vercel"
git push origin main
```

#### 2. Connexion à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "New Project"
4. Importez votre repository GitHub

#### 3. Configuration Vercel
- Framework Preset: Laissez Vercel détecter automatiquement (Angular)
- Build Command: `npm run build:static`
- Output Directory: `dist/portflio/browser`
- Install Command: `npm install`

#### 4. Configuration du domaine personnalisé
1. Dans votre projet Vercel, allez dans Settings > Domains
2. Ajoutez `oussamabengamra.me`
3. Vercel vous donnera des enregistrements DNS à configurer

#### 5. Configuration DNS
Chez votre registraire de domaine (.me), ajoutez ces enregistrements :

**Type A Record:**
- Name: `@` (ou vide)
- Value: `76.76.19.61` (IP Vercel)

**Type CNAME Record:**
- Name: `www`
- Value: `cname.vercel-dns.com`

**Alternative avec CNAME pour root domain:**
- Name: `@`
- Value: `cname.vercel-dns.com`

#### 6. Attendre la propagation DNS
- La propagation DNS peut prendre 24-48 heures
- Utilisez des outils comme [whatsmydns.net](https://whatsmydns.net) pour vérifier

### Scripts disponibles

- `npm run build:static` - Build pour production (sans SSR)
- `npm run build` - Build complet avec SSR
- `npm start` - Serveur de développement

### Fichiers de configuration

- `vercel.json` - Configuration Vercel
- `angular.json` - Configuration Angular
- Les routes sont configurées pour SPA (Single Page Application)

### Alternative: Netlify

Si vous préférez Netlify :

1. Créez un fichier `_redirects` :
```
/*    /index.html   200
```

2. Déployez via Netlify CLI ou interface web
3. Configurez le domaine dans Netlify Dashboard

### Troubleshooting

- Si les CSS ne se chargent pas, vérifiez les chemins dans index.html
- Pour les erreurs 404 sur les routes, vérifiez la configuration des redirections
- Les avertissements CSS peuvent être ignorés (fichiers dans public/css)
