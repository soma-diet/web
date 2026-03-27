<script setup lang="ts">
import { useTargetsStore } from "@/lib/stores";
import { useSummaryStore } from "@/lib/stores/summary.store";
import OutlineButton from "@/lib/ui/action/OutlineButton.vue";
import BackArrowIcon from "@/lib/ui/icon/BackArrowIcon.vue";
import ForwardArrowIcon from "@/lib/ui/icon/ForwardArrowIcon.vue";
import { computed, ref, watch } from "vue";
import { deleteLogEntry, getLogEntries } from "../../../api/log/log.api";
import type { LogEntry } from "../../../model";
import InteractableItem from "@/lib/ui/list/interactable/InteractableItem.vue";
import ListLoadingEffect from "@/lib/ui/list/ListLoadingEffect.vue";
import TargetsProgress from "./targets/TargetsProgress.vue";

const emit = defineEmits<{
  (e: "itemSelected", entry: LogEntry): void
}>();

const loadingEntries = ref(true);
const logEntries = ref<LogEntry[]>([]);
const dateSelected = ref<Date>(new Date());

const { targetsState, reloadTargets } = useTargetsStore();
const { reloadSummary } = useSummaryStore();

const moveDate = (backwards: boolean) => {
  const increment = backwards ? -1 : 1;
  const changedDate = new Date(dateSelected.value);
  changedDate.setDate(changedDate.getDate() + increment);
  dateSelected.value = changedDate;
}

function loadEntries(date: Date) {
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

const dateString = computed(() => {
  if (isTodaySelected.value) return "Today";
  const date = dateSelected.value;
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate()) return "Yesterday";

  return date.toLocaleDateString('cs-CZ');
});

async function handleEntryDelete(deletedEntry: LogEntry) {
  logEntries.value = logEntries.value.filter((entry: LogEntry) => entry.id !== deletedEntry.id);
  try {
    await deleteLogEntry(deletedEntry);
  } catch (e: any) {
    console.error("Failed to delete log entry", e);
  } finally {
    reloadSummary();
  }
}

reloadTargets();

</script>

<template>
  <nav class="apart center">
    <div class="main left center">
      <OutlineButton @click="moveDate(true)">
        <BackArrowIcon />
      </OutlineButton>
      <h3>{{ dateString }}</h3>
    </div>
    <OutlineButton @click="moveDate(false)" :class="{ 'hidden': isTodaySelected }">
      <ForwardArrowIcon />
    </OutlineButton>
  </nav>
  <ListLoadingEffect v-if="loadingEntries || targetsState.isLoadingTargets" />
  <template v-else>
    <TargetsProgress :date="dateSelected" />
    <ul>
      <template v-for="entry in logEntries">
        <li>
          <InteractableItem :name="entry.item.name" :subtext="`${entry.quantity} ${entry.servingName}`"
            :itemType="entry.item.type" :leftAction="true" :rightAction="true" @onedit="emit('itemSelected', entry)"
            @ondelete="() => handleEntryDelete(entry)" />
        </li>
      </template>
    </ul>
  </template>
</template>

<style scoped>
nav {
  padding: 1rem;
}

nav>.main {
  gap: 1rem;
}

h3 {
  text-transform: uppercase;
}

ul {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
