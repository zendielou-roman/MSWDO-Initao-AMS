<script setup>
import { ref, computed } from 'vue'
import {
  UserRound,
  UserCheck,
  ShieldCheck,
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import PageIntro from '@/components/shared/PageIntro.vue'
import CreateUserModal from '@/components/users/CreateUserModal.vue'
import { mockUserAccounts, roleDisplayLabels, roleBadgeStyles } from '@/data/mockUsers'
import { ROLES } from '@/config/roleConfig'

// NEW: local reactive copy so newly created users trigger re-renders
const users = ref([...mockUserAccounts])

// NEW: controls modal visibility
const showCreateModal = ref(false)

const searchQuery = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')
const currentPage = ref(1)
const perPage = 6

// CHANGED: mockUserAccounts -> users
const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter((u) => u.status === 'Active').length)
const adminAccounts = computed(() => users.value.filter((u) => u.role === ROLES.ADMIN).length)

// CHANGED: mockUserAccounts -> users
const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value
    const matchesStatus = statusFilter.value === 'all' || u.status === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage))

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// add to script setup, near showCreateModal
const toastMessage = ref('')

function handleCreateUser(newUser) {
  const today = new Date().toISOString().split('T')[0]
  users.value.unshift({
    id: Date.now(),
    name: newUser.name,
    email: newUser.email,
    contactNumber: newUser.contactNumber,
    position: newUser.position,
    role: newUser.role,
    status: 'Active',
    dateCreated: today,
    lastLogin: '—',
  })
  showCreateModal.value = false
  currentPage.value = 1

  toastMessage.value = `Account created for ${newUser.name}`
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <PageIntro />
      <button
        class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showCreateModal = true"
      >
        <Plus class="h-4 w-4" />
        New User Account
      </button>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <KPICard label="Total Users" :value="totalUsers" note="+2 new this week" :icon="UserRound" />
      <KPICard
        label="Active Users"
        :value="activeUsers"
        note="Currently logged in: 4"
        :icon="UserCheck"
      />
      <KPICard
        label="Admin Accounts"
        :value="adminAccounts"
        note="Full system access"
        :icon="ShieldCheck"
      />
    </div>

    <!-- SEARCH + FILTERS -->
    <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
        />
      </div>
      <select
        v-model="roleFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All Roles</option>
        <option v-for="(label, key) in roleDisplayLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <select
        v-model="statusFilter"
        class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
      >
        <option value="all">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <!-- TABLE -->
    <div class="mt-4 rounded-xl border border-slate-100 bg-white shadow-sm">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">User</th>
            <th class="px-5 py-3 font-medium">Role</th>
            <th class="px-5 py-3 font-medium">Status</th>
            <th class="px-5 py-3 font-medium">Date Created</th>
            <th class="px-5 py-3 font-medium">Last Login</th>
            <th class="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="border-b border-slate-50">
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600"
                >
                  {{ initials(user.name) }}
                </div>
                <div>
                  <p class="font-medium text-slate-700">{{ user.name }}</p>
                  <p class="text-xs text-slate-400">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-3">
              <span
                class="rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="roleBadgeStyles[user.role]"
              >
                {{ roleDisplayLabels[user.role] }}
              </span>
            </td>
            <td class="px-5 py-3">
              <span
                class="flex items-center gap-1.5 text-xs font-medium"
                :class="user.status === 'Active' ? 'text-emerald-600' : 'text-red-500'"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                {{ user.status }}
              </span>
            </td>
            <td class="px-5 py-3 text-slate-500">{{ user.dateCreated }}</td>
            <td class="px-5 py-3 text-slate-500">{{ user.lastLogin }}</td>
            <td class="px-5 py-3">
              <div class="flex items-center justify-end gap-3 text-slate-400">
                <button aria-label="Edit user" class="hover:text-slate-700">
                  <Pencil class="h-4 w-4" />
                </button>
                <button aria-label="Delete user" class="hover:text-red-600">
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION -->
      <div
        class="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-400"
      >
        <span>Showing {{ paginatedUsers.length }} of {{ filteredUsers.length }} users</span>
        <div class="flex items-center gap-2">
          <button :disabled="currentPage === 1" class="disabled:opacity-30" @click="currentPage--">
            <ChevronLeft class="h-4 w-4" />
          </button>
          <span>{{ currentPage }} / {{ totalPages || 1 }}</span>
          <button
            :disabled="currentPage === totalPages"
            class="disabled:opacity-30"
            @click="currentPage++"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <!-- add near the bottom of the template, alongside CreateUserModal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-[60] rounded-lg bg-[#001d4c] px-4 py-3 text-sm font-medium text-white shadow-lg"
      >
        {{ toastMessage }}
      </div>
    </Transition>
    <!-- NEW: Create User Modal -->
    <CreateUserModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @create="handleCreateUser"
    />
  </div>
</template>
