<template>
  <div class="card">
    <Carousel
      :value="movies"
      :numVisible="9"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :showIndicators="false"
    >
      <template #item="{ data }">
        <div class="w-full pr-2 cursor-pointer" @click="router.push('/' + data.id)">
          <div
            class="relative rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-95"
          >
            <button
              class="absolute top-1.5 left-1.5 z-10 bg-black/70 p-2 h-8 w-8 rounded-full text-white transition-colors flex items-center justify-center"
              @click="onFavoriteClick($event, data)"
            >
              <i
                class="pi hover:text-favourite-500 text-lg"
                :class="[data.isFavorite ? 'pi-heart-fill text-favourite-500' : 'pi-heart']"
              >
              </i>
            </button>
            <img :src="data.image.medium" :alt="data.name" class="w-full object-cover" />
            <div
              class="flex items-center gap-1 absolute top-1.5 right-1.5 bg-black/70 px-2 py-1 rounded-2xl"
              v-if="data.rating.average"
            >
              <i class="pi pi-star-fill text-yellow-400 text-sm"></i>
              <span class="text-sm font-bold text-white">
                {{ data.rating.average.toFixed(1) }}
              </span>
            </div>
            <div
              class="absolute inset-x-0 bottom-0 p-4 pt-2 bg-linear-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md"
            >
              <div class="text-white font-semibold text-sm truncate mb-1">
                {{ data.name }}
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-200">
                <template v-for="genre in data.genres" :key="genre">
                  <span class="text-xs bg-white/10 px-2 py-0.5 rounded-full text-nowrap">{{
                    genre
                  }}</span>
                </template>
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
import type { IMovie } from '@/types/index.ts'
import { useMovies } from '@/store/useMovies'
import { router } from '@/router'

defineProps<{
  movies: IMovie[]
}>()

const { addOrRemoveFavorites } = useMovies()

const onFavoriteClick = (event: Event, movie: IMovie) => {
  event.stopPropagation()
  addOrRemoveFavorites(movie)
}

const responsiveOptions = ref([
  {
    breakpoint: '1800px',
    numVisible: 8,
    numScroll: 1,
  },
  {
    breakpoint: '1500px',
    numVisible: 7,
    numScroll: 1,
  },
  {
    breakpoint: '1200px',
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])
</script>

<style scoped>
:deep(.p-carousel-viewport) {
  order: 1;
  width: auto !important;
}
:deep(.p-carousel-prev-button) {
  order: 2;
  align-self: auto;
  border-radius: 12px !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--p-primary-color) !important;
  background-color: white !important;
  border: 1px solid var(--p-primary-color) !important;
}
:deep(.p-carousel-next-button) {
  order: 3;
  align-self: auto;
  border-radius: 12px !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 2px;
  background-color: var(--p-primary-color) !important;
  color: white !important;
}
</style>
