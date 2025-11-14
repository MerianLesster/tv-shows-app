<template>
  <div class="pt-4">
    <template v-for="genre in favoriteGenres" :key="genre.type">
      <div class="p-5">
        <p class="text-2xl mb-3 text-primary font-extrabold">{{ genre.type }}</p>
        <Carousel :movies="genre.movies" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import { useMovies } from '@/store/useMovies'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

const { showFavorites } = useMovies()
const { favoriteGenres } = storeToRefs(useMovies())

watchEffect(() => {
  showFavorites()
})
</script>
