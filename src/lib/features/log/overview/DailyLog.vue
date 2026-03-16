<script setup lang="ts">
import { computed, ref, watch } from "vue";
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
const dateSelected = ref<Date>(new Date());
const moveDate = (backwards: boolean) => {
  const increment = backwards ? -1 : 1;
  const changedDate = new Date(dateSelected.value);
  changedDate.setDate(changedDate.getDate() + increment);
  dateSelected.value = changedDate;
}

function loadEntries(date: Date) {
  console.log("reloading entries for " + date.toDateString());
  loadingEntries.value = true;
  logEntries.value = [];

  getLogEntries(date)
    .then((entries: LogEntry[]) => {
      logEntries.value = entries;
    })
    .finally(() => {
      loadingEntries.value = false;
    });
}

watch(dateSelected, (newDate) => loadEntries(newDate), { immediate: true });

const isTodaySelected = computed(() => {
  const date = dateSelected.value;
  const today = new Date();
  return date.getDate() === today.getDate();
});
watch(isTodaySelected, (is: boolean) => console.log("today?", is));
const dateString = computed(() => {
  if (isTodaySelected.value) return "Today";
  const date = dateSelected.value;
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate()) return "Yesterday";

  return date.toLocaleDateString('cs-CZ');
});
</script>

<template>
  <nav class="apart center">
    <div class="left center">
      <TransparentButton @click="moveDate(true)">
        <BackArrowIcon />
      </TransparentButton>
      <h3>{{ dateString }}</h3>
    </div>
    <TransparentButton @click="moveDate(false)" :class="{ 'hidden': isTodaySelected }">
      <ForwardArrowIcon />
    </TransparentButton>
  </nav>
  <TargetsProgress :date="dateSelected" />
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
