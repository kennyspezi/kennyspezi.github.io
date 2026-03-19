<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

interface ProjectItem {
  slug: string;
  tags: string[];
  status: string;
  isHackathon: boolean;
  contributorsWanted: boolean;
}

const props = defineProps<{
  projects: ProjectItem[];
}>();

const selectedTag = ref("all");
const selectedStatus = ref("all");
const selectedHackathon = ref("all");
const selectedContributors = ref("all");

const setQuickStatus = (value: string) => {
  selectedStatus.value = value;
};

const setQuickHackathon = (value: string) => {
  selectedHackathon.value = value;
};

const statusOrder = [
  "idea",
  "researching",
  "building-now",
  "building-paused",
  "dormant",
  "blocked",
  "shipped",
];

const statusLabelMap: Record<string, string> = {
  all: "all",
  idea: "💡 idea",
  researching: "🔎 researching",
  "building-now": "🔧 building: now",
  "building-paused": "⏸️ building: paused",
  dormant: "😴 dormant",
  blocked: "⛔ blocked",
  shipped: "✅ shipped",
};

const formatStatusLabel = (value: string) => {
  if (statusLabelMap[value]) {
    return statusLabelMap[value];
  }
  return value.replace(/-/g, " ");
};

const tags = computed(() => {
  const all = new Set<string>();
  props.projects.forEach((project) =>
    project.tags.forEach((tag) => all.add(tag)),
  );
  return ["all", ...Array.from(all).sort((a, b) => a.localeCompare(b))];
});

const statuses = computed(() => {
  const all = new Set<string>();
  props.projects.forEach((project) => all.add(project.status || "idea"));
  const found = Array.from(all);
  found.sort((a, b) => {
    const aIndex = statusOrder.indexOf(a);
    const bIndex = statusOrder.indexOf(b);
    const ai = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const bi = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return ai - bi || a.localeCompare(b);
  });
  return ["all", ...found];
});

const emitFilters = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("project-filters-change", {
      detail: {
        tag: selectedTag.value,
        status: selectedStatus.value,
        hackathon: selectedHackathon.value,
        contributorsWanted: selectedContributors.value,
      },
    }),
  );
};

watch(
  [selectedTag, selectedStatus, selectedHackathon, selectedContributors],
  emitFilters,
);
onMounted(emitFilters);
</script>

<template>
  <section
    class="dark:bg-bg-secondary-dark rounded-2xl border border-primary/15 bg-white/80 p-4 backdrop-blur-sm md:p-5"
  >
    <div class="mb-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-full border px-3 py-1 text-xs transition-colors"
        :class="
          selectedStatus === 'all'
            ? 'dark:text-primary-light border-primary/40 bg-primary/10 text-primary dark:bg-primary/20'
            : 'border-primary/20 text-neutral-600 hover:border-primary/35 dark:text-neutral-300'
        "
        @click="setQuickStatus('all')"
      >
        All
      </button>
      <button
        type="button"
        class="rounded-full border px-3 py-1 text-xs transition-colors"
        :class="
          selectedStatus === 'idea'
            ? 'dark:text-primary-light border-primary/40 bg-primary/10 text-primary dark:bg-primary/20'
            : 'border-primary/20 text-neutral-600 hover:border-primary/35 dark:text-neutral-300'
        "
        @click="setQuickStatus('idea')"
      >
        Ideas
      </button>
      <button
        type="button"
        class="rounded-full border px-3 py-1 text-xs transition-colors"
        :class="
          selectedHackathon === 'hackathon'
            ? 'dark:text-primary-light border-primary/40 bg-primary/10 text-primary dark:bg-primary/20'
            : 'border-primary/20 text-neutral-600 hover:border-primary/35 dark:text-neutral-300'
        "
        @click="
          setQuickHackathon(
            selectedHackathon === 'hackathon' ? 'all' : 'hackathon',
          )
        "
      >
        Hackathon
      </button>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <label class="block text-sm">
        <span
          class="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
          >Tag</span
        >
        <select
          v-model="selectedTag"
          class="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm dark:bg-neutral-900"
        >
          <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </label>

      <label class="block text-sm">
        <span
          class="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
          >Status</span
        >
        <select
          v-model="selectedStatus"
          class="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm dark:bg-neutral-900"
        >
          <option v-for="item in statuses" :key="item" :value="item">
            {{ formatStatusLabel(item) }}
          </option>
        </select>
      </label>

      <label class="block text-sm">
        <span
          class="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
          >Contributors</span
        >
        <select
          v-model="selectedContributors"
          class="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm dark:bg-neutral-900"
        >
          <option value="all">all</option>
          <option value="true">wanted</option>
          <option value="false">not needed</option>
        </select>
      </label>
    </div>
  </section>
</template>
