<template>
  <div class="card">
    <Carousel
      :value="movies"
      :numVisible="8"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
    >
      <template #item="{ data }">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img :src="data.image.medium" :alt="data.name" class="w-full rounded" />
            </div>
          </div>
          <div class="mb-4 font-bold">{{ data.name }}</div>
          <div class="flex justify-between items-center">
            <span>
              <Button icon="pi pi-heart" severity="secondary" variant="outlined" />
              <Rating v-model="data.rating.average" readonly />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import type { IMovies } from '@/types/index.ts'

defineProps<{
  movies: IMovies[]
}>()

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])
</script>
