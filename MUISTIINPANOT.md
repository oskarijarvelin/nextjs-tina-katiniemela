# Muistiinpanot: kaniffi.fi (ent. katiniemela.fi)

_Päivitetty 24.11.2026 Lava-ilmeen julkaisun jälkeen. Edellinen versio (12.11.2026) kuvasi vanhaa MUI-pohjaista sivustoa, ja se löytyy git-historiasta._

## Asiakas ja sivuston tarkoitus

- **Kati Niemelä / taiteilijanimi Kaniffi**, Jyväskylä (Savela). Artisti, laulaja-lauluntekijä ja pop/jazz-laulunopettaja. Yritys: Kaniffi Tmi (yrittäjänä 10/2025 alkaen, sitä ennen kevytyrittäjänä).
- Sivuston tavoitteet: 1) uusia laulunoppilaita, 2) keikkatilauksia, 3) CV / portfolio.
- **Pääosoite: https://kaniffi.fi** (24.11.2026 alkaen). `katiniemela.fi` ja `www.katiniemela.fi` ohjataan pysyvästi (308) samaan polkuun kaniffi.fi:ssä (`next.config.js` → `redirects`). Tinan editori: https://kaniffi.fi/admin (kaniffi.fi lisätty Tina Cloudin sallittuihin osoitteisiin).
- Hosting: Vercel (projekti `katiniemela`, julkaisee `main`-haaran). Molemmat verkkotunnukset kulkevat Cloudflaren välityspalvelimen kautta, ks. Suorituskyky.
- Repo: github.com/oskarijarvelin/nextjs-tina-katiniemela.

## Ulkoasu: Lava (julkaistu 24.11.2026)

- Kati valitsi tumman **Lava**-suunnan. Luonnos on HTML-artefaktina: https://claude.ai/artifact/66RiA3PsALhCH9DoNetY4J. Vanha Design-kanvaasi on vain palautekierroksen tallenne, eikä sitä enää päivitetä.
- Tunnusmerkit: tumma tausta, MonteCarlo-käsialafontti otsikoissa, Jost leipätekstissä, kulta-aksentti (`--accent: #E2B866`), lavakuvat, kimallusvana hiiren perässä ja kultapöly heroissa, juokseva nauha, salmiakkierottimet.
- Teaser-videot (9:16, 11 s, kaniffi.fi) tehtiin samalla ilmeellä: etusivun, Muusikko-, Keikat- ja Laulunopettaja-sivun kuvilla. Videot eivät ole repossa.

## Sivut

| URL | Sisältötiedosto | Lohkot |
|---|---|---|
| `/` | `pages/content/home.md` | hero (etusivu), nauha, polut, nosto (tammikuu, 35 € -merkki), palsta (Kuka minä olen, luvut, allekirjoitus), kuva + lainaus, keikat (etusivu), musiikkinosto, palautteet (karuselli), yhteystiedot |
| `/keikat` | `keikat.md` | hero, nauha (kokoonpanot), keikat (liput + **keikkalista**), cta (Tilaa keikalle), keikat (menneet), yhteystiedot |
| `/musiikki` | `musiikki.md` | hero (äänialto), nauha (kappaleet), nosto (Saman katon alla + YouTube-livevideo), videot, julkaisut (diskografia), yhteystiedot |
| `/cv` | `cv.md` | hero, faktat (Lyhyesti), kokemus ×3 (työ, koulutus, muu), yhteystiedot |
| `/muusikko` | `muusikko.md` | hero, kokoonpanot (Kaniffi, Kaniffi Duo, Iist Side Singers, Ronimus), kuva, lomake (keikka) |
| `/laulunopettaja` | `laulunopettaja.md` | hero, faktat, palsta (vahvuusalueet), lainaus, ominaisuudet, hinnasto (+ ehdot), palautteet (kortit), cta, yhteystiedot |
| `/laulutunnit-jyvaskyla` | `laulutunnit-jyvaskyla.md` | Laskeutumissivu, ei valikossa: hero, nauha, palsta (edut, 35 €), vaiheet, hinnasto, palautteet, ukk, lomake (laulutunnit) |

Hinnat (11/2026): tutustumistunti 35 €, laulutunti 60 €/h, opiskelijat ja alle 20-v. −15 % (kaikki sis. alv.). Peruutus viimeistään vuorokautta ennen, laskutus kuukausittain.

## Tekniikka

- **Next.js 15.5 (Pages Router)** + **TinaCMS 3.15** ja `@tinacms/cli` 4 (Tina Cloud). React 18.3. Node 24 (`engines`). Yarn 1. Päivitetty 24.11.2026 versioista Next 13.1 ja Tina 1.2.
- **Tyylit:** `styles/lava.css` on luonnoksen CSS sellaisenaan, ja loppuun on lisätty toteutuksen omat säännöt (kuvan kohdistus, YouTube-upotus, lahjakorttirivi). Tuodaan `pages/_app.js`:ssä.
- **Fontit:** omina tiedostoina `@fontsource/montecarlo` (400) ja `@fontsource/jost` v5 (400/500/600). Jostin v5-paketti tuodaan ilman `.css`-päätettä (`import '@fontsource/jost/400'`), koska Next 13.1:n webpack tulkitsi paketin exports-kartan väärin (toimii näin myös Next 15:ssä).
- **Reititys:** `pages/index.js` (home.md) ja `pages/[slug].js` (SSG, `fallback: "blocking"`). Kumpikin hakee `lib/sivudata.js`:llä globaalin datan (keikkalista Keikat-sivulta, musiikki Musiikki-sivulta, palautteet omasta kokoelmastaan) ja `lib/seo.js`:llä sivun rakennedatan.
- **Pohja:** `components/Layout.js` sisältää headin (SEO), yläpalkin, valikon ja alapalkin. Valikko, some-linkit ja yhteystiedot tulevat `content/settings/index.json`:sta.
- **Rakennuspalat:** `components/lava/ui.js` sisältää ikonit (Tinan ikonivalinnat), `Kuva`-komponentin (next/image ja kohdistukset `--pos`/`--pos-d`/`--pos-m`), `Painike`/`Painikkeet` (aihe → `#yhteys` ja lomakkeen esivalinta), `Nauha`-komponentin ja päivämääräapurit.
- **Selainefektit:** `lib/lava.js` (`initLava()`, käynnistyy Layoutissa sivukohtaisesti ja siivoaa jälkensä) hoitaa valikon, edistymispalkin, kimallusvanan, kultapölyn, palautekarusellin, kansien kallistuksen, osioiden nousuanimaation, sähköpostin kopioinnin, takaisin ylös -painikkeen ja `data-topic` → `lava-aihe`-tapahtuman. Kaikki liike kunnioittaa `prefers-reduced-motion`-asetusta.
- **Rikasteksti:** `components/RichText.js` sisältää lihavointibugin korjauksen sekä apurit `onTaytetty()` (Tina palauttaa tyhjänkin kentän tyhjänä dokumenttina, jonka pitää tulkita tyhjäksi) ja `tekstiksi()`.

### Tina-skeema (`tina/config.js`)

Kokoelmat:
- **Sivut** (`page`): `title`, `description` (markdownin body = meta description), `lomake_aihe` (sivun lomakkeen oletusaihe), `blocks`.
- **Oppilaiden palautteet** (`palautteet`, `content/palautteet/index.md`): nimi, lisätieto, lyhyt lainaus, `nostettu` ja koko palaute (rikasteksti). Yksi lähde etusivulle, Laulunopettaja-sivulle ja laskeutumissivulle.
- **Asetukset** (`settings`, JSON): sivuston nimi, roolirivi, ylä- ja alapalkin painiketekstit, sähköposti, sijainti, yritys, somet (URL ja näkyvä nimi), Ota yhteyttä -kuva ja päävalikko.

Lohkot (22), kentät suomeksi ja omilla etuliitteillään:
`hero` (asettelu etusivu/sivu, saatavuusrivi, murupolku, kuvan kohdistukset, äänialto, painikkeet/pillerit), `nauha`, `polut`, `nosto` (kuva tai YouTube-video, pyöreä merkki, taajuuspalkit), `palsta` (listat ja sydän, edut, luvut, allekirjoitus), `kuva` (+ käsialalainaus), `keikat` (näkymät: liput / menneet / kaikki / etusivu), `musiikkinosto`, `palautteet` (karuselli / kortit), `faktat`, `kokemus`, `julkaisut` (ensimmäinen albumi vinyylinä, muut vuosittain), `videot` (ensimmäinen isona, ilman kuvaa käsialalla), `lainaus`, `ominaisuudet`, `hinnasto`, `cta`, `kokoonpanot`, `vaiheet`, `ukk`, `lomake`, `yhteystiedot`.

`tina/__generated__` generoidaan buildissa eikä sitä commitoida. Skeemamuutoksen jälkeen commitoidaan `tina/config.js` ja `tina/tina-lock.json` (tinacms dev/build päivittää lukkotiedoston), ja Tina Cloud indeksoi skeeman lukkotiedostosta.

### Yhteydenottolomake

- `components/blocks/yhteystiedot.js` (myös `lomake`-lohko): Ota yhteyttä -osio (`#yhteys`) ja React-lomake. Aiheet: laulutunnit, keikka, lahjakortti ja muu. Ohjeteksti ja kiitosviesti vaihtuvat aiheen mukaan, ja mukana on roskapostin piilokenttä. Vanhat ankkurit (`#varaa`, `#tilaa-keikka`) osuvat yhä osioon.
- `pages/api/lomake.js` lähettää viestin **Resendillä**. `RESEND_API_KEY` on asetettu Vercelissä, ja tuotannon testiviesti tuli perille 24.11.2026. Kehityksessä ilman avainta viesti tulostuu konsoliin.

### SEO

- Pääosoite asetetaan yhdessä paikassa: `lib/sivusto.js` (`SITE_URL`). Sitä käyttävät canonical, OG ja Twitter, JSON-LD ja lomakkeen sivulinkki. `scripts/generate-sitemap.js` ja `public/robots.txt` käyttävät kaniffi.fi:tä.
- Rakennedata: Person + WebSite kaikilla sivuilla, BreadcrumbList alasivuilla, FAQPage UKK-lohkosta ja LocalBusiness hinnastosivuilla (hintahaarukka luetaan hintakorteista).
- Lyhyet otsikot (≤ 30 merkkiä ilman nimeä) saavat perään " | Kati Niemelä".
- Vanhat ankkurit säilytetty, myös Musiikki-sivun `#julkaisu-N-nimi`.
- Search Console: kaniffi.fi:n sivukartta lähetetty uudelleen (virheet poistuivat). Osoitteenmuutos katiniemela.fi → kaniffi.fi tehdään Search Consolessa (tarkista, onko tehty).

### Suorituskyky (Lighthouse, mobiili, 24.11.2026)

- Kaikilla seitsemällä sivulla suorituskyky 97–99 ja saavutettavuus, Best Practices ja SEO 100. LCP 1,6–2,4 s, CLS ≤ 0,044.
- **Cloudflare:** Bot Fight Mode (Free-paketissa siihen kuuluu JavaScript Detections) ja Precursor lisäsivät jokaiselle sivulle skriptin `/cdn-cgi/challenge-platform/scripts/jsd/main.js`. Se pudotti suorituskyvyn 50–78:aan ja Best Practicesin 82:een. Kaikki kolme on kytketty pois kaniffi.fi:ltä. **Älä kytke niitä takaisin**, tai pisteet romahtavat. Vaihtoehtoisesti Cloudflaren voi vaihtaa tilaan DNS only, koska Vercel hoitaa CDN:n itse.

## Työnkulku

- **Kati päivittää sisältöä itse** Tina Cloudin kautta suoraan `main`-haaraan (commitit "TinaCMS content update"). Pullaa aina ennen omia muutoksia.
- Julkaisu: push `main`-haaraan, ja Vercel buildaa (`generate-sitemap` → `tinacms build` → `next build`). Tina Cloud indeksoi skeemamuutokset pushin jälkeen.
- Paikallinen kehitys: `yarn dev` (`tinacms dev`, paikallinen GraphQL). Tarkista, ettei koneella pyöri vanhaa orpoa `next dev` -prosessia, koska kaksi palvelinta samassa `.next`-kansiossa aiheuttaa satunnaisia 404- ja manifest-virheitä.
- Env-muuttujat: `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, `NEXT_PUBLIC_TINA_BRANCH`, `RESEND_API_KEY`, valinnaisesti `LOMAKE_VASTAANOTTAJA` ja `LOMAKE_LAHETTAJA`.
- Varmuuskopio: sisällöistä tehtiin PDF-varmuuskopio 24.11.2026 (ennen Lava-julkaisua, ei repossa).

## Historia

- Tehty 10/2022. Isompia päivityksiä 2/2023 (Tina-päivitys), 1/2024 (paikalliset kuvat), 12/2025 (SEO ja saavutettavuus), 1/2027-kampanja (Laulutunnit Jyväskylässä -sivu, lomakkeet, keikkalista) ja **24.11.2026 Lava-ilme** (koko ulkoasu ja kaikki lohkot uusiksi, pääosoite kaniffi.fi).

## Avoimet asiat ja jatkokehitys

### Kesken
- **Tina 3 / Next 15.5 -päivitys** tehtiin haarassa `claude/brave-kapitsa-8f119f` (PR #51). Haaraan yhdistettiin 24.11.2026 Lava-ilme, kaniffi.fi ja siivous. Testit: `yarn test:mdx` (lihavoinnin sarjallistus) ja `yarn build:local` (build paikallisella sisällöllä ilman Tina Cloud -tunnuksia).
- **Editorin lihavointibugi** korjaantuu Tina 3:ssa (`@tinacms/mdx` 2.x siirtää reunavälilyönnin tähtien ulkopuolelle). `RichText.js`:n korjaus jätettiin vanhan sisällön vuoksi.

### Ylläpito
- Käyttämättömät riippuvuudet (MUI, Emotion, styled-components, Headless UI, react-icons, next-with-less ym.) poistettiin 24.11.2026.
- `public/uploads` on noin 159 Mt. Live-kuvat tulevat Tina Cloudin mediasta (`assets.tina.io`) next/imagen optimoimina, joten repon alkuperäiset 5–10 Mt:n kuvat eivät hidasta sivustoa. Käyttämättömiä kuvia on noin 12 (esim. DSC0425x–DSC0433x, kati-flipattu, kati-rajattu2).
- **Tietoturva (yarn audit 24.11.2026):** ei kriittisiä. Jäljellä Nextin sisäänrakennettu PostCSS 8.4.31 (koskee hyökkääjän syöttämän CSS:n käsittelyä, ei tätä sivustoa) ja Tinan Zod 3 (korjaus vain Zod 4:ssä). Next 15.5.x saa tietoturvapäivityksiä: päivitä patch-versioon (`yarn upgrade next eslint-config-next`) säännöllisesti. Seuraava isompi askel olisi Next 16 ja React 19.
- CI (`.github/workflows/pr-open.yml`) ajaa PR:issä Node 24:llä `test:mdx`- ja `build:local`-komennot.
- Pienet Lighthouse-huomiot (eivät laske pisteitä): polkukorttien kuvat ovat mobiilissa hieman ylisuuria (noin 47 kt), Nextin omat polyfillit noin 12 kt.

### Sisältöideat
- Kaniffin omat julkaisut diskografiaan (nyt vain Ronimus ja SweetHard-cover). Saman katon alla on toistaiseksi vain YouTube-livetaltiointi.
- Konserttikuvia on vähän (sininen mekko: 2 kuvaa, vihreä mekko: 4). Lisää lavakuvia elävöittäisi Keikat-sivua.
- Ajanvaraus tai lahjakorttiostos verkossa (nyt lomakkeella).
