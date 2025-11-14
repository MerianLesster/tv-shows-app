<template>
  <div class="pt-4">
    <div class="py-5 px-8 bg-primary-600 rounded-2xl flex flex-col gap-3 mb-6">
      <h1 class="text-4xl text-primary-100 font-bold">Welcome to TV Shows</h1>
      <p class="text-sm text-primary-100 font-bold">
        Looking for something new to watch? TV Shows makes it easy to browse, search, and save your
        favorite series so you never miss a great show again.
      </p>
    </div>
    <template v-for="genre in genres" :key="genre.type">
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

const { genres } = storeToRefs(useMovies())
</script>
