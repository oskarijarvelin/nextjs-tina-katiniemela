# Muistiinpanot: katiniemela.fi

_Kirjoitettu 12.11.2026 koodin, sisällön ja git-historian perusteella._

## Asiakas ja sivuston tarkoitus

- **Kati Niemelä / taiteilijanimi Kaniffi**, Jyväskylä (Savela). Artisti, laulaja-lauluntekijä ja pop/jazz-laulunopettaja. Yritys: Kaniffi Tmi (yrittäjänä 10/2025 alkaen, sitä ennen kevytyrittäjänä).
- Sivuston tavoitteet: 1) uusia laulunoppilaita, 2) keikkatilauksia, 3) CV / portfolio.
- Yhteydenotto: sähköposti `kaniffivirallinen@gmail.com`, Facebook @kaniffivirallinen, Instagram @kaniffi, LinkedIn. Lomaketta ei ole, pelkät linkit.
- Live: https://katiniemela.fi (Vercel). Repo: github.com/oskarijarvelin/nextjs-tina-katiniemela.

## Sivut

| URL | Sisältötiedosto | Sisältö |
|---|---|---|
| `/` | `pages/content/home.md` | Hero, "Kuka minä olen?" ja linkit alasivuille, iso kuva, yhteystiedot |
| `/keikat` | `keikat.md` | Tulevat ja menneet keikat vuosittain (yksi rich-text-palsta), yhteystiedot |
| `/cv` | `cv.md` | Työkokemus, koulutus, muu kokemus (kokemus-lohkot) |
| `/muusikko` | `muusikko.md` | Kokoonpanot (Kaniffi, Kaniffi Duo, Iist Side Singers, Ronimus), diskografia (Ronimus 2018–2022), musiikkivideot, yhteystiedot |
| `/laulunopettaja` | `laulunopettaja.md` | Laulutunnit, **hinnasto** (60 €/h, ensimmäinen tunti 35 €, opiskelijat ja alle 20-v. −15 %), peruutus- ja laskutusehdot, oppilaiden palautteet, yhteystiedot |

Päävalikko, sivuston nimi ja some-linkit: `content/settings/index.json`.

## Tekniikka

- **Next.js 13.1.6 (Pages Router)** + **TinaCMS 1.2.1** (Tina Cloud) + **MUI 5** (Emotion). React 18.2. Yarn.
- Fontit: MonteCarlo (otsikot, käsialafontti) ja Tillana (leipäteksti), `@fontsource`. Musta tausta, valkoinen teksti (`src/theme.js`).
- Reititys: `pages/index.js` (home.md) ja `pages/[slug].js` (SSG, `fallback: "blocking"`). Tinan `RouteMappingPlugin` yhdistää dokumentit URL-osoitteisiin.
- Tina-schema: `.tina/config.js` (vanha `.tina/`-kansio, uudemmissa versioissa `tina/`). Kokoelmat:
  - **Sivut** (`page`): `title`, `description` (= markdownin body, käytetään meta descriptionina), `blocks`.
  - **Asetukset** (`settings`): sivuston nimi, Instagram, LinkedIn, päävalikko.
- Sisältölohkot (`components/blocks/`), kenttien nimet suomeksi:
  - `hero`: otsikko, teksti, taustakuva ja kuvateksti (kuvaaja). 50/50-jako desktopilla.
  - `kuva`: täysleveä kuva ja kuvateksti.
  - `palsta`: kuva (valinnainen, vasen/oikea), otsikko, rich text ja linkkilista.
  - `kokemus`: aikajanalista (ajankohta, otsikko, kuvaus).
  - `julkaisut`: diskografia (kansikuva, tyyppi, vuosi, Spotify/YouTube, kappalelista).
  - `videot`: YouTube-lista. Kevyt upotus: thumbnail ensin, iframe vasta klikattaessa (`components/Video.js`).
- Kuvat: paikallisesti `public/uploads/` (Tina media). Vaihdettu Cloudinarysta paikallisiin 1/2024. `components/Image.js` käyttää `next/image`:a. Siinä on vielä Cloudinaryn URL-muunnos (`processUrl`), joka ei tee paikallisille poluille mitään.
- SEO (Copilot-PR:t #48–50, 12/2025): OG- ja Twitter-tagit, canonical, JSON-LD (Person + WebSite), skip-link, focus-tyylit, `robots.txt`, `manifest.json`. `sitemap.xml` generoidaan buildissa (`scripts/generate-sitemap.js`).
- Turvaheaderit ja `i18n: fi` tiedostossa `next.config.js`. `/admin` ohjataan Tinan admin-käyttöliittymään.
- CI: `.github/workflows/pr-open.yml` buildaa PR:t. Dependabot päivittää vain Tina-paketit.

## Työnkulku ja historia

- Tehty 10/2022. Isompia päivityksiä 2/2023 (Tina-päivitys), 1/2024 (paikalliset kuvat) ja 12/2025 (SEO, saavutettavuus, kuvien optimointi).
- **Asiakas päivittää sisältöä itse** Tina Cloudin kautta. Noin 176 commitia "TinaCMS content update", viimeisin 11.11.2026. Pullaa aina ennen omia muutoksia.
- Env-muuttujat: `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, `NEXT_PUBLIC_TINA_BRANCH`.

## Havaitut ongelmat ja jatkokehitysideat

### Korjattava nyt
1. **Laulunopettaja-sivun hero hajoaa desktopilla.** Pitkä yksisanainen otsikko "Laulunopettaja" (8rem MonteCarlo, noin 595 px) ei mahdu 50 %:n palstaan. Flex-elementin `min-width: auto` pakottaa tekstipalstan rivittymään kuvan alle, joten oikea puolisko jää tyhjäksi mustaksi alueeksi (tarkistettu 1440 px leveydellä). Korjaus: `minWidth: 0` tekstipalstalle ja/tai otsikon fonttikoon skaalaus.
   - _Korjaus aiempaan:_ kuva **ei ole rikki**. `/uploads/kati-rajattu.png` puuttuu reposta, mutta Tina Cloud tarjoilee median osoitteesta `assets.tina.io/<client-id>/…`. Alkuperäinen tiedosto on kuitenkin 22 Mt:n PNG.
   - Tämä tarkoittaa myös, että **live-sivuston kuvat tulevat Tina Cloudin mediasta**, eivät repon `public/uploads`-kansiosta. Repon käyttämättömät kuvat ovat lähinnä siivottavaa, eivät suorituskykyongelma.
2. **Vanhentuneet meta descriptionit.** `home.md` ja `laulunopettaja.md`: "Opiskelen (pop/jazz) laulunopettajaksi Jyväskylän AMK:ssa…", vaikka CV:n mukaan valmistunut 06/2025. Näkyy Googlessa ja jaoissa.
3. **Meta description puuttuu** sivuilta `/cv`, `/keikat` ja `/muusikko` (body on tyhjä).

4. **Editorin lihavointibugi (Katin raportti 23.11.2026), selvitetty.**
   - **Juurisyy:** `@tinacms/mdx` 1.x laittaa lihavoinnin reunan välilyönnin `**`-merkkien sisään: `**28.8. **Yksityistilaisuus`. Se on virheellistä markdownia, joten seuraavalla latauksella tähdet näkyvät tekstinä, ja seuraava tallennus escapettaa ne (`\*\*`). Lihavointi katoaa pysyvästi. "Satunnaisuus" johtuu siitä, osuuko välilyönti valintaan (sanan tuplaklikkaus valitsee usein välilyönnin mukaan).
   - **Toistettu:** paikallisesti versioilla 1.3.0 (projektissa) ja 1.8.3 (uusin 1.x), molemmissa sama bugi. **Versiossa `@tinacms/mdx` 2.4.2 korjattu** (välilyönti siirtyy merkkien ulkopuolelle). Sama kaava näkyy Katin tallennushistoriassa (keikat.md, laulunopettaja.md).
   - **Välikorjaus (tammikuu-2027-haara):** `components/RichText.js` korjaa rikkoutuneet `**…**`-parit lihavoinneiksi sivulla, ja nykyisen sisällön ainoa rikkinäinen lihavointi on korjattu. Editorissa Kati voi yhä nähdä tähtiä.
   - **Pysyvä korjaus:** TinaCMS:n päivitys 2.x/3.x-versioon (`.tina` → `tina`, uusi client, todennäköisesti myös Next-päivitys).
   - **Ohje Katille siihen asti:** valitse lihavoitava teksti ilman reunavälilyöntejä.

### Laatu ja ylläpito
- `Image.js` kaatuu, jos kuvaa ei ole asetettu (`processUrl(undefined)`). Tämä koskee heroa ilman taustakuvaa ja julkaisua ilman kansikuvaa. Pitäisi lisätä guard.
- `videot.js`: jos YouTube-URL ei mene parserista läpi, `video` on `false` ja thumbnail rikki.
- `styled()`-komponentit luodaan render-funktion sisällä (`Layout.js`: NaviBox, StyledMenu, SkipLink; `hero.js`: HeroBox). Ne pitäisi siirtää moduulitasolle, koska nyt ne luodaan uudelleen joka renderöinnillä.
- Sitemapin sivut on kovakoodattu (`scripts/generate-sitemap.js`). Uusi Tina-sivu ei mene sitemapiin automaattisesti. `lastmod` on aina buildin aika.
- Facebook-URL on kovakoodattu JSON-LD:hen. Kannattaisi lisätä se asetuksiin Instagramin ja LinkedInin rinnalle. Facebook-ikoni puuttuu myös headerista.
- "Ota yhteyttä" -palsta on kopioitu käsin neljälle sivulle, ja muotoilu vaihtelee (keikat-sivulla ei lihavointeja). Yhteinen lohko tai asetus auttaisi.
- Teeman `primary` ja `secondary` ovat MUI-starterin oletuksia (#556cd6 / #19857b). `manifest.json`:n `theme_color` (#1976d2) ei vastaa teemaa.
- `public/uploads` on 159 Mt, ja kuvat ovat 5–10 Mt alkuperäisiä. **14 kuvaa on käyttämättä** (yhteensä noin 105 Mt), esimerkiksi DSC042xx–DSC043xx, JMo-2023-139 ja kati-flipattu.
- Käyttämättömiä riippuvuuksia: `styled-components`, `next-tinacms-cloudinary`, `@headlessui/react`, `@tinacms/auth`. `package.json`:n nimi on edelleen `starter-basic`.

### Päivitysvelka
- Next 13.1.6, TinaCMS 1.2.1 ja MUI 5.11 ovat vuoden 2023 alun versioita. CI-matriisi käyttää Node 14/16/17:ää (EOL). Tina 1.x → 2.x vaatii `.tina` → `tina` -siirron ja uuden clientin.

### Sisältöideat asiakkaalle
- Keikat-sivulla "Tulevat keikat" on lähes tyhjä (2026: "--"). Lista on kasvanut pitkäksi, joten menneet keikat voisi siirtää omaan osioonsa tai tiivistää.
- Diskografia on vain Ronimuksen. Kaniffin omat julkaisut puuttuvat, jos niitä on.
- Laulutunneille voisi lisätä yhteydenottolomakkeen tai ajanvarauksen ja lahjakorttiostoksen. Nyt on vain sähköpostilinkki.
