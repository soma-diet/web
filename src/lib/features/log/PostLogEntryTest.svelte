<script lang="ts">
  import { postLogEntry } from "../../api";

  import { rawItemToFood } from "../../api/food/food.mapper";
  import { SYSTEM_SERVINGS } from "../../constants/system-servings.const";
  import type { Food, LogEntry } from "../../model";
  import { createLogEntry } from "../../model/log-entry.model";
  import { createServing } from "../../model/serving.model";

  let pribinacekFromBackend: Food = rawItemToFood({
    id: "d728cec0-d873-4ffb-ada1-de6f9427298a",
    name: "Pribináček Tyčinka s Tvarohem – Výhodné balení",
    is_mass: true,
    image_filename: "e73a6a6c-06b2-4c95-86e4-433331665565.jpg",
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
    servings: [
      {
        id: "7d304b86-099c-4ccd-9544-169812eebf33",
        name: "kus",
        size: 200,
      },
    ],
  });

  // let sampleServing = {
  //   name: "g",
  //   size: 1,
  //   isSystem: true,
  // };
  let sample: LogEntry = createLogEntry(
    pribinacekFromBackend,
    pribinacekFromBackend.servings[0],
    174,
  );

  async function testPostLogEntry() {
    await postLogEntry(sample);
  }
</script>

<form action="">
  <button type="button" onclick={testPostLogEntry}>TEST POST LOG ENTRY</button>
</form>
