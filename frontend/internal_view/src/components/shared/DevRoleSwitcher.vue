<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { mockUsers } from '@/data/mockUsers'
import { UserCog, ChevronDown } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const isOpen = ref(false)

const roleLabels = {
  admin: 'Admin',
  staff: 'Staff',
  aics_focal: 'AICS Focal',
  oic: 'OIC',
  socpen_focal: 'Sr. Citizen Focal',
  slp_focal: 'SLP Focal',
}

// one mock account per role, in a fixed display order
const roleOrder = ['admin', 'staff', 'aics_focal', 'oic', 'socpen_focal', 'slp_focal']
const switchableUsers = computed(() =>
  roleOrder.map((role) => mockUsers.find((u) => u.role === role)).filter(Boolean),
)

function switchTo(user) {
  const { password: _pw, ...safeUser } = user
  auth.user = safeUser
  localStorage.setItem('mswdo_user', JSON.stringify(safeUser))
  isOpen.value = false
  router.push('/dashboard') // land on dashboard so the new role's view is immediately visible
}

function closeOnClickOutside(e) {
  if (!e.target.closest('.dev-role-switcher')) isOpen.value = false
}
</script>

<template>
  <div class="dev-role-switcher fixed bottom-4 right-4 z-50" @click.stop>
    <button
      class="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-700"
      @click="isOpen = !isOpen"
    >
      <UserCog class="h-4 w-4" />
      Switch Role (Demo)
      <ChevronDown class="h-3 w-3" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      class="absolute bottom-14 right-0 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
    >
      <p class="px-4 pb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        Switch Role (Demo)
      </p>
      <button
        v-for="user in switchableUsers"
        :key="user.id"
        class="flex w-full items-center justify-between px-4 py-2 text-sm transition"
        :class="
          auth.user?.role === user.role
            ? 'bg-amber-50 text-slate-800'
            : 'text-slate-600 hover:bg-slate-50'
        "
        @click="switchTo(user)"
      >
        <span class="flex items-center gap-2">
          <UserCog class="h-4 w-4 text-slate-400" />
          {{ roleLabels[user.role] }}
        </span>
        <span v-if="auth.user?.role === user.role" class="text-[10px] font-bold text-amber-500">
          CURRENT
        </span>
      </button>
    </div>
  </div>
</template>
