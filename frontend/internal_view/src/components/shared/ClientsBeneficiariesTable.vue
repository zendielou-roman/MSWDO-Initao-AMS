<!-- src/components/shared/ClientsBeneficiariesTable.vue -->
<script setup>
import { ref, computed } from 'vue'
import { Search, Plus } from 'lucide-vue-next'
import {
  mockClients,
  barangaysOfInitao,
  clientCategories,
  categoryTagStyles,
  getDisplayName,
  getDisplaySex,
  getDisplayAge,
  getDisplayBarangay,
  getDisplayContact,
} from '@/data/mockClients'
import AddClientModal from '@/components/shared/AddClientModal.vue'

const showAddModal = ref(false)
function handleClientSaved(record) {
  mockClients.unshift(record) // prepend so it shows at top of the list
}

const searchQuery = ref('')
const barangayFilter = ref('all')
const categoryFilter = ref('all')
const statusFilter = ref('all')

const filteredClients = computed(() => {
  return mockClients.filter((c) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch =
      getDisplayName(c).toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      getDisplayContact(c).includes(q)
    const matchesBarangay =
      barangayFilter.value === 'all' || getDisplayBarangay(c) === barangayFilter.value
    const matchesCategory =
      categoryFilter.value === 'all' || c.categories.includes(categoryFilter.value)
    const matchesStatus = statusFilter.value === 'all' || c.status === statusFilter.value
    return matchesSearch && matchesBarangay && matchesCategory && matchesStatus
  })
})
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <p class="text-sm text-slate-500">
        Shared masterlist across all MSWDO programs and focal areas.
      </p>
      <button
        class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
        @click="showAddModal = true"
      >
        <Plus class="h-4 w-4" />
        Add Client/Beneficiary
      </button>
    </div>

    <!-- FILTERS + RESULT COUNT -->
    <div class="mt-4 rounded-t-xl border border-slate-100 bg-white p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, ID, contact..."
            class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
          />
        </div>
        <select
          v-model="barangayFilter"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
        >
          <option value="all">All barangays</option>
          <option v-for="b in barangaysOfInitao" :key="b" :value="b">{{ b }}</option>
        </select>
        <select
          v-model="categoryFilter"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
        >
          <option value="all">All categories</option>
          <option v-for="c in clientCategories" :key="c" :value="c">{{ c }}</option>
        </select>
        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
        >
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <p class="mt-2 text-right text-xs text-slate-400">
        {{ filteredClients.length }} of {{ mockClients.length }} records
      </p>
    </div>

    <!-- TABLE -->
    <div class="overflow-hidden rounded-b-xl border-x border-b border-slate-100 bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400"
          >
            <th class="px-5 py-3 font-medium">ID</th>
            <th class="px-5 py-3 font-medium">Name</th>
            <th class="px-5 py-3 font-medium">Barangay</th>
            <th class="px-5 py-3 font-medium">Contact</th>
            <th class="px-5 py-3 font-medium">Category</th>
            <th class="px-5 py-3 font-medium">Registered</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in filteredClients"
            :key="c.id"
            class="cursor-pointer border-b border-slate-50 hover:bg-slate-50"
          >
            <td class="px-5 py-3 text-slate-500">{{ c.id }}</td>
            <td class="px-5 py-3">
              <p class="font-medium text-slate-700">{{ getDisplayName(c) }}</p>
              <p class="text-xs text-slate-400">
                {{ getDisplaySex(c) }} - {{ getDisplayAge(c) }} y/o
              </p>
            </td>
            <td class="px-5 py-3 text-slate-600">{{ getDisplayBarangay(c) }}</td>
            <td class="px-5 py-3 text-slate-600">{{ getDisplayContact(c) }}</td>
            <td class="px-5 py-3">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="cat in c.categories"
                  :key="cat"
                  class="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  :class="categoryTagStyles[cat]"
                >
                  {{ cat }}
                </span>
              </div>
            </td>
            <td class="px-5 py-3 text-slate-500">{{ c.dateRegistered }}</td>
            <td class="px-5 py-3">
              <span
                class="flex items-center gap-1.5 text-xs font-medium"
                :class="c.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                {{ c.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredClients.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-sm text-slate-400">
              No clients match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddClientModal v-if="showAddModal" @close="showAddModal = false" @saved="handleClientSaved" />
  </div>
</template>
