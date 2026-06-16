import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="bg-paper px-6 pb-20 pt-36 text-ink md:px-[88px] md:pb-28 md:pt-48 fxl:px-[140px]">
        <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">404</p>
        <h1 className="max-w-[900px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em]">
          Pagina non trovata.
        </h1>
        <p className="mt-6 max-w-[620px] text-base leading-7 text-muted">
          L'alloggio o la pagina richiesta non esiste in questo template.
        </p>
        <Link className="btn btn-primary mt-8" href="/">
          Torna alla home
        </Link>
      </section>
    </main>
  );
}
