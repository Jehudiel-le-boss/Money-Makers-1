# Digital Master Pack — Money Makers

Landing page de vente Next.js + TypeScript + Tailwind CSS conçue à partir des visuels et vidéos du ZIP fourni.

## Développement

```bash
pnpm install
pnpm dev
```

Commandes de contrôle : `pnpm typecheck` et `pnpm build`.

## Réglages avant publication

Copier `.env.example` en `.env.local` en développement, ou définir ces variables dans les paramètres du projet Vercel :

- `NEXT_PUBLIC_MAKETOU_CHECKOUT_URL` : URL HTTPS réelle du checkout hébergé Maketou. Sans URL valide, les boutons d’achat affichent un avis et ne déclenchent pas de faux paiement.
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` et `NEXT_PUBLIC_UMAMI_WEBSITE_ID` : script et identifiant du site fournis par l’instance Umami choisie. Les vues et clics d’achat sont alors mesurés, sans exposer de secret côté serveur.
- `NEXT_PUBLIC_SITE_URL` : domaine public HTTPS définitif, utilisé pour les balises canoniques, le partage social et le sitemap. Sur Vercel, la variable `VERCEL_PROJECT_PRODUCTION_URL` peut servir de repli.

Le prix est affiché en **5 000 FCFA** ; vérifier que le même montant et la même devise sont configurés dans Maketou. Le PDF est un catalogue de ressources et de liens; les conditions d’accès aux hébergeurs restent celles indiquées dans le document source. Le fichier vendu n’est pas exposé en téléchargement public par le site.

## Scène 3D et particules

`components/hero-scene.tsx` : visuel du pack en relief, anneaux orbitaux et champ de particules (Three.js, chargé à la demande). Repli sur l’image 2D sans WebGL, animation coupée avec `prefers-reduced-motion`, pause hors écran.

## Vercel

Connecter le dépôt au compte Vercel, définir les variables ci-dessus (et le domaine canonique), puis lancer le déploiement. Configurer séparément dans Maketou le prix/devise, le lien de paiement et la remise post-achat du PDF avant d’ouvrir les ventes. Aucun déploiement public n’est déclenché par ce projet.
