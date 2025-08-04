<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useJobStore } from "@/stores/jobs";

export interface Filters {
  title: string
  location?: string | null 
  category?: string | null 
}

const jobStore = useJobStore();

// Filtreler (reaktif)
const filters = reactive<Filters>({
  title: "",
  location: null,
  category: null,
});

const uniqueLocations = useUniqueJobFieldValues("location");
const uniqueCategories = useUniqueJobFieldValues("category");

function useUniqueJobFieldValues(field: keyof Job): ComputedRef<string[]> {
  return computed(() => {
    const values = jobStore.jobs.map((job) => job[field] || "Bilinmiyor");
    const uniqueValues = [...new Set(values)];
    return uniqueValues.sort((a, b) => a.localeCompare(b));
  });
}

watch(
  filters,
  (newFilters: any) => {
    jobStore.applyFilters({ ...newFilters });
  },
  { deep: true }
);

function updateTitle(event: Event): void {
  filters.title = (event.target as HTMLInputElement).value;
}

function handleChangeCategory(value: string): void {
  filters.category = value;
} 

function clearFilters(): void {
  filters.title = "";
  filters.location = null;
  filters.category = null;
  jobStore.fetchJobs();
}
</script>

<template>
  <a-card title="Filtrele" style="margin-bottom: 15px">
    <a-form layout="vertical">
      <a-row :gutter="15">
        <a-col :xs="12" :sm="6">
          <a-form-item label="Anahtar Kelime">
            <a-input
              v-model:value="filters.title"
              placeholder="Pozisyon (örn: frontend)"
              size="large"
              @input="updateTitle"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="12" :sm="6">
          <a-form-item label="Lokasyon">
            <a-select
              v-model:value="filters.location"
              show-search
              size="large"
              placeholder="Tüm Lokasyonlar"
              style="width: 100%"
            >
              <a-select-option v-for="loc in uniqueLocations" :key="loc" :value="loc">
                {{ loc }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :xs="12" :sm="6">
          <a-form-item label="Kategoriler">
            <a-select
              v-model:value="filters.category"
              show-search
              size="large"
              placeholder="Kategori Seç"
              style="width: 100%"
              @change="handleChangeCategory"
            >
              <a-select-option v-for="(item, index) in uniqueCategories" :key="index" :value="item">
                {{ item }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :xs="12" :sm="6">
          <a-form-item label="&nbsp;">
            <a-button size="large" type="primary" @click="clearFilters">Temizle</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
