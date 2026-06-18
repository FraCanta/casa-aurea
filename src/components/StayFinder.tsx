"use client";

import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";

const steps = ["01", "02", "03", "04", "05"];

const guestOptions = ["1", "2", "3", "4", "5+"];
const experienceOptions = ["mare", "centro-storico", "relax", "food", "natura"];
const viewOptions = ["mare", "giardino", "centro", "campagna"];
const experienceLabelKeys = {
  mare: "optionSea",
  "centro-storico": "optionOldTown",
  relax: "optionRelax",
  food: "optionFood",
  natura: "optionNature",
} as const;
const viewLabelKeys = {
  mare: "optionSea",
  giardino: "optionGarden",
  centro: "optionCenter",
  campagna: "optionCountryside",
} as const;

export function StayFinder({
  accommodations,
}: {
  accommodations: Accommodation[];
}) {
  const { t } = useLocaleCurrency();
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState("2");
  const [experience, setExperience] = useState("relax");
  const [view, setView] = useState("mare");
  const [pool, setPool] = useState(false);
  const [pets, setPets] = useState(false);

  const result = useMemo(() => {
    return accommodations
      .map((item) => {
        let score = 0;
        const requestedGuests = guests === "5+" ? 5 : Number(guests);
        if (item.guests >= requestedGuests) score += 2;
        if (item.matchProfile.experiences.includes(experience as never))
          score += 3;
        if (item.matchProfile.view === view) score += 2;
        if (!pool || item.matchProfile.hasPool) score += 1;
        if (!pets || item.matchProfile.petsAllowed) score += 1;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score)[0]?.item;
  }, [accommodations, experience, guests, pets, pool, view]);

  function nextStep() {
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((value) => Math.max(value - 1, 0));
  }

  return (
    <section
      className="grid bg-[#243327] text-white lg:grid-cols-[0.8fr_1.2fr]"
      id="trova-soggiorno"
    >
      <div className="bg-[linear-gradient(90deg,rgba(0,0,0,0.24),transparent)] px-6 py-16 md:px-[88px] md:py-24 fxl:px-[140px] fxl:py-32">
        <p className="mb-4 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#a49a70]">
          {t("pages", "finderEyebrow")}
        </p>
        <h2 className="font-serif text-4xl font-medium 2xl:text-5xl fxl:text-6xl">
          {t("pages", "finderTitle")}
        </h2>
        <p className="mt-6  text-[0.98rem] leading-[1.75] text-white/70">
          {t("pages", "finderText")}
        </p>
      </div>
      <div className="px-6 py-16 md:px-[88px] md:py-24 fxl:px-[110px] fxl:py-32">
        <div className="mb-12 grid grid-cols-5 gap-4">
          {steps.map((item, index) => (
            <span
              className={`border-t pt-3 text-[0.58rem] ${index === step ? "border-white text-white" : "border-white/25 text-white/45"}`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        {step === 0 && (
          <>
            <h3 className="font-serif text-3xl font-normal">
              {t("pages", "finderGuestsQuestion")}
            </h3>
            <div className="mt-7 grid grid-cols-5 gap-3">
              {guestOptions.map((value) => (
                <button
                  type="button"
                  className={`btn btn-light !text-[0.8rem] min-h-11 px-3 ${value === guests ? "bg-[#91865a] text-white" : "bg-transparent"}`}
                  onClick={() => setGuests(value)}
                  key={value}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="font-serif text-3xl font-normal">
              {t("pages", "finderExperienceQuestion")}
            </h3>
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
              {experienceOptions.map((value) => (
                <button
                  type="button"
                  className={`btn btn-light !text-[0.8rem] min-h-11 px-3 ${value === experience ? "bg-[#91865a] text-white" : "bg-transparent"}`}
                  onClick={() => setExperience(value)}
                  key={value}
                >
                  {t("pages", experienceLabelKeys[value as keyof typeof experienceLabelKeys])}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-serif text-3xl font-normal">
              {t("pages", "finderViewQuestion")}
            </h3>
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {viewOptions.map((value) => (
                <button
                  type="button"
                  className={`btn btn-light !text-[0.8rem] min-h-11 px-3 ${value === view ? "bg-[#91865a] text-white" : "bg-transparent"}`}
                  onClick={() => setView(value)}
                  key={value}
                >
                  {t("pages", viewLabelKeys[value as keyof typeof viewLabelKeys])}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="font-serif text-3xl font-normal">
              {t("pages", "finderDetailsQuestion")}
            </h3>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                className={`btn btn-light !text-[0.8rem] min-h-11 px-3 ${pool ? "bg-[#91865a] text-white" : "bg-transparent"}`}
                onClick={() => setPool((value) => !value)}
              >
                {t("pages", "finderPool")}
              </button>
              <button
                type="button"
                className={`btn btn-light !text-[0.8rem] min-h-11 px-3 ${pets ? "bg-[#91865a] text-white" : "bg-transparent"}`}
                onClick={() => setPets((value) => !value)}
              >
                {t("pages", "finderPets")}
              </button>
            </div>
          </>
        )}

        {step === 4 && result && (
          <div className="border border-white/20 p-8">
            <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#a49a70]">
              {t("pages", "finderResult")}
            </span>
            <h3 className="mt-4 font-serif text-4xl font-normal">
              {result.name}
            </h3>
            <p className="mt-4 text-white/70">
              {t("alloggi", `${result.slug}.claim` as never)}
            </p>
            <LocalizedLink
              className="btn btn-link mt-6 text-white"
              href={`/alloggi/${result.slug}`}
            >
              {t("pages", "finderDiscover")} <Icon icon="ph:arrow-right" />
            </LocalizedLink>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button
            className="btn btn-light !text-[0.8rem] disabled:opacity-35"
            type="button"
            onClick={prevStep}
            disabled={step === 0}
          >
            {t("pages", "finderBack")}
          </button>
          <button
            type="button"
            className="btn btn-accent !text-[0.8rem] disabled:opacity-35"
            onClick={nextStep}
            disabled={step === steps.length - 1}
          >
            {t("pages", "finderNext")} <Icon icon="ph:arrow-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
