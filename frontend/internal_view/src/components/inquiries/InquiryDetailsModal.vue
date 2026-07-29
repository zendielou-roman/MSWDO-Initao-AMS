<script setup>
import { computed } from 'vue'
import { X, Mail, Phone, MapPin, User, MessageSquare, UserPlus, CheckCircle2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import InquiryStatusBadge from '@/components/inquiries/InquiryStatusBadge.vue'

const props = defineProps({
  inquiry: { type: Object, default: null },
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'assign', 'update-status'])

const auth = useAuthStore()

const displayName = computed(() => {
  if (!props.inquiry) return ''
  return props.inquiry.isAnonymous ? 'Anonymous' : props.inquiry.fullName
})

const initials = computed(() => {
  if (!props.inquiry || props.inquiry.isAnonymous) return '?'
  return props.inquiry.fullName
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const NEXT_STATUS = {
  New: 'In Progress',
  'In Progress': 'Resolved',
  Resolved: 'New',
}

const nextStatusLabel = computed(() => {
  if (!props.inquiry) return ''
  return NEXT_STATUS[props.inquiry.status] ?? 'New'
})

function handleAssignToMe() {
  emit('assign', { id: props.inquiry.id, assignedTo: auth.user?.name ?? 'Me' })
}

function handleAdvanceStatus() {
  emit('update-status', { id: props.inquiry.id, status: nextStatusLabel.value })
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && inquiry"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="$emit('close')"
    >
      <div class="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-lg">
        <!-- Header (sticky) -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 class="text-lg font-bold text-slate-900">Message Details</h2>
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
                  <p class="truncate text-base font-bold text-slate-900">{{ displayName }}</p>
                  <p class="text-xs text-slate-400">{{ inquiry.id }} · {{ inquiry.dateSubmitted }}</p>
                </div>
                <InquiryStatusBadge :status="inquiry.status" />
              </div>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {{ inquiry.barangay }}
                </span>
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {{ inquiry.subject }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <!-- Contact Info -->
          <div class="mb-6">
            <h3 class="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#001d4c]">
              <User :size="15" />
              Contact Info
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-start gap-2">
                <Mail :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Email</p>
                  <p class="mt-0.5 text-sm font-medium text-slate-900">
                    {{ inquiry.email ?? 'Not provided' }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <Phone :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Mobile Number</p>
                  <p class="mt-0.5 text-sm font-medium text-slate-900">
                    {{ inquiry.mobile ?? 'Not provided' }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-2 col-span-2">
                <MapPin :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Barangay</p>
                  <p class="mt-0.5 text-sm font-medium text-slate-900">{{ inquiry.barangay }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-6">
            <h3 class="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#001d4c]">
              <MessageSquare :size="15" />
              Message
            </h3>
            <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p class="whitespace-pre-line text-sm text-slate-700">{{ inquiry.message }}</p>
            </div>
          </div>

          <!-- Assignment -->
          <div>
            <h3 class="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#001d4c]">
              <UserPlus :size="15" />
              Assignment
            </h3>
            <div class="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Assigned To</p>
                <p class="mt-0.5 text-sm font-medium text-slate-900">
                  {{ inquiry.assignedTo ?? 'Unassigned' }}
                </p>
              </div>
              <button
                type="button"
                class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                @click="handleAssignToMe"
              >
                Assign to Me
              </button>
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
          <button
            v-if="inquiry.status !== 'Resolved'"
            type="button"
            class="flex items-center gap-1.5 rounded-lg bg-[#001d4c] px-4 py-2 text-sm font-medium text-amber-400 hover:bg-[#001d4c]/90"
            @click="handleAdvanceStatus"
          >
            <CheckCircle2 :size="14" />
            Mark as {{ nextStatusLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>