# kaniffi.fi

Kati Niemelän (Kaniffi) verkkosivusto: https://kaniffi.fi. Toteutus on tehty Next.js:llä ja TinaCMS:llä, ja sivusto julkaistaan Vercelissä.

Projektin dokumentaatio on tiedostossa [MUISTIINPANOT.md](MUISTIINPANOT.md). Siitä löytyvät rakenne, sisältölohkot, julkaisu ja ylläpito.

## Kehitys

```bash
yarn install
yarn dev
```

`yarn dev` käynnistää Tinan ja Nextin (Node 24). Sivusto aukeaa osoitteeseen http://localhost:3000 ja editori osoitteeseen http://localhost:3000/admin.

Buildia (`yarn build`) varten tarvitaan `.env`-tiedosto. Siihen tulee `NEXT_PUBLIC_TINA_CLIENT_ID` ja `TINA_TOKEN` Tina Cloudista (app.tina.io), lomaketta varten lisäksi `RESEND_API_KEY`.

Ilman Tina Cloud -tunnuksia buildin voi testata paikallisella sisällöllä: `yarn build:local`. Rikastekstin lihavointitesti: `yarn test:mdx`.
