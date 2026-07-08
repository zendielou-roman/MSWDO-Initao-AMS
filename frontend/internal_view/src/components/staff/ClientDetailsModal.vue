<script setup>
import { computed } from 'vue'
import { X, Phone, MapPin, HandCoins, Pencil, PlusCircle, Inbox } from 'lucide-vue-next'
import ClientStatusBadge from '@/components/staff/ClientStatusBadge.vue'
import ClientCategoryBadge from '@/components/staff/ClientCategoryBadge.vue'
import AssistanceStatusBadge from '@/components/staff/AssistanceStatusBadge.vue'

const props = defineProps({
  client: { type: Object, default: null },
  isOpen: { type: Boolean, default: false },
})

defineEmits(['close'])

// Left accent color per assistance type — lets staff scan the history
// list by type without reading every row.
const TYPE_ACCENT = {
  Medical: 'border-l-sky-400',
  Financial: 'border-l-[#001d4c]',
  Burial: 'border-l-slate-400',
  Educational: 'border-l-purple-400',
  Food: 'border-l-amber-400',
}

function accentFor(type) {
  return TYPE_ACCENT[type] ?? 'border-l-slate-300'
}

const initials = computed(() => {
  if (!props.client?.name) return ''
  return props.client.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const totalApproved = computed(() => {
  if (!props.client?.assistanceHistory) return 0
  return props.client.assistanceHistory
    .filter((a) => a.status === 'Approved')
    .reduce((sum, a) => sum + a.amount, 0)
})

const sortedHistory = computed(() => {
  if (!props.client?.assistanceHistory) return []
  return [...props.client.assistanceHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && client"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="$emit('close')"
    >
      <div class="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-lg">
        <!-- Header (sticky) -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 class="text-lg font-bold text-slate-900">Client Details</h2>
          <button
            type="button"
            class="text-slate-400 hover:text-slate-600"
            @click="$emit('close')"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Identity strip (sticky) -->
        <div class="border-b border-slate-200 px-6 py-4">
          <div class="flex items-start gap-4">
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#001d4c] text-base font-semibold text-amber-400"
            >
              {{ initials }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p class="truncate text-base font-bold text-slate-900">{{ client.name }}</p>
                  <p class="text-xs text-slate-400">{{ client.clientId }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <ClientCategoryBadge :category="client.category" />
                  <ClientStatusBadge :status="client.status" />
                </div>
              </div>
              <!-- Quick-fact chips -->
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {{ client.age }} yrs
                </span>
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {{ client.sex }}
                </span>
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {{ client.civilStatus }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <!-- Contact & Location -->
          <div class="mb-6">
            <h3 class="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#001d4c]">
              <MapPin :size="15" />
              Contact & Location
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-start gap-2">
                <Phone :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Contact Number</p>
                  <p class="mt-0.5 text-sm font-medium text-slate-900">{{ client.contact }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <MapPin :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Barangay</p>
                  <p class="mt-0.5 text-sm font-medium text-slate-900">{{ client.barangay }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Assistance History -->
          <div>
            <div class="mb-3 flex items-center justify-between">
              <h3 class="flex items-center gap-1.5 text-sm font-semibold text-[#001d4c]">
                <HandCoins :size="15" />
                Assistance History
              </h3>
              <span
                v-if="sortedHistory.length"
                class="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"
              >
                ₱{{ totalApproved.toLocaleString() }} approved
              </span>
            </div>

            <div v-if="sortedHistory.length" class="space-y-2">
              <div
                v-for="assistance in sortedHistory"
                :key="assistance.referenceNo"
                class="flex items-center justify-between rounded-lg border border-l-4 border-slate-200 p-3"
                :class="accentFor(assistance.type)"
              >
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-slate-900">{{ assistance.type }}</p>
                  <p class="text-xs text-slate-500">{{ assistance.referenceNo }} · {{ assistance.date }}</p>
                </div>
                <div class="shrink-0 text-right">
                  <p class="mb-1.5 text-sm font-medium text-slate-900">
                    ₱{{ assistance.amount.toLocaleString() }}
                  </p>
                  <AssistanceStatusBadge :status="assistance.status" />
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center"
            >
              <Inbox :size="24" class="text-slate-300" />
              <p class="text-sm text-slate-500">No assistance recorded yet.</p>
            </div>
          </div>
        </div>

        <!-- Footer (sticky) -->
        <div class="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
            @click="$emit('close')"
          >
            Close
          </button>
          <!-- Non-functional stubs for now — wire up once Edit/Log flows exist -->
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil :size="14" />
            Edit
          </button>
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg bg-[#001d4c] px-4 py-2 text-sm font-medium text-amber-400 hover:bg-[#001d4c]/90"
          >
            <PlusCircle :size="14" />
            Log Assistance
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
