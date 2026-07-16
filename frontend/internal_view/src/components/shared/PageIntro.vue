<!-- src/components/shared/PageIntro.vue -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <p v-if="route.meta.description" class="mb-6 text-sm font-sans text-slate-500">
    {{ route.meta.description }}
  </p>
</template>
