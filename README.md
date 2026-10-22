# FASON — Creative Hair Studio

Site editorial responsive construit cu Next.js App Router, React, TypeScript și Tailwind CSS. Fotografiile sunt locale; fonturile Manrope și Cormorant Garamond sunt găzduite în proiect.

Fotografiile responsive din hero sunt WebP-uri pregătite înainte de publicare, la calitatea 85, în `public/images/hero`. Browserul alege dimensiunea potrivită din `picture`; prima vizită nu declanșează o conversie de imagine pe server. Aceeași variantă este reutilizată de Three.js. Fonturile păstrează fișierele originale Fontsource, cu subseturile Latin și Latin Extended pentru diacritice, iar cele trei variante Latin folosite în hero sunt preîncărcate. Fișierele au hash în nume și cache de un an. Licențele OFL sunt incluse în `public/fonts`.

Pentru regenerarea imaginilor și fonturilor după schimbarea surselor: `npm run assets:prepare`. Scriptul folosește Sharp instalat cu Next.js și actualizează `src/lib/visual-assets.json` și `src/app/fonts.css`. Fișierele generate sunt incluse în proiect, fără procesare suplimentară la build. Meniul mobil și galeria foto se încarcă la cerere; pointerul sau focusul pregătesc codul înainte de click.

## Direcție vizuală

Hero-ul și harta vectorială păstrează compoziția. Serviciile sunt un meniu tipografic împărțit în două familii: formă/finisaj și culoare/îngrijire. De la 1024 px sunt două coloane; pe telefon și tabletă fiecare serviciu are propriul rând, cu tariful alături de titlu și descrierea dedesubt. Rândurile de pe desktop au înălțime minimă comună. Secțiunea de programări este o bandă în nuanța sand, cu telefonul și WhatsApp în același loc. `Team` afișează o colecție de portrete: o coloană pe telefon și trei de la 768 px. Fiecare `TeamMemberCard` prezintă numele, rolul și specializarea. `About` este o secțiune separată după echipă, cu ancora `#despre`.

Tarifele și membrii echipei se editează în `src/lib/salon.ts`. Prețul unui serviciu poate fi fix, de pornire sau `null`; `formatServicePrice` păstrează diferența și formatarea românească. Cele șase tarife și profilurile Mara Ionescu/Andrei Matei sunt exemple cerute pentru prezentarea designului. Tarifele sunt marcate vizibil ca demonstrative; profilurile păstrează marcajul `demonstrative` în date. Pentru datele reale, înlocuiește valorile și portretele, dezactivează `pricesAreDemonstrative` și elimină marcajul `demonstrative` de pe membrii confirmați. Contactele rămân `null` până la confirmare. Portretele fictive sunt generate cu imagegen, păstrate în `public/images/team-*-demo.webp` la aproximativ 45 KB fiecare; proveniența este în `docs/assets/team-demo.json`.

Paleta comună folosește crem (#f5f2eb), maro închis (#211d1b), șampanie neutră (#cdbfa7) pe suprafețe închise și un accent brun-bej (#75664f) pe crem. Etichetele secțiunilor folosesc text Manrope de 0.8125rem, fără chenar sau simbol separat. Inițiala are greutate 600 și culoarea accentului; pe fundal închis folosește șampania. Textul păstrează scrierea firească, fără italic, slash sau numerotări. Titlurile păstrează scara Manrope și italicul Cormorant. Între etichetă și titlu sunt 24 px la dimensiunea implicită a textului; introducerile de la servicii, portofoliu și echipă lasă 40 px până la grilă sau fotografie pe mobil și 56 px de la 768 px. Etichetele sunt blocuri, astfel încât spațiul dintre ele și titlu nu include golul unei linii de text suplimentare. Cele șase servicii rămân permanent vizibile, cu titluri, descrieri și săgeți uniforme. Când există un număr WhatsApp confirmat, fiecare serviciu deschide o conversație cu serviciul inclus în mesaj; altfel duce la secțiunea de programări prin contact direct.

Titlul hero-ului folosește șampania mată uniformă (#cdbfa7). Gradientul de contrast al navigației aparține fotografiei și se deplasează odată cu ea. Intrarea literelor păstrează mișcarea în cascadă și este executată în CSS, cu pauză cât timp un dialog este deschis și respectarea mișcării reduse. `ActionButton` și `ActionLink` definesc cele două tipuri de acțiuni ale site-ului: buton compact plin și link cu săgeată integrată. Hero-ul și meniul mobil duc spre secțiunea de programări prin telefon și WhatsApp, imediat după servicii; acțiunile secundare păstrează aceleași dimensiuni și aceeași mișcare discretă a săgeții.

Portofoliul are patru fotografii statice pe fundal închis. Desktopul folosește două coloane egale și imagini cu înălțime comună, pentru o prezentare de colecție. Titlul are o scară mai amplă, iar legendele rămân aliniate sub fotografie. Pe mobil, fotografiile ocupă toată lățimea conținutului și sunt așezate consecutiv. Grila rămâne statică, iar apăsarea unei fotografii deschide componenta `PortfolioGallery` pe tot ecranul.

Împachetarea textului folosește `text-wrap: pretty` pentru paragrafele din conținut, footer și dialoguri, respectiv `balance` pentru titlurile de sub hero. Ultimele două cuvinte din povestea salonului formează un grup care poate reintra în flux la text mărit; fiecare cuvânt își păstrează animația proprie. Pe telefoanele înguste, tariful poate coborî pe rândul următor, pentru ca titlul serviciului să aibă loc. Compoziția și tipografia hero-ului sunt exceptate de la aceste reguli.

Galeria afișează fotografia direct la dimensiunea completă, cu o estompare de 240 ms la deschidere și 180 ms la închidere. Dimensiunile și poziția imaginii rămân fixe pe durata intrării și ieșirii; nu este creată o copie animată a miniaturii. Schimbarea lucrărilor combină estompare, deplasare discretă și actualizarea legendei. Săgețile, tastele stânga/dreapta, selecția directă și swipe-ul orizontal folosesc aceeași navigare circulară. Apăsările rapide se grupează către ultima selecție cerută. Escape, butonul X și apăsarea fundalului închid galeria, inclusiv în timpul intrării. Focusul rămâne în dialog și revine la fotografie; poziția și scrollul paginii sunt păstrate până la terminarea închiderii. Preferința de mișcare redusă este respectată inclusiv dacă se schimbă în timpul vizitei.

Animațiile păstrează compoziția finală. Titlurile intră cuvânt cu cuvânt prin măști. Fotografiile apar întregi, cu o unduire discretă inspirată de hero și o apropiere de maximum 3,5%. Fiecare `PhotoReveal` are un filtru SVG propriu: zgomotul fractal deplasează ușor pixelii și se stinge treptat, fără copii ale fotografiei sau contexte WebGL suplimentare. Perechea de pe desktop are un decalaj de 120 ms. Intensitatea este redusă de la 32 la 22 pe telefon. Animația are loc o singură dată, timp de 1,2 secunde pe desktop și o secundă pe mobil; apoi filtrul și transformările sunt eliminate complet. Nu există reacție la pointer, click sau atingere. Deschiderea unui dialog suspendă unduirile active și le reia după închidere. Legendele apar separat după 300 ms. Serviciile apar într-o succesiune scurtă. Portofoliul ocupă o bandă închisă continuă pe toată lățimea. Textul „Despre” se colorează treptat, cuvânt cu cuvânt, păstrând lizibilitatea pe parcurs. Hero-ul și harta păstrează comportamentul existent.

Contactul direct și footerul formează un singur final pe fundal închis. Fotografia de lucru de lângă „Ne vedem în oglindă” este extrasă din al patrulea cadru al `public/images/craft.jpg`, cu fundal transparent și conversie WebP fără pierderi. Assetul final este `public/images/styling-cutout-matte.webp`, cu reflexiile de pe piele reduse discret pentru un finisaj mai natural. Fundalul și retușul au fost realizate cu instrumentul integrat imagegen; prompturile complete și proveniența sunt în [fișierul assetului](docs/assets/styling-cutout.json). Portretul argintiu nu mai este folosit în secțiunea de servicii.

Decupajul de la contact este servit direct din WebP-ul fără pierderi (`Image unoptimized`, aproximativ 980 KB), cu încărcare lazy. Astfel evită recomprimarea implicită la calitatea 75, care estompa pielea și părul. Dimensiunile și încadrarea rămân definite de container.

Sub 768 px, fotografia de la contact este ascunsă, astfel încât să nu cadă sub text. De la 768 px apare alături de text în grila cu două coloane.

`PhotoReveal` și `RevealWords` păstrează conținutul vizibil fără animații. `MotionProvider` încarcă `motion-controller.ts` după prima afișare a conținutului; `scrollScenes.ts` este inițializat în contextul GSAP al controllerului. Mișcarea redusă dezactivează scenele și le elimină stilurile, inclusiv când preferința se schimbă în timpul vizitei. Focusul de la tastatură încheie imediat dezvăluirea unui control, inclusiv dacă acel control era deja focalizat când s-a încărcat controllerul.

Locația prezintă harta pe toată lățimea, cu adresa și acțiunile compacte dedesubt. Fotografia de arhivă și harta interactivă se deschid la cerere. Linkul către recenzii rămâne disponibil fără cheie API; când Places API furnizează date, recenziile reale se deschid într-un dialog.

Reperul hărții folosește același logo SVG ca navigarea, la proporția originală de 122 × 25 px, centrat deasupra punctului. Sub 640 px, desenul cartografic este mărit cu 35% în jurul centrului; reperul și logo-ul își păstrează dimensiunile și coordonatele.

Nu există steluțe decorative, numerotări de secțiuni sau servicii și contacte inventate. Logo-urile folosesc vectorul original. Secțiunea echipei folosește portretul Cristinei în cămașă albă, pe fundal închis, din biblioteca proiectului: public/images/cristina.jpg.

Repere de integrare fotografică studiate: [ALICE Hair & Art pe Awwwards](https://www.awwwards.com/sites/alice-hair-art), [Ronas desktop pe Dribbble](https://dribbble.com/shots/24559400-Hair-Salon-Website) și [Ronas mobil](https://dribbble.com/shots/24817104-Hair-Salon-Mobile-Website). Au fost inspectate vizual compozițiile, ritmul și tipografia; fotografiile din pagină rămân ale FASON. Alte referințe studiate: [Il Colorista](https://www.ilcolorista.salon/) și [HOOB](https://hoob.jp/).

## Pornire

Necesită Node.js 22.13+ LTS sau 24+ și npm.

```sh
npm install
npm run dev
```

Deschide http://localhost:3000. În Windows PowerShell, poți folosi `npm.cmd` dacă politica locală blochează `npm.ps1`.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Structură

- `src/components/sections/`: navigare, hero, portofoliu, echipă, despre, locație, servicii, contact și footer — fiecare în componenta sa. Serviciile sunt imediat după hero.
- `src/components/sections/MobileMenu.tsx`: meniu fullscreen pe fundal crem, tipografie adaptată spațiului disponibil, introducere GSAP în cascadă și fotografie discretă. Controlul comun `MenuToggle` ocupă aceeași poziție la deschidere și închidere, inclusiv când navbarul este compact; cele două linii SVG se transformă în X și revin în burger. Nu afișează text. Linkurile și acțiunea de contact încap fără scroll; landscape folosește două coloane. Dialogul păstrează focusul, blochează scrollul paginii și respectă mișcarea redusă.
- `src/components/effects/HeroCanvas.tsx`: shader Three.js pentru ecrane de minimum 768 px cu pointer precis, cu dezvăluire în spirală, deformare discretă la trecerea cursorului și separare cromatică. Efectul la mouse este redus cu 15%; click-ul, atingerea și mișcarea cu butonul apăsat nu activează efecte. Textura reutilizează fotografia responsive aleasă de browser. Shaderul se compilează asincron, după prima afișare a conținutului. Canvas-ul randează numai cât timp se schimbă imaginea, se oprește în repaus, în afara ecranului sau în spatele dialogurilor și eliberează resursele la demontare. Fotografia HTML rămâne fallback pentru WebGL indisponibil sau mișcare redusă.
- `src/components/effects/HeroTouchEffect.tsx`: pe telefon și dispozitive fără pointer precis, fotografia are o intrare CSS de 1,35 secunde, cu perspectivă, înclinare și apropiere discrete. Literele și textul apar în același interval. Three.js nu se descarcă pe acest traseu; nu există context WebGL, filtru per pixel sau reacții la atingere. Transformarea dispare complet la final. Componenta suspendă intrarea cât timp un dialog este deschis, iar mișcarea redusă o dezactivează prin CSS.
- `src/components/effects/MotionProvider.tsx`: încarcă la cerere controllerul cu GSAP, ScrollTrigger și Lenis, după prima afișare a conținutului. Controllerul așteaptă închiderea unui dialog deja deschis înainte să inițializeze parallax-ul. Animațiile de sub hero sunt pregătite pe secțiuni, când intră în apropierea ecranului sau primesc focus. Deschiderea unui dialog oprește și tween-urile de scrub, astfel încât fotografia să nu mai continue mișcarea după oprirea scrollului. `prefers-reduced-motion` dezactivează efectele.
- `src/components/sections/Contact.tsx`: contact direct prin apel și WhatsApp, cu număr afișat mare când este confirmat. În lipsa numerelor, afișează disponibilitatea viitoare și accesul la locație. Nu există formular sau sistem de rezervări pe site.
- `src/components/sections/Appointments.tsx`: secțiune vizibilă de programări prin telefon și WhatsApp, imediat după servicii. Contactul se repetă la finalul paginii. Ambele folosesc aceeași componentă `ContactMethods` și aceeași configurație.
- `src/lib/contact.ts`: generează linkuri `tel:` și WhatsApp din numere internaționale validate. Mesajul WhatsApp poate include serviciul ales.
- `src/lib/salon.ts`: datele salonului, serviciile, colecțiile și configurația locației.
- `src/components/sections/Location.tsx`: hartă cartografică pe toată lățimea, cu adresă și traseu Google Maps într-o zonă compactă. Harta vectorială locală folosește geometria reală a străzilor OpenStreetMap, cu centrul la coordonatele salonului. Dialogul oferă harta interactivă și, separat, fotografia de arhivă a fațadei, cu watermark și sursă păstrate.
- `src/components/sections/GoogleReviews.tsx`: scor și recenzii primite direct prin Places API, autori, fotografii de profil și linkuri către surse. Încărcarea începe când secțiunea ajunge în apropierea ecranului. În absența datelor sunt afișate doar linkurile către recenzii, fără rating sau texte inventate.

## Înainte de publicare

Completează telefonul, numărul WhatsApp, programul și linkurile confirmate în `src/lib/salon.ts`. `phone` și `whatsappNumber` sunt independente și rămân `null` până sunt confirmate. Introdu numerele în format internațional, cu prefix de țară. Telefonul activează linkurile de apel, iar numărul WhatsApp activează conversațiile; nu există integrare cu agenda salonului. Când lipsesc ambele numere, acțiunile trimit la secțiunea de contact, fără contacte inventate sau linkuri nefuncționale.

Confirmă textele serviciilor și informațiile despre echipă. Activează indexarea în metadata din `src/app/layout.tsx` după aceste actualizări.

Adresa a fost verificată pe [site-ul FASON](https://www.fason.ro/); coordonatele provin din integrarea Google Maps a proiectului FASON existent. `public/images/location-neighborhood.svg` este un desen vectorial generat din geometria străzilor OpenStreetMap, descărcată la 19 octombrie 2026 prin API-ul public pentru zona `26.097,44.423,26.116,44.438`. Centrul hărții este `44.4303964,26.1062378`; numele străzilor sunt preluate din date, iar atribuirea și [licența OpenStreetMap](https://www.openstreetmap.org/copyright) rămân vizibile. Fotografia reală a fațadei provine din [listarea Bucuresteni.ro](https://www.bucuresteni.ro/despre/salon-fason/) și este o fotografie de arhivă, nu o confirmare a aspectului actual.

## Recenzii Google

Activează **Places API (New)** într-un proiect Google Cloud cu billing și configurează cheia server-side în `.env.local`:

```env
GOOGLE_PLACES_API_KEY=cheia_ta
```

Repornește serverul după configurare. Nu trimite cheia în chat și nu folosi prefixul `NEXT_PUBLIC_`. Restricționează cheia la Places API și infrastructura serverului; setează cote și limite în Google Cloud. Solicitările de recenzii sunt taxabile conform planului Google.

`/api/google-reviews` interoghează exclusiv profilul FASON (`location.placeId`). Datele nu sunt persistate sau cache-uite. API-ul oferă cel mult cinci recenzii relevante; sunt păstrate ordinea, textul original, numele autorului și linkul individual, inclusiv pentru evaluări mai mici. Lipsa cheii, timeout-ul sau o eroare Google păstrează linkurile publice funcționale. Înainte de publicare adaugă termenii și politica de confidențialitate cerute de [politicile Google Places](https://developers.google.com/maps/documentation/places/web-service/policies).

## Verificări în browser

Testele folosesc Google Chrome local pe Windows sau browserul configurat prin `PLAYWRIGHT_CHROME_PATH`. Serverul Next pornește automat dacă nu rulează deja.

```sh
npm run test:e2e
```

Acoperă navigarea pe mobil, galeria animată (navigare rapidă, swipe nativ, focus, închidere întreruptă și păstrarea scrollului), serviciile vizibile și accesul la contact, generarea linkurilor de apel/WhatsApp, layout-ul desktop/mobil și fallback-ul cu mișcare redusă.

Fotografia hero este din fișierele furnizate de utilizator. Imaginile complementare FASON au fost copiate din biblioteca locală `fason-assets`; proiectul nu depinde de acel folder la rulare.
