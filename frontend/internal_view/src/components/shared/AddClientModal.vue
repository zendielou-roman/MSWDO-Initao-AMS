<!-- src/components/shared/AddClientModal.vue -->
<script setup>
import { ref, computed } from 'vue'
import { X, ChevronLeft, ChevronRight, Check, Plus, Trash2 } from 'lucide-vue-next'
import {
  barangaysOfInitao,
  civilStatusOptions,
  householdConditionOptions,
} from '@/data/mockClients'

import PersonIdentifyingFields from '@/components/shared/PersonIdentifyingFields.vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const step2Errors = computed(() => {
  if (sameAsClient.value) return {}
  const errors = {}
  if (!beneficiary.value.surname.trim()) errors.surname = true
  if (!beneficiary.value.firstName.trim()) errors.firstName = true
  if (!beneficiary.value.age) errors.age = true
  if (!beneficiary.value.sex) errors.sex = true
  if (!beneficiary.value.barangay) errors.barangay = true
  return errors
})
const step2Valid = computed(() => sameAsClient.value || Object.keys(step2Errors.value).length === 0)

const emit = defineEmits(['close', 'saved'])

const step = ref(1)
const totalSteps = 4
const stepLabels = ['Client Data', 'Beneficiary Data', 'Family Composition', 'Household & Expenses']

const sameAsClient = ref(true)

const client = ref({
  surname: '',
  firstName: '',
  middleName: '',
  ext: '',
  age: '',
  sex: '',
  purok: '',
  barangay: '',
  religion: '',
  civilStatus: '',
  highestEducation: '',
  dateOfBirth: '',
  placeOfBirth: '',
  occupation: '',
  monthlyIncome: '',
  relationshipToBeneficiary: '',
  pantawid: false,
  philhealth: false,
  contact: '',
})

const beneficiary = ref({
  surname: '',
  firstName: '',
  middleName: '',
  ext: '',
  age: '',
  sex: '',
  purok: '',
  barangay: '',
  civilStatus: '',
  dateOfBirth: '',
  placeOfBirth: '',
  religion: '',
  highestEducation: '',
  occupation: '',
  monthlyIncome: '',
})

const familyMembers = ref([])
function addFamilyMember() {
  familyMembers.value.push({
    name: '',
    age: '',
    civilStatus: '',
    relationship: '',
    education: '',
    occupation: '',
    income: 0,
  })
}
function removeFamilyMember(index) {
  familyMembers.value.splice(index, 1)
}

const otherIncomeSource = ref('')
const otherIncomeAmount = ref(0)
const householdCondition = ref([])
const expenditures = ref({
  food: 0,
  education: 0,
  rent: 0,
  transportation: 0,
  recreation: 0,
  medical: 0,
  others: 0,
})

const familyIncomeTotal = computed(() =>
  familyMembers.value.reduce((sum, m) => sum + (Number(m.income) || 0), 0),
)
const totalMonthlyIncome = computed(
  () =>
    (Number(client.value.monthlyIncome) || 0) +
    familyIncomeTotal.value +
    (Number(otherIncomeAmount.value) || 0),
)
const totalExpenditures = computed(() =>
  Object.values(expenditures.value).reduce((sum, v) => sum + (Number(v) || 0), 0),
)

function toggleHouseholdCondition(option) {
  const i = householdCondition.value.indexOf(option)
  if (i === -1) householdCondition.value.push(option)
  else householdCondition.value.splice(i, 1)
}

const attemptedNext = ref(false) // tracks whether user tried to proceed, to show validation only after a real attempt

const step1Errors = computed(() => {
  const errors = {}
  if (!client.value.surname.trim()) errors.surname = true
  if (!client.value.firstName.trim()) errors.firstName = true
  if (!client.value.age) errors.age = true
  if (!client.value.sex) errors.sex = true
  if (!client.value.barangay) errors.barangay = true
  if (!client.value.contact.trim()) errors.contact = true
  return errors
})
const step1Valid = computed(() => Object.keys(step1Errors.value).length === 0)

function nextStep() {
  attemptedNext.value = true
  if (step.value === 1 && !step1Valid.value) return
  if (step.value === 2 && !step2Valid.value) return
  if (step.value < totalSteps) {
    step.value++
    attemptedNext.value = false
  }
}

function inputClass(hasError) {
  const base = 'rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-400'
  return hasError ? `${base} border-red-400 bg-red-50` : `${base} border-slate-200`
}
function prevStep() {
  if (step.value > 1) step.value--
}

function handleSave() {
  const record = {
    id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
    dateRegistered: new Date().toISOString().slice(0, 10),
    sameAsClient: sameAsClient.value,
    client: client.value,
    beneficiary: sameAsClient.value ? null : beneficiary.value,
    familyComposition: familyMembers.value,
    otherIncomeSource: otherIncomeSource.value,
    otherIncomeAmount: otherIncomeAmount.value,
    totalMonthlyIncome: totalMonthlyIncome.value,
    householdCondition: householdCondition.value,
    expenditures: expenditures.value,
    categories: [],
    status: 'Active',
  }
  emit('saved', record)
  emit('close')
}

const showCloseConfirm = ref(false)
const showSaveConfirm = ref(false)

const hasUnsavedData = computed(() => {
  return (
    client.value.surname.trim() !== '' ||
    client.value.firstName.trim() !== '' ||
    familyMembers.value.length > 0
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
          <p class="font-anton text-lg text-slate-800">Add Client / Beneficiary</p>
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

      <!-- STEP PROGRESS -->
      <div class="flex gap-1 px-5 pt-4">
        <div
          v-for="i in totalSteps"
          :key="i"
          class="h-1.5 flex-1 rounded-full"
          :class="i <= step ? 'bg-[#001d4c]' : 'bg-slate-100'"
        ></div>
      </div>

      <!-- BODY -->
      <div class="flex-1 overflow-y-auto p-5">
        <!-- STEP 1: CLIENT IDENTIFYING DATA -->
        <div v-if="step === 1" class="space-y-4">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-600">
            Client Identifying Data
          </p>

          <PersonIdentifyingFields
            v-model="client"
            :errors="step1Errors"
            :show-attempted="attemptedNext"
            :required-fields="['surname', 'firstName', 'age', 'sex', 'barangay', 'contact']"
          />

          <input
            v-model="client.relationshipToBeneficiary"
            placeholder="Relationship to Beneficiary (e.g., Self, Parent, Neighbor)"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />

          <div class="flex gap-4 text-sm text-slate-600">
            <label class="flex items-center gap-2">
              <input v-model="client.pantawid" type="checkbox" /> Pantawid (4Ps) member
            </label>
            <label class="flex items-center gap-2">
              <input v-model="client.philhealth" type="checkbox" /> PhilHealth member
            </label>
          </div>

          <p
            v-if="attemptedNext && !step1Valid"
            class="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600"
          >
            Please complete all required fields (marked with *) before proceeding.
          </p>
        </div>
        <!-- STEP 2: BENEFICIARY IDENTIFYING DATA -->
        <div v-if="step === 2" class="space-y-4">
          <label
            class="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700"
          >
            <input v-model="sameAsClient" type="checkbox" />
            Beneficiary is the same person as the Client
          </label>

          <template v-if="!sameAsClient">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-600">
              Beneficiary Identifying Data
            </p>
            <PersonIdentifyingFields
              v-model="beneficiary"
              :errors="step2Errors"
              :show-attempted="attemptedNext"
              :required-fields="['surname', 'firstName', 'age', 'sex', 'barangay']"
            />
          </template>

          <p v-else class="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            The client's own information will be used as the beneficiary record.
          </p>
        </div>
        <!-- STEP 3: FAMILY COMPOSITION -->
        <div v-if="step === 3" class="space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-600">
              Family Composition (Household Members)
            </p>
            <button
              class="flex items-center gap-1 text-xs font-semibold text-blue-600"
              @click="addFamilyMember"
            >
              <Plus class="h-3.5 w-3.5" /> Add Member
            </button>
          </div>

          <div
            v-for="(m, i) in familyMembers"
            :key="i"
            class="rounded-lg border border-slate-100 p-3"
          >
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold text-slate-500">Member {{ i + 1 }}</p>
              <button
                aria-label="Remove"
                class="text-red-400 hover:text-red-600"
                @click="removeFamilyMember(i)"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </button>
            </div>
            <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <input
                v-model="m.name"
                placeholder="Name"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <input
                v-model="m.age"
                type="number"
                placeholder="Age"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <select
                v-model="m.civilStatus"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              >
                <option value="">Civil Status</option>
                <option v-for="c in civilStatusOptions" :key="c" :value="c">{{ c }}</option>
              </select>
              <input
                v-model="m.relationship"
                placeholder="Relationship"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <input
                v-model="m.education"
                placeholder="Educ. Attainment"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <input
                v-model="m.occupation"
                placeholder="Occupation"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <input
                v-model="m.income"
                type="number"
                placeholder="Monthly Income (₱)"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 col-span-2 sm:col-span-3"
              />
            </div>
          </div>
          <p
            v-if="familyMembers.length === 0"
            class="rounded-lg bg-slate-50 p-4 text-center text-sm text-slate-400"
          >
            No household members added yet.
          </p>

          <div class="mt-4 space-y-2 border-t border-slate-100 pt-3">
            <div class="grid grid-cols-2 gap-3">
              <input
                v-model="otherIncomeSource"
                placeholder="Other Sources of Income"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <input
                v-model="otherIncomeAmount"
                type="number"
                placeholder="Amount (₱)"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>
            <p class="text-right text-sm font-semibold text-slate-700">
              Total Monthly Family Income: ₱{{ totalMonthlyIncome.toLocaleString() }}
            </p>
          </div>
        </div>

        <!-- STEP 4: HOUSEHOLD CONDITION + EXPENDITURES -->
        <div v-if="step === 4" class="space-y-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400">
              Household Condition
            </p>
            <p class="mt-1 text-[11px] text-slate-400">Check all that apply</p>
            <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <label
                v-for="opt in householdConditionOptions"
                :key="opt"
                class="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
                :class="householdCondition.includes(opt) ? 'border-[#001d4c] bg-slate-50' : ''"
              >
                <input
                  type="checkbox"
                  :checked="householdCondition.includes(opt)"
                  class="h-4 w-4 rounded border-slate-300"
                  @change="toggleHouseholdCondition(opt)"
                />
                {{ opt }}
              </label>
            </div>
          </div>

          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400">
              Monthly Family Expenditures
            </p>
            <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="field in [
                  { key: 'food', label: 'Food' },
                  { key: 'education', label: 'Education' },
                  { key: 'rent', label: 'Rent' },
                  { key: 'transportation', label: 'Transportation' },
                  { key: 'recreation', label: 'Recreation' },
                  { key: 'medical', label: 'Medical Expenses' },
                ]"
                :key="field.key"
              >
                <label class="mb-1 block text-xs font-medium text-slate-600">{{
                  field.label
                }}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    >₱</span
                  >
                  <input
                    v-model="expenditures[field.key]"
                    type="number"
                    placeholder="0"
                    class="w-full rounded-lg border border-slate-200 py-2 pl-7 pr-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label class="mb-1 block text-xs font-medium text-slate-600">Others</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    >₱</span
                  >
                  <input
                    v-model="expenditures.others"
                    type="number"
                    placeholder="0"
                    class="w-full rounded-lg border border-slate-200 py-2 pl-7 pr-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <p class="text-sm font-medium text-slate-600">Total Monthly Expenditures</p>
              <p class="font-display text-lg text-slate-800">
                ₱{{ totalExpenditures.toLocaleString() }}
              </p>
            </div>
          </div>
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
          <Check class="h-4 w-4" /> Save Client/Beneficiary
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
      title="Save this client/beneficiary?"
      message="Please confirm the information you've entered is accurate before saving to the system."
      confirm-label="Yes, Save"
      cancel-label="Review Again"
      variant="default"
      @confirm="confirmSave"
      @cancel="showSaveConfirm = false"
    />
  </div>
</template>
