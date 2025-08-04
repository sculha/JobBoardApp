<script setup lang="ts">
import type { Job } from '@/stores/jobs'

defineProps<{
  job: Job
}>()
</script>

<template>
    <a-card :title="job.title" :bordered="false">
        <p>{{ job.company }}</p>
        <p>{{ job.location }} ({{ job.workType }})</p>
        <router-link :to="`/jobs/${job.id}`" class="text-blue-500">Detaylar</router-link>
    </a-card>
</template>