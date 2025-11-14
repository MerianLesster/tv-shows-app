<template>
  <div>
    <Header
      title="Welcome to TV Shows"
      description="Looking for something new to watch? TV Shows makes it easy to browse, search, and save your
        favorite series so you never miss a great show again."
    />
    <template v-for="genre in genres" :key="genre.type">
      <div class="p-5">
        <p class="text-2xl mb-3 text-primary font-extrabold">{{ genre.type }}</p>
        <Carousel :movies="genre.movies" />
      </div>
    </template>
    <div v-if="genres.length === 0">
      <p class="text-center text-primary font-bold mt-12 italic">No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Header from '@/components/Header.vue'
import { useMovies } from '@/store/useMovies'
import { storeToRefs } from 'pinia'

const { genres } = storeToRefs(useMovies())
</script>
