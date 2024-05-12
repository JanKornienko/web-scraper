# Web Scraper

## :computer: Vývojářská dokumentace

### Použité technologie

- [Yarn](https://yarnpkg.com)
- [Turborepo](https://turbo.build/repo)
- [TypeScript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Express.js](https://expressjs.com)
- [Chakra UI](https://v2.chakra-ui.com)
- [Prettier](https://prettier.io)

### Informace

- Jednotlivé repozitáře jsou ve složce `/apps`, více informací v [dokumentaci](https://turbo.build/repo/docs/core-concepts/monorepos)
- Environmentální proměnné: přejmenovat soubor `.env.example` na `.env`
- Vygenerovaná data se ukládají jako _JSON_ soubory do složky `/apps/api/generatedData`

### Instalace závislostí

```sh
yarn install
```

### Spuštění vývojového prostředí

```sh
yarn dev
```

### Formátování všech souborů v projektu

```sh
yarn format
```

### Vytvoření verze pro produkci

```sh
yarn build
```

## :man: Uživatelská dokumentace

V navigační liště zvolte stránku **Scrape** a pomocí tlačítka **Scrape data** se stáhnou informace o všechn knihách z webu [books.toscrape.com](https://books.toscrape.com). Stahování bude trvat několik desítek vteřin, o všem Vás bude informovat stavová notifikace.

![localhost_3000_(Full HD)](https://github.com/JanKornienko/web-scraper/assets/59119423/d24ece82-5cba-4c07-bd46-92ca9f710e53)

Po úspěšném načtení knih se vraťte na stránku **Home** a můžete začít vyhledávat v knihách pomocí **názvu**, **hodnocení** a **kategorií**.

![localhost_3000_(Full HD) (1)](https://github.com/JanKornienko/web-scraper/assets/59119423/06773ba6-f291-4f91-a7ad-46a1e6d9d785)

Pokud Vás zajímá více informací o knize, stiskněte na tlačítko **View**. Zobrazí se Vám stránka, kde se navíc dozvíte popis a cenu knihy.

![localhost_3000_book_2(Full HD)](https://github.com/JanKornienko/web-scraper/assets/59119423/fc5e02f3-a507-4b44-a093-8cca38d06124)
