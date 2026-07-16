 <script setup>
  import { ref, reactive, computed } from 'vue'
  import { Plus, Pencil, PauseCircle, PlayCircle, PackageOpen, ChevronLeft, ChevronRight } from 'lucide-vue-next'
  import { dummyPrograms } from '@/data/DummyPrograms'
  import ProgramStatusBadge from '@/components/programs/ProgramStatusBadge.vue'
  
  // Cloned into local reactive state so the Hold/Activate toggle can mutate status
  // client-side for now — this becomes a PATCH request once the backend is wired in.
  const programs = reactive(dummyPrograms.map((p) => ({ ...p })))
  
  const currentPage = ref(1)
  const pageSize = 6
  
  const totalPages = computed(() => Math.max(1, Math.ceil(programs.length / pageSize)))
  
  const paginatedPrograms = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return programs.slice(start, start + pageSize)
  })
  
  function toggleHold(program) {
    program.status = program.status === 'Active' ? 'On Hold' : 'Active'
  }
  
  function formatCurrency(value) {
    return `₱${value.toLocaleString('en-US')}`
  }
  </script>
  
  <template>
    <div>
      <!-- Page header -->
      <div class="flex items-center justify-end">
        <button
          class="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#001d4c] shadow-sm transition hover:bg-amber-300 active:scale-[0.98]"
        >
          <Plus class="h-4 w-4" />
          Add New Program
        </button>
      </div>
  
      <!-- Program cards grid -->
      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="program in paginatedPrograms"
          :key="program.id"
          class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <!-- Code + status -->
          <div class="flex items-start justify-between">
            <p class="text-xs font-medium text-slate-400">{{ program.code }}</p>
            <ProgramStatusBadge :status="program.status" />
          </div>
  
          <!-- Name + description -->
          <h3 class="mt-1 text-lg font-bold text-slate-800">{{ program.name }}</h3>
          <p class="mt-1 text-sm text-slate-500">{{ program.description }}</p>
  
          <!-- Budget spent progress -->
          <div class="mt-4">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-slate-500">Budget Spent</span>
              <span class="font-semibold text-slate-700">{{ program.budgetSpentPercent }}%</span>
            </div>
            <div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-[#001d4c] transition-all"
                :style="{ width: program.budgetSpentPercent + '%' }"
              />
            </div>
          </div>
  
          <!-- Financial + beneficiary figures -->
          <div class="mt-4 grid grid-cols-3 gap-2">
            <div>
              <p class="text-sm font-bold text-slate-800">{{ formatCurrency(program.allocated) }}</p>
              <p class="text-[11px] uppercase tracking-wide text-slate-400">Allocated</p>
            </div>
            <div>
              <p class="text-sm font-bold text-amber-500">{{ formatCurrency(program.released) }}</p>
              <p class="text-[11px] uppercase tracking-wide text-slate-400">Released</p>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ program.beneficiaries.toLocaleString() }}</p>
              <p class="text-[11px] uppercase tracking-wide text-slate-400">Beneficiaries</p>
            </div>
          </div>
  
          <!-- Focal person + actions -->
          <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <p class="truncate text-xs text-slate-400">Focal: {{ program.focal }}</p>
            <div class="flex items-center gap-1.5">
              <button
                class="rounded-lg p-2 text-slate-400 transition hover:bg-[#001d4c]/10 hover:text-[#001d4c]"
                title="Edit program"
              >
                <Pencil class="h-4 w-4" />
              </button>
              <button
                v-if="program.status === 'Active'"
                @click="toggleHold(program)"
                class="flex items-center gap-1.5 rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-200"
                title="Put program on hold"
              >
                <PauseCircle class="h-3.5 w-3.5" />
                Hold
              </button>
              <button
                v-else
                @click="toggleHold(program)"
                class="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                title="Reactivate program"
              >
                <PlayCircle class="h-3.5 w-3.5" />
                Activate
              </button>
            </div>
          </div>
        </div>
  
        <!-- Empty state -->
        <div
          v-if="programs.length === 0"
          class="col-span-full flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"
        >
          <PackageOpen class="h-8 w-8 text-slate-300" />
          <p class="text-sm font-medium text-slate-500">No programs found</p>
          <p class="text-xs text-slate-400">Add a new program to get started.</p>
        </div>
      </div>
  
      <!-- Pagination footer -->
      <div
        v-if="programs.length > 0"
        class="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-3.5 shadow-sm"
      >
        <p class="text-xs text-slate-400">
          Showing {{ (currentPage - 1) * pageSize + 1 }}–{{
            Math.min(currentPage * pageSize, programs.length)
          }}
          of {{ programs.length }} programs
        </p>
        <div class="flex items-center gap-1">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>
          <span class="px-2 text-xs font-medium text-slate-500">{{ currentPage }} / {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </template>
  