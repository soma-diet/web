# O projektu SOMA

## Cíl projektu
Hlavním cílem SOMA je poskytnout jednoduchý a přehledný nástroj pro sledování stravy, který uživatele nezatěžuje zbytečnostmi. Aplikace je navržena tak, aby v ní šlo rychle najít potravinu, zapsat ji do deníku a okamžitě vidět aktuální stav denních cílů. Celý koncept je zaměřen na efektivitu, aby samotný zápis jídla zabral co nejméně času.

## Postup řešení
Při vývoji byl kladen důraz na moderní webové technologie. Jako základ slouží Vue.js s TypeScriptem pro zajištění stability a přehlednosti kódu. Vzhled je řešen pomocí čistého CSS s využitím moderních prvků, jako jsou CSS proměnné pro snadnou úpravu designu. Celé rozvržení stojí na flexboxu, což zajišťuje dobrou ovladatelnost na počítači i na mobilních zařízeních. Autentizace uživatelů probíhá přes Firebase a ukládání uživatelských dat a databáze jídel je přes vlastní backend.

## Popis funkčnosti

### Sign In
Toto je úvodní stránka, na kterou jsou všichni přesměrování, pokud se ještě nepřihlásili do aplikace. Podporuje přihlášení přes Google a GitHub OAuth.

### Dashboard
Aplikace je rozdělena na několik hlavních částí:

1.  **Deník (Log):** Zde se zobrazuje seznam všeho, co bylo v daný den zkonzumováno. Je možné si procházet i minulé dny a případně jejich záznamy upravit. Každý záznam lze přesunout do jiného dne nebo smazat.
2.  **Přehled cílů:** Přímo v deníku jsou umístěny barevné progress bary, které se plní podle přijatých kalorií a živin. Při přidávání jídla se zobrazuje náhled, jak se tyto hodnoty změní nebo změnily v závislosti na daném záznamu.
3.  **Lednice (Fridge):** Slouží jako katalog potravin. Lze vyhledávat v globální databázi nebo vytvářet vlastní položky. U každé potraviny je možné definovat různé porce (plátek chleba = 20g, ...).
4.  **Analýza (grafy):** Sekce s grafy zobrazuje týdenní souhrny. Uživatel tak má přehled, zda se mu daří dlouhodobě dodržovat nastavené hodnoty.
5.  **Nastavení cílů:** Aplikace umožňuje nastavit vlastní limity pro kalorie a jednotlivé makroživiny (bílkoviny, sacharidy, tuky) i vybrané mikroživiny.

### Podpůrné stránky
- **Not Found**: Pro všechny neexistující endpointy.

Celý systém funguje svižně, umožňuje nahrávání obrázků k potravinám a obsahuje základní ošetření pro případ výpadku internetového připojení.
