<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

interface BlogItem {
  tags: string[];
  project: string;
  source: string;
}

const props = defineProps<{
  entries: BlogItem[];
}>();

const selectedTag = ref("all");
const selectedProject = ref("all");
const selectedSource = ref("all");

const tags = computed(() => {
  const set = new Set<string>();
  props.entries.forEach((entry) => entry.tags.forEach((tag) => set.add(tag)));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
});

const projects = computed(() => {
  const set = new Set<string>();
  props.entries.forEach((entry) => set.add(entry.project || "general"));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
});

const sources = computed(() => {
  const set = new Set<string>();
  props.entries.forEach((entry) => set.add(entry.source || "blog"));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
});

const featuredTags = computed(() =>
  tags.value.filter((tag) => tag !== "all").slice(0, 8),
);

const emitFilters = () => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("blog-filters-change", {
      detail: {
        tag: selectedTag.value,
        project: selectedProject.value,
        source: selectedSource.value,
      },
    }),
  );
};

const selectTag = (tag: string) => {
  selectedTag.value = tag;
};

const resetFilters = () => {
  selectedTag.value = "all";
  selectedProject.value = "all";
  selectedSource.value = "all";
};

watch([selectedTag, selectedProject, selectedSource], emitFilters);
onMounted(emitFilters);
</script>

<template>
  <section
    class="dark:bg-bg-secondary-dark rounded-2xl border border-primary/15 bg-white/80 p-4 backdrop-blur-sm md:p-5"
  >
    <div class="mb-4 flex items-center justify-between gap-3">
      <p
        class="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        Browse by tag
      </p>
      <button
        type="button"
        class="text-primary-dark dark:text-primary-light rounded-full border border-primary/25 px-3 py-1 text-xs transition-colors hover:bg-primary/10"
        @click="resetFilters"
      >
        View all
      </button>
    </div>

    <div class="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button
        v-for="tag in featuredTags"
        :key="tag"
        type="button"
        class="group rounded-xl border border-primary/15 p-2 text-left transition-colors hover:border-primary/35"
        @click="selectTag(tag)"
      >
        <div
          class="mb-2 flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 text-[10px] text-neutral-500 dark:text-neutral-400"
        >
          {{ tag }}
        </div>
        <p
          class="text-xs text-neutral-700 capitalize group-hover:text-primary dark:text-neutral-300"
        >
          {{ tag }}
        </p>
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
          >Project</span
        >
        <select
          v-model="selectedProject"
          class="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm dark:bg-neutral-900"
        >
          <option v-for="project in projects" :key="project" :value="project">
            {{ project }}
          </option>
        </select>
      </label>

      <label class="block text-sm">
        <span
          class="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
          >Source</span
        >
        <select
          v-model="selectedSource"
          class="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm dark:bg-neutral-900"
        >
          <option v-for="source in sources" :key="source" :value="source">
            {{ source }}
          </option>
        </select>
      </label>
    </div>
  </section>
</template>
