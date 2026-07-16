<!-- src/components/shared/BarangaySelect.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Search } from 'lucide-vue-next'
import { barangaysOfInitao } from '@/data/mockClients'

const value = defineModel({ default: '' })
const isOpen = ref(false)
const searchQuery = ref('')
const wrapperRef = ref(null)

const filteredBarangays = computed(() =>
  barangaysOfInitao.filter((b) => b.toLowerCase().includes(searchQuery.value.toLowerCase())),
)

function selectBarangay(b) {
  value.value = b
  isOpen.value = false
  searchQuery.value = ''
}

function closeOnClickOutside(e) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    isOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>

<template>
  <div ref="wrapperRef" class="relative">
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm outline-none focus:border-slate-400"
      :class="value ? 'text-slate-900 font-normal' : 'text-slate-400'"
      @click="isOpen = !isOpen"
    >
      {{ value || 'Barangay' }}
      <ChevronDown class="h-4 w-4 shrink-0 text-slate-400" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-30 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
    >
      <div class="border-b border-slate-100 p-2">
        <div class="relative">
          <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search barangay..."
            class="w-full rounded-md border border-slate-200 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-slate-400"
            @click.stop
          />
        </div>
      </div>
      <div class="max-h-48 overflow-y-auto">
        <button
          v-for="b in filteredBarangays"
          :key="b"
          type="button"
          class="flex w-full items-center px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
          :class="value === b ? 'bg-slate-50 font-medium text-[#001d4c]' : ''"
          @click="selectBarangay(b)"
        >
          {{ b }}
        </button>
        <p
          v-if="filteredBarangays.length === 0"
          class="px-3 py-4 text-center text-xs text-slate-400"
        >
          No matching barangay.
        </p>
      </div>
    </div>
  </div>
</template>
