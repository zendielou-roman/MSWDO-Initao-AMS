<script setup>
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { categoryTagStyles } from '@/data/mockClients'

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])

const fullName = computed(() => {
  const c = props.client
  return [c.first_name, c.middle_name, c.surname, c.ext].filter(Boolean).join(' ')
})

const beneficiaryName = computed(() => {
  const c = props.client
  if (c.same_as_client) return null
  return [c.beneficiary_first_name, c.beneficiary_middle_name, c.beneficiary_surname, c.beneficiary_ext]
    .filter(Boolean)
    .join(' ')
})

function formatCurrency(n) {
  return `₱${Number(n ?? 0).toLocaleString()}`
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
      <!-- HEADER -->
      <div class="flex items-center justify-between rounded-t-2xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Client Details</h2>
        <button aria-label="Close" class="text-white/80 hover:text-white" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 space-y-5 overflow-y-auto p-6">
        <!-- Identity -->
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600"
          >
            {{ client.first_name?.[0] }}
          </div>
          <div>
            <p class="text-lg font-semibold text-slate-800">{{ fullName }}</p>
            <p class="text-xs text-slate-400">
              {{ client.client_code }} · Registered {{ client.date_registered }}
            </p>
          </div>
          <span
            class="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            :class="client.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
            {{ client.status }}
          </span>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="cat in client.categories"
            :key="cat"
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            :class="categoryTagStyles[cat]"
          >
            {{ cat }}
          </span>
        </div>

        <!-- Personal Information -->
        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Personal Information
          </p>
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Age / Sex</p>
            <p class="text-slate-700">{{ client.age }} years old, {{ client.sex }}</p>
            <p class="text-slate-400">Civil Status</p>
            <p class="text-slate-700">{{ client.civil_status || '—' }}</p>
            <p class="text-slate-400">Occupation</p>
            <p class="text-slate-700">{{ client.occupation || '—' }}</p>
            <p class="text-slate-400">Monthly Income</p>
            <p class="text-slate-700">{{ formatCurrency(client.monthly_income) }}</p>
          </div>
        </div>

        <!-- Contact & Location -->
        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Contact & Location
          </p>
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Barangay</p>
            <p class="text-slate-700">{{ client.barangay }}</p>
            <p class="text-slate-400">Contact No.</p>
            <p class="text-slate-700">{{ client.contact }}</p>
          </div>
        </div>

        <!-- Beneficiary (only if different from client) -->
        <div v-if="beneficiaryName" class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Beneficiary
          </p>
          <div class="grid grid-cols-2 gap-y-2 text-sm">
            <p class="text-slate-400">Name</p>
            <p class="text-slate-700">{{ beneficiaryName }}</p>
            <p class="text-slate-400">Age / Sex</p>
            <p class="text-slate-700">{{ client.beneficiary_age }} years old, {{ client.beneficiary_sex }}</p>
          </div>
        </div>

        <!-- Family Composition -->
        <div v-if="client.family_members?.length" class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Family Composition
          </p>
          <div class="space-y-2">
            <div
              v-for="m in client.family_members"
              :key="m.id"
              class="rounded-lg bg-slate-50 px-3 py-2 text-sm"
            >
              <p class="font-medium text-slate-700">{{ m.name }} <span class="text-xs text-slate-400">— {{ m.relationship || 'Household member' }}</span></p>
              <p class="text-xs text-slate-400">
                {{ m.age }} y/o · {{ m.occupation || 'N/A' }} · {{ formatCurrency(m.income) }}/mo
              </p>
            </div>
          </div>
        </div>

        <!-- Assistance History (placeholder until Applications module exists) -->
        <div class="border-t border-slate-100 pt-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Assistance History
          </p>
          <p class="rounded-lg bg-slate-50 px-3 py-3 text-center text-xs text-slate-400">
            No application records yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>