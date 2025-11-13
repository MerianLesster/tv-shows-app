<template>
  <div class="pt-4">
    <template v-for="genre in genres" :key="genre.type">
      <div class="p-5">
        <p class="text-2xl mb-3 font-extrabold">{{ genre.type }}</p>
        <Carousel :movies="genre.movies" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import { useMovies } from '@/composables/useMovies'

const { genres } = useMovies()
</script>
