"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type BookingState = {
  selectedSlug: string;
  checkin: string;
  checkout: string;
  guests: string;
  setSelectedSlug: (value: string) => void;
  setCheckin: (value: string) => void;
  setCheckout: (value: string) => void;
  setGuests: (value: string) => void;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");

  const value = useMemo(
    () => ({
      selectedSlug,
      checkin,
      checkout,
      guests,
      setSelectedSlug,
      setCheckin,
      setCheckout,
      setGuests,
      resetBooking: () => {
        setSelectedSlug("");
        setCheckin("");
        setCheckout("");
        setGuests("2");
      },
    }),
    [checkin, checkout, guests, selectedSlug],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBookingState() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookingState must be used inside BookingProvider");
  }

  return context;
}
