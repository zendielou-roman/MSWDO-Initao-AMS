<script setup>
import { ref, computed } from 'vue'
import { X, ClipboardList, Wallet, User, RefreshCw } from 'lucide-vue-next'
import { PROGRAM_CATEGORIES } from '@/config/programConfig'
import { mockUserAccounts } from '@/data/mockUsers'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const props = defineProps({
  program: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'create', 'update'])

const isEditMode = computed(() => !!props.program)

const name = ref(props.program?.name ?? '')
const description = ref(props.program?.description ?? '')
const category = ref(props.program?.category ?? '')
const allocated = ref(props.program?.allocated ?? '')
const focalPersonId = ref('')
const focalPersonManual = ref(props.program?.focalPerson ?? '')
const useManualFocal = ref(isEditMode.value ? true : false)
const errors = ref({})
const confirmMode = ref(null)

const focalOptions = computed(() => mockUserAccounts.map((u) => ({ id: u.id, name: u.name })))

// formats the budget field with commas as the admin types
const displayAllocated = computed({
  get() {
    if (!allocated.value) return ''
    return Number(allocated.value).toLocaleString('en-PH')
  },
  set(val) {
    const digitsOnly = val.replace(/[^0-9]/g, '')
    allocated.value = digitsOnly ? Number(digitsOnly) : ''
  },
})

const isDirty = computed(() => {
  return !!(
    name.value.trim() ||
    description.value.trim() ||
    category.value ||
    allocated.value ||
    focalPersonId.value ||
    focalPersonManual.value.trim()
  )
})

const resolvedFocalName = computed(() => {
  if (useManualFocal.value) return focalPersonManual.value.trim()
  const match = focalOptions.value.find((u) => u.id === focalPersonId.value)
  return match ? match.name : ''
})

function validate() {
  const e = {}
  if (!name.value.trim()) e.name = 'Program name is required.'
  if (!description.value.trim()) e.description = 'Description is required.'
  if (!category.value) e.category = 'Please select a category.'
  if (!allocated.value || Number(allocated.value) <= 0) {
    e.allocated = 'Enter a valid budget amount.'
  }
  if (useManualFocal.value) {
    if (!focalPersonManual.value.trim()) e.focalPerson = 'Enter a focal person name.'
  } else if (!focalPersonId.value) {
    e.focalPerson = 'Select a focal person.'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

function requestClose() {
  if (isDirty.value) {
    confirmMode.value = 'discard'
  } else {
    emit('close')
  }
}

function requestSubmit() {
  if (!validate()) return
  confirmMode.value = 'create'
}

function handleConfirm() {
  if (confirmMode.value === 'discard') {
    confirmMode.value = null
    emit('close')
  } else if (confirmMode.value === 'create') {
    confirmMode.value = null

    const payload = {
      name: name.value.trim(),
      description: description.value.trim(),
      category: category.value,
      allocated: Number(allocated.value),
      focalPerson: resolvedFocalName.value,
    }

    if (isEditMode.value) {
      emit('update', { id: props.program.id, ...payload })
    } else {
      emit('create', payload)
    }
  }
}

function handleCancelConfirm() {
  confirmMode.value = null
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between rounded-t-xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">
  {{ isEditMode ? 'Edit Program' : 'Add New Program' }}
</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="requestClose">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <!-- Program Name -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Program Name</label>
          <div class="relative mt-1.5">
            <ClipboardList
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              v-model="name"
              type="text"
              placeholder="e.g. AICS"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="errors.name ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
            />
          </div>
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Description</label>
          <textarea
            v-model="description"
            rows="2"
            placeholder="Brief description of the program"
            class="mt-1.5 w-full rounded-lg border px-3 py-3 text-sm outline-none"
            :class="
              errors.description ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
            "
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-xs text-red-500">
            {{ errors.description }}
          </p>
        </div>

        <!-- Category + Budget -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Category</label>
            <div class="relative mt-1.5">
              <select
                v-model="category"
                class="w-full appearance-none rounded-lg border px-3 py-3 pr-8 text-sm outline-none"
                :class="
                  errors.category ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              >
                <option value="" disabled>Select category</option>
                <option v-for="c in PROGRAM_CATEGORIES" :key="c" :value="c">{{ c }}</option>
              </select>
              <svg
                class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p v-if="errors.category" class="mt-1 text-xs text-red-500">{{ errors.category }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Budget Allocation (₱)</label>
            <div class="relative mt-1.5">
              <Wallet class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="displayAllocated"
                type="text"
                inputmode="numeric"
                placeholder="0"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="
                  errors.allocated ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              />
            </div>
            <p v-if="errors.allocated" class="mt-1 text-xs text-red-500">{{ errors.allocated }}</p>
          </div>
        </div>

        <!-- Focal Person section -->
        <div class="border-t border-slate-100 pt-5">
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Assignment
          </h3>

          <label class="text-xs font-semibold text-slate-600">Assigned Focal Person</label>

          <div v-if="!useManualFocal" class="relative mt-1.5">
            <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              v-model="focalPersonId"
              class="w-full appearance-none rounded-lg border py-3 pl-9 pr-8 text-sm outline-none"
              :class="
                errors.focalPerson ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
              "
            >
              <option value="" disabled>Select focal person</option>
              <option v-for="u in focalOptions" :key="u.id" :value="u.id">{{ u.name }}</option>
            </select>
          </div>

          <div v-else class="relative mt-1.5">
            <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="focalPersonManual"
              type="text"
              placeholder="Enter focal person's name"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="
                errors.focalPerson ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
              "
            />
          </div>

          <button
            type="button"
            class="mt-2 text-xs font-medium text-[#001d4c] underline underline-offset-2 hover:text-[#012a63]"
            @click="useManualFocal = !useManualFocal"
          >
            {{
              useManualFocal ? 'Choose from existing users instead' : 'Not listed? Enter manually'
            }}
          </button>

          <p v-if="errors.focalPerson" class="mt-1 text-xs text-red-500">
            {{ errors.focalPerson }}
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
        <button
          class="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="requestClose"
        >
          Cancel
        </button>
<button
  class="rounded-lg bg-[#001d4c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#012a63]"
  @click="requestSubmit"
>
  {{ isEditMode ? 'Save Changes' : 'Create Program' }}
</button>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this program. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

<ConfirmDialog
  v-if="confirmMode === 'create'"
  :title="isEditMode ? 'Save these changes?' : 'Create this program?'"
  :message="isEditMode
    ? `You're about to update '${name}'.`
    : `You're about to create '${name}' under ${category}, assigned to ${resolvedFocalName}. Make sure the details are correct before continuing.`"
  :confirm-label="isEditMode ? 'Save Changes' : 'Create Program'"
  cancel-label="Review Again"
  variant="default"
  @confirm="handleConfirm"
  @cancel="handleCancelConfirm"
/>
</template>
