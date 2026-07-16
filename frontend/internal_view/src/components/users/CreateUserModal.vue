<script setup>
import { ref, computed } from 'vue'
import { X, User, Mail, Phone, ShieldCheck, Lock, Eye, EyeOff, RefreshCw } from 'lucide-vue-next'
import { roleConfig } from '@/config/roleConfig'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const emit = defineEmits(['close', 'create'])

const fullName = ref('')
const email = ref('')
const contactNumber = ref('')
const position = ref('')
const role = ref('')
const tempPassword = ref('')
const showPassword = ref(false)
const errors = ref({})

// NEW: confirmation dialog state
const confirmMode = ref(null) // null | 'discard' | 'create'

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let pwd = ''
  for (let i = 0; i < 10; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)]
  }
  tempPassword.value = pwd
}
generatePassword()

const roleOptions = computed(() =>
  Object.entries(roleConfig).map(([key, cfg]) => ({ value: key, label: cfg.label })),
)

// NEW: has the admin actually typed anything meaningful?
const isDirty = computed(() => {
  return !!(
    fullName.value.trim() ||
    email.value.trim() ||
    contactNumber.value.trim() ||
    position.value.trim() ||
    role.value
  )
})

function validate() {
  const e = {}
  if (!fullName.value.trim()) e.fullName = 'Full name is required.'
  if (!email.value.trim()) {
    e.email = 'Email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    e.email = 'Enter a valid email address.'
  }
  if (!contactNumber.value.trim()) {
    e.contactNumber = 'Contact number is required.'
  } else if (!/^09\d{9}$/.test(contactNumber.value.replace(/\s/g, ''))) {
    e.contactNumber = 'Enter a valid PH mobile number (e.g. 09171234567).'
  }
  if (!position.value.trim()) e.position = 'Position/Designation is required.'
  if (!role.value) e.role = 'Please select a role.'
  errors.value = e
  return Object.keys(e).length === 0
}

// NEW: called when X or Cancel is clicked
function requestClose() {
  if (isDirty.value) {
    confirmMode.value = 'discard'
  } else {
    emit('close')
  }
}

// NEW: called when "Create User Account" is clicked
function requestSubmit() {
  if (!validate()) return
  confirmMode.value = 'create'
}

// NEW: handles whichever confirm dialog is currently open
function handleConfirm() {
  if (confirmMode.value === 'discard') {
    confirmMode.value = null
    emit('close')
  } else if (confirmMode.value === 'create') {
    confirmMode.value = null
    emit('create', {
      name: fullName.value.trim(),
      email: email.value.trim(),
      contactNumber: contactNumber.value.trim(),
      position: position.value.trim(),
      role: role.value,
      tempPassword: tempPassword.value,
    })
  }
}

function handleCancelConfirm() {
  confirmMode.value = null
}

const roleLabel = computed(() => roleConfig[role.value]?.label ?? '')
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between rounded-t-xl bg-[#001d4c] px-6 py-5">
        <h2 class="text-base font-semibold text-white">Create New User Account</h2>
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
              v-model="fullName"
              type="text"
              placeholder="Juan dela Cruz"
              class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
              :class="
                errors.fullName ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
              "
            />
          </div>
          <p v-if="errors.fullName" class="mt-1 text-xs text-red-500">{{ errors.fullName }}</p>
        </div>

        <!-- Email + Role -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Email Address</label>
            <div class="relative mt-1.5">
              <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="email"
                type="text"
                placeholder="jdelacruz@mswdo.gov.ph"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="errors.email ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Role</label>
            <div class="relative mt-1.5">
              <ShieldCheck
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <select
                v-model="role"
                class="w-full appearance-none rounded-lg border py-3 pl-9 pr-8 text-sm outline-none"
                :class="errors.role ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'"
              >
                <option value="" disabled>Select role</option>
                <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
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
            <p v-if="errors.role" class="mt-1 text-xs text-red-500">{{ errors.role }}</p>
          </div>
        </div>

        <!-- Contact Number + Position -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-600">Contact Number</label>
            <div class="relative mt-1.5">
              <Phone class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="contactNumber"
                type="text"
                placeholder="09171234567"
                class="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none"
                :class="
                  errors.contactNumber
                    ? 'border-red-400'
                    : 'border-slate-200 focus:border-slate-400'
                "
              />
            </div>
            <p v-if="errors.contactNumber" class="mt-1 text-xs text-red-500">
              {{ errors.contactNumber }}
            </p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600">Position / Designation</label>
            <input
              v-model="position"
              type="text"
              placeholder="Social Welfare Officer II"
              class="mt-1.5 w-full rounded-lg border px-3 py-3 text-sm outline-none"
              :class="
                errors.position ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
              "
            />
            <p v-if="errors.position" class="mt-1 text-xs text-red-500">{{ errors.position }}</p>
          </div>
        </div>

        <!-- Section divider -->
        <div class="border-t border-slate-100 pt-5">
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Login Credentials
          </h3>

          <label class="text-xs font-semibold text-slate-600">Temporary Password</label>
          <div class="mt-1.5 flex gap-2">
            <div class="relative flex-1">
              <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="tempPassword"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-lg border border-slate-200 py-3 pl-9 pr-9 text-sm tracking-wide outline-none focus:border-slate-400"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                @click="showPassword = !showPassword"
              >
                <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 text-sm text-slate-600 hover:bg-slate-50"
              @click="generatePassword"
            >
              <RefreshCw class="h-3.5 w-3.5" />
              Generate
            </button>
          </div>
          <p class="mt-1.5 text-xs text-slate-400">
            User will be required to change this on first login.
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
          Create User Account
        </button>
      </div>
    </div>
  </div>

  <!-- NEW: Discard confirmation -->
  <ConfirmDialog
    v-if="confirmMode === 'discard'"
    title="Discard unsaved changes?"
    message="You've entered information for this account. If you exit now, it will not be saved."
    confirm-label="Discard"
    cancel-label="Keep Editing"
    variant="danger"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />

  <!-- NEW: Create confirmation -->
  <ConfirmDialog
    v-if="confirmMode === 'create'"
    title="Create this account?"
    :message="`You're about to create a ${roleLabel} account for ${fullName}. Make sure the details are correct before continuing.`"
    confirm-label="Create Account"
    cancel-label="Review Again"
    variant="default"
    @confirm="handleConfirm"
    @cancel="handleCancelConfirm"
  />
</template>
