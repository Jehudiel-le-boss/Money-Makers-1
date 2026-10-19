import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Check,
  ChevronDown,
  Clapperboard,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import { CheckoutLink } from "../components/checkout-link";
import { Header } from "../components/header";
import { HeroScene } from "../components/hero-scene";
import { ProductPreview } from "../components/product-preview";
import { Reveal } from "../components/reveal";
import { StatsBand } from "../components/stats-band";
import { StickyCheckout } from "../components/sticky-checkout";
import { getHttpsUrl } from "../lib/site";
import {
  CHECKOUT_CTA_LABEL,
  formatFcfa,
  PRODUCT_STATS,
  SUPPORT_EMAIL,
} from "../lib/product-stats";

const topics = [
  {
    title: "IA & automatisation",
    examples: [
      "ChatGPT de A à Z",
      "Automatisation sur ChatGPT",
      "Créer des images avec Midjourney",
      "La suite de bots ChatGPT",
      "ChatGPT + WordPress",
    ],
    Icon: BrainCircuit,
  },
  {
    title: "Business & marketing",
    examples: [
      "Facebook Ads, débutant à expert",
      "Boutique Shopify de zéro",
      "E-commerce en dropshipping",
      "Affiliation",
      "Pages de vente qui convertissent",
    ],
    Icon: Briefcase,
  },
  {
    title: "Création & vidéo",
    examples: [
      "DaVinci Resolve",
      "Premiere Pro 2024",
      "Montage vidéo",
      "Certification TikTok Marketing",
      "Pack Adobe débutant",
    ],
    Icon: Clapperboard,
  },
  {
    title: "Outils & compétences",
    examples: [
      "Python",
      "Excel VBA",
      "Google Analytics 4",
      "WordPress et Bubble",
      "Microsoft Office 5-en-1",
      "Prise de parole en public",
    ],
    Icon: Layers,
  },
];

const steps = [
  { number: "01", title: "Achetez le PDF", text: "Le checkout Maketou gère le paiement et la remise du document." },
  { number: "02", title: "Choisissez un sujet", text: "Partez d’une thématique ou d’un outil qui vous intéresse." },
  { number: "03", title: "Ouvrez le dossier", text: "Suivez le lien indiqué vers la ressource correspondante." },
  { number: "04", title: "Apprenez à votre rythme", text: "Explorez une piste à la fois et décidez de la suite." },
];

const videos = [
  {
    title: "Je ne sais pas par où commencer",
    note: "Une piste à la fois",
    src: "/media/ad-premier-pas.mp4",
    poster: "/media/ad-premier-pas.jpg",
  },
  {
    title: "Il me manque les compétences",
    note: "Apprendre étape par étape",
    src: "/media/ad-competences.mp4",
    poster: "/media/ad-competences.jpg",
  },
  {
    title: "Je me méfie des promesses",
    note: "Sans promesse magique",
    src: "/media/ad-transparence.mp4",
    poster: "/media/ad-transparence.jpg",
  },
];

const faq = [
  {
    question: "Combien de formations contient le pack ?",
    answer: `Le PDF liste ${PRODUCT_STATS.totalFormationCount} titres, soit plus de ${PRODUCT_STATS.formationDisplayCount} formations, répartis en ${PRODUCT_STATS.sourceFolderCount} dossiers : Mega, Google Drive et des liens directs.`,
  },
  {
    question: "Puis-je voir le contenu avant d’acheter ?",
    answer:
      `Oui. La section Aperçu montre de vraies captures des dossiers et des ${PRODUCT_STATS.pdfPageCount} pages du PDF.`,
  },
  {
    question: "Que faire si un lien ne fonctionne plus ?",
    answer: (
      <>
        Les dossiers sont hébergés par des tiers et leur disponibilité peut évoluer. Écrivez-nous
        à <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> et nous vérifierons.
      </>
    ),
  },
  {
    question: "Qu’est-ce que le Digital Master Pack ?",
    answer:
      `C’est un PDF de ${PRODUCT_STATS.pdfPageCount} pages qui rassemble plus de ${PRODUCT_STATS.formationDisplayCount} liens vers des ressources autour de l’IA, du business, du marketing, de la création et des outils numériques.`,
  },
  {
    question: "Comment les ressources sont-elles accessibles ?",
    answer:
      "Le PDF indique des dossiers partagés, notamment Mega et Google Drive, ainsi que des téléchargements directs listés dans le guide. Certains accès peuvent demander un compte ou une autorisation du propriétaire; la disponibilité des liens peut évoluer.",
  },
  {
    question: "Le pack garantit-il des revenus ou des résultats ?",
    answer:
      "Non. Le Digital Master Pack est un catalogue de ressources, pas une garantie de revenu, de maîtrise ou de résultat. Les titres qui évoquent des revenus décrivent les sujets des ressources; ils ne constituent pas une promesse.",
  },
  {
    question: "Quel est le prix du pack ?",
    answer: `Le Digital Master Pack est proposé à ${formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA. Le paiement s’effectue sur la page de paiement hébergée par Maketou.`,
  },
  {
    question: "Comment acheter le PDF ?",
    answer:
      "Le bouton d’achat ouvre le checkout hébergé par Maketou. Après le paiement, le PDF vous est remis selon les modalités indiquées sur la page de paiement.",
  },
];

export default function HomePage() {
  const checkoutReady = Boolean(getHttpsUrl(process.env.NEXT_PUBLIC_MAKETOU_CHECKOUT_URL?.trim()));

  return (
    <>
      <Header />
      <StickyCheckout />
      <main className="w-full">
        <section className="hero" id="accueil">
          <HeroScene />
          <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="site-container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-pulse" /> MONEY MAKERS <span className="eyebrow-divider">/</span> ÉDITION DIGITALE</p>
              <h1 className="text-balance">
                {PRODUCT_STATS.formationDisplayCount}+ formations en IA, business, marketing et vidéo.
                <span className="gradient-text"> Dans un seul PDF.</span>
              </h1>
              <p className="hero-intro">
                Le Digital Master Pack vous donne les liens vers plus de{" "}
                {PRODUCT_STATS.formationDisplayCount} formations : ChatGPT, Shopify, Python,
                Facebook Ads, TikTok, montage vidéo, WordPress… Vous choisissez un sujet, vous
                ouvrez le dossier, vous apprenez.
              </p>
              <p className="hero-price">
                {formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA
                <span>PDF de {PRODUCT_STATS.pdfPageCount} pages · remis après paiement</span>
              </p>
              <div className="hero-actions">
                <CheckoutLink className="button button-primary" location="hero">
                  {CHECKOUT_CTA_LABEL}
                </CheckoutLink>
                <a className="button button-quiet" href="#contenu">
                  Voir ce qu’il y a dedans <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-facts" aria-label="À savoir sur le produit">
                <span><FileText size={15} aria-hidden="true" /> {PRODUCT_STATS.formationDisplayCount}+ formations</span>
                <span><Layers size={15} aria-hidden="true" /> {PRODUCT_STATS.topicCount} thématiques</span>
                <span><ShieldCheck size={15} aria-hidden="true" /> Paiement via Maketou</span>
              </div>
              <p className="hero-microcopy">Un guide de liens vers des formations, pas une garantie de résultats.</p>
            </div>

            <div className="hero-visual" data-hero-visual aria-label="Visuel du Digital Master Pack fourni par Money Makers">
              <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
              <div className="hero-art-frame">
                <Image
                  src="/media/hero-portrait.webp"
                  alt="Digital Master Pack de Money Makers : intelligence artificielle, e-commerce, marketing, création vidéo, web et entrepreneuriat"
                  fill
                  priority
                  sizes="(max-width: 700px) 66vw, (max-width: 1100px) 40vw, 390px"
                  className="hero-art"
                />
              </div>
              <div className="floating-chip floating-chip-top">
                <span className="chip-icon"><Sparkles size={15} aria-hidden="true" /></span>
                <span><small>VOTRE PROCHAINE ÉTAPE</small><strong>Une piste à la fois</strong></span>
              </div>
              <div className="floating-chip floating-chip-bottom">
                <span className="chip-check"><Check size={15} aria-hidden="true" /></span>
                <span><small>FORMAT</small><strong>Un guide numérique</strong></span>
              </div>
              <div className="hero-ring" aria-hidden="true" />
            </div>
          </div>
          <a href="#contenu" className="scroll-cue" aria-label="Faire défiler vers le contenu">
            <span /> FAIRE DÉFILER
          </a>
        </section>

        <StatsBand />

        <section className="section section-content" id="contenu">
          <div className="site-container">
            <Reveal className="section-heading section-heading-split">
              <div>
                <p className="section-kicker"><span>01</span> LE CONTENU, SANS FLOU</p>
                <h2>Ce que vous recevez<br /><span className="gradient-text">exactement.</span></h2>
              </div>
              <p className="section-lede">
                Un PDF de {PRODUCT_STATS.pdfPageCount} pages. Chaque ligne est une formation,
                chaque ligne est un lien. Tout est classé par thème pour vous aider à choisir par
                où commencer.
              </p>
            </Reveal>

            <div className="topic-grid">
              {topics.map(({ title, examples, Icon }, index) => (
                <Reveal key={title} delay={index * 0.07} className="topic-card-wrap">
                  <article className="topic-card">
                    <div className="topic-card-top"><span>{String(index + 1).padStart(2, "0")} / {String(PRODUCT_STATS.topicCount).padStart(2, "0")}</span><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></div>
                    <h3>{title}</h3>
                    <ul className="topic-examples">
                      {examples.map((example) => <li key={example}>{example}</li>)}
                    </ul>
                    <span className="topic-line" aria-hidden="true" />
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="not-included">
              <h3>Ce que vous n’obtenez pas</h3>
              <p>
                Pas de coaching, pas de promesse de revenus. L’accès aux dossiers dépend de leurs
                hébergeurs et de leurs autorisations.
              </p>
            </Reveal>
          </div>
        </section>

        <ProductPreview />

        <section className="section section-audience" id="pour-qui">
          <div className="site-container audience-layout">
            <Reveal className="audience-heading">
              <p className="section-kicker"><span>03</span> POUR QUI ?</p>
              <h2>Pour qui est<br /><span className="gradient-text">ce pack ?</span></h2>
            </Reveal>
            <div className="audience-list">
              {[
                "Vous débutez et ne savez pas par où commencer : choisissez une thématique.",
                "Vous cherchez une ressource sur un outil précis : trouvez un sujet en un coup d’œil.",
                `Vous préférez payer une fois ${formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA plutôt que chercher des ressources une par une.`,
              ].map((item, index) => (
                <Reveal key={item} delay={index * 0.06}>
                  <p className="audience-item"><span>0{index + 1}</span>{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-method" id="methode">
          <div className="method-glow" aria-hidden="true" />
          <div className="site-container method-layout">
            <Reveal className="method-intro">
              <p className="section-kicker"><span>04</span> UN DÉMARRAGE SIMPLE</p>
              <h2>Comment<br /><span className="gradient-text">ça marche ?</span></h2>
              <p>
                Quatre étapes pour passer du PDF à la ressource qui vous intéresse.
              </p>
              <div className="method-note"><Sparkles size={17} aria-hidden="true" /><span>À votre rythme. Une seule piste pour commencer.</span></div>
            </Reveal>

            <div className="steps-list">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 0.06}>
                  <article className="step-item">
                    <span className="step-number">{step.number}</span>
                    <div><h3>{step.title}</h3><p>{step.text}</p></div>
                    <ArrowRight size={17} className="step-arrow" aria-hidden="true" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-video" id="publicites">
          <div className="site-container">
            <Reveal className="section-heading section-heading-centered">
              <p className="section-kicker"><span>05</span> L’ESPRIT MONEY MAKERS</p>
              <h2>En <span className="gradient-text">3 vidéos.</span></h2>
              <p className="section-lede">
                Les créations publicitaires fournies présentent le pack avec clarté : choisir une
                piste, développer des compétences, garder des attentes réalistes.
              </p>
            </Reveal>

            <div className="video-grid">
              {videos.map((video, index) => (
                <Reveal key={video.src} delay={index * 0.08} className="video-card-wrap">
                  <article className="video-card">
                    <div className="video-topline"><span>FILM 0{index + 1}</span><Video size={15} aria-hidden="true" /></div>
                    <div className="video-stage">
                      <video controls playsInline preload="none" poster={video.poster} aria-label={`Publicité : ${video.title}`}>
                        <source src={video.src} type="video/mp4" />
                        Votre navigateur ne prend pas en charge la lecture vidéo.
                      </video>
                    </div>
                    <div className="video-caption"><div><h3>{video.title}</h3><p>{video.note}</p></div><ArrowRight size={17} aria-hidden="true" /></div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="video-footnote"><ShieldCheck size={15} aria-hidden="true" /> Aucun contenu publicitaire ne garantit un revenu ou un résultat.</p>
          </div>
        </section>

        <section className="section section-trust">
          <div className="site-container">
            <Reveal className="trust-panel">
              <div className="trust-symbol"><ShieldCheck size={28} strokeWidth={1.4} aria-hidden="true" /></div>
              <div className="trust-copy">
                <p className="section-kicker">LA TRANSPARENCE D’ABORD</p>
                <h2>Des ressources à explorer.<br /><span className="gradient-text">Aucun revenu garanti.</span></h2>
                <p>
                  Ce produit est un catalogue de ressources numériques. Les résultats dépendent
                  de chaque personne et de son contexte. L’accès aux liens et la disponibilité du
                  contenu relèvent de leurs propriétaires et hébergeurs.
                </p>
              </div>
              <div className="trust-badge"><span className="trust-badge-dot" /> INFORMATIONS CLAIRES</div>
            </Reveal>
          </div>
        </section>

        <section className="section section-offer" id="offre">
          <div className="offer-halo" aria-hidden="true" />
          <div className="site-container">
            <Reveal className="offer-header">
              <p className="section-kicker"><span>06</span> VOTRE PROCHAIN PAS</p>
              <h2>Digital Master<br /><span className="gradient-text">Pack.</span></h2>
              <p>
                {PRODUCT_STATS.formationDisplayCount}+ formations, {PRODUCT_STATS.topicCount}{" "}
                thématiques, 1 PDF.
              </p>
            </Reveal>

            <Reveal className="offer-card-wrap">
              <div className="offer-card">
                <div className="offer-product">
                  <div className="offer-product-icon"><BookOpen size={24} aria-hidden="true" /></div>
                  <p className="offer-overline">MONEY MAKERS PRÉSENTE</p>
                  <h3>Digital<br /><span>Master Pack</span></h3>
                  <p className="offer-description">
                    {PRODUCT_STATS.formationDisplayCount}+ formations, {PRODUCT_STATS.topicCount}{" "}
                    thématiques, 1 PDF.
                  </p>
                  <div className="offer-includes">
                    <span><Check size={15} aria-hidden="true" /> PDF de {PRODUCT_STATS.pdfPageCount} pages</span>
                    <span><Check size={15} aria-hidden="true" /> {PRODUCT_STATS.topicCount} thématiques</span>
                    <span><Check size={15} aria-hidden="true" /> Liens et pistes à explorer</span>
                  </div>
                </div>
                <div className="offer-checkout">
                  <p className="price-label">PRIX</p>
                  <div className="price-value">{formatFcfa(PRODUCT_STATS.priceFcfa)}<span className="price-currency">FCFA</span></div>
                  <p className="price-unit">PDF numérique <span>·</span> prix en FCFA</p>
                  <p className="price-per-formation">
                    soit moins de {formatFcfa(PRODUCT_STATS.pricePerFormationCeilingFcfa)} FCFA par formation
                  </p>
                  <CheckoutLink className="button button-primary button-full" location="offre">
                    {CHECKOUT_CTA_LABEL}
                  </CheckoutLink>
                  <p className="payment-note"><ShieldCheck size={14} aria-hidden="true" /> Checkout hébergé Maketou</p>
                  {checkoutReady ? null : (
                    <p className="checkout-pending"><span className="pending-dot" /> Lien de paiement à connecter avant publication</p>
                  )}
                </div>
              </div>
              <p className="offer-disclaimer">Prix : {formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA. Les conditions d’accès aux ressources listées dans le PDF sont celles de leurs hébergeurs.</p>
            </Reveal>
          </div>
        </section>

        <section className="section section-faq" id="faq">
          <div className="site-container faq-layout">
            <Reveal className="faq-intro">
              <p className="section-kicker"><span>07</span> BON À SAVOIR</p>
              <h2>Les réponses,<br /><span className="gradient-text">sans détour.</span></h2>
              <p>Avant de choisir votre prochaine piste, voici les informations utiles sur le PDF et ses liens.</p>
              <a className="text-link" href="#offre">Voir le prix <ArrowRight size={16} aria-hidden="true" /></a>
            </Reveal>
            <div className="faq-list">
              {faq.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.035}>
                  <details className="faq-item">
                    <summary><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></summary>
                    <p>{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="site-container closing-inner">
            <Reveal>
              <p className="section-kicker">LE DIGITAL MASTER PACK · MONEY MAKERS</p>
              <h2>Plus de {PRODUCT_STATS.formationDisplayCount} pistes à explorer.</h2>
              <p>Choisissez un sujet et avancez à votre rythme.</p>
              <CheckoutLink className="button button-primary" location="closing">
                {CHECKOUT_CTA_LABEL}
              </CheckoutLink>
            </Reveal>
            <div className="closing-mark" aria-hidden="true"><span>M</span><i /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <a className="footer-brand" href="#accueil"><span className="footer-mark">M</span><span>MONEY MAKERS<small>DIGITAL MASTER PACK</small></span></a>
          <p>
            Un PDF de liens vers des ressources. Leur disponibilité relève de leurs hébergeurs.
            Contact : <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <a className="footer-top" href="#accueil">Retour en haut <ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
