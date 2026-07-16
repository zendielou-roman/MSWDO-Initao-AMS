<template>
  <div>
    <!-- Action Bar (title/date already shown by StaffLayout's top bar) -->
    <div class="mb-6 flex items-center justify-end">
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
        @click="onAddClient"
      >
        <UserPlus :size="16" />
        Add Client / Beneficiary
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <Users :size="18" class="text-slate-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ totalRegistered.toLocaleString() }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Total Registered</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 :size="18" class="text-green-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ activeCount.toLocaleString() }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Active</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
          <ShieldCheck :size="18" class="text-purple-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ seniorCitizenCount.toLocaleString() }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Senior Citizens</p>
      </div>

      <div class="rounded-xl border-2 border-amber-300 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
          <Accessibility :size="18" class="text-amber-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ pwdCount.toLocaleString() }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">PWD</p>
      </div>
    </div>

    <!-- Table Card -->
    <div class="rounded-xl border border-slate-200 bg-white">
      <!-- Search + Filters -->
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search name or ID..."
            class="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
          />
        </div>

        <select
          v-model="categoryFilter"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-44"
        >
          <option value="All">All</option>
          <option v-for="category in categoryOptions" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-36"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th class="px-4 py-3 font-medium">Client ID</th>
              <th class="px-4 py-3 font-medium">Name</th>
              <th class="px-4 py-3 font-medium">Barangay</th>
              <th class="px-4 py-3 font-medium">Contact</th>
              <th class="px-4 py-3 font-medium">Category</th>
              <th class="px-4 py-3 font-medium">Date Registered</th>
              <th class="px-4 py-3 font-medium">Status</th>
              <th class="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in filteredClients"
              :key="client.clientId"
              class="border-b border-slate-50 last:border-0 hover:bg-slate-50"
            >
              <td class="px-4 py-3 text-slate-500">{{ client.clientId }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-[#001d4c]/10 text-xs font-semibold text-[#001d4c]"
                  >
                    {{ client.name.charAt(0) }}
                  </span>
                  <span class="font-medium text-slate-900">{{ client.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-500">{{ client.barangay }}</td>
              <td class="px-4 py-3 text-slate-500">{{ client.contact }}</td>
              <td class="px-4 py-3">
                <ClientCategoryBadge :category="client.category" />
              </td>
              <td class="px-4 py-3 text-slate-500">{{ client.dateRegistered }}</td>
              <td class="px-4 py-3">
                <ClientStatusBadge :status="client.status" />
              </td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#001d4c]"
                  @click="selectedClient = client"
                >
                  <Eye :size="16" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredClients.length === 0">
              <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                No matching clients or beneficiaries found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
        {{ filteredClients.length }} record{{ filteredClients.length === 1 ? '' : 's' }}
      </div>
    </div>

    <!-- Client Details Modal (eye icon) -->
    <ClientDetailsModal
      :client="selectedClient"
      :is-open="selectedClient !== null"
      @close="selectedClient = null"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Accessibility, CheckCircle2, Eye, Search, ShieldCheck, UserPlus, Users } from 'lucide-vue-next'
import ClientCategoryBadge from '@/components/staff/ClientCategoryBadge.vue'
import ClientStatusBadge from '@/components/staff/ClientStatusBadge.vue'
import ClientDetailsModal from '@/components/staff/ClientDetailsModal.vue'
import { dummyClients } from '@/data/dummyClients.js'

const searchQuery = ref('')
const categoryFilter = ref('All')
const statusFilter = ref('All')
const selectedClient = ref(null)

const categoryOptions = ['Indigent', 'Senior Citizen', 'PWD', 'Solo Parent']

const totalRegistered = computed(() => dummyClients.length)
const activeCount = computed(() => dummyClients.filter((c) => c.status === 'Active').length)
const seniorCitizenCount = computed(
  () => dummyClients.filter((c) => c.category === 'Senior Citizen').length
)
const pwdCount = computed(() => dummyClients.filter((c) => c.category === 'PWD').length)

const filteredClients = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return dummyClients.filter((client) => {
    const matchesQuery =
      !query ||
      client.name.toLowerCase().includes(query) ||
      client.clientId.toLowerCase().includes(query)

    const matchesCategory = categoryFilter.value === 'All' || client.category === categoryFilter.value
    const matchesStatus = statusFilter.value === 'All' || client.status === statusFilter.value

    return matchesQuery && matchesCategory && matchesStatus
  })
})

function onAddClient() {
  // Non-functional for now — no backend yet.
  // Hook this up to a modal/form once the API is ready.
}
</script>
