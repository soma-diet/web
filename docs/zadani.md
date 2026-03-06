# Zadání SOMA

## Popis aplikace

**O čem je**

Aplikace slouží k trackování, co člověk v daný den snědl, z čehož se počítá množství přijatých kalorií a dalších nutričních hodnot. 

**Funkcionality**

Uživatel bude mít na výběr si svou snězenou potravinu vyhledat ve veřejné databázi nebo si přidat svojí vlastní potravinu, kterou si může do svýho deníku zapsat. U potraviny/jídla si bude moct zadat kolik má kalorií, bílkovin, apod. a přidat různé velikosti porcí (například: plátek sýra 20g apod.). Na základě těchto zalogovaných potravin a porcí se budou vykreslovat různé statistiky/grafy, na základě kterých může uživatel přehodnotit svoje stravovací návyky. Aplikace data bude ukládat na vzdálený server, tudíž se dostane ke svým záznamům po přihlášení i v jiném zařízení (neplánuji lokální úložiště).

**Rozdělení stránek**

Aplikace by měla být na jedné stránce s případným přesunutím na stránku pro přihlášení (plánováno pomocí Firebase) a případně na stránku s grafy, pokud by nevypadaly dobře vtěsnané na hlavní stránku. Hlavní stránka bude totiž rozdělenou na sekce, jejichž obsah se bude vyměňovat (klikne na jídlo -> zobrazí se detail na přidání místo vyhledávání / klikne na přidat -> místo logu třeba se ukáže menu pro lognutí potraviny)



