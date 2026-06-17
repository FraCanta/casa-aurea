"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  type AlloggiMessageKey,
  useLocaleCurrency,
} from "@/components/LocaleCurrencyProvider";

export function GalleryLightbox({
  images,
  altBase,
  translationPrefix,
}: {
  images: string[];
  altBase: string;
  translationPrefix: string;
}) {
  const { t } = useLocaleCurrency();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const captions = images.map((_, index) =>
    t(
      "alloggi",
      `${translationPrefix}.gallery.${index}` as AlloggiMessageKey,
    ),
  );

  function next() {
    setActiveIndex((value) =>
      value === null ? 0 : (value + 1) % images.length,
    );
  }

  function prev() {
    setActiveIndex((value) =>
      value === null ? 0 : (value - 1 + images.length) % images.length,
    );
  }

  return (
    <>
      <motion.div
        className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]"
        aria-label={`${t("common", "photoGallery")}: ${altBase}`}
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
          <Image
            className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            src={images[0]}
            alt={captions[0]}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 64vw"
          />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-paper/92 px-3 py-2 text-[0.55rem] font-black uppercase tracking-[0.1em] text-ink shadow-xl backdrop-blur md:text-[0.55rem]">
            <Icon icon="ph:squares-four" className="text-[0.82rem]" />
            {t("common", "showAllPhotos")}
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
              <Image
                className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                src={image}
                alt={captions[index + 1]}
                fill
                sizes="(max-width: 980px) 100vw, 30vw"
              />
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
            <button
              type="button"
              className="absolute inset-0"
              aria-label={t("common", "closeGallery")}
              onClick={() => setActiveIndex(null)}
            />
            <motion.div
              className="relative z-10 flex flex-col h-dvh"
              initial={{ y: 24, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.985 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-4 pointer-events-none md:p-6">
                <span className="text-sm text-white/60 md:text-base">
                  {activeIndex! + 1} / {images.length}
                </span>
                <button
                  type="button"
                  className="grid w-10 h-10 transition pointer-events-auto place-items-center text-white/70 hover:text-white md:h-12 md:w-12"
                  onClick={() => setActiveIndex(null)}
                  aria-label={t("common", "close")}
                >
                  <Icon icon="ph:x" className="text-2xl md:text-3xl" />
                </button>
              </div>

              <button
                type="button"
                className="absolute z-20 hidden transition -translate-y-1/2 left-3 top-1/2 h-11 w-11 place-items-center text-white/60 hover:text-white md:left-8 md:grid md:h-14 md:w-14"
                onClick={prev}
                aria-label={t("common", "previousPhoto")}
              >
                <Icon icon="ph:arrow-left" className="text-2xl md:text-3xl" />
              </button>
              <button
                type="button"
                className="absolute z-20 hidden transition -translate-y-1/2 right-3 top-1/2 h-11 w-11 place-items-center text-white/60 hover:text-white md:right-8 md:grid md:h-14 md:w-14"
                onClick={next}
                aria-label={t("common", "nextPhoto")}
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
                  <Image
                    className="object-contain"
                    src={activeImage}
                    alt={captions[activeIndex!]}
                    fill
                    sizes="100vw"
                    priority
                  />
                </div>
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 z-20 px-2 pt-2 pb-3 bg-black/82 backdrop-blur md:px-4 md:pb-4">
                <p className="mb-2 text-xs text-center text-white/80 md:text-sm">
                  {captions[activeIndex!]}
                </p>
                <div className="flex justify-center gap-2 pb-1 overflow-x-auto">
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
                      aria-label={`${t("common", "openPhoto")} ${index + 1}: ${captions[index]}`}
                    >
                      <Image
                        src={image}
                        alt={`${t("common", "thumbnail")} ${index + 1}: ${captions[index]}`}
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
