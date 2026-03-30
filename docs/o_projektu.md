# O projektu SOMA

## Cíl projektu

Hlavním cílem SOMA je poskytnout jednoduchý a přehledný nástroj pro sledování stravy, který uživatele nezatěžuje zbytečnostmi. Aplikace je navržena tak, aby v ní šlo rychle najít potravinu, zapsat ji do deníku a okamžitě vidět aktuální stav denních cílů. Celý koncept je zaměřen na efektivitu, aby samotný zápis jídla zabral co nejméně času.

## Postup řešení

Při vývoji byl kladen důraz na moderní webové technologie. Jako základ slouží Vue.js s TypeScriptem pro zajištění stability a přehlednosti kódu. Vzhled je řešen pomocí čistého CSS s využitím moderních prvků, jako jsou CSS proměnné pro snadnou úpravu designu. Celé rozvržení stojí na flexboxu, což zajišťuje dobrou ovladatelnost na počítači i na mobilních zařízeních. Autentizace uživatelů probíhá přes Firebase a ukládání uživatelských dat a databáze jídel je přes vlastní backend.

## Popis funkčnosti

### Sign In

Toto je úvodní stránka, na kterou jsou všichni přesměrování, pokud se ještě nepřihlásili do aplikace. Podporuje přihlášení přes Google a GitHub OAuth.

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-59-25.png" alt="Sign In Screen" width="600" />
</p>

### Dashboard

Aplikace je rozdělena na několik hlavních částí:

1.  **Deník (Log):** Zde se zobrazuje seznam všeho, co bylo v daný den zkonzumováno. Je možné si procházet i minulé dny a případně jejich záznamy upravit. Každý záznam lze přesunout do jiného dne nebo smazat.
2.  **Přehled cílů:** Přímo v deníku jsou umístěny barevné progress bary, které se plní podle přijatých kalorií a živin. Při přidávání jídla se zobrazuje náhled, jak se tyto hodnoty změní nebo změnily v závislosti na daném záznamu.
3.  **Lednice (Fridge):** Slouží jako katalog potravin. Lze vyhledávat v globální databázi nebo vytvářet vlastní položky. U každé potraviny je možné definovat různé porce (plátek chleba = 20g, ...).
4.  **Analýza (grafy):** Sekce s grafy zobrazuje týdenní souhrny. Uživatel tak má přehled, zda se mu daří dlouhodobě dodržovat nastavené hodnoty.
5.  **Nastavení cílů:** Aplikace umožňuje nastavit vlastní limity pro kalorie a jednotlivé makroživiny (bílkoviny, sacharidy, tuky) i vybrané mikroživiny.

Celý systém funguje svižně, umožňuje nahrávání obrázků k potravinám a obsahuje základní ošetření pro případ výpadku internetového připojení.

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-55-00.png" alt="Dashboard Overview" width="45%" />
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-56-22.png" alt="Dashboard Details" width="45%" />
</p>

#### Podpůrné funkcionality

##### Drag and drop

Na formulář s jídlem funguje drag and drop pro nahrání obrázku jídla.

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-58-55.png" alt="Drag and Drop" width="200" />
</p>

##### Swipeování itemů

Přes hoverování myší na kraji itemu na PC nebo swipeováním na mobilních zařízení je lze mazat nebo upravovat (log entries se upravují klikem na celý item pro zrychlení.)

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-57-02.png" alt="Swipe actions" width="600" />
</p>

### Podpůrné stránky

- **Not Found**: Pro všechny neexistující endpointy.

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-59-32.png" alt="Not Found" width="600" />
</p>
### Media styly

##### Print

<p align="center">
<img src="./o_projektu.assets/Screenshot From 2026-03-30 20-47-39.png" alt="Screenshot From 2026-03-30 20-47-39" height="100%" width="50%" object-fit="contain" />
</p>

##### Mobil

Pro mobil z logiky aplikace bylo nutné upravit i logiku vyměňování oken. Styly mobilu se aplikují pod 1000px šířky okna.

<p align="center" style="display:flex; gap=1rem;">
<img src="./o_projektu.assets/Screenshot From 2026-03-30 20-50-42.png" alt="Screenshot From 2026-03-30 20-50-42" height="300px" />
<img src="./o_projektu.assets/Screenshot From 2026-03-30 20-50-49.png" alt="Screenshot From 2026-03-30 20-50-49" height="300px" />
</p>

## Známe problémy

### Firebase prompt errors v Chromium browserech

#### Cross-Origin policy

<p align="center">
  <img src="./o_projektu.assets/Screenshot From 2026-03-30 19-48-14.png" alt="Firebase Error" width="600" />
</p>

Vyskakovací okno Firebase způsobuje problém s Cross-Origin cookie uvnitř jejich vlastního okna a zdá se, že pro to není zatím žádné normální řešení, jelikož se jedná o jejich vlastní okno.

- viz: [github issue](https://github.com/vercel/next.js/discussions/51135)
