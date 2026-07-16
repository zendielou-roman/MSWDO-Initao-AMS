<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Plus } from 'lucide-vue-next'
import AdminDashboardContent from '@/components/admin/AdminDashboardContent.vue'
import StaffDashboardContent from '@/components/shared/StaffDashboardContent.vue'
import AICSFocalDashboardExtras from '@/components/focal/AICSFocalDashboardExtras.vue'
import OICDashboardContent from '@/components/oic/OICDashboardContent.vue'
import CreateApplicationModal from '@/components/shared/CreateApplicationModal.vue'

const showCreateModal = ref(false)

const auth = useAuthStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const firstName = computed(() => {
  if (!auth.user?.name) return ''
  return auth.user.name.split(' ')[0]
})

const showNewApplicationButton = computed(() => auth.user?.role !== 'admin')

function handleApplicationSaved() {
  // optional: could trigger a toast/notification here confirming submission
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <div>
        <h2 class="font-anton text-2xl text-[#203c62]">{{ greeting }}, {{ firstName }}..</h2>
        <p class="mt-1 text-sm text-slate-500">
          Signed in as {{ auth.roleLabel }} — Municipal Social Welfare & Development Office, Initao.
        </p>
      </div>

      <button
        v-if="showNewApplicationButton"
        class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showCreateModal = true"
      >
        <Plus class="h-4 w-4" />
        New Application
      </button>
    </div>

    <div class="mt-6">
      <AdminDashboardContent v-if="auth.user?.role === 'admin'" />
      <OICDashboardContent v-else-if="auth.user?.role === 'oic'" />
      <StaffDashboardContent v-else />
      <AICSFocalDashboardExtras v-if="auth.user?.role === 'aics_focal'" />
    </div>
    <CreateApplicationModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @saved="handleApplicationSaved"
    />
  </div>
</template>
