<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useJobStore } from "@/stores/jobs";
import type { Job } from "@/stores/jobs";

const route = useRoute();
const jobStore = useJobStore();

const job = ref<Job | null>(null);

onMounted(async () => {
  if (!jobStore.jobs.length) {
    await jobStore.fetchJobs()
  }

  const idParam = route.params.id
  let jobId: number | null = null

  if (typeof idParam === 'string') {
    jobId = parseInt(idParam)
  } else if (Array.isArray(idParam) && typeof idParam[0] === 'string') {
    jobId = parseInt(idParam[0])
  }

  if (jobId !== null && !isNaN(jobId)) {
    const foundJob = jobStore.getJobById(jobId)
    job.value = foundJob ?? null // undefined ise null yap
  }
});
</script>

<template>
  <a-card :title="job.title" :bordered="false"  v-if="job">
      <p>{{ job.company }}</p>
      <p>{{ job.location }} ({{ job.workType }})</p>
      <div v-html="job.description"></div>
      <router-link to="/">← Geri Dön</router-link>
  </a-card>
</template>
