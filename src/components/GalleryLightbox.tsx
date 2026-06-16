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
          className="relative min-h-[420px] overflow-hidden text-left md:min-h-[720px]"
          onClick={() => setActiveIndex(0)}
          whileHover={{ scale: 0.995 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image className="object-cover transition-transform duration-700 hover:scale-[1.025]" src={images[0]} alt={`${altBase}, immagine principale`} fill priority sizes="(max-width: 980px) 100vw, 64vw" />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-black/45 px-3 py-2 text-[0.46rem] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
            <Icon icon="ph:magnifying-glass-plus" className="text-[0.72rem]" />
            Ingrandisci
          </span>
        </motion.button>
        <div className="grid gap-3">
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
          className="fixed inset-0 z-[110] bg-black/92 p-4 text-white md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <button type="button" className="absolute inset-0" aria-label="Chiudi gallery" onClick={() => setActiveIndex(null)} />
          <motion.div
            className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col"
            initial={{ y: 24, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.985 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-[0.56rem] font-black uppercase tracking-[0.14em] text-white/62">
                {activeIndex! + 1} / {images.length}
              </span>
              <button type="button" className="grid h-11 w-11 place-items-center border border-white/20" onClick={() => setActiveIndex(null)} aria-label="Chiudi">
                <Icon icon="ph:x" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image className="object-contain" src={activeImage} alt={`${altBase}, immagine ingrandita`} fill sizes="100vw" />
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <button type="button" className="btn btn-light" onClick={prev}>
                <Icon icon="ph:arrow-left" />
                Prima
              </button>
              <button type="button" className="btn btn-light" onClick={next}>
                Dopo
                <Icon icon="ph:arrow-right" />
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
