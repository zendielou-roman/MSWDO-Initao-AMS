<template>
  <div>
    <!-- Stat Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <Mail :size="18" class="text-slate-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ totalInquiries }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Total Messages</p>
      </div>

      <div class="rounded-xl border-2 border-amber-300 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
          <Inbox :size="18" class="text-amber-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ newCount }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">New</p>
        <p class="mt-1 text-xs font-medium text-amber-600">Not yet assigned</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Clock :size="18" class="text-blue-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ inProgressCount }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">In Progress</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 :size="18" class="text-green-500" />
        </div>
        <p class="text-2xl font-bold text-slate-900">{{ resolvedCount }}</p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Resolved</p>
      </div>
    </div>

    <!-- Table Card -->
    <div class="rounded-xl border border-slate-200 bg-white">
      <!-- Status Tabs -->
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-1">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            type="button"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium"
            :class="
              statusFilter === tab.value
                ? 'bg-[#001d4c] text-white'
                : 'text-slate-500 hover:bg-slate-100'
            "
            @click="statusFilter = tab.value"
          >
            {{ tab.label }}
            <span
              v-if="tab.value !== 'All'"
              class="rounded-full px-1.5 py-0.5 text-xs"
              :class="statusFilter === tab.value ? 'bg-white/20' : 'bg-slate-200 text-slate-600'"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>

        <button
          type="button"
          class="flex items-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 lg:self-auto"
          :disabled="isLoading"
          @click="fetchInquiries"
        >
          <RefreshCw :size="13" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </button>
      </div>

      <!-- Search + Subject Filter -->
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, barangay, or message..."
            class="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30"
          />
        </div>

        <select
          v-model="subjectFilter"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#001d4c]/30 sm:w-56"
        >
          <option value="All">All Topics</option>
          <option v-for="subject in subjectOptions" :key="subject" :value="subject">{{ subject }}</option>
        </select>
      </div>

      <!-- Error banner -->
      <div v-if="loadError" class="mx-4 mt-4 flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-600">
        <AlertTriangle :size="16" class="mt-0.5 shrink-0" />
        <span>{{ loadError }}</span>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th class="px-4 py-3 font-medium">Reference ID</th>
              <th class="px-4 py-3 font-medium">Sender</th>
              <th class="px-4 py-3 font-medium">Barangay</th>
              <th class="px-4 py-3 font-medium">Topic</th>
              <th class="px-4 py-3 font-medium">Date Submitted</th>
              <th class="px-4 py-3 font-medium">Assigned To</th>
              <th class="px-4 py-3 font-medium">Status</th>
              <th class="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                Loading messages...
              </td>
            </tr>

            <tr
              v-for="inquiry in filteredInquiries"
              v-else
              :key="inquiry.id"
              class="border-b border-slate-50 last:border-0 hover:bg-slate-50"
            >
              <td class="px-4 py-3 text-slate-500">#{{ inquiry.id }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-[#001d4c]/10 text-xs font-semibold text-[#001d4c]"
                  >
                    {{ inquiry.isAnonymous ? '?' : inquiry.fullName.charAt(0) }}
                  </span>
                  <span class="font-medium text-slate-900">
                    {{ inquiry.isAnonymous ? 'Anonymous' : inquiry.fullName }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-500">{{ inquiry.barangay }}</td>
              <td class="px-4 py-3 text-slate-500">{{ inquiry.subject }}</td>
              <td class="px-4 py-3 text-slate-500">{{ inquiry.dateSubmitted }}</td>
              <td class="px-4 py-3 text-slate-500">{{ inquiry.assignedTo ?? '—' }}</td>
              <td class="px-4 py-3">
                <InquiryStatusBadge :status="inquiry.status" />
              </td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#001d4c]"
                  @click="onViewInquiry(inquiry)"
                >
                  <Eye :size="16" />
                </button>
              </td>
            </tr>

            <tr v-if="!isLoading && filteredInquiries.length === 0">
              <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                No matching messages found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
        Showing {{ filteredInquiries.length }} message{{ filteredInquiries.length === 1 ? '' : 's' }}
      </div>
    </div>

    <InquiryDetailsModal
      :inquiry="selectedInquiry"
      :is-open="isModalOpen"
      @close="closeModal"
      @assign="handleAssign"
      @update-status="handleUpdateStatus"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Inbox,
  Mail,
  RefreshCw,
  Search,
} from 'lucide-vue-next'
import InquiryStatusBadge from '@/components/inquiries/InquiryStatusBadge.vue'
import InquiryDetailsModal from '@/components/inquiries/InquiryDetailsModal.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

// Status label <-> backend value mapping. The DB stores
// 'new' | 'in_progress' | 'resolved'; the UI shows "New" | "In Progress" | "Resolved".
const STATUS_TO_LABEL = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
}
const LABEL_TO_STATUS = {
  New: 'new',
  'In Progress': 'in_progress',
  Resolved: 'resolved',
}

function mapInquiryFromApi(record) {
  return {
    id: record.id,
    fullName: record.full_name,
    isAnonymous: Boolean(record.is_anonymous),
    barangay: record.barangay,
    email: record.email,
    mobile: record.mobile_number,
    subject: record.subject,
    message: record.message,
    status: STATUS_TO_LABEL[record.status] ?? 'New',
    assignedTo: record.assigned_to,
    dateSubmitted: record.created_at ? record.created_at.slice(0, 10) : '',
  }
}

const inquiries = ref([])
const isLoading = ref(true)
const loadError = ref('')

const searchQuery = ref('')
const statusFilter = ref('All')
const subjectFilter = ref('All')

const selectedInquiry = ref(null)
const isModalOpen = ref(false)

const subjectOptions = [
  'General inquiry',
  'Service request',
  'Feedback',
  'Complaint against an employee',
  'Other',
]

// GET /api/inquiries returns a plain JSON array (matches
// ApplicationController::index / ClientController::index style —
// no {data: [...]} wrapper on this backend).
async function fetchInquiries() {
  isLoading.value = true
  loadError.value = ''

  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) throw new Error('Failed to load messages.')

    const body = await response.json()
    inquiries.value = (Array.isArray(body) ? body : []).map(mapInquiryFromApi)
  } catch (err) {
    loadError.value =
      err instanceof Error
        ? `Could not load messages: ${err.message}`
        : 'Could not load messages. Is the backend running?'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchInquiries)

const totalInquiries = computed(() => inquiries.value.length)
const newCount = computed(() => inquiries.value.filter((i) => i.status === 'New').length)
const inProgressCount = computed(() => inquiries.value.filter((i) => i.status === 'In Progress').length)
const resolvedCount = computed(() => inquiries.value.filter((i) => i.status === 'Resolved').length)

const statusTabs = computed(() => [
  { label: 'All', value: 'All' },
  { label: 'New', value: 'New', count: newCount.value },
  { label: 'In Progress', value: 'In Progress', count: inProgressCount.value },
  { label: 'Resolved', value: 'Resolved', count: resolvedCount.value },
])

const filteredInquiries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return inquiries.value.filter((inquiry) => {
    const senderName = inquiry.isAnonymous ? 'anonymous' : inquiry.fullName.toLowerCase()
    const matchesQuery =
      !query ||
      senderName.includes(query) ||
      inquiry.barangay.toLowerCase().includes(query) ||
      inquiry.message.toLowerCase().includes(query)

    const matchesStatus = statusFilter.value === 'All' || inquiry.status === statusFilter.value
    const matchesSubject = subjectFilter.value === 'All' || inquiry.subject === subjectFilter.value

    return matchesQuery && matchesStatus && matchesSubject
  })
})

function onViewInquiry(inquiry) {
  selectedInquiry.value = inquiry
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedInquiry.value = null
}

// Assign / status actions — optimistic local update, then persist via
// PUT /api/inquiries/:id (this backend uses PUT for updates, not PATCH —
// see routes/api.php). Reverts on failure.
async function persistInquiry(id, payload) {
  const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('Failed to save the change.')
}

async function handleAssign({ id, assignedTo }) {
  const target = inquiries.value.find((i) => i.id === id)
  if (!target) return

  const previous = target.assignedTo
  target.assignedTo = assignedTo
  if (selectedInquiry.value?.id === id) selectedInquiry.value.assignedTo = assignedTo

  try {
    await persistInquiry(id, { assigned_to: assignedTo })
  } catch {
    target.assignedTo = previous
    if (selectedInquiry.value?.id === id) selectedInquiry.value.assignedTo = previous
    loadError.value = 'Could not save the assignment. Please try again.'
  }
}

async function handleUpdateStatus({ id, status }) {
  const target = inquiries.value.find((i) => i.id === id)
  if (!target) return

  const previous = target.status
  target.status = status
  if (selectedInquiry.value?.id === id) selectedInquiry.value.status = status

  try {
    await persistInquiry(id, { status: LABEL_TO_STATUS[status] })
  } catch {
    target.status = previous
    if (selectedInquiry.value?.id === id) selectedInquiry.value.status = previous
    loadError.value = 'Could not save the status change. Please try again.'
  }
}
</script>