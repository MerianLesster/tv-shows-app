<template>
  <div class="py-5 px-8 bg-primary-600 rounded-2xl flex flex-col gap-3 mb-6">
    <h1 class="text-4xl text-primary-100 font-bold">{{ title }}</h1>
    <p class="text-sm text-primary-100 font-bold">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
