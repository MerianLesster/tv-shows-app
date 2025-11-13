<template>
  <div class="card">
    <Carousel :movies="movies" />
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import type { IMovies } from '@/types/index.ts'
import { ref } from 'vue'

const movies = ref<IMovies[]>([
  {
    id: 1,
    url: 'https://www.tvmaze.com/shows/1/under-the-dome',
    name: 'Under the Dome',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Science-Fiction', 'Thriller'],
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
    },
    rating: { average: 2 / 2 },
  },
  {
    id: 2,
    url: 'https://www.tvmaze.com/shows/2/person-of-interest',
    name: 'Person of Interest',
    type: 'Scripted',
    language: 'English',
    genres: ['Action', 'Crime', 'Science-Fiction'],
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
    },
    rating: { average: 9 / 2 },
  },
  {
    id: 3,
    url: 'https://www.tvmaze.com/shows/3/bitten',
    name: 'Bitten',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Horror', 'Romance'],
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
    },
    rating: { average: 7.2 / 2 },
  },
])
</script>
