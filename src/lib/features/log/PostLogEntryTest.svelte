<script lang="ts">
  import { postLogEntry } from "../../api";

  import { rawItemToFood } from "../../api/food/food.mapper";
  import type { Food, LogEntry } from "../../model";
  import { createLogEntry } from "../../model/log-entry.model";
  import { createServing } from "../../model/serving.model";

  let pribinacekFromBackend: Food = rawItemToFood({
    id: "e2109b1b-d5cd-4896-861b-ba847064bbaf",
    name: "Pribináček Tyčinka s Tvarohem – Výhodné balení",
    is_mass: true,
    image_filename: "e2109b1b-d5cd-4896-861b-ba847064bbaf.jpg",
    brand: "Pribináček",
    macronutrients: {
      carbs: 21,
      fats: 25,
      kcal: 349,
      protein: 10,
    },
    micronutrients: {
      sodium: 0.1,
    },
  });

  let sampleServing = createServing("g", 1);
  let sample: LogEntry = createLogEntry(
    pribinacekFromBackend,
    sampleServing,
    174,
  );

  async function testPostLogEntry() {
    await postLogEntry(sample);
  }
</script>

<form action="">
  <button type="button" onclick={testPostLogEntry}>TEST POST LOG ENTRY</button>
</form>
