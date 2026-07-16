<script setup>
import { ref, computed } from 'vue'
import { X, ClipboardList, Calendar, Users, Boxes } from 'lucide-vue-next'
import { reliefOperationTypes } from '@/data/mockReliefOperations'
import BarangaySelect from '@/components/shared/BarangaySelect.vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'create'])

const event = ref('')
const type = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const barangay = ref('')
const beneficiaries = ref('')
const beneficiaryUnit = ref('')
const itemsDistributed = ref('')
const itemUnit = ref('')
const status = ref('Planned')
const errors = ref({})
const confirmMode = ref(null)

const BENEFICIARY_UNITS = ['families', 'households', 'individuals']
const STATUS_OPTIONS = ['Planned', 'Pending', 'Ongoing', 'Completed']

const isDirty = computed(() => {
  return !!(
    event.value.trim() ||
    type.value ||
    barangay.value ||
    beneficiaries.value ||
    beneficiaryUnit.value ||
    itemsDistributed.value ||
    itemUnit.value.trim()
  )
})

function validate() {
  const e = {}
  if (!event.value.trim()) e.event = 'Event name is required.'
  if (!type.value) e.type = 'Please select a type.'
  if (!date.value) e.date = 'Date is required.'
  if (!barangay.value) e.barangay = 'Please select a barangay.'
  if (!beneficiaries.value || Number(beneficiaries.value) <= 0) {
    e.beneficiaries = 'Enter a valid beneficiary count.'
  }
  if (!beneficiaryUnit.value) e.beneficiaryUnit = 'Select a unit.'
  if (!itemsDistributed.value || Number(itemsDistributed.value) <= 0) {
    e.itemsDistributed = 'Enter a valid item count.'
  }
  if (!itemUnit.value.trim()) e.itemUnit = 'Describe the item unit (e.g. relief packs).'
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
      event: event.value.trim(),
      type: type.value,
      date: date.value,
      barangay: barangay.value,
      beneficiaries: Number(beneficiaries.value),
      beneficiaryUnit: beneficiaryUnit.value,
      itemsDistributed: Number(itemsDistributed.value),
      itemUnit: itemUnit.value.trim(),
      status: status.value,
    })
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
        <h2 class="text-base font-semibold text-white">Log New Relief Operation</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="requestClose">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        <!-- Event Name -->
        <div>
          <label class="text-xs font-semibold text-slate-600">Event Name</label>
          <div class="relative mt-1.5">
            <ClipboardList
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              v-model="event"
              type="text"
              placeholder="e.g. Tropical Depression Auring Relief"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="errors.event ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
            />
          </div>
          <p v-if="errors.event" class="mt-1 text-xs text-red-500">{{ errors.event }}</p>
        </div>

        <!-- Type + Date -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Type</label>
            <div class="relative mt-1.5">
              <select
                v-model="type"
                class="w-full appearance-none rounded-lg border px-3 py-3 pr-8 text-sm outline-none"
                :class="errors.type ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              >
                <option value="" disabled>Select type</option>
                <option v-for="t in reliefOperationTypes" :key="t" :value="t">{{ t }}</option>
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
            <label class="text-xs font-semibold text-slate-600">Date</label>
            <div class="relative mt-1.5">
              <Calendar class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="date"
                type="date"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="errors.date ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              />
            </div>
            <p v-if="errors.date" class="mt-1 text-xs text-red-500">{{ errors.date }}</p>
          </div>
        </div>

        <!-- Barangay + Status -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Barangay</label>
            <div class="mt-1.5">
              <BarangaySelect v-model="barangay" />
            </div>
            <p v-if="errors.barangay" class="mt-1 text-xs text-red-500">{{ errors.barangay }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Status</label>
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

        <!-- Beneficiaries section -->
        <div class="border-t border-slate-100 pt-5">
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Beneficiaries
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-600">Count</label>
              <div class="relative mt-1.5">
                <Users class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="beneficiaries"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                  :class="
                    errors.beneficiaries
                      ? 'border-red-400'
                      : 'border-slate-200 focus:border-slate-400'
                  "
                />
              </div>
              <p v-if="errors.beneficiaries" class="mt-1 text-xs text-red-500">
                {{ errors.beneficiaries }}
              </p>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600">Unit</label>
              <div class="relative mt-1.5">
                <select
                  v-model="beneficiaryUnit"
                  class="w-full appearance-none rounded-lg border px-3 py-3 pr-8 text-sm outline-none"
                  :class="
                    errors.beneficiaryUnit
                      ? 'border-red-400'
                      : 'border-slate-200 focus:border-slate-400'
                  "
                >
                  <option value="" disabled>Select unit</option>
                  <option v-for="u in BENEFICIARY_UNITS" :key="u" :value="u">{{ u }}</option>
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
              <p v-if="errors.beneficiaryUnit" class="mt-1 text-xs text-red-500">
                {{ errors.beneficiaryUnit }}
              </p>
            </div>
          </div>
        </div>

        <!-- Items Distributed section -->
        <div>
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Items Distributed
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-600">Count</label>
              <div class="relative mt-1.5">
                <Boxes class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="itemsDistributed"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                  :class="
                    errors.itemsDistributed
                      ? 'border-red-400'
                      : 'border-slate-200 focus:border-slate-400'
                  "
                />
              </div>
              <p v-if="errors.itemsDistributed" class="mt-1 text-xs text-red-500">
                {{ errors.itemsDistributed }}
              </p>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600">Unit / Description</label>
              <input
                v-model="itemUnit"
                type="text"
                placeholder="e.g. relief packs, meals, cash grants (₱)"
                class="mt-1.5 w-full rounded-lg border px-3 py-3 text-sm outline-none"
                :class="
                  errors.itemUnit ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
                "
              />
              <p v-if="errors.itemUnit" class="mt-1 text-xs text-red-500">{{ errors.itemUnit }}</p>
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
          Log Operation
        </button>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this relief operation. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

  <ConfirmDialog
    v-if="confirmMode === 'create'"
    title="Log this operation?"
    :message="`You're about to log '${event}' in ${barangay}, serving ${beneficiaries} ${beneficiaryUnit}. Make sure the details are correct before continuing.`"
    confirm-label="Log Operation"
    cancel-label="Review Again"
    variant="default"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />
</template>
