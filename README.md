# FASON — Hair & Beauty Salon

Site editorial responsive construit cu Next.js App Router, React, TypeScript și Tailwind CSS. Fotografiile sunt locale; fonturile Manrope și Cormorant Garamond sunt găzduite în proiect.

Fotografiile responsive din hero sunt WebP-uri pregătite înainte de publicare, la calitatea 85, în `public/images/hero`. Browserul alege dimensiunea potrivită din `picture`; prima vizită nu declanșează o conversie de imagine pe server. Aceeași variantă este reutilizată de Three.js. Fonturile păstrează fișierele originale Fontsource, cu subseturile Latin și Latin Extended pentru diacritice, iar cele trei variante Latin folosite în hero sunt preîncărcate. Fișierele au hash în nume și cache de un an. Licențele OFL sunt incluse în `public/fonts`.

Pentru regenerarea imaginilor și fonturilor după schimbarea surselor: `npm run assets:prepare`. Scriptul folosește Sharp instalat cu Next.js și actualizează `src/lib/visual-assets.json` și `src/app/fonts.css`. Fișierele generate sunt incluse în proiect, fără procesare suplimentară la build. Meniul mobil și galeria foto se încarcă la cerere; pointerul sau focusul pregătesc codul înainte de click.

## Direcție vizuală

Actualizarea de conținut urmează documentul de lucru `FASON WEBSITE_INFO.docx`, primit la 4 noiembrie 2026. Fotografia, shaderul și comportamentul hero-ului sunt păstrate; textele devin „În căutarea frumuseții”, „Cu drag de oameni” și „Autenticitate cu stil și eleganță”, fără buton suplimentar. Homepage-ul prezintă povestea FASON, fondatoarea, serviciile, colecțiile, echipa, recenziile, informațiile utile, locația și contactul. Harta își păstrează geometria și încadrarea.

Serviciile, contactele și echipa se editează în `src/lib/salon.ts`. Cele șase categorii din brief rămân vizibile: tuns damă & barber, culoare & styling, cosmetică, tratamente faciale, tratamente corporale și manichiură–pedichiură. Fiecare serviciu conduce la categoria sa din `/preturi`. Datele de tarifare sunt în `src/lib/tariffs.ts`, transcrise din `LISTA PRETURI finala preturi 2027.docx`. Lista este afișată deja cu eticheta „Tarife 2027”, conform confirmării utilizatorului din 5 noiembrie 2026. Include duratele, manopera, materialele, suplimentele și condițiile abonamentelor. Sumele alternative cu slash sunt păstrate ca variante; intervalele și prețurile „de la” au sensul din document. `formatServicePrice` și `ServicePrice` rămân disponibile pentru eventuale prețuri rezumative. Profilurile fictive nu sunt afișate.

`Founder` prezintă fotografia și biografia Cristinei Gramma, folosind forma numelui predominantă în brief. `Team` trimite spre `/echipa/coafor-barber` și `/echipa/beauty`. Paginile folosesc numai `teamMembers` confirmați, filtrați prin `departmentId`; momentan este confirmată doar Cristina. `plannedRoles` păstrează structura cerută de brief: trei hairstyliști și două persoane pentru îngrijirea/spălarea părului, respectiv doi specialiști beauty. Pentru ceilalți membri trebuie completate numele, rolul, specializarea și fotografia reală; nu sunt generate portrete sau identități noi. Pagina Beauty prezintă specializările fără profiluri fictive.

Telefonul, WhatsApp, emailul, programul și linkurile sociale rămân `null` până la confirmare. `ContactForm` este afișat numai când există `salon.email`; pregătește un mesaj `mailto:` în aplicația de e-mail a vizitatorului și nu pretinde trimitere automată. Nu există un backend de trimitere sau confirmări simulate. `#programari` rămâne o ancoră de compatibilitate la contact. Un formular cu trimitere directă de pe server necesită separat un destinatar și un serviciu de email.

Paleta comună folosește crem (#f5f2eb), maro închis (#211d1b), șampanie neutră (#cdbfa7) pe suprafețe închise și un accent brun-bej (#75664f) pe crem. Etichetele secțiunilor folosesc text Manrope, fără chenar, slash sau numerotări decorative. Titlurile păstrează scara Manrope și italicul Cormorant. Cele șase servicii formează o listă în două coloane de la 768 px și una pe telefon. Pagina tarifelor are un index cu ancore, toate rândurile vizibile și titluri de categorie care rămân în dreptul tarifelor pe desktop. La text mărit, suma poate coborî sub numele serviciului. Footerul include acces direct la tarife.

Titlul hero-ului se așază pe zona inferioară închisă a fotografiei: Manrope crem și Cormorant italic în șampanie mată (#cdbfa7). Textul este în flux, iar hero-ul poate crește la text mărit, păstrând toate diacriticele și subtitlurile vizibile. Intrarea pe cuvinte păstrează spațierea și kerningul fontului; animația CSS se suspendă cât timp un dialog este deschis și respectă mișcarea redusă. Fotografia, shaderul Three.js și comportamentul la pointer sunt păstrate. Navigația este Despre, Cristina Gramma, Servicii, Echipa, Contact, Locație, în ordinea din brief. `ActionButton` și `ActionLink` definesc acțiunile comune. Meniul mobil păstrează iconul burger/X în aceeași poziție. Pe paginile interioare, ancorele navigației trimit spre homepage.

La „Despre”, textele de lucru sunt păstrate și însoțite de primul cadru al fotografiei FASON `craft.jpg`, încadrat prin CSS. Atributul `sizes` ține cont de lățimea întregii benzi foto pentru a evita optimizarea la o rezoluție prea mică a cadrului vizibil. Biografia folosește conținutul din brief, iar eticheta „Omul din spatele FASON” rămâne eliminată la cererea utilizatorului.

De confirmat în documentul de prețuri: ședința individuală Vacuum dublu este 130 lei, în timp ce abonamentul de 880 lei folosește un preț întreg de referință de 960 lei (120 × 8). Ambele valori sunt păstrate ca în sursă. La radiofrecvență este afișat totalul abonamentului de 1.450 lei; documentul rotunjește echivalentul per ședință la 242 lei. Mențiunea „epilat genian” și tariful „coafat special extra 120 / 150 lei” păstrează formularea și sumele primite, până la clarificarea variantei fiecărui serviciu.

Portofoliul are patru fotografii statice pe fundal închis. Desktopul folosește două coloane egale și imagini cu înălțime comună, pentru o prezentare de colecție. Titlul are o scară mai amplă, iar legendele rămân aliniate sub fotografie. Pe mobil, fotografiile ocupă toată lățimea conținutului și sunt așezate consecutiv. Grila rămâne statică, iar apăsarea unei fotografii deschide componenta `PortfolioGallery` pe tot ecranul.

Împachetarea textului folosește `text-wrap: pretty` pentru paragrafele din conținut, footer și dialoguri, respectiv `balance` pentru titlurile de sub hero. Ultimele două cuvinte din povestea salonului formează un grup care poate reintra în flux la text mărit; fiecare cuvânt își păstrează animația proprie. Pe telefoanele înguste, tariful poate coborî pe rândul următor, pentru ca titlul serviciului să aibă loc. Compoziția și tipografia hero-ului sunt exceptate de la aceste reguli.

Galeria afișează fotografia direct la dimensiunea completă, cu o estompare de 240 ms la deschidere și 180 ms la închidere. Dimensiunile și poziția imaginii rămân fixe pe durata intrării și ieșirii; nu este creată o copie animată a miniaturii. Schimbarea lucrărilor combină estompare, deplasare discretă și actualizarea legendei. Săgețile, tastele stânga/dreapta, selecția directă și swipe-ul orizontal folosesc aceeași navigare circulară. Apăsările rapide se grupează către ultima selecție cerută. Escape, butonul X și apăsarea fundalului închid galeria, inclusiv în timpul intrării. Focusul rămâne în dialog și revine la fotografie; poziția și scrollul paginii sunt păstrate până la terminarea închiderii. Preferința de mișcare redusă este respectată inclusiv dacă se schimbă în timpul vizitei.

Animațiile păstrează compoziția finală. Titlurile intră cuvânt cu cuvânt prin măști. Fotografiile apar întregi, cu o unduire discretă inspirată de hero și o apropiere de maximum 3,5%. Fiecare `PhotoReveal` are un filtru SVG propriu: zgomotul fractal deplasează ușor pixelii și se stinge treptat, fără copii ale fotografiei sau contexte WebGL suplimentare. Perechea de pe desktop are un decalaj de 120 ms. Intensitatea este redusă de la 32 la 22 pe telefon. Animația are loc o singură dată, timp de 1,2 secunde pe desktop și o secundă pe mobil; apoi filtrul și transformările sunt eliminate complet. Nu există reacție la pointer, click sau atingere. Deschiderea unui dialog suspendă unduirile active și le reia după închidere. Legendele apar separat după 300 ms. Serviciile apar într-o succesiune scurtă. Portofoliul ocupă o bandă închisă continuă pe toată lățimea. Textul „Despre” se colorează treptat, cuvânt cu cuvânt, păstrând lizibilitatea pe parcurs. Hero-ul și harta păstrează comportamentul existent.

Contactul direct și footerul formează un singur final pe fundal închis. Fotografia de lucru de lângă contact este extrasă din al patrulea cadru al `public/images/craft.jpg`, cu fundal transparent și conversie WebP fără pierderi. Assetul final este `public/images/styling-cutout-matte.webp`, cu reflexiile de pe piele reduse discret pentru un finisaj mai natural. Fundalul și retușul au fost realizate cu instrumentul integrat imagegen; prompturile complete și proveniența sunt în [fișierul assetului](docs/assets/styling-cutout.json). Când se configurează emailul, formularul îi ia locul.

Decupajul de la contact este servit direct din WebP-ul fără pierderi (`Image unoptimized`, aproximativ 980 KB), cu încărcare lazy. Astfel evită recomprimarea implicită la calitatea 75, care estompa pielea și părul. Dimensiunile și încadrarea rămân definite de container.

Sub 768 px, fotografia de la contact este ascunsă, astfel încât să nu cadă sub text. De la 768 px apare alături de text în grila cu două coloane.

`PhotoReveal` și `RevealWords` păstrează conținutul vizibil fără animații. `MotionProvider` încarcă `motion-controller.ts` după prima afișare a conținutului; `scrollScenes.ts` este inițializat în contextul GSAP al controllerului. Mișcarea redusă dezactivează scenele și le elimină stilurile, inclusiv când preferința se schimbă în timpul vizitei. Focusul de la tastatură încheie imediat dezvăluirea unui control, inclusiv dacă acel control era deja focalizat când s-a încărcat controllerul.

Locația prezintă harta pe toată lățimea, cu adresa și acțiunile compacte dedesubt. Fotografia de arhivă și harta interactivă se deschid la cerere. Acțiunea de recenzii conduce la secțiunea dedicată, unde datele reale din Places API apar direct în pagină, cu un dialog pentru lectura completă. Fără cheie API rămâne disponibil linkul public către recenziile Google.

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

- `src/components/sections/`: fiecare secțiune are propria componentă. Ordinea paginii este hero, despre, Cristina Gramma, servicii, portofoliu, echipă, recenzii, bine de știut, locație și contact, urmate de footer.
- `src/components/sections/MobileMenu.tsx`: meniu fullscreen pe fundal crem, tipografie adaptată spațiului disponibil, introducere GSAP în cascadă și fotografie discretă. Controlul comun `MenuToggle` ocupă aceeași poziție la deschidere și închidere, inclusiv când navbarul este compact; cele două linii SVG se transformă în X și revin în burger. Nu afișează text. Linkurile și acțiunea de contact încap fără scroll; landscape folosește două coloane. Dialogul păstrează focusul, blochează scrollul paginii și respectă mișcarea redusă.
- `src/components/effects/HeroCanvas.tsx`: shader Three.js pentru ecrane de minimum 768 px cu pointer precis, cu dezvăluire în spirală, deformare discretă la trecerea cursorului și separare cromatică. Efectul la mouse este redus cu 15%; click-ul, atingerea și mișcarea cu butonul apăsat nu activează efecte. Textura reutilizează fotografia responsive aleasă de browser. Shaderul se compilează asincron, după prima afișare a conținutului. Canvas-ul randează numai cât timp se schimbă imaginea, se oprește în repaus, în afara ecranului sau în spatele dialogurilor și eliberează resursele la demontare. Fotografia HTML rămâne fallback pentru WebGL indisponibil sau mișcare redusă.
- `src/components/effects/HeroTouchEffect.tsx`: pe telefon și dispozitive fără pointer precis, fotografia are o intrare CSS de 1,35 secunde, cu perspectivă, înclinare și apropiere discrete. Literele și textul apar în același interval. Three.js nu se descarcă pe acest traseu; nu există context WebGL, filtru per pixel sau reacții la atingere. Transformarea dispare complet la final. Componenta suspendă intrarea cât timp un dialog este deschis, iar mișcarea redusă o dezactivează prin CSS.
- `src/components/effects/MotionProvider.tsx`: încarcă la cerere controllerul cu GSAP, ScrollTrigger și Lenis, după prima afișare a conținutului. Controllerul așteaptă închiderea unui dialog deja deschis înainte să inițializeze parallax-ul. Animațiile de sub hero sunt pregătite pe secțiuni, când intră în apropierea ecranului sau primesc focus. Deschiderea unui dialog oprește și tween-urile de scrub, astfel încât fotografia să nu mai continue mișcarea după oprirea scrollului. `prefers-reduced-motion` dezactivează efectele.
- `src/components/sections/Contact.tsx`: contact direct prin apel și WhatsApp, cu număr afișat mare când este confirmat. În lipsa numerelor, afișează disponibilitatea viitoare și accesul la locație. Configurarea unui e-mail activează `ContactForm`, care pregătește un mesaj în aplicația de e-mail a vizitatorului. Nu există sistem de rezervări sau backend de trimitere a mesajelor.
- `src/components/sections/Appointments.tsx`: componentă anterioară, păstrată în surse, neafișată pe pagină. Ancora `#programari` conduce la contact pentru compatibilitate cu linkurile vechi.
- `src/lib/contact.ts`: generează linkuri `tel:`, WhatsApp și schițe `mailto:` din date validate. Mesajul WhatsApp poate include serviciul ales.
- `src/lib/salon.ts`: datele salonului, serviciile, colecțiile și configurația locației.
- `src/components/sections/Location.tsx`: hartă cartografică pe toată lățimea, cu adresă și traseu Google Maps într-o zonă compactă. Harta vectorială locală folosește geometria reală a străzilor OpenStreetMap, cu centrul la coordonatele salonului. Dialogul oferă harta interactivă și, separat, fotografia de arhivă a fațadei, cu watermark și sursă păstrate.
- `src/components/sections/GoogleReviews.tsx`: scor și recenzii primite direct prin Places API, afișate în pagina principală cu autori, fotografii de profil și linkuri către surse. Dialogul permite citirea întregii liste returnate. Încărcarea începe aproape de viewport. Harta trimite la secțiunea de recenzii, evitând o a doua cerere. În absența datelor sunt afișate doar linkurile către Google, fără rating sau texte inventate. Sigla Google Maps provine din pachetul oficial, nemodificat; sursa este în `docs/assets/google-maps-attribution.json`.

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
