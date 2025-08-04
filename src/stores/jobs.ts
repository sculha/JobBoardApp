import { defineStore } from 'pinia'

export interface Job {
  id: number
  title: string
  location?: string | null
  description: string
  company: string
  workType: string
  category?: string | null
}

export interface Filters {
  title: string
  location?: string | null
  category: string | null
  workType: string
}

interface JobState {
  jobs: Job[]
  loading: boolean
  filters: Filters
}

export const useJobStore = defineStore('jobs', {
  state: (): JobState => ({
    jobs: [],
    loading: false,
    filters: {
      title: '',
      location: null,
      category: null,
      workType: ''
    },
  }),
  actions: {
    async fetchJobs() {
      this.loading = true
      try {
        const res = await fetch('/jobs.json')
        const data = await res.json()
        this.jobs = data as Job[]
      } catch (err) {
        console.error('Hata:', err)
      } finally {
        this.loading = false
      }
    },
    getJobById(id: number): Job | undefined {
      return this.jobs.find(job => job.id === id)
    },
    applyFilters(filters: Filters): void {
      this.filters = filters
    },
  },
  getters: {
    filteredJobs(state): Job[] {
      return state.jobs.filter((job: Job): boolean => {
        const matchesTitle =
          state.filters.title === '' ||
          job.title.toLowerCase().includes(state.filters.title.toLowerCase())

        const matchesLocation =
          state.filters.location === null ||
          job.location === state.filters.location

        const matchesCategory =
          state.filters.category === null || 
          job.category === state.filters.category

        return matchesTitle && matchesLocation && matchesCategory
      })
    },
  },
})