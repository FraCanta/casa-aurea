# Template case vacanza — Casa Aurea

Template dimostrativo multilingua per case vacanza, ville, appartamenti turistici e piccole strutture ricettive. È costruito con Next.js App Router, TypeScript e Tailwind CSS ed è pensato per essere personalizzato quando viene acquisito un cliente.

## Funzionalità incluse

- homepage editoriale e responsive;
- archivio e pagina dettaglio degli alloggi;
- richiesta disponibilità e checkout dimostrativo;
- stati di disponibilità, indisponibilità e richiesta inviata;
- italiano, inglese e spagnolo con URL localizzati;
- selettore valuta con tassi dimostrativi centralizzati;
- metadata, canonical, hreflang, sitemap e robots multilingua;
- dati strutturati `LodgingBusiness` e `VacationRental`;
- manifest, favicon, Apple icon e immagini social;
- pagine esperienze, territorio, chi siamo, contatti, privacy e cookie;
- stati globali di caricamento, errore e pagina non trovata.

Booking, pagamenti, newsletter, mappe e sincronizzazione iCal sono predisposti a livello di interfaccia, ma non inviano dati e non elaborano pagamenti reali.

## Avvio locale

Requisiti: Node.js 20.9 o successivo.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`. La home italiana è `/it`; sono disponibili anche `/en` e `/es`.

## Comandi

```bash
npm run dev
npm run lint
npm run type-check
npm run build
npm run start
npm run optimize:images
```

Per convertire PNG e JPEG presenti in `public/images` e rimuovere gli originali:

```bash
npm run optimize:images -- --replace
```

Dopo la conversione, aggiornare le estensioni nei dati o nei componenti che usano le immagini.

## Personalizzazione per un cliente

### Identità e dominio

Modificare `src/lib/site.ts` per:

- nome struttura e ragione sociale;
- località, indirizzo e coordinate;
- telefono, email, CIN, CIR e partita IVA;
- social e booking engine esterno;
- funzionalità dimostrative abilitate.

Impostare il dominio pubblico in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://www.dominio-cliente.it
```

Lo stesso valore alimenta metadata, canonical, sitemap, robots e dati strutturati.

### Alloggi

Gli alloggi si gestiscono in `src/data/accommodations.ts`. Ogni elemento contiene testi base, prezzi, capienza, gallery, servizi, regole, coordinate e configurazione futura del calendario esterno.

Le traduzioni degli alloggi sono nei file:

```text
locales/it/alloggi.json
locales/en/alloggi.json
locales/es/alloggi.json
```

Quando si aggiunge un alloggio, usare lo stesso `slug` nei dati e nelle chiavi di traduzione.

### Testi e lingue

I dizionari sono divisi per lingua e area:

```text
locales/{lingua}/common.json
locales/{lingua}/home.json
locales/{lingua}/alloggi.json
locales/{lingua}/checkout.json
locales/{lingua}/pages.json
```

Le lingue supportate e quella predefinita si configurano in `src/i18n/routing.ts`. Per aggiungere una lingua occorre creare i relativi JSON, registrarla in `locales` e aggiungerla a `src/i18n/dictionaries.ts`.

### Colori e tipografia

Le variabili tipografiche e gli stili globali si trovano in `src/app/globals.css`; i token Tailwind e le estensioni di tema sono in `tailwind.config.js`.

### Immagini e icone

- fotografie: `public/images`;
- immagine social: `public/opengraph-image.jpg`;
- favicon e manifest: `src/app`;
- icone PWA: `public/web-app-manifest-*.png`.

Aggiornare anche `src/app/manifest.json` con nome, colori e `start_url` definitivi.

## Integrazioni future

I punti da collegare in base alle esigenze del cliente sono:

- invio form tramite Server Action, API, CRM o servizio email;
- importazione calendari iCal Airbnb/Booking;
- booking engine esterno;
- Stripe o altro gateway per deposito/pagamento;
- provider reale per i tassi di cambio;
- newsletter, analytics, mappe e piattaforma di consenso cookie.

Finché queste integrazioni non vengono configurate, mantenere attiva la modalità demo e non presentare il checkout come pagamento reale.

## Controlli prima della pubblicazione

1. Sostituire tutti i dati dimostrativi e il dominio.
2. Verificare traduzioni, prezzi, CIN/CIR e testi legali.
3. Controllare `/robots.txt`, `/sitemap.xml` e le anteprime social.
4. Testare form, email, booking e pagamenti reali.
5. Eseguire `npm run lint`, `npm run type-check` e `npm run build`.
6. Verificare mobile, tastiera, focus, contrasto e cookie consent.

## Deploy

Il progetto può essere pubblicato su Vercel collegando il repository Git. Configurare `NEXT_PUBLIC_SITE_URL` nell’ambiente Production prima del deploy definitivo.
