<script setup>
import { ref, computed } from 'vue'
import { X, User, MapPin, IdCard, Calendar } from 'lucide-vue-next'
import { barangaysForFilter } from '@/data/mockSocialPensionMasterlist'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'create'])

const name = ref('')
const age = ref('')
const barangay = ref('')
const oscaId = ref('')
const source = ref('Regional')
const dateRegistered = ref(new Date().toISOString().split('T')[0])
const errors = ref({})
const confirmMode = ref(null)

const barangayOptions = computed(() => barangaysForFilter.filter((b) => b !== 'All barangays'))

const isDirty = computed(() => {
  return !!(name.value.trim() || age.value || barangay.value || oscaId.value.trim())
})

function validate() {
  const e = {}
  if (!name.value.trim()) e.name = 'Full name is required.'
  if (!age.value || Number(age.value) < 60) e.age = 'Beneficiary must be 60 years old or above.'
  if (!barangay.value) e.barangay = 'Please select a barangay.'
  if (!oscaId.value.trim()) e.oscaId = 'OSCA ID is required.'
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
      age: Number(age.value),
      barangay: barangay.value,
      oscaId: oscaId.value.trim(),
      source: source.value,
      dateRegistered: dateRegistered.value,
      status: 'Active',
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
        <h2 class="text-base font-semibold text-white">Register New Pensioner</h2>
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
              placeholder="e.g. Luz Gemperoa"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="errors.name ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
            />
          </div>
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Age + Barangay -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Age</label>
            <div class="relative mt-1.5">
              <Calendar class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="age"
                type="number"
                min="60"
                placeholder="60+"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="errors.age ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              />
            </div>
            <p v-if="errors.age" class="mt-1 text-xs text-red-500">{{ errors.age }}</p>
          </div>
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
        </div>

        <!-- OSCA ID + Source -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">OSCA ID</label>
            <div class="relative mt-1.5">
              <IdCard class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="oscaId"
                type="text"
                placeholder="e.g. OSCA-9008"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="errors.oscaId ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              />
            </div>
            <p v-if="errors.oscaId" class="mt-1 text-xs text-red-500">{{ errors.oscaId }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Masterlist</label>
            <div class="relative mt-1.5">
              <select
                v-model="source"
                class="w-full appearance-none rounded-lg border border-slate-200 px-3 py-3 pr-8 text-sm outline-none focus:border-slate-400"
              >
                <option value="Regional">Regional</option>
                <option value="Local">Local</option>
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
          Register Pensioner
        </button>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this pensioner. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

  <ConfirmDialog
    v-if="confirmMode === 'create'"
    title="Register this pensioner?"
    :message="`You're about to register ${name} (age ${age}) from ${barangay} under the ${source} masterlist.`"
    confirm-label="Register Pensioner"
    cancel-label="Review Again"
    variant="default"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />
</template>