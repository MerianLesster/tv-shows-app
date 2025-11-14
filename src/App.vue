<template>
  <div class="min-h-screen flex flex-col">
    <Toast />
    <!-- Navbar -->
    <header class="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div class="flex items-center gap-8">
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
        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
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
import { onMounted } from 'vue'

const { fetchMovies } = useMovies()

onMounted(() => {
  fetchMovies()
})
</script>
