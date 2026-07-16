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

// local reactive copy so new users trigger re-renders
const users = ref([...mockUserAccounts])
const showCreateModal = ref(false)

const searchQuery = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')
const currentPage = ref(1)
const perPage = 6

const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter((u) => u.status === 'Active').length)
const adminAccounts = computed(() => users.value.filter((u) => u.role === ROLES.ADMIN).length)

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

// ...paginatedUsers, totalPages, initials() stay the same, just reference `users` instead of `mockUserAccounts`

function handleCreateUser(newUser) {
  const today = new Date().toISOString().split('T')[0]
  users.value.unshift({
    id: Date.now(), // simple unique id for mock purposes
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
  currentPage.value = 1 // jump to first page so the new user is visible
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

    <!-- ...KPI cards, search/filters, table stay exactly the same... -->

    <CreateUserModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @create="handleCreateUser"
    />
  </div>
</template>
