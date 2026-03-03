<script>
  import Header from "./lib/Header.svelte";
  import { onMount } from "svelte";
  import { fetchWithAuth } from "./lib/util/api";

  let data = [];

  onMount(async () => {
    try {
      const response = await fetchWithAuth("/api/foods?size=30&page=0");
      data = await response.json();
      console.log("Authenticated response:", data);
    } catch (e) {
      console.error("Authenticated fetch failed:", e.message);
    }
  });
</script>

<Header />
<main>
  <section class="side-view">
    <input type="text" class="field" name="search" />
    <ul>
      <hr />
      <li>
        <div class="col">
          <h5 class="item-name">
            Food name ktere je fakt dlouhe proboha kdo to vymyslel
          </h5>
          <span>Brand</span>
        </div>
        <span>XYZ kcal</span>
      </li>
      <hr />
      <li>
        <div class="col">
          <h5 class="item-name">
            Food name ktere je fakt dlouhe proboha kdo to vymyslel
          </h5>
          <span>Brand</span>
        </div>
        <span>XYZ kcal</span>
      </li>
      <hr />
    </ul>
  </section>
  <section class="main-view">
    <h2>Your log</h2>
  </section>
  <section class="side-view">
    <h2>Graph</h2>
  </section>
</main>
