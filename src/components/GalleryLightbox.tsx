"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function GalleryLightbox({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  function next() {
    setActiveIndex((value) => (value === null ? 0 : (value + 1) % images.length));
  }

  function prev() {
    setActiveIndex((value) => (value === null ? 0 : (value - 1 + images.length) % images.length));
  }

  return (
    <>
      <motion.div
        className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]"
        aria-label={`Gallery ${altBase}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          type="button"
          className="relative min-h-[56svh] overflow-hidden text-left md:min-h-[720px]"
          onClick={() => setActiveIndex(0)}
          whileHover={{ scale: 0.995 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image className="object-cover transition-transform duration-700 hover:scale-[1.025]" src={images[0]} alt={`${altBase}, immagine principale`} fill priority sizes="(max-width: 980px) 100vw, 64vw" />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-paper/92 px-3 py-2 text-[0.55rem] font-black uppercase tracking-[0.1em] text-ink shadow-xl backdrop-blur md:text-[0.55rem]">
            <Icon icon="ph:squares-four" className="text-[0.82rem]" />
            Mostra tutte le foto
          </span>
        </motion.button>
        <div className="hidden gap-3 md:grid">
          {images.slice(1, 3).map((image, index) => (
            <motion.button
              type="button"
              className="relative min-h-[260px] overflow-hidden text-left md:min-h-0"
              key={image}
              onClick={() => setActiveIndex(index + 1)}
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image className="object-cover transition-transform duration-700 hover:scale-[1.035]" src={image} alt={`${altBase}, dettaglio fotografico ${index + 1}`} fill sizes="(max-width: 980px) 100vw, 30vw" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeImage && (
        <motion.div
          className="fixed inset-0 z-[110] bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <button type="button" className="absolute inset-0" aria-label="Chiudi gallery" onClick={() => setActiveIndex(null)} />
          <motion.div
            className="relative z-10 flex h-dvh flex-col"
            initial={{ y: 24, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.985 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-4 md:p-6">
              <span className="text-sm text-white/60 md:text-base">
                {activeIndex! + 1} / {images.length}
              </span>
              <button type="button" className="pointer-events-auto grid h-10 w-10 place-items-center text-white/70 transition hover:text-white md:h-12 md:w-12" onClick={() => setActiveIndex(null)} aria-label="Chiudi">
                <Icon icon="ph:x" className="text-2xl md:text-3xl" />
              </button>
            </div>

            <button
              type="button"
              className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center text-white/60 transition hover:text-white md:left-8 md:grid md:h-14 md:w-14"
              onClick={prev}
              aria-label="Foto precedente"
            >
              <Icon icon="ph:arrow-left" className="text-2xl md:text-3xl" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center text-white/60 transition hover:text-white md:right-8 md:grid md:h-14 md:w-14"
              onClick={next}
              aria-label="Foto successiva"
            >
              <Icon icon="ph:arrow-right" className="text-2xl md:text-3xl" />
            </button>

            <motion.div
              key={activeImage}
              className="relative min-h-0 flex-1 cursor-grab touch-pan-y select-none px-4 pb-[112px] pt-14 active:cursor-grabbing md:px-24 md:pb-[126px] md:pt-16"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) next();
                if (info.offset.x > 70) prev();
              }}
            >
              <div className="relative h-full">
                <Image className="object-contain" src={activeImage} alt={`${altBase}, immagine ingrandita`} fill sizes="100vw" priority />
              </div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-20 bg-black/82 px-2 pb-3 pt-2 backdrop-blur md:px-4 md:pb-4">
              <p className="mb-2 text-center text-xs text-white/80 md:text-sm">
                {altBase}
              </p>
              <div className="flex justify-center gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden border transition md:h-18 md:w-28 ${
                      activeIndex === index
                        ? "border-white"
                        : "border-transparent opacity-62 hover:opacity-100"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Apri foto ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${altBase}, anteprima ${index + 1}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
