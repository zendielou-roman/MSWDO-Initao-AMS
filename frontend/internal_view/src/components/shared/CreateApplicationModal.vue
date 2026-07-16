<!-- src/components/shared/CreateApplicationModal.vue -->
<script setup>
import { ref, computed } from 'vue'
import { X, ChevronLeft, ChevronRight, Check, Search } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { mockClients, getDisplayName, getDisplayBarangay } from '@/data/mockClients'
import {
  incomeExpenditureOptions,
  economicConditionOptions,
  problemsPresentedOptions,
  problemToAssistanceType,
  clientCategoryOptions,
  evaluationOptions,
} from '@/data/mockApplications'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'saved'])
const auth = useAuthStore()

const step = ref(1)
const totalSteps = 3
const stepLabels = ['Select Client', 'Assessment', 'Evaluation & Recommendation']

// ===== STEP 1: CLIENT SELECTION =====
const clientSearch = ref('')
const selectedClient = ref(null)
const filteredClients = computed(() => {
  const q = clientSearch.value.toLowerCase()
  return mockClients.filter(
    (c) => getDisplayName(c).toLowerCase().includes(q) || c.id.toLowerCase().includes(q),
  )
})

// ===== STEP 2: ASSESSMENT =====
const incomeExpenditure = ref('')
const economicCondition = ref('')
const problemsPresented = ref([])
const otherProblem = ref('')
const clientCategories = ref([])
const specificFindings = ref('')
const requestedAmount = ref('')

function toggleProblem(opt) {
  const i = problemsPresented.value.indexOf(opt)
  if (i === -1) problemsPresented.value.push(opt)
  else problemsPresented.value.splice(i, 1)
}
function toggleCategory(opt) {
  const i = clientCategories.value.indexOf(opt)
  if (i === -1) clientCategories.value.push(opt)
  else clientCategories.value.splice(i, 1)
}

// ===== STEP 3: EVALUATION / RECOMMENDATION =====
const evaluation = ref([])
const eligibility = ref('') // 'Eligible' | 'Not Eligible'
const recommendation = ref('')
const informantName = ref('')

function toggleEvaluation(opt) {
  const i = evaluation.value.indexOf(opt)
  if (i === -1) evaluation.value.push(opt)
  else evaluation.value.splice(i, 1)
}

// ===== VALIDATION =====
const attemptedNext = ref(false)
const step1Valid = computed(() => !!selectedClient.value)
const step2Valid = computed(() => problemsPresented.value.length > 0 && requestedAmount.value)
const step3Valid = computed(() => !!eligibility.value)

function nextStep() {
  attemptedNext.value = true
  if (step.value === 1 && !step1Valid.value) return
  if (step.value === 2 && !step2Valid.value) return
  if (step.value < totalSteps) {
    step.value++
    attemptedNext.value = false
  }
}
function prevStep() {
  if (step.value > 1) step.value--
}

const primaryAssistanceType = computed(() => {
  const first = problemsPresented.value[0]
  return first ? problemToAssistanceType[first] : 'AICS - Others'
})

function handleSave() {
  if (!step3Valid.value) {
    attemptedNext.value = true
    return
  }
  const record = {
    id: `APP-2025${Math.floor(100 + Math.random() * 900)}`,
    clientName: getDisplayName(selectedClient.value),
    clientId: selectedClient.value.id,
    submittedBy: auth.user?.name || 'Staff',
    type: primaryAssistanceType.value,
    amount: Number(requestedAmount.value),
    barangay: getDisplayBarangay(selectedClient.value),
    dateSubmitted: new Date().toISOString().slice(0, 10),
    status: eligibility.value === 'Eligible' ? 'Pending' : 'Rejected',
    assessment: {
      incomeExpenditure: incomeExpenditure.value,
      economicCondition: economicCondition.value,
      problemsPresented: problemsPresented.value,
      otherProblem: otherProblem.value,
      clientCategories: clientCategories.value,
      specificFindings: specificFindings.value,
    },
    evaluation: {
      factors: evaluation.value,
      eligibility: eligibility.value,
      recommendation: recommendation.value,
      informantName: informantName.value,
      interviewedBy: auth.user?.name || 'Staff',
    },
  }
  emit('saved', record)
  emit('close')
}

function inputClass(hasError) {
  const base = 'rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400'
  return hasError ? `${base} border-red-400 bg-red-50` : `${base} border-slate-200`
}

const showCloseConfirm = ref(false)
const showSaveConfirm = ref(false)

const hasUnsavedData = computed(() => {
  return (
    !!selectedClient.value ||
    problemsPresented.value.length > 0 ||
    specificFindings.value.trim() !== '' ||
    !!requestedAmount.value
  )
})

function handleCloseAttempt() {
  if (hasUnsavedData.value) {
    showCloseConfirm.value = true
  } else {
    emit('close')
  }
}

function confirmClose() {
  showCloseConfirm.value = false
  emit('close')
}

function handleSaveAttempt() {
  attemptedNext.value = true
  if (!step3Valid.value) return // don't even show the confirm dialog if eligibility isn't set
  showSaveConfirm.value = true
}

function confirmSave() {
  showSaveConfirm.value = false
  handleSave()
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <p class="font-anton text-lg text-slate-800">Create New Application</p>
          <p class="text-xs text-slate-400">
            Step {{ step }} of {{ totalSteps }} — {{ stepLabels[step - 1] }}
          </p>
        </div>
        <button
          aria-label="Close"
          class="text-slate-400 hover:text-slate-700"
          @click="handleCloseAttempt"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <div class="flex gap-1 px-5 pt-4">
        <div
          v-for="i in totalSteps"
          :key="i"
          class="h-1.5 flex-1 rounded-full"
          :class="i <= step ? 'bg-[#001d4c]' : 'bg-slate-100'"
        ></div>
      </div>

      <div class="flex-1 overflow-y-auto p-5">
        <!-- STEP 1: SELECT CLIENT -->
        <div v-if="step === 1" class="space-y-3">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-700">
            Select Client / Beneficiary
          </p>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="clientSearch"
              placeholder="Search by name or ID..."
              class="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div class="max-h-72 space-y-1 overflow-y-auto">
            <button
              v-for="c in filteredClients"
              :key="c.id"
              class="flex w-full items-center justify-between rounded-lg border p-3 text-left transition"
              :class="
                selectedClient?.id === c.id
                  ? 'border-[#001d4c] bg-slate-50'
                  : 'border-slate-100 hover:bg-slate-50'
              "
              @click="selectedClient = c"
            >
              <div>
                <p class="text-sm font-medium text-slate-700">{{ getDisplayName(c) }}</p>
                <p class="text-xs text-slate-400">{{ c.id }} · {{ getDisplayBarangay(c) }}</p>
              </div>
              <Check v-if="selectedClient?.id === c.id" class="h-4 w-4 text-[#001d4c]" />
            </button>
            <p v-if="filteredClients.length === 0" class="py-6 text-center text-sm text-slate-400">
              No matching clients. Add them first via Clients & Beneficiaries.
            </p>
          </div>
          <p
            v-if="attemptedNext && !step1Valid"
            class="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600"
          >
            Please select a client before proceeding.
          </p>
        </div>

        <!-- STEP 2: ASSESSMENT -->
        <div v-if="step === 2" class="space-y-5">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-600">I. Assessment</p>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">Income / Expenditure Analysis</p>
            <div class="space-y-1.5">
              <label
                v-for="opt in incomeExpenditureOptions"
                :key="opt"
                class="flex items-start gap-2 text-sm text-slate-600"
              >
                <input v-model="incomeExpenditure" type="radio" :value="opt" class="mt-0.5" />
                {{ opt }}
              </label>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">Economic Condition</p>
            <div class="space-y-1.5">
              <label
                v-for="opt in economicConditionOptions"
                :key="opt"
                class="flex items-start gap-2 text-sm text-slate-600"
              >
                <input v-model="economicCondition" type="radio" :value="opt" class="mt-0.5" />
                {{ opt }}
              </label>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">
              Problem/s Presented <span class="text-red-500">*</span>
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in problemsPresentedOptions"
                :key="opt"
                type="button"
                class="rounded-full border px-3 py-1 text-xs font-medium transition"
                :class="
                  problemsPresented.includes(opt)
                    ? 'border-[#001d4c] bg-[#001d4c] text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                "
                @click="toggleProblem(opt)"
              >
                {{ opt }}
              </button>
            </div>
            <input
              v-if="problemsPresented.includes('Others')"
              v-model="otherProblem"
              placeholder="Specify other problem"
              class="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">
              Requested Amount (₱) <span class="text-red-500">*</span>
            </p>
            <input
              v-model="requestedAmount"
              type="number"
              placeholder="0.00"
              :class="[inputClass(attemptedNext && !requestedAmount), 'w-full']"
            />
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">Client Category</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in clientCategoryOptions"
                :key="opt"
                type="button"
                class="rounded-full border px-3 py-1 text-xs font-medium transition"
                :class="
                  clientCategories.includes(opt)
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                "
                @click="toggleCategory(opt)"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">Specific Findings</p>
            <textarea
              v-model="specificFindings"
              rows="3"
              class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              placeholder="Social worker's observations..."
            ></textarea>
          </div>

          <p
            v-if="attemptedNext && !step2Valid"
            class="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600"
          >
            Please select at least one problem presented and enter the requested amount.
          </p>
        </div>

        <!-- STEP 3: EVALUATION / RECOMMENDATION -->
        <div v-if="step === 3" class="space-y-5">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-600">
            II. Evaluation / Recommendation
          </p>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in evaluationOptions"
              :key="opt"
              type="button"
              class="rounded-full border px-3 py-1 text-xs font-medium transition"
              :class="
                evaluation.includes(opt)
                  ? 'border-[#001d4c] bg-[#001d4c] text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              "
              @click="toggleEvaluation(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">
              Eligibility <span class="text-red-500">*</span>
            </p>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 text-sm text-slate-600">
                <input v-model="eligibility" type="radio" value="Eligible" /> Eligible
              </label>
              <label class="flex items-center gap-2 text-sm text-slate-600">
                <input v-model="eligibility" type="radio" value="Not Eligible" /> Not Eligible
              </label>
            </div>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">And highly recommended...</p>
            <textarea
              v-model="recommendation"
              rows="3"
              class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              placeholder="Recommendation details..."
            ></textarea>
          </div>

          <div>
            <p class="mb-2 text-sm font-medium text-slate-700">Client / Informant Name</p>
            <input
              v-model="informantName"
              placeholder="Signature over printed name"
              class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div class="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <p>
              Interviewed by:
              <span class="font-medium text-slate-700">{{ auth.user?.name }}</span> ({{
                auth.roleLabel
              }})
            </p>
            <p class="mt-1">Application will route to the Officer-in-Charge for final approval.</p>
          </div>

          <p
            v-if="attemptedNext && !step3Valid"
            class="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600"
          >
            Please indicate eligibility before saving.
          </p>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="flex items-center justify-between border-t border-slate-100 p-5">
        <button
          v-if="step > 1"
          class="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="prevStep"
        >
          <ChevronLeft class="h-4 w-4" /> Back
        </button>
        <div v-else></div>

        <button
          v-if="step < totalSteps"
          class="flex items-center gap-1 rounded-lg bg-[#001d4c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#012a63]"
          @click="nextStep"
        >
          Next <ChevronRight class="h-4 w-4" />
        </button>
        <button
          v-else
          class="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          @click="handleSaveAttempt"
        >
          <Check class="h-4 w-4" /> Submit Application
        </button>
      </div>
    </div>
    <ConfirmDialog
      v-if="showCloseConfirm"
      title="Discard unsaved changes?"
      message="You have unsaved information in this form. If you close now, everything you've entered will be lost."
      confirm-label="Discard & Close"
      cancel-label="Keep Editing"
      variant="danger"
      @confirm="confirmClose"
      @cancel="showCloseConfirm = false"
    />

    <ConfirmDialog
      v-if="showSaveConfirm"
      title="Submit this application?"
      message="This will submit the application for processing. Please confirm the eligibility determination and details entered are accurate before proceeding."
      confirm-label="Yes, Submit"
      cancel-label="Review Again"
      variant="default"
      @confirm="confirmSave"
      @cancel="showSaveConfirm = false"
    />
  </div>
</template>
