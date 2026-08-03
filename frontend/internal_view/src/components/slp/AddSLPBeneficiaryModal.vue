<script setup>
import { ref, computed } from 'vue'
import { X, User, MapPin, Briefcase, Wallet } from 'lucide-vue-next'
import { slpTracks } from '@/data/mockSLPBeneficiaries'
import { barangaysForFilter } from '@/data/mockSocialPensionMasterlist'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'create'])

const name = ref('')
const barangay = ref('')
const track = ref('')
const project = ref('')
const capital = ref('')
const errors = ref({})
const confirmMode = ref(null)

const trackOptions = computed(() => slpTracks.filter((t) => t !== 'All tracks'))
const barangayOptions = computed(() => barangaysForFilter.filter((b) => b !== 'All barangays'))

const displayCapital = computed({
  get() {
    if (!capital.value) return ''
    return Number(capital.value).toLocaleString('en-PH')
  },
  set(val) {
    const digitsOnly = val.replace(/[^0-9]/g, '')
    capital.value = digitsOnly ? Number(digitsOnly) : ''
  },
})

const isDirty = computed(() => {
  return !!(name.value.trim() || barangay.value || track.value || project.value.trim())
})

function validate() {
  const e = {}
  if (!name.value.trim()) e.name = 'Full name is required.'
  if (!barangay.value) e.barangay = 'Please select a barangay.'
  if (!track.value) e.track = 'Please select a track.'
  if (!project.value.trim()) e.project = 'Project / business name is required.'
  if (!capital.value || Number(capital.value) <= 0) e.capital = 'Enter a valid capital amount.'
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
    emit('create', {
      name: name.value.trim(),
      barangay: barangay.value,
      track: track.value,
      project: project.value.trim(),
      capital: Number(capital.value),
    })
  }
}

function handleCancelConfirm() {
  confirmMode.value = null
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
    <div class="flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between rounded-t-xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Add SLP Beneficiary</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="requestClose">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <!-- Full Name -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Full Name</label>
          <div class="relative mt-1.5">
            <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="name"
              type="text"
              placeholder="e.g. Miguel Fudalan"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="errors.name ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
            />
          </div>
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Barangay + Track -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Barangay</label>
            <div class="relative mt-1.5">
              <MapPin class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                v-model="barangay"
                class="w-full appearance-none rounded-lg border py-3 pl-9 pr-8 text-sm outline-none"
                :class="
                  errors.barangay ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              >
                <option value="" disabled>Select barangay</option>
                <option v-for="b in barangayOptions" :key="b" :value="b">{{ b }}</option>
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
            <p v-if="errors.barangay" class="mt-1 text-xs text-red-500">{{ errors.barangay }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Track</label>
            <div class="relative mt-1.5">
              <select
                v-model="track"
                class="w-full appearance-none rounded-lg border px-3 py-3 pr-8 text-sm outline-none"
                :class="errors.track ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              >
                <option value="" disabled>Select track</option>
                <option v-for="t in trackOptions" :key="t" :value="t">{{ t }}</option>
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
            <p v-if="errors.track" class="mt-1 text-xs text-red-500">{{ errors.track }}</p>
          </div>
        </div>

        <!-- Project + Capital -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Project / Business</label>
            <div class="relative mt-1.5">
              <Briefcase class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="project"
                type="text"
                placeholder="e.g. Bakery"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="
                  errors.project ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              />
            </div>
            <p v-if="errors.project" class="mt-1 text-xs text-red-500">{{ errors.project }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Capital / Grant (₱)</label>
            <div class="relative mt-1.5">
              <Wallet class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="displayCapital"
                type="text"
                inputmode="numeric"
                placeholder="0"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="
                  errors.capital ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              />
            </div>
            <p v-if="errors.capital" class="mt-1 text-xs text-red-500">{{ errors.capital }}</p>
          </div>
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
          Add Beneficiary
        </button>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this beneficiary. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

  <ConfirmDialog
    v-if="confirmMode === 'create'"
    title="Add this beneficiary?"
    :message="`You're about to enroll ${name} in ${track} under the project '${project}'.`"
    confirm-label="Add Beneficiary"
    cancel-label="Review Again"
    variant="default"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />
</template>