# Kde hledat požadavky

Zde jsou vypsány některé z snad splněných požadavků, protože by je mohlo být složité najít v kódu.

<table>
  <thead>
    <tr>
      <td><b>Požadevek</b></td>
      <td><b>Kde hledat</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Grafika - SVG / Canvas</td>
      <td>Po celé stránce jsou použity SVG ikonky i včetně loga.</td>
    </tr>
    <tr>
      <td>Média - Audio/Video</td>
      <td>Ve stránce NotFound.vue je použito video jako pozadí.</td>
    </tr>
    <tr>
      <td>Formulářové prvky (Validace, typy, placeholder, autofocus)</td>
      <td>Všechny formuláře jsou validovány (negativní čísla, velikost uploadu) - FoodFormView.vue, LogEntryFormView.vue, TargetsForm.vue</td>
    </tr>
    <tr>
      <td>CSS3 transformace 2D/3D</td>
      <td>Postupné zobrazení InteractableItem.vue, swipe posun v ActionItem.vue/SwipeableItem.vue. 3D rotace loga RotatingSomaLogo.vue</td>
    </tr>
    <tr>
      <td>CSS3 transitions/animations</td>
      <td>Na tlačítkách, na TargetsProgress.vue barech, zase u ActionItem/SwipeableItem pro animaci.</td>
    </tr>
    <tr>
      <td>Media queries (stránky fungují i na mobilních zařízeních i jiných)</td>
      <td>V jednotlivých .css souborech a jednotlivých komponentách.</td>
    </tr>
    <tr>
      <td>Použití pokročilých JS API (File API, Geolocation, Drag & Drop, LocalStorage, Sockety, ...)</td>
      <td>Použito fetchAPI, FileAPI v ImageInput.vue, Drag & Drop API v dragdrop.composable.ts (FoodFormView.vue)</td>
    </tr>
    <tr>
      <td>Funkční historie (posun tlačítky zpět/vpřed prohlížeče - History API)</td>
      <td>Čistě přes JS tlačítko zpět v NotFound.vue, jinak funguje přes vue-router.</td>
    </tr>
    <tr>
      <td>Ovládání medií (použití Média API - video, zvuk, přehrávání z JS)</td>
      <td>Přehrání zvuku při smazání itemu v InteractableItem.vue</td>
    </tr>
    <tr>
      <td>Offline aplikace (stránka reaguje na stav internetového připojení nebo funguje bez něj)</td>
      <td>Udržuje stav network.composable.ts a reaguje na něj App.vue.</td>
    </tr>
    <tr>
      <td>JS práce s SVG (události, tvorba, úpravy)</td>
      <td>Přes JS se manuálně generují grafy. JS funkcionalita v graph.composable.ts</td>
    </tr>
    <tr>
      <td>Webová komponenta (na stránce je použit vlastní HTML element)</td>
      <td>Vykreslený progress bar pro živiny v přidávání/úpravě log entry. Jeho funkcionalita spočívá v tom, že vykreslí bar dosažených živin + druhý bar kam až dosáhne progress po přidání jídla.</td>
    </tr>
  </tbody>
</table>
