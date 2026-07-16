<!-- src/components/shared/DonationStatusBadge.vue -->
<script setup>
import { donationStatusStyles } from '@/data/mockDonations'
defineProps({ status: { type: String, required: true } })
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="donationStatusStyles[status] || 'bg-slate-100 text-slate-600'"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
    {{ status }}
  </span>
</template>
