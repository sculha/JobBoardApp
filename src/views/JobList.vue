<script setup lang="ts">
import { onMounted } from "vue";
import { useJobStore } from "@/stores/jobs";
import JobFilter from "@/components/JobFilter.vue";
import JobCard from "@/components/JobCard.vue";

const jobStore = useJobStore();

onMounted(() => {
  jobStore.fetchJobs();
});
</script>

<template>
  <div>
    <h1>İş İlanları</h1>

    <JobFilter />

    <a-spin tip="Yükleniyor..." :spinning="jobStore.loading">
      <a-alert
        v-if="jobStore.filteredJobs.length === 0"
        message="Sonuç bulunamadı."
        type="info"
      />
      <a-row :gutter="[15, 15]" v-else>
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          v-for="job in jobStore.filteredJobs"
          :key="job.id"
        >
          <JobCard :job="job" />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>
