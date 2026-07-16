<script setup>
import { ref, computed } from 'vue'
import {
  Layers,
  CircleCheck,
  Wallet,
  TrendingUp,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import KPICard from '@/components/shared/KPICard.vue'
import PageIntro from '@/components/shared/PageIntro.vue'
import ProgramCard from '@/components/admin/ProgramCard.vue'
import AddProgramModal from '@/components/programs/AddProgramModal.vue'
import { mockPrograms } from '@/data/mockPrograms'

const programs = ref([...mockPrograms])
const currentPage = ref(1)
const perPage = 6

// NEW: modal + toast state
const showAddModal = ref(false)
const toastMessage = ref('')

const totalPrograms = computed(() => programs.value.length)
const activePrograms = computed(() => programs.value.filter((p) => p.status === 'Active').length)
const totalAllocation = computed(() => programs.value.reduce((sum, p) => sum + p.allocated, 0))
const totalReleased = computed(() => programs.value.reduce((sum, p) => sum + p.released, 0))
const percentUtilized = computed(() =>
  Math.round((totalReleased.value / totalAllocation.value) * 100),
)

const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return programs.value.slice(start, start + perPage)
})
const totalPages = computed(() => Math.ceil(programs.value.length / perPage))

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}

function handleToggleStatus(program) {
  program.status = program.status === 'Active' ? 'On Hold' : 'Active'
}

// NEW: generates the next PRG-### id based on existing ids
function nextProgramId() {
  const nums = programs.value
    .map((p) => parseInt(p.id.replace('PRG-', ''), 10))
    .filter((n) => !isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `PRG-${String(max + 1).padStart(3, '0')}`
}

// NEW: handles 'create' event from AddProgramModal
function handleCreateProgram(newProgram) {
  programs.value.unshift({
    id: nextProgramId(),
    name: newProgram.name,
    description: newProgram.description,
    category: newProgram.category,
    status: 'Active',
    allocated: newProgram.allocated,
    released: 0,
    beneficiaries: 0,
    focalPerson: newProgram.focalPerson,
  })
  showAddModal.value = false
  currentPage.value = 1

  toastMessage.value = `Program "${newProgram.name}" created successfully`
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
        @click="showAddModal = true"
      >
        <Plus class="h-4 w-4" />
        Add New Program
      </button>
    </div>

    <!-- KPI CARDS -->
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard label="Programs" :value="totalPrograms" :icon="Layers" />
      <KPICard label="Active" :value="activePrograms" :icon="CircleCheck" />
      <KPICard label="Total Allocation" :value="formatCurrency(totalAllocation)" :icon="Wallet" />
      <KPICard
        label="Total Released"
        :value="formatCurrency(totalReleased)"
        :note="`${percentUtilized}% utilized`"
        :icon="TrendingUp"
      />
    </div>

    <!-- PROGRAM CARDS GRID -->
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ProgramCard
        v-for="program in paginatedPrograms"
        :key="program.id"
        :program="program"
        @toggle-status="handleToggleStatus"
      />
    </div>

    <!-- PAGINATION -->
    <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
      <span>Showing {{ paginatedPrograms.length }} of {{ totalPrograms }}</span>
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

    <!-- NEW: Add Program Modal -->
    <AddProgramModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @create="handleCreateProgram"
    />

    <!-- NEW: Success toast -->
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
  </div>
</template>
