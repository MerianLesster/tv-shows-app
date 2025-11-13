<template>
  <div class="pt-4">
    <Carousel :movies="movies" />
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import { useMovies } from '@/composables/useMovies'

const { movies } = useMovies()
</script>
