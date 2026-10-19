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
import { Reveal } from "../components/reveal";
import { getHttpsUrl } from "../lib/site";

const topics = [
  {
    number: "01",
    title: "IA & automatisation",
    text: "Explorez l’intelligence artificielle et les workflows pour mieux comprendre les outils qui évoluent vite.",
    Icon: BrainCircuit,
  },
  {
    number: "02",
    title: "Business & marketing",
    text: "Parcourez des sujets liés au marketing digital, au contenu, à l’e-commerce et à l’entrepreneuriat.",
    Icon: Briefcase,
  },
  {
    number: "03",
    title: "Création & vidéo",
    text: "Découvrez des ressources autour du montage, de la création de contenu et des formats sociaux.",
    Icon: Clapperboard,
  },
  {
    number: "04",
    title: "Outils & compétences",
    text: "Choisissez un sujet pratique : outils numériques, compétences web, productivité ou développement.",
    Icon: Layers,
  },
];

const steps = [
  { number: "01", title: "Choisir un sujet", text: "Partez d’une question ou d’une compétence qui vous intéresse." },
  { number: "02", title: "Ouvrir la ressource", text: "Suivez les liens indiqués dans le catalogue vers leur source." },
  { number: "03", title: "Apprendre & pratiquer", text: "Avancez à votre rythme, une piste à la fois." },
  { number: "04", title: "Évaluer la suite", text: "Décidez vous-même quoi approfondir ou appliquer." },
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
    question: "Qu’est-ce que le Digital Master Pack ?",
    answer:
      "C’est un PDF catalogue qui rassemble des pistes de formation et des liens vers des ressources autour de l’IA, du business, du marketing, de la création et des outils numériques.",
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
    answer:
      "Le Digital Master Pack est proposé à 5 000 FCFA. Le paiement s’effectue sur la page de paiement hébergée par Maketou.",
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
                Apprenez.<br />
                Testez.<br />
                <span className="gradient-text">Construisez votre prochain projet.</span>
              </h1>
              <p className="hero-intro">
                Un PDF catalogue pour explorer des ressources en IA, marketing, création,
                e-commerce et outils numériques. Choisissez une piste et avancez à votre rythme.
              </p>
              <div className="hero-actions">
                <CheckoutLink className="button button-primary" location="hero">
                  Obtenir le PDF
                </CheckoutLink>
                <a className="button button-quiet" href="#contenu">
                  Découvrir le contenu <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-facts" aria-label="À savoir sur le produit">
                <span><FileText size={15} aria-hidden="true" /> PDF catalogue</span>
                <span><Layers size={15} aria-hidden="true" /> 4 pages</span>
                <span><ShieldCheck size={15} aria-hidden="true" /> Sans promesse de revenu</span>
              </div>
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

        <section className="section section-content" id="contenu">
          <div className="site-container">
            <Reveal className="section-heading section-heading-split">
              <div>
                <p className="section-kicker"><span>01</span> LE CONTENU, SANS FLOU</p>
                <h2>Des pistes à explorer.<br /><span className="gradient-text">Le choix reste le vôtre.</span></h2>
              </div>
              <p className="section-lede">
                Le pack rassemble un catalogue de ressources et vous aide à choisir un premier
                sujet. Pas besoin de tout suivre d’un coup : commencez par ce qui vous parle.
              </p>
            </Reveal>

            <div className="topic-grid">
              {topics.map(({ number, title, text, Icon }, index) => (
                <Reveal key={number} delay={index * 0.07} className="topic-card-wrap">
                  <article className="topic-card">
                    <div className="topic-card-top"><span>{number} / 04</span><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="topic-line" aria-hidden="true" />
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="catalogue-strip">
              <div className="catalogue-art">
                <Image
                  src="/media/hero-landscape.webp"
                  alt="Visuel horizontal Digital Master Pack — Money Makers"
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="catalogue-image"
                />
                <span className="art-corner-label">DIGITAL MASTER PACK <span>·</span> MONEY MAKERS</span>
              </div>
              <div className="catalogue-copy">
                <p className="section-kicker"><span>LE GUIDE</span> PDF · 4 PAGES</p>
                <h3>Un point d’entrée unique<br />vers des ressources variées.</h3>
                <p>
                  Le document répertorie des formations, des ressources complémentaires et des
                  téléchargements liés au numérique. Les liens ouvrent leurs hébergeurs sources.
                </p>
                <ul className="catalogue-list">
                  <li><Check size={16} aria-hidden="true" /> Des sujets classés par grandes pistes</li>
                  <li><Check size={16} aria-hidden="true" /> Des ressources partagées et des liens directs</li>
                  <li><Check size={16} aria-hidden="true" /> Un parcours simple pour choisir quoi explorer</li>
                </ul>
                <a className="text-link" href="#methode">Voir comment l’utiliser <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-method" id="methode">
          <div className="method-glow" aria-hidden="true" />
          <div className="site-container method-layout">
            <Reveal className="method-intro">
              <p className="section-kicker"><span>02</span> UN DÉMARRAGE SIMPLE</p>
              <h2>De la curiosité<br />à <span className="gradient-text">la pratique.</span></h2>
              <p>
                Le guide propose une séquence claire : choisir un sujet, ouvrir sa ressource,
                apprendre, puis décider de la suite.
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
              <p className="section-kicker"><span>03</span> L’ESPRIT MONEY MAKERS</p>
              <h2>Apprendre sans<br /><span className="gradient-text">promesse magique.</span></h2>
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
              <p className="section-kicker"><span>04</span> VOTRE PROCHAIN PAS</p>
              <h2>Commencez par<br /><span className="gradient-text">une seule piste.</span></h2>
              <p>Le Digital Master Pack : un PDF pour découvrir, choisir et explorer à votre rythme.</p>
            </Reveal>

            <Reveal className="offer-card-wrap">
              <div className="offer-card">
                <div className="offer-product">
                  <div className="offer-product-icon"><BookOpen size={24} aria-hidden="true" /></div>
                  <p className="offer-overline">MONEY MAKERS PRÉSENTE</p>
                  <h3>Digital<br /><span>Master Pack</span></h3>
                  <p className="offer-description">Un catalogue numérique pour apprendre, créer et développer vos compétences.</p>
                  <div className="offer-includes">
                    <span><Check size={15} aria-hidden="true" /> PDF catalogue de 4 pages</span>
                    <span><Check size={15} aria-hidden="true" /> Thèmes numériques variés</span>
                    <span><Check size={15} aria-hidden="true" /> Liens et pistes à explorer</span>
                  </div>
                </div>
                <div className="offer-checkout">
                  <p className="price-label">PRIX</p>
                  <div className="price-value">5 000<span className="price-currency">FCFA</span></div>
                  <p className="price-unit">PDF numérique <span>·</span> prix en FCFA</p>
                  <CheckoutLink className="button button-primary button-full" location="offre">
                    Acheter le pack
                  </CheckoutLink>
                  <p className="payment-note"><ShieldCheck size={14} aria-hidden="true" /> Checkout hébergé Maketou</p>
                  {checkoutReady ? null : (
                    <p className="checkout-pending"><span className="pending-dot" /> Lien de paiement à connecter avant publication</p>
                  )}
                </div>
              </div>
              <p className="offer-disclaimer">Prix : 5 000 FCFA. Les conditions d’accès aux ressources listées dans le PDF sont celles de leurs hébergeurs.</p>
            </Reveal>
          </div>
        </section>

        <section className="section section-faq" id="faq">
          <div className="site-container faq-layout">
            <Reveal className="faq-intro">
              <p className="section-kicker"><span>05</span> BON À SAVOIR</p>
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
              <h2>Une piste. Puis la suivante.</h2>
              <p>Apprenez. Testez. Construisez votre prochain projet.</p>
              <CheckoutLink className="button button-primary" location="closing">
                Découvrir le pack
              </CheckoutLink>
            </Reveal>
            <div className="closing-mark" aria-hidden="true"><span>M</span><i /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <a className="footer-brand" href="#accueil"><span className="footer-mark">M</span><span>MONEY MAKERS<small>DIGITAL MASTER PACK</small></span></a>
          <p>Un catalogue de ressources numériques. Aucun revenu ou résultat n’est garanti.</p>
          <a className="footer-top" href="#accueil">Retour en haut <ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
