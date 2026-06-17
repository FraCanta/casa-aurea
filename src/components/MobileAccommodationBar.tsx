"use client";

import { Icon } from "@iconify/react";
import { BookingDrawer } from "@/components/BookingDrawer";
import type { Accommodation } from "@/data/accommodations";

export function MobileAccommodationBar({
  accommodation,
  accommodations,
}: {
  accommodation: Accommodation;
  accommodations: Accommodation[];
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-ink/10 bg-paper/95 px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(24,35,31,0.14)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-baseline gap-1 font-serif text-[1.35rem] leading-none text-ink">
            € {accommodation.priceFrom}
            <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
              / notte
            </span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-olive">
            <Icon icon="ph:calendar-check" className="text-[0.85rem]" />
            A partire da
          </p>
        </div>
        <BookingDrawer
          accommodations={accommodations}
          selectedSlug={accommodation.slug}
          trigger={<span className="btn btn-primary shrink-0">Seleziona date</span>}
        />
      </div>
    </div>
  );
}
