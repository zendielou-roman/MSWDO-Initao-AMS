<template>
  <div>
    <!-- Action Bar (title/date already shown by StaffLayout's top bar) -->
    <div class="mb-6 flex items-center justify-end">
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-[#001d4c] shadow-sm hover:bg-amber-300"
        @click="onRecordDonation"
      >
        <Plus :size="16" />
        Record New Donation
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <BarChart3 :size="18" class="text-blue-500" />
        </div>
        <p class="text-xs font-medium text-slate-400">Estimated Amount of Donations</p>
        <p class="mt-1 text-2xl font-bold text-slate-900">PHP {{ estimatedAmount.toLocaleString() }}</p>
        <p class="mt-1 text-xs font-medium text-green-600">+10% from last month</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
          <CircleCheck :size="18" class="text-green-500" />
        </div>
        <p class="text-xs font-medium text-slate-400">In-Kind Donations</p>
        <p class="mt-1 text-2xl font-bold text-slate-900">{{ inKindItems }} Items</p>
        <p class="mt-1 text-xs font-medium text-slate-400">Food packs, Clothing, Medical, etc.</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
          <TriangleAlert :size="18" class="text-amber-500" />
        </div>
        <p class="text-xs font-medium text-slate-400">Pending Pre-donations</p>
        <p class="mt-1 text-2xl font-bold text-slate-900">{{ pendingCount }} Records</p>
        <p class="mt-1 text-xs font-medium text-amber-600">Requires Verification</p>
      </div>
    </div>

    <!-- Table Card -->
    <div class="rounded-xl border border-slate-200 bg-white">
      <!-- Search + Controls -->
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search donor, reference no, or type..."
            class="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
          />
        </div>

        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 lg:w-44"
        >
          <option value="All">Filter by Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <CalendarDays :size="16" />
          This Month
        </button>

        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="onExport"
        >
          <Download :size="16" />
          Export
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th class="w-12 px-4 py-3 font-medium">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
              </th>
              <th class="px-4 py-3 font-medium">Reference No.</th>
              <th class="px-4 py-3 font-medium">Donor Name</th>
              <th class="px-4 py-3 font-medium">Type</th>
              <th class="px-4 py-3 font-medium">Amount / Value</th>
              <th class="px-4 py-3 font-medium">Date Received</th>
              <th class="px-4 py-3 font-medium">Status</th>
              <th class="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="donation in filteredDonations"
              :key="donation.referenceNo"
              class="border-b border-slate-50 last:border-0 hover:bg-slate-50"
            >
              <td class="px-4 py-3">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300" />
              </td>
              <td class="px-4 py-3 font-medium text-slate-500">{{ donation.referenceNo }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500"
                  >
                    {{ donation.initials }}
                  </span>
                  <span>
                    <span class="block font-bold text-slate-900">{{ donation.donorName }}</span>
                    <span class="block text-xs text-slate-400">{{ donation.donorType }}</span>
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-700">{{ donation.type }}</td>
              <td class="px-4 py-3 font-bold text-slate-900">{{ donation.amountValue }}</td>
              <td class="px-4 py-3 text-slate-500">{{ donation.dateReceived }}</td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full px-3 py-1 text-xs font-bold"
                  :class="statusClass(donation.status)"
                >
                  {{ donation.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#001d4c]"
                    @click="onViewDonation(donation)"
                  >
                    <Eye :size="16" />
                  </button>
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#001d4c]"
                    @click="onEditDonation(donation)"
                  >
                    <Pencil :size="16" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredDonations.length === 0">
              <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                No matching donation records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
        Showing {{ filteredDonations.length }} donation record{{ filteredDonations.length === 1 ? '' : 's' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  BarChart3,
  CalendarDays,
  CircleCheck,
  Download,
  Eye,
  Pencil,
  Plus,
  Search,
  TriangleAlert,
} from 'lucide-vue-next'
import { dummyDonations } from '@/data/dummyDonations.js'

const searchQuery = ref('')
const statusFilter = ref('All')

const estimatedAmount = 245000
const inKindItems = 450

const pendingCount = computed(() => dummyDonations.filter((donation) => donation.status === 'Pending').length)

const filteredDonations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return dummyDonations.filter((donation) => {
    const matchesQuery =
      !query ||
      donation.referenceNo.toLowerCase().includes(query) ||
      donation.donorName.toLowerCase().includes(query) ||
      donation.type.toLowerCase().includes(query)

    const matchesStatus = statusFilter.value === 'All' || donation.status === statusFilter.value

    return matchesQuery && matchesStatus
  })
})

function statusClass(status) {
  if (status === 'Verified') return 'bg-green-50 text-green-700'
  return 'bg-amber-50 text-amber-700'
}

function onRecordDonation() {
  // Non-functional for now -- hook this up to a form/modal once fields are final.
}

function onExport() {
  // Non-functional for now -- no backend/export endpoint yet.
}

function onViewDonation(donation) {
  // Non-functional for now -- wire to a donation details modal once available.
  console.log('View donation:', donation.referenceNo)
}

function onEditDonation(donation) {
  // Non-functional for now -- wire to an edit donation form once available.
  console.log('Edit donation:', donation.referenceNo)
}
</script>
