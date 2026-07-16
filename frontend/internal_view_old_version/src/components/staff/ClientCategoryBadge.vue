<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="styles"
  >
    {{ category }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
})

const CATEGORY_STYLES = {
  Indigent: 'bg-orange-50 text-orange-600',
  'Senior Citizen': 'bg-purple-50 text-purple-600',
  PWD: 'bg-teal-50 text-teal-600',
  'Solo Parent': 'bg-pink-50 text-pink-600',
}

const styles = computed(
  () => CATEGORY_STYLES[props.category] ?? 'bg-slate-100 text-slate-600'
)
</script>
