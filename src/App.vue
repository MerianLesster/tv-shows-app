<template>
  <div class="min-h-screen flex flex-col">
    <Toast />
    <!-- Navbar -->
    <header
      class="bg-gray-900 text-white px-4 py-3 flex sm:flex-row gap-4 items-center justify-between flex-col shadow-md"
    >
      <div class="flex items-center sm:gap-8 sm:flex-row flex-col gap-4">
        <div class="flex items-center gap-2">
          <img src="/favicon.ico" alt="logo" class="h-8" />
          <p class="text-xl font-bold">TV Shows</p>
        </div>

        <nav class="flex gap-6">
          <RouterLink
            to="/"
            class="hover:text-primary hover:bg-white border rounded-xl p-2 flex items-center gap-1 w-32 justify-center"
            active-class="text-white border-none bg-primary hover:text-primary hover:bg-white font-semibold"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="hover:text-primary hover:bg-white border rounded-xl p-2 flex items-center gap-1 w-32 justify-center"
            active-class="text-white border-none bg-primary hover:text-primary hover:bg-white font-semibold"
          >
            <i class="pi pi-heart-fill mr-1 text-favourite-500"></i>
            <span>Favorites</span>
          </RouterLink>
        </nav>
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-3">
        <InputGroup>
          <InputText
            placeholder="Search"
            type="text"
            class="w-32 sm:w-auto"
            v-model="searchQuery"
            @input="debouncedSearch(searchQuery)"
          />
          <InputGroupAddon>
            <Button icon="pi pi-times" @click="clearSearch" severity="secondary" />
          </InputGroupAddon>
        </InputGroup>

        <img
          src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          alt="User"
          class="h-8 w-8 rounded-full"
        />
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import { useMovies } from '@/store/useMovies'
import { onMounted, ref } from 'vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import { useDebounce } from './composables/useDebounce'

const { fetchMovies, searchMovies } = useMovies()
const searchQuery = ref('')
const debouncedSearch = useDebounce(searchMovies, 500)
onMounted(() => {
  fetchMovies()
})

const clearSearch = () => {
  searchQuery.value = ''
  searchMovies('')
}
</script>
