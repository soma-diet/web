<script setup lang="ts">
import { useLog } from "@/composables/log.composable";
import type { LogEntry } from "@/model";
import { useLogStore, useTargetsStore } from "@/stores";
import OutlineButton from "@/ui/action/OutlineButton.vue";
import BackArrowIcon from "@/ui/icon/BackArrowIcon.vue";
import ForwardArrowIcon from "@/ui/icon/ForwardArrowIcon.vue";
import InteractableItem from "@/ui/list/interactable/InteractableItem.vue";
import ListLoadingEffect from "@/ui/list/ListLoadingEffect.vue";
import { computed } from "vue";
import TargetsProgress from "./targets/TargetsProgress.vue";

const emit = defineEmits<{
  (e: "itemSelected", entry: LogEntry): void;
}>();

const { moveDate, deleteEntry } = useLog();

const { logState, logSelectionState } = useLogStore();
const { targetsState } = useTargetsStore();

// ziskat nadpis podle datumu
const isTodaySelected = computed(() => {
  const date = logSelectionState.logDate;
  const today = new Date();
  return date.getDate() === today.getDate();
});

// nastaveni nazvu sekce
const dateString = computed(() => {
  if (isTodaySelected.value) return "Today";
  const date = logSelectionState.logDate;
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate()) return "Yesterday";

  return date.toLocaleDateString("cs-CZ");
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
    <OutlineButton v-show="!isTodaySelected" @click="moveDate(false)">
      <ForwardArrowIcon />
    </OutlineButton>
  </nav>
  <ListLoadingEffect
    v-if="logState.isLoadingEntries || targetsState.isLoadingTargets"
  />
  <template v-else>
    <TargetsProgress :date="logSelectionState.logDate" />
    <ul v-if="logState.entries.length > 0">
      <li v-for="(entry, index) in logState.entries" :key="entry.id">
        <InteractableItem
          :index
          :name="entry.item.name"
          :subtext="`${entry.quantity} ${entry.servingName}`"
          :itemType="entry.item.type"
          :leftAction="true"
          @click="emit('itemSelected', entry)"
          @ondelete="deleteEntry(entry)"
        />
      </li>
    </ul>
    <p class="offcenter" v-else>
      <span class="italic">Have you eaten yet?</span>
    </p>
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
