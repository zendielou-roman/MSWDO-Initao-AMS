<script setup>
import { ref, computed } from 'vue'
import { X, ChevronLeft, ChevronRight, Check, Plus, Trash2 } from 'lucide-vue-next'
import {
  barangaysOfInitao,
  civilStatusOptions,
  householdConditionOptions,
  clientCategories,
} from '@/data/mockClients'

import PersonIdentifyingFields from '@/components/shared/PersonIdentifyingFields.vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const props = defineProps({
  client: {
    type: Object,
    default: null,
  },
})

const isEditMode = computed(() => !!props.client)

const emit = defineEmits(['close', 'saved', 'updated'])

const step = ref(1)
const totalSteps = 4
const stepLabels = ['Client Data', 'Beneficiary Data', 'Family Composition', 'Household & Expenses']

const sameAsClient = ref(props.client?.same_as_client ?? true)

function blankPerson() {
  return {
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
  }
}

const client = ref(
  props.client
    ? {
        surname: props.client.surname ?? '',
        firstName: props.client.first_name ?? '',
        middleName: props.client.middle_name ?? '',
        ext: props.client.ext ?? '',
        age: props.client.age ?? '',
        sex: props.client.sex ?? '',
        purok: props.client.purok ?? '',
        barangay: props.client.barangay ?? '',
        religion: props.client.religion ?? '',
        civilStatus: props.client.civil_status ?? '',
        highestEducation: props.client.highest_education ?? '',
        dateOfBirth: props.client.date_of_birth ?? '',
        placeOfBirth: props.client.place_of_birth ?? '',
        occupation: props.client.occupation ?? '',
        monthlyIncome: props.client.monthly_income ?? '',
        relationshipToBeneficiary: props.client.relationship_to_beneficiary ?? '',
        pantawid: props.client.pantawid ?? false,
        philhealth: props.client.philhealth ?? false,
        contact: props.client.contact ?? '',
      }
    : { ...blankPerson(), relationshipToBeneficiary: '', pantawid: false, philhealth: false, contact: '' },
)

const beneficiary = ref(
  props.client && !props.client.same_as_client
    ? {
        surname: props.client.beneficiary_surname ?? '',
        firstName: props.client.beneficiary_first_name ?? '',
        middleName: props.client.beneficiary_middle_name ?? '',
        ext: props.client.beneficiary_ext ?? '',
        age: props.client.beneficiary_age ?? '',
        sex: props.client.beneficiary_sex ?? '',
        purok: props.client.beneficiary_purok ?? '',
        barangay: props.client.beneficiary_barangay ?? '',
        religion: props.client.beneficiary_religion ?? '',
        civilStatus: props.client.beneficiary_civil_status ?? '',
        highestEducation: props.client.beneficiary_highest_education ?? '',
        dateOfBirth: props.client.beneficiary_date_of_birth ?? '',
        placeOfBirth: props.client.beneficiary_place_of_birth ?? '',
        occupation: props.client.beneficiary_occupation ?? '',
        monthlyIncome: props.client.beneficiary_monthly_income ?? '',
      }
    : blankPerson(),
)

const familyMembers = ref(
  props.client?.family_members?.map((m) => ({
    name: m.name ?? '',
    age: m.age ?? '',
    civilStatus: m.civil_status ?? '',
    relationship: m.relationship ?? '',
    education: m.education ?? '',
    occupation: m.occupation ?? '',
    income: m.income ?? 0,
  })) ?? [],
)
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

const otherIncomeSource = ref(props.client?.other_income_source ?? '')
const otherIncomeAmount = ref(props.client?.other_income_amount ?? 0)
const householdCondition = ref(props.client?.household_condition ?? [])
const categories = ref(props.client?.categories ?? [])

function toggleCategory(cat) {
  const i = categories.value.indexOf(cat)
  if (i === -1) categories.value.push(cat)
  else categories.value.splice(i, 1)
}

const expenditures = ref({
  food: props.client?.food ?? 0,
  education: props.client?.education_exp ?? 0,
  rent: props.client?.rent ?? 0,
  transportation: props.client?.transportation ?? 0,
  recreation: props.client?.recreation ?? 0,
  medical: props.client?.medical ?? 0,
  others: props.client?.others_exp ?? 0,
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

const attemptedNext = ref(false)

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

function buildPayload() {
  return {
    surname: client.value.surname,
    first_name: client.value.firstName,
    middle_name: client.value.middleName,
    ext: client.value.ext,
    age: Number(client.value.age),
    sex: client.value.sex,
    purok: client.value.purok,
    barangay: client.value.barangay,
    religion: client.value.religion,
    civil_status: client.value.civilStatus,
    highest_education: client.value.highestEducation,
    date_of_birth: client.value.dateOfBirth || null,
    place_of_birth: client.value.placeOfBirth,
    occupation: client.value.occupation,
    monthly_income: Number(client.value.monthlyIncome) || 0,
    relationship_to_beneficiary: client.value.relationshipToBeneficiary,
    pantawid: client.value.pantawid,
    philhealth: client.value.philhealth,
    contact: client.value.contact,
    same_as_client: sameAsClient.value,

    beneficiary_surname: sameAsClient.value ? null : beneficiary.value.surname,
    beneficiary_first_name: sameAsClient.value ? null : beneficiary.value.firstName,
    beneficiary_middle_name: sameAsClient.value ? null : beneficiary.value.middleName,
    beneficiary_ext: sameAsClient.value ? null : beneficiary.value.ext,
    beneficiary_age: sameAsClient.value ? null : Number(beneficiary.value.age) || null,
    beneficiary_sex: sameAsClient.value ? null : beneficiary.value.sex,
    beneficiary_purok: sameAsClient.value ? null : beneficiary.value.purok,
    beneficiary_barangay: sameAsClient.value ? null : beneficiary.value.barangay,
    beneficiary_religion: sameAsClient.value ? null : beneficiary.value.religion,
    beneficiary_civil_status: sameAsClient.value ? null : beneficiary.value.civilStatus,
    beneficiary_highest_education: sameAsClient.value ? null : beneficiary.value.highestEducation,
    beneficiary_date_of_birth: sameAsClient.value ? null : beneficiary.value.dateOfBirth || null,
    beneficiary_place_of_birth: sameAsClient.value ? null : beneficiary.value.placeOfBirth,
    beneficiary_occupation: sameAsClient.value ? null : beneficiary.value.occupation,
    beneficiary_monthly_income: sameAsClient.value
      ? null
      : Number(beneficiary.value.monthlyIncome) || null,

    other_income_source: otherIncomeSource.value,
    other_income_amount: Number(otherIncomeAmount.value) || 0,
    total_monthly_income: totalMonthlyIncome.value,
    household_condition: householdCondition.value,
    food: Number(expenditures.value.food) || 0,
    education_exp: Number(expenditures.value.education) || 0,
    rent: Number(expenditures.value.rent) || 0,
    transportation: Number(expenditures.value.transportation) || 0,
    recreation: Number(expenditures.value.recreation) || 0,
    medical: Number(expenditures.value.medical) || 0,
    others_exp: Number(expenditures.value.others) || 0,

    categories: categories.value,

    family_members: familyMembers.value.map((m) => ({
      name: m.name,
      age: Number(m.age) || null,
      civil_status: m.civilStatus,
      relationship: m.relationship,
      education: m.education,
      occupation: m.occupation,
      income: Number(m.income) || 0,
    })),
  }
}

function handleSave() {
  const payload = buildPayload()
  if (isEditMode.value) {
    emit('updated', { id: props.client.id, payload })
  } else {
    emit('saved', payload)
  }
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
  if (isEditMode.value) {
    emit('close')
    return
  }
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

<div>
  <p class="text-xs font-bold uppercase tracking-wide text-slate-600">Assistance Category</p>
  <p class="mt-1 text-[11px] text-slate-400">Check all that apply</p>
  <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
    <label
      v-for="cat in clientCategories"
      :key="cat"
      class="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
      :class="categories.includes(cat) ? 'border-[#001d4c] bg-slate-50' : ''"
    >
      <input
        type="checkbox"
        :checked="categories.includes(cat)"
        class="h-4 w-4 rounded border-slate-300"
        @change="toggleCategory(cat)"
      />
      {{ cat }}
    </label>
  </div>
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
