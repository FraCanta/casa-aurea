export default function Loading() {
  return (
    <main
      className="min-h-svh bg-paper px-6 pb-20 pt-36 text-ink md:px-[88px] md:pt-48 fxl:px-[140px]"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="animate-pulse" role="status">
        <div className="h-3 w-24 bg-ink/10" />
        <div className="mt-7 h-14 max-w-3xl bg-ink/10 md:h-24" />
        <div className="mt-5 h-4 max-w-xl bg-ink/10" />
        <div className="mt-3 h-4 max-w-md bg-ink/10" />
        <span className="sr-only">Loading</span>
      </div>
    </main>
  );
}
