<template>
  <div>
    <!-- Action Bar (title/date already shown by StaffLayout's top bar) -->
    <div class="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative flex-1">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search operation name, location or ID..."
          class="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
        />
      </div>

      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        @click="filtersOpen = !filtersOpen"
      >
        <SlidersHorizontal :size="16" />
        Filters
      </button>

      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
        @click="onLogOperation"
      >
        <Plus :size="16" />
        Log Relief Operation
      </button>
    </div>

    <div
      v-if="filtersOpen"
      class="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
    >
      <select
        v-model="statusFilter"
        class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-44"
      >
        <option value="All">All Statuses</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Planning Phase">Planning Phase</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        v-model="categoryFilter"
        class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-52"
      >
        <option value="All">All Categories</option>
        <option v-for="category in categoryOptions" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <section class="mb-6">
      <div class="mb-3 flex items-center gap-2">
        <h2 class="text-sm font-bold text-slate-900">Planned Operations</h2>
        <span class="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {{ plannedOperations.length }}
        </span>
      </div>

      <div class="space-y-3">
        <article
          v-for="operation in plannedOperations"
          :key="operation.id"
          class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div
            class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
            :class="operation.icon === 'fire' ? 'bg-sky-50 text-sky-600' : 'bg-fuchsia-50 text-fuchsia-600'"
          >
            <Flame v-if="operation.icon === 'fire'" :size="18" />
            <Package v-else :size="18" />
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-slate-900">{{ operation.name }}</p>
            <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span class="flex items-center gap-1">
                <MapPin :size="13" />
                {{ operation.location }}
              </span>
              <span class="flex items-center gap-1">
                <CalendarDays :size="13" />
                {{ operation.date }} - {{ operation.time }}
              </span>
              <span class="flex items-center gap-1">
                <Users :size="13" />
                {{ operation.target }}
              </span>
            </div>
          </div>

          <span
            class="rounded-md px-3 py-1 text-xs font-semibold"
            :class="statusClass(operation.status)"
          >
            {{ operation.status }}
          </span>
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#001d4c]"
          >
            <MoreHorizontal :size="17" />
          </button>
        </article>

        <p
          v-if="plannedOperations.length === 0"
          class="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-400"
        >
          No planned relief operations found.
        </p>
      </div>
    </section>

    <section>
      <div class="mb-3 flex items-center gap-2">
        <h2 class="text-sm font-bold text-slate-900">Completed Operations</h2>
        <span class="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {{ completedOperations.length }}
        </span>
      </div>

      <div class="space-y-3">
        <article
          v-for="operation in completedOperations"
          :key="operation.id"
          class="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center"
        >
          <div class="flex min-w-0 flex-1 items-center gap-4">
            <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <Check :size="18" />
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-bold text-slate-900">{{ operation.name }}</p>
              <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span class="flex items-center gap-1">
                  <MapPin :size="13" />
                  {{ operation.location }}
                </span>
                <span class="flex items-center gap-1">
                  <CalendarDays :size="13" />
                  {{ operation.date }}
                </span>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-72">
            <div class="mb-1 text-right text-xs font-bold text-slate-700">
              {{ operation.delivered.toLocaleString() }} / {{ operation.targetCount.toLocaleString() }}
              {{ operation.unit }}
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-green-600"
                :style="{ width: progressPercent(operation) + '%' }"
              ></div>
            </div>
          </div>

          <span class="self-start rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 lg:self-center">
            Completed
          </span>

          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-[#001d4c]"
            @click="onViewReport(operation)"
          >
            <FileText :size="16" />
          </button>
        </article>

        <p
          v-if="completedOperations.length === 0"
          class="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-400"
        >
          No completed relief operations found.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  CalendarDays,
  Check,
  FileText,
  Flame,
  MapPin,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-vue-next'
import { dummyReliefOperations } from '@/data/dummyReliefOperations.js'

const searchQuery = ref('')
const filtersOpen = ref(false)
const statusFilter = ref('All')
const categoryFilter = ref('All')

const categoryOptions = ['Emergency Response', 'Preparedness', 'Food Distribution']

const filteredOperations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return dummyReliefOperations.filter((operation) => {
    const matchesQuery =
      !query ||
      operation.id.toLowerCase().includes(query) ||
      operation.name.toLowerCase().includes(query) ||
      operation.location.toLowerCase().includes(query)

    const matchesStatus = statusFilter.value === 'All' || operation.status === statusFilter.value
    const matchesCategory =
      categoryFilter.value === 'All' || operation.category === categoryFilter.value

    return matchesQuery && matchesStatus && matchesCategory
  })
})

const plannedOperations = computed(() =>
  filteredOperations.value.filter((operation) => operation.status !== 'Completed')
)

const completedOperations = computed(() =>
  filteredOperations.value.filter((operation) => operation.status === 'Completed')
)

function statusClass(status) {
  if (status === 'Scheduled') return 'bg-sky-50 text-sky-700'
  if (status === 'Planning Phase') return 'bg-fuchsia-50 text-fuchsia-700'
  return 'bg-green-50 text-green-700'
}

function progressPercent(operation) {
  if (!operation.targetCount) return 0
  return Math.min(100, Math.round((operation.delivered / operation.targetCount) * 100))
}

function onLogOperation() {
  // Non-functional for now -- hook this up to a form/modal once fields are final.
}

function onViewReport(operation) {
  // Non-functional for now -- wire this to a relief operation report once available.
  console.log('View relief operation report:', operation.id)
}
</script>
