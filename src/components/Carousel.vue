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
        <div class="w-full p-2">
          <div class="relative rounded-xl overflow-hidden">
            <img :src="data.image.medium" :alt="data.name" class="w-full object-cover" />
            <div
              class="absolute inset-x-0 bottom-0 p-4 pt-2 bg-linear-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md"
            >
              <div class="text-white font-semibold text-sm truncate mb-1">
                {{ data.name }}
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-200">
                <span class="flex items-center gap-1">
                  <i class="pi pi-star-fill text-yellow-400 text-sm"></i>
                  {{ data.rating.average.toFixed(1) }}
                </span>
                <span class="text-xs bg-white/10 px-2 py-0.5 rounded-full">Action</span>
                <span class="text-xs bg-white/10 px-2 py-0.5 rounded-full">Movie</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Carousel from 'primevue/carousel'
import type { IMovies } from '@/types/index.ts'

defineProps<{
  movies: IMovies[]
}>()

const responsiveOptions = ref([
  {
    breakpoint: '1500px',
    numVisible: 6,
    numScroll: 1,
  },
  {
    breakpoint: '1200px',
    numVisible: 4,
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
