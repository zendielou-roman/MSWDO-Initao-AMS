<script setup>
import { X } from 'lucide-vue-next'
import { roleConfig } from '@/config/roleConfig'
import { menuMeta } from '@/config/roleConfig'
import { roleDisplayLabels, roleBadgeStyles } from '@/data/mockUsers'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between rounded-t-2xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">User Account Details</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 space-y-5 overflow-y-auto p-6">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600"
          >
            {{ initials(user.name) }}
          </div>
          <div>
            <p class="text-lg font-semibold text-slate-800">{{ user.name }}</p>
            <p class="text-xs text-slate-400">{{ user.email }}</p>
          </div>
          <span
            class="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            :class="user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
            {{ user.status }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="rounded-full px-2.5 py-1 text-xs font-semibold"
            :class="roleBadgeStyles[user.role]"
          >
            {{ roleDisplayLabels[user.role] }}
          </span>
        </div>

        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Account Info
          </p>
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Date Created</p>
            <p class="text-slate-700">{{ user.dateCreated || user.created_at?.split('T')[0] }}</p>
            <p class="text-slate-400">Last Login</p>
            <p class="text-slate-700">{{ user.lastLogin || user.last_login_at || '—' }}</p>
          </div>
        </div>

        <div v-if="roleConfig[user.role]" class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            System Access
          </p>
          <p class="mb-2 text-sm text-slate-600">
            Can approve applications:
            <span class="font-medium" :class="roleConfig[user.role].canApprove ? 'text-emerald-600' : 'text-slate-400'">
              {{ roleConfig[user.role].canApprove ? 'Yes' : 'No' }}
            </span>
          </p>
          <p class="mb-1.5 text-xs font-medium text-slate-500">Accessible sections:</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="section in roleConfig[user.role].sidebar"
              :key="section"
              class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600"
            >
              {{ menuMeta[section]?.label || section }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>