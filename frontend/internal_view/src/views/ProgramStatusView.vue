<script setup>
import { ref, computed, onMounted } from 'vue'
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
import api from '@/lib/api'

const programs = ref([])
const isLoading = ref(true)

async function fetchPrograms() {
  try {
    const response = await api.get('/programs')
    programs.value = response.data.map((p) => ({
      ...p,
      focalPerson: p.focal_person,
    }))
  } catch (error) {
    console.error('Failed to fetch programs:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPrograms)
const currentPage = ref(1)
const perPage = 6

// modal + toast state
const showAddModal = ref(false)
const editingProgram = ref(null)
const toastMessage = ref('')

function openEditModal(program) {
  editingProgram.value = program
  showAddModal.value = true
}

function closeModal() {
  showAddModal.value = false
  editingProgram.value = null
}

const totalPrograms = computed(() => programs.value.length)
const activePrograms = computed(() => programs.value.filter((p) => p.status === 'Active').length)
const totalAllocation = computed(() => programs.value.reduce((sum, p) => sum + p.allocated, 0))
const totalReleased = computed(() => programs.value.reduce((sum, p) => sum + p.released, 0))
const percentUtilized = computed(() =>
  Math.round((totalReleased.value / totalAllocation.value) * 100),
)

const sortedPrograms = computed(() => {
  return [...programs.value].sort((a, b) => a.id - b.id)
})

const paginatedPrograms = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedPrograms.value.slice(start, start + perPage)
})
const totalPages = computed(() => Math.ceil(programs.value.length / perPage))

function formatCurrency(n) {
  return `₱${n.toLocaleString()}`
}

async function handleToggleStatus(program) {
  const newStatus = program.status === 'Active' ? 'On Hold' : 'Active'

  try {
    const response = await api.put(`/programs/${program.id}`, {
      status: newStatus,
    })
    program.status = response.data.status

    toastMessage.value = `"${program.name}" is now ${response.data.status}`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to update program status:', error)
    toastMessage.value = 'Failed to update program status.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
}

async function handleCreateProgram(newProgram) {
  try {
    const response = await api.post('/programs', {
      name: newProgram.name,
      description: newProgram.description,
      category: newProgram.category,
      allocated: newProgram.allocated,
      focal_person: newProgram.focalPerson,
    })

    programs.value.unshift({
      ...response.data,
      focalPerson: response.data.focal_person,
    })

    showAddModal.value = false
    currentPage.value = 1

    toastMessage.value = `Program "${newProgram.name}" created successfully`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to create program:', error)
    toastMessage.value = error.response?.data?.message || 'Failed to create program.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
}

async function handleUpdateProgram(updatedProgram) {
  try {
    const response = await api.put(`/programs/${updatedProgram.id}`, {
      name: updatedProgram.name,
      description: updatedProgram.description,
      category: updatedProgram.category,
      allocated: updatedProgram.allocated,
      focal_person: updatedProgram.focalPerson,
    })

    const index = programs.value.findIndex((p) => p.id === updatedProgram.id)
    if (index !== -1) {
      programs.value[index] = {
        ...response.data,
        focalPerson: response.data.focal_person,
      }
    }

    closeModal()

    toastMessage.value = `Program "${updatedProgram.name}" updated successfully`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to update program:', error)
    toastMessage.value = error.response?.data?.message || 'Failed to update program.'
    setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <PageIntro />
<button
  class="flex items-center gap-2 rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#012a63]"
  @click="editingProgram = null; showAddModal = true"
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
  @edit="openEditModal"
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
  :program="editingProgram"
  @close="closeModal"
  @create="handleCreateProgram"
  @update="handleUpdateProgram"
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
