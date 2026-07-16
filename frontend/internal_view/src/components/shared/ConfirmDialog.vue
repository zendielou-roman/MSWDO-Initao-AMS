<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: '' },
  confirmLabel: { type: String, default: 'Confirm' },
  cancelLabel: { type: String, default: 'Cancel' },
  variant: { type: String, default: 'default' }, // 'default' | 'danger'
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 px-4">
    <div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
      <div class="flex items-start gap-3">
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          :class="variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'"
        >
          <AlertTriangle class="h-5 w-5" />
        </div>
        <div>
          <h3 class="text-sm font-semibold text-slate-800">{{ title }}</h3>
          <p class="mt-1 text-sm text-slate-500">{{ message }}</p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button
          class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="emit('cancel')"
        >
          {{ cancelLabel }}
        </button>
        <button
          class="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          :class="
            variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#001d4c] hover:bg-[#012a63]'
          "
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
