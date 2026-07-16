<script setup>
import { ref, computed } from 'vue'
import { X, User, Wallet, Calendar, Tag } from 'lucide-vue-next'
import { donationTypes } from '@/data/mockDonations'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'create'])

const donor = ref('')
const type = ref('')
const value = ref('')
const dateReceived = ref(new Date().toISOString().split('T')[0])
const allocatedTo = ref('')
const status = ref('Pending')
const errors = ref({})
const confirmMode = ref(null)

const STATUS_OPTIONS = ['Pending', 'Recorded', 'Acknowledged']

// comma-formats the value field as the admin types, same pattern as budget field
const displayValue = computed({
  get() {
    if (!value.value) return ''
    return Number(value.value).toLocaleString('en-PH')
  },
  set(val) {
    const digitsOnly = val.replace(/[^0-9]/g, '')
    value.value = digitsOnly ? Number(digitsOnly) : ''
  },
})

const isDirty = computed(() => {
  return !!(donor.value.trim() || type.value || value.value || allocatedTo.value.trim())
})

function validate() {
  const e = {}
  if (!donor.value.trim()) e.donor = 'Donor name is required.'
  if (!type.value) e.type = 'Please select a type.'
  if (!dateReceived.value) e.dateReceived = 'Date received is required.'
  if (!allocatedTo.value.trim()) e.allocatedTo = 'Please specify where this is allocated to.'
  // value is intentionally optional — not all donations (e.g. Service) have a fixed monetary value
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
      donor: donor.value.trim(),
      type: type.value,
      value: value.value ? Number(value.value) : null,
      dateReceived: dateReceived.value,
      allocatedTo: allocatedTo.value.trim(),
      status: status.value,
    })
  }
}

function handleCancelConfirm() {
  confirmMode.value = null
}

function formatDisplayValue() {
  return value.value ? `₱${Number(value.value).toLocaleString()}` : 'In-kind / not specified'
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between rounded-t-xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Record New Donation</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="requestClose">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <!-- Donor Name -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Donor Name</label>
          <div class="relative mt-1.5">
            <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="donor"
              type="text"
              placeholder="e.g. Initao Rotary Club"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="errors.donor ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
            />
          </div>
          <p v-if="errors.donor" class="mt-1 text-xs text-red-500">{{ errors.donor }}</p>
        </div>

        <!-- Type + Date Received -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Type</label>
            <div class="relative mt-1.5">
              <Tag class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                v-model="type"
                class="w-full appearance-none rounded-lg border py-3 pl-9 pr-8 text-sm outline-none"
                :class="errors.type ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              >
                <option value="" disabled>Select type</option>
                <option v-for="t in donationTypes" :key="t" :value="t">{{ t }}</option>
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
            <p v-if="errors.type" class="mt-1 text-xs text-red-500">{{ errors.type }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Date Received</label>
            <div class="relative mt-1.5">
              <Calendar class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="dateReceived"
                type="date"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="
                  errors.dateReceived ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              />
            </div>
            <p v-if="errors.dateReceived" class="mt-1 text-xs text-red-500">
              {{ errors.dateReceived }}
            </p>
          </div>
        </div>

        <!-- Estimated Value -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Estimated Value (₱)</label>
          <div class="relative mt-1.5">
            <Wallet class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="displayValue"
              type="text"
              inputmode="numeric"
              placeholder="0"
              class="w-full rounded-lg border border-slate-200 py-3 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
            />
          </div>
          <p class="mt-1.5 text-xs text-slate-400">
            Leave blank if the donation has no fixed monetary value (e.g. a service donation).
          </p>
        </div>

        <!-- Allocation section -->
        <div class="border-t border-slate-100 pt-5">
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Allocation
          </h3>
          <label class="text-xs font-semibold text-slate-600">Allocated To</label>
          <input
            v-model="allocatedTo"
            type="text"
            placeholder="e.g. AICS, Relief Operations, Feeding Program"
            class="mt-1.5 w-full rounded-lg border px-3 py-3 text-sm outline-none"
            :class="
              errors.allocatedTo ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
            "
          />
          <p v-if="errors.allocatedTo" class="mt-1 text-xs text-red-500">
            {{ errors.allocatedTo }}
          </p>

          <label class="mt-4 block text-xs font-semibold text-slate-600">Status</label>
          <div class="relative mt-1.5">
            <select
              v-model="status"
              class="w-full appearance-none rounded-lg border border-slate-200 px-3 py-3 pr-8 text-sm outline-none focus:border-slate-400"
            >
              <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
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
          Record Donation
        </button>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this donation. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

  <ConfirmDialog
    v-if="confirmMode === 'create'"
    title="Record this donation?"
    :message="`You're about to record a ${type} donation from ${donor} (${formatDisplayValue()}), allocated to ${allocatedTo}. Make sure the details are correct before continuing.`"
    confirm-label="Record Donation"
    cancel-label="Review Again"
    variant="default"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />
</template>
