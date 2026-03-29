<script setup lang="ts">
import { useTargetsStore } from "@/stores";
import { useSummaryStore } from "@/stores/summary.store";
import OutlineButton from "@/ui/action/OutlineButton.vue";
import BackArrowIcon from "@/ui/icon/BackArrowIcon.vue";
import ForwardArrowIcon from "@/ui/icon/ForwardArrowIcon.vue";
import { computed, onMounted, ref, watch } from "vue";
import { deleteLogEntry, getLogEntries } from "../../../api/log/log.api";
import InteractableItem from "@/ui/list/interactable/InteractableItem.vue";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";
import TargetsProgress from "./targets/TargetsProgress.vue";
import type { LogEntry } from "@/model";
import { useAlerts } from "@/composables/alert.composable";

const emit = defineEmits<{
  (e: "itemSelected", entry: LogEntry): void;
}>();

const loadingEntries = ref(true);
const logEntries = ref<LogEntry[]>([]);
const dateSelected = ref<Date>(new Date());

const { targetsState } = useTargetsStore();
const { reloadSummary } = useSummaryStore();
const { scheduleAlert } = useAlerts();

const moveDate = (backwards: boolean) => {
  const increment = backwards ? -1 : 1;
  const changedDate = new Date(dateSelected.value);
  changedDate.setDate(changedDate.getDate() + increment);
  dateSelected.value = changedDate;
};

function loadEntries(date: Date) {
  loadingEntries.value = true;
  logEntries.value = [];

  getLogEntries(date)
    .then((entries: LogEntry[]) => {
      logEntries.value = entries;
    })
    .catch((_) => {
      scheduleAlert(
        "Failed to load your log entries. Try refreshing the page.",
      );
    })
    .finally(() => {
      loadingEntries.value = false;
    });
}

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

  return date.toLocaleDateString("cs-CZ");
});

async function handleEntryDelete(deletedEntry: LogEntry) {
  logEntries.value = logEntries.value.filter(
    (entry: LogEntry) => entry.id !== deletedEntry.id,
  );
  try {
    await deleteLogEntry(deletedEntry);
  } catch (e: any) {
    console.error("Failed to delete log entry", e);
  } finally {
    reloadSummary();
  }
}

onMounted(() => {
  watch(dateSelected, (newDate) => loadEntries(newDate), { immediate: true });
});
</script>

<template>
  <nav class="apart center">
    <div class="main left center">
      <OutlineButton @click="moveDate(true)">
        <BackArrowIcon />
      </OutlineButton>
      <h2 class="section-title">{{ dateString }}</h2>
    </div>
    <OutlineButton
      @click="moveDate(false)"
      :class="{ hidden: isTodaySelected }"
    >
      <ForwardArrowIcon />
    </OutlineButton>
  </nav>
  <ListLoadingEffect v-if="loadingEntries || targetsState.isLoadingTargets" />
  <template v-else>
    <TargetsProgress :date="dateSelected" />
    <ul v-if="logEntries.length > 0">
      <template v-for="(entry, index) in logEntries">
        <li>
          <InteractableItem
            :index
            :name="entry.item.name"
            :subtext="`${entry.quantity} ${entry.servingName}`"
            :itemType="entry.item.type"
            :leftAction="true"
            @click="emit('itemSelected', entry)"
            @ondelete="() => handleEntryDelete(entry)"
          />
        </li>
      </template>
    </ul>
    <div class="offcenter" v-else>
      <span class="italic">Have you eaten yet?</span>
    </div>
  </template>
</template>

<style scoped>
nav {
  padding: 1rem;
}

nav > .main {
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
