<script setup lang="ts">
import { ref } from "vue";
import { getLogEntries } from "../../../api/log/log.api";
import type { LogEntry } from "../../../model";
import TransparentButton from "@/lib/ui/action/TransparentButton.vue";
import BackArrowIcon from "@/lib/ui/icon/BackArrowIcon.vue";
import ForwardArrowIcon from "@/lib/ui/icon/ForwardArrowIcon.vue";
import LogItem from "@/lib/ui/list/LogItem.vue";

const emit = defineEmits<{
  (e: "itemSelected", entry: LogEntry): void
}>();

const loadingEntries = ref(true);
const logEntries = ref<LogEntry[]>([]);
getLogEntries()
  .then((entries: LogEntry[]) => {
    logEntries.value = entries;
  })
  .finally(() => {
    loadingEntries.value = false;
  });
</script>

<template>
  <nav class="apart center">
    <div class="left center">
      <TransparentButton @click="() => null">
        <BackArrowIcon />
      </TransparentButton>
      <h3>03.06.2026</h3>
    </div>
    <TransparentButton @click="() => null">
      <ForwardArrowIcon />
    </TransparentButton>
  </nav>
  <TargetsProgress :date="new Date()" />
  <ListLoadingEffect v-if="loadingEntries" />
  <ul v-else>
    <hr />
    <template v-for="entry in logEntries">
      <li>
        <LogItem :name="entry.item.name" :subtext="`${entry.quantity} ${entry.servingName}`" :itemType="entry.item.type"
          @click="emit('itemSelected', entry)" />
      </li>
      <hr />
    </template>
  </ul>
</template>

<style scoped>
nav {
  padding: 1rem;
}

:deep(.date-button) {
  width: 2.5rem;
}

ul {
  flex-grow: 1;
  overflow-y: auto;
}

hr {
  border: 1px solid black;
}
</style>
