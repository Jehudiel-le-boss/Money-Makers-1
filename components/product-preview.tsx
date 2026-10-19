"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PRODUCT_STATS } from "../lib/product-stats";

const previewImages = [
  {
    src: "/media/apercu/01-dossier-mega.png",
    width: 502,
    height: 665,
    alt: "Aperçu d’une liste de dossiers de formation classés par sujet.",
    caption: `Extrait d’un dossier partagé — ${PRODUCT_STATS.megaFormationCount} formations : automatisation, boutique en ligne, programmation et vidéo.`,
  },
  {
    src: "/media/apercu/02-dossier-google-drive.png",
    width: 607,
    height: 640,
    alt: "Aperçu de ressources de formation classées dans un dossier partagé.",
    caption: `Extrait d’un dossier partagé — ${PRODUCT_STATS.driveFormationCount} formations autour de la création, la vidéo et les outils numériques.`,
  },
  {
    src: "/media/apercu/03-liens-directs-27-ressources.png",
    width: 1250,
    height: 1452,
    alt: `Aperçu des ${PRODUCT_STATS.directResourceCount} ressources en téléchargement direct, organisées par sujet.`,
    caption: `Les ${PRODUCT_STATS.directResourceCount} ressources en téléchargement direct — section « Business & croissance ».`,
  },
  ...Array.from({ length: PRODUCT_STATS.pdfPageCount }, (_, index) => ({
    src: `/media/apercu/catalogue-pdf/catalogue-page-${index + 1}.png`,
    width: 909,
    height: 1287,
    alt: `Aperçu de la page ${index + 1} du PDF Digital Master Pack.`,
    caption: `Page ${index + 1} sur ${PRODUCT_STATS.pdfPageCount} du PDF.`,
  })),
];

const galleryImages = previewImages.slice(0, 3);
const pdfImages = previewImages.slice(3);

export function ProductPreview() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [pdfPage, setPdfPage] = useState(0);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((index) =>
          index === null ? null : (index + 1) % previewImages.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((index) =>
          index === null
            ? null
            : (index - 1 + previewImages.length) % previewImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <section className="section section-preview" id="apercu">
        <div className="site-container">
          <div className="section-heading section-heading-centered">
            <p className="section-kicker"><span>02</span> APERÇU DU CONTENU</p>
            <h2>Jetez un œil à <span className="gradient-text">l’intérieur.</span></h2>
            <p className="section-lede">
              Voici de vraies captures des dossiers et du PDF. Cliquez sur une image pour
              l’agrandir.
            </p>
          </div>

          <div className="preview-grid">
            {galleryImages.map((image, index) => (
              <figure className="preview-card" key={image.src}>
                <button
                  className="preview-image-button"
                  type="button"
                  aria-label={`Agrandir l’image : ${image.caption}`}
                  onClick={() => setActiveImage(index)}
                >
                  <span
                    className="preview-image-frame"
                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 380px"
                      className="preview-image"
                    />
                  </span>
                </button>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>

          <p className="preview-note">
            Les liens ouvrent les dossiers des hébergeurs sources. L’accès dépend de leurs
            autorisations.
          </p>

          <div className="pdf-preview">
            <button
              className="pdf-preview-toggle"
              type="button"
              aria-expanded={showPdf}
              aria-controls="pdf-page-carousel"
              onClick={() => setShowPdf((value) => !value)}
            >
              {showPdf ? "Masquer l’aperçu du PDF" : `Feuilleter les ${PRODUCT_STATS.pdfPageCount} pages du PDF`}
              <ChevronRight size={17} aria-hidden="true" />
            </button>

            {showPdf ? (
              <div className="pdf-carousel" id="pdf-page-carousel">
                <button
                  className="carousel-arrow"
                  type="button"
                  aria-label="Page précédente"
                  onClick={() =>
                    setPdfPage((page) => (page - 1 + pdfImages.length) % pdfImages.length)
                  }
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  className="pdf-page-button"
                  type="button"
                  aria-label={`Agrandir la page ${pdfPage + 1}`}
                  onClick={() => setActiveImage(galleryImages.length + pdfPage)}
                >
                  <Image
                    src={pdfImages[pdfPage].src}
                    alt={pdfImages[pdfPage].alt}
                    width={pdfImages[pdfPage].width}
                    height={pdfImages[pdfPage].height}
                    sizes="(max-width: 760px) 72vw, 360px"
                    className="pdf-page-image"
                  />
                </button>
                <button
                  className="carousel-arrow"
                  type="button"
                  aria-label="Page suivante"
                  onClick={() => setPdfPage((page) => (page + 1) % pdfImages.length)}
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
                <p className="pdf-page-caption" aria-live="polite">
                  {pdfImages[pdfPage].caption}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {activeImage !== null ? (
        <div
          className="preview-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi du contenu"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Fermer l’aperçu"
            onClick={() => setActiveImage(null)}
          >
            <X size={23} aria-hidden="true" />
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            aria-label="Image précédente"
            onClick={() =>
              setActiveImage((index) =>
                index === null ? null : (index - 1 + previewImages.length) % previewImages.length,
              )
            }
          >
            <ChevronLeft size={25} aria-hidden="true" />
          </button>
          <figure className="lightbox-figure">
            <Image
              src={previewImages[activeImage].src}
              alt={previewImages[activeImage].alt}
              width={previewImages[activeImage].width}
              height={previewImages[activeImage].height}
              sizes="92vw"
              className="lightbox-image"
              priority
            />
            <figcaption aria-live="polite">
              {previewImages[activeImage].caption}
              <span>{activeImage + 1} / {previewImages.length}</span>
            </figcaption>
          </figure>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Image suivante"
            onClick={() =>
              setActiveImage((index) =>
                index === null ? null : (index + 1) % previewImages.length,
              )
            }
          >
            <ChevronRight size={25} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
