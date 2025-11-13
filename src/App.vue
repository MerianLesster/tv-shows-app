<template>
  <h1>Hiii. there</h1>
  <Button label="Profile" icon="pi pi-user" />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Button from 'primevue/button'
</script>
