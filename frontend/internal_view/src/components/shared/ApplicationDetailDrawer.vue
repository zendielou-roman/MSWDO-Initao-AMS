<!-- components/shared/ApplicationDetailDrawer.vue -->
<script setup>
import { useAuthStore } from '@/stores/auth'
import { roleConfig } from '@/config/roleConfig'

const auth = useAuthStore()
const canApprove = roleConfig[auth.user.role].canApprove
</script>

<template>
  <div class="detail-drawer">
    <!-- shared info shown to everyone -->
    <p>{{ application.clientName }} — {{ application.type }}</p>
    <StatusBadge :status="application.status" />

    <!-- only renders for OIC -->
    <div v-if="canApprove" class="approval-actions">
      <button @click="approve">Approve</button>
      <button @click="reject">Reject</button>
    </div>
  </div>
</template>
