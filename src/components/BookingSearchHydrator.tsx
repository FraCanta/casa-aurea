"use client";

import { useEffect } from "react";
import { useBookingState } from "@/components/BookingState";

export function BookingSearchHydrator({
  selectedSlug,
  checkin,
  checkout,
  guests,
}: {
  selectedSlug: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
}) {
  const {
    setSelectedSlug,
    setCheckin,
    setCheckout,
    setGuests,
  } = useBookingState();

  useEffect(() => {
    setSelectedSlug(selectedSlug);
    if (checkin) setCheckin(checkin);
    if (checkout) setCheckout(checkout);
    if (guests) setGuests(guests);
  }, [
    checkin,
    checkout,
    guests,
    selectedSlug,
    setCheckin,
    setCheckout,
    setGuests,
    setSelectedSlug,
  ]);

  return null;
}
