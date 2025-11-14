<template>
  <div>
    <Header
      title="Show Details"
      description="Explore detailed information about your selected TV show, including genres, language, summary, and ratings."
    />

    <Button label="Go Back" class="mb-5" icon="pi pi-arrow-left" @click="router.push('/')" />

    <div class="flex gap-5">
      <template v-if="showDetails?.image">
        <img :src="showDetails.image.medium" class="rounded-2xl" :alt="showDetails.name" />
      </template>
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl text-primary-100 font-bold">{{ showDetails?.name }}</h1>
        <div class="flex items-center gap-3">
          <p class="text-sm font-bold w-18">Genres:</p>
          <template v-for="genre in showDetails?.genres" :key="genre">
            <Tag severity="info" :value="genre" rounded></Tag>
          </template>
        </div>
        <div class="flex items-center gap-3">
          <p class="text-sm font-bold w-18">Language:</p>
          <p>{{ showDetails?.language }}</p>
        </div>
        <div class="flex items-start gap-3">
          <p class="text-sm font-bold w-18">Summary:</p>
          <div class="text-sm text-primary-100 font-bold" v-html="showDetails?.summary"></div>
        </div>
        <div class="flex items-center gap-3">
          <p class="text-sm font-bold w-18">Rating:</p>
          <span class="flex items-center gap-2">
            <Rating v-model="computedRating" readonly />
            <Tag severity="warn" :value="showDetails?.rating.average" rounded></Tag>
          </span>
        </div>
        <a
          :href="showDetails?.officialSite"
          target="_blank"
          rel="noopener"
          v-if="showDetails?.officialSite"
        >
          <Button
            class="px-4 py-2 bg-primary-600 text-white rounded-lg mt-4 hover:bg-primary-700 transition flex items-center gap-2"
          >
            <span class="font-bold">Visit Official Site</span>
            <i class="pi pi-external-link mr-2"></i>
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import Button from 'primevue/button'
import type { IMovie } from '@/types/index.ts'
import { useMovies } from '@/store/useMovies'

const router = useRouter()
const route = useRoute()
const { fetchShowDetails } = useMovies()
const showDetails = ref<IMovie | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  showDetails.value = await fetchShowDetails(id)
})

const computedRating = computed(() => {
  if (showDetails.value && showDetails.value.rating && showDetails.value.rating.average) {
    return showDetails.value.rating.average / 2 || 0
  }
  return 0
})
</script>
