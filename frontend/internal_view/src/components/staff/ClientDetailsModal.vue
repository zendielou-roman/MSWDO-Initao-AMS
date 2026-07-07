<script setup>
import { X } from 'lucide-vue-next'
import AssistanceStatusBadge from '@/components/staff/AssistanceStatusBadge.vue'

defineProps({
  client: { type: Object, required: true },
  isOpen: { type: Boolean, required: true },
})

defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-2xl rounded-xl bg-white shadow-lg">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 class="text-lg font-bold text-slate-900">Client Details</h2>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600"
          @click="$emit('close')"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Content -->
      <div class="max-h-[70vh] overflow-y-auto px-6 py-4">
        <!-- Personal Information -->
        <div class="mb-6">
          <h3 class="mb-4 font-semibold text-slate-900">Personal Information</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Client ID</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.clientId }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Name</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.name }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Age</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.age }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Sex</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.sex }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Civil Status</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.civilStatus }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Category</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.category }}</p>
            </div>
          </div>
        </div>

        <!-- Contact & Location -->
        <div class="mb-6">
          <h3 class="mb-4 font-semibold text-slate-900">Contact & Location</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Contact Number</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.contact }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Barangay</p>
              <p class="mt-1 text-sm font-medium text-slate-900">{{ client.barangay }}</p>
            </div>
          </div>
        </div>

        <!-- Assistance History -->
        <div class="mb-6">
          <h3 class="mb-4 font-semibold text-slate-900">Assistance History</h3>
          <div v-if="client.assistanceHistory && client.assistanceHistory.length > 0" class="space-y-2">
            <div
              v-for="assistance in client.assistanceHistory"
              :key="assistance.referenceNo"
              class="flex items-center justify-between rounded-lg border border-slate-200 p-3"
            >
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-900">{{ assistance.type }}</p>
                <p class="text-xs text-slate-500">{{ assistance.referenceNo }} · {{ assistance.date }}</p>
              </div>
              <div class="text-right">
                <p class="mb-2 text-sm font-medium text-slate-900">₱{{ assistance.amount.toLocaleString() }}</p>
                <AssistanceStatusBadge :status="assistance.status" />
              </div>
            </div>
          </div>
          <div v-else class="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
            No assistance history yet.
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
