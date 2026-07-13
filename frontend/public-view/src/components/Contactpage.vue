<script setup>
// ===== CONTACT PAGE (standalone route) =====
import { reactive, ref, computed, inject, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Mail,
  Send,
  ShieldCheck,
  MessageSquareText,
  ClipboardCheck,
  Phone,
  ChevronDown,
} from 'lucide-vue-next'

const { t } = useI18n()

const form = reactive({
  fullName: '',
  isAnonymous: false,
  barangay: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
})

const touched = reactive({
  fullName: false,
  barangay: false,
  contact: false,
  subject: false,
  message: false,
})

const submitted = ref(false)
const submitAttempted = ref(false)
const isBarangayOpen = ref(false)
const goToHome = inject('goToHome', () => {})

const errors = computed(() => {
  const mobile = form.mobile.replace(/\D/g, '')
  const hasContact = !!form.email.trim() || !!mobile

  return {
    fullName:
      !form.isAnonymous && !form.fullName.trim() ? t('contact.form.nameError') : '',
    barangay: !form.barangay.trim() ? t('contact.form.barangayError') : '',
    contact: !hasContact
      ? t('contact.form.contactError')
      : mobile && mobile.length !== 11
        ? t('contact.form.mobileLengthError')
        : '',
    subject: !form.subject ? t('contact.form.subjectError') : '',
    message: !form.message.trim() ? t('contact.form.messageError') : '',
  }
})

const isValid = computed(() => Object.values(errors.value).every((msg) => !msg))

// Barangay names are proper nouns — not translated
const barangayOptions = [
  'Aluna', 'Andales', 'Apas', 'Calacapan', 'Gimangpang', 'Jampason',
  'Kamelon', 'Kanitoan', 'Oguis', 'Pagahan', 'Poblacion', 'Pontacon',
  'San Pedro', 'Sinalac', 'Tawantawan', 'Tubigan',
]

function markTouched(field) {
  touched[field] = true
}

function toggleBarangayDropdown() {
  isBarangayOpen.value = !isBarangayOpen.value
}

function selectBarangay(value) {
  form.barangay = value
  markTouched('barangay')
  isBarangayOpen.value = false
}

const steps = [
  { icon: MessageSquareText, key: 'submit' },
  { icon: ClipboardCheck, key: 'review' },
  { icon: Mail, key: 'reply' },
]

function submitForm() {
  submitAttempted.value = true
  Object.keys(touched).forEach((field) => {
    touched[field] = true
  })

  if (!isValid.value) return

  // TODO: wire up actual submit logic (API call, etc.)
  submitted.value = true
  submitAttempted.value = false
  Object.keys(touched).forEach((field) => {
    touched[field] = false
  })
  Object.assign(form, {
    fullName: '',
    isAnonymous: false,
    barangay: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  })
}

function goToContactSection() {
  goToHome()
  nextTick(() => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}
</script>

<template>
  <section class="px-6 sm:px-12 py-16">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-[360px_1fr] gap-6 items-start">
      <!-- LEFT · process & trust panel -->
      <aside class="rounded-2xl bg-gradient-to-br from-[#16245a] to-[#1e3a6e] p-7 text-white flex flex-col">
        <p class="text-amber-400 font-bold tracking-[2px] text-[0.72rem] uppercase mb-2">
          {{ t('contact.form.whatsNext') }}
        </p>
        <h2 class="font-['Anton'] text-xl leading-tight mb-6">{{ t('contact.form.whatsNextTitle') }}</h2>

        <ol class="space-y-6">
          <li v-for="(step, i) in steps" :key="step.key" class="flex gap-4">
            <span class="flex flex-col items-center shrink-0 text-justify">
              <span class="w-9 h-9 rounded-full bg-amber-400 text-[#1f3a63] font-bold text-[0.85rem] flex items-center justify-center">
                {{ i + 1 }}
              </span>
              <span v-if="i < steps.length - 1" class="w-px flex-1 bg-white/20 mt-1" aria-hidden="true"></span>
            </span>
            <div class="pb-1 text-justify">
              <p class="font-semibold text-[0.95rem] mb-1 flex items-center gap-2 text-justify">
                <component :is="step.icon" class="w-4 h-4 text-amber-400" />
                {{ t(`contact.form.steps.${step.key}.title`) }}
              </p>
              <p class="text-white/75 text-[0.85rem] leading-relaxed text-justify">
                {{ t(`contact.form.steps.${step.key}.body`) }}
              </p>
            </div>
          </li>
        </ol>

        <div class="mt-7 pt-6 border-t border-white/15 flex gap-3">
          <ShieldCheck class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p class="text-white/75 text-[0.82rem] leading-relaxed text-justify">
            {{ t('contact.form.privacyNote') }}
          </p>
        </div>

        <a
          href="tel:0881234567"
          class="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-amber-300 hover:text-amber-200 transition"
        >
          <Phone class="w-4 h-4" />
          {{ t('contact.form.urgentCall') }}
        </a>
      </aside>

      <!-- RIGHT · message form -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8">
        <div v-if="submitted" class="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <span class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p class="font-bold text-[#1f3a63] text-lg">{{ t('contact.form.successTitle') }}</p>
          <p class="text-slate-500 text-sm max-w-sm">{{ t('contact.form.successBody') }}</p>
          <button @click="submitted = false" class="mt-2 text-[#1e3a6e] font-semibold text-sm hover:underline">
            {{ t('contact.form.sendAnother') }}
          </button>
        </div>

        <template v-else>
          <h2 class="font-['Anton'] text-[#1f3a63] text-2xl mb-1">{{ t('contact.form.heading') }}</h2>
          <p class="text-slate-500 text-[0.9rem] mb-6">
            {{ t('contact.form.subheading') }} <span class="text-rose-500">*</span>.
          </p>

          <div class="grid sm:grid-cols-2 gap-5 mb-1">
            <!-- FULL NAME (or anonymous) -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between gap-2">
                <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
                  {{ t('contact.form.name') }} <span v-if="!form.isAnonymous" class="text-rose-500">*</span>
                </label>
                <label class="flex items-center gap-1.5 text-[0.72rem] text-slate-500 cursor-pointer select-none">
                  <input
                    v-model="form.isAnonymous"
                    type="checkbox"
                    class="rounded border-slate-300 text-[#1e3a6e] focus:ring-[#1e3a6e]"
                    @change="markTouched('fullName')"
                  />
                  {{ t('contact.form.anonymousLabel') }}
                </label>
              </div>
              <input
                v-model="form.fullName"
                type="text"
                :disabled="form.isAnonymous"
                :placeholder="form.isAnonymous ? t('contact.form.anonymousPlaceholder') : t('contact.form.namePlaceholder')"
                @blur="markTouched('fullName')"
                class="border rounded-lg px-4 py-2.5 text-sm outline-none transition disabled:bg-slate-100 disabled:text-slate-400"
                :class="touched.fullName && errors.fullName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
              />
              <p v-if="touched.fullName && errors.fullName" class="text-rose-500 text-[0.75rem]">
                {{ errors.fullName }}
              </p>
            </div>

            <!-- BARANGAY -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
                {{ t('contact.form.barangay') }} <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <button
                  type="button"
                  @click="toggleBarangayDropdown"
                  class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm outline-none transition bg-white min-h-[2.5rem]"
                  :class="touched.barangay && errors.barangay ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
                >
                  <span class="text-left" :class="form.barangay ? 'text-slate-700' : 'text-slate-400'">
                    {{ form.barangay || t('contact.form.barangaySelect') }}
                  </span>
                  <ChevronDown class="h-4 w-4 text-slate-500" />
                </button>

                <div
                  v-if="isBarangayOpen"
                  class="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg"
                >
                  <button
                    v-for="barangay in barangayOptions"
                    :key="barangay"
                    type="button"
                    @click="selectBarangay(barangay)"
                    class="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {{ barangay }}
                  </button>
                </div>
              </div>
              <p v-if="touched.barangay && errors.barangay" class="text-rose-500 text-[0.75rem]">
                {{ errors.barangay }}
              </p>
            </div>

            <!-- EMAIL (optional) -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
                {{ t('contact.form.email') }} <span class="text-slate-400 normal-case font-medium">{{ t('contact.form.optional') }}</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                @blur="markTouched('contact')"
                class="border rounded-lg px-4 py-2.5 text-sm outline-none transition"
                :class="touched.contact && errors.contact ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
              />
            </div>

            <!-- MOBILE NUMBER (required unless email given) -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
                {{ t('contact.form.mobile') }}
                <span v-if="!form.email.trim()" class="text-rose-500">*</span>
                <span v-else class="text-slate-400 normal-case font-medium">{{ t('contact.form.optional') }}</span>
              </label>
              <input
                v-model="form.mobile"
                type="tel"
                :placeholder="t('contact.form.mobilePlaceholder')"
                @blur="markTouched('contact')"
                class="border rounded-lg px-4 py-2.5 text-sm outline-none transition"
                :class="touched.contact && errors.contact ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
              />
            </div>
          </div>
          <p v-if="touched.contact && errors.contact" class="text-rose-500 text-[0.75rem] mb-4 sm:col-span-2">
            {{ errors.contact }}
          </p>
          <p v-else class="text-slate-400 text-[0.75rem] mb-4">
            {{ t('contact.form.contactHint') }}
          </p>

          <div class="flex flex-col gap-1.5 mb-5">
            <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
              {{ t('contact.form.subject') }} <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="form.subject"
              @blur="markTouched('subject')"
              @change="markTouched('subject')"
              class="border rounded-lg px-4 py-2.5 text-sm outline-none transition bg-white"
              :class="touched.subject && errors.subject ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
            >
              <option value="" disabled>{{ t('contact.form.subjectSelect') }}</option>
              <option>{{ t('contact.form.subjectOptions.general') }}</option>
              <option>{{ t('contact.form.subjectOptions.service') }}</option>
              <option>{{ t('contact.form.subjectOptions.feedback') }}</option>
              <option>{{ t('contact.form.subjectOptions.complaint') }}</option>
              <option>{{ t('contact.form.subjectOptions.other') }}</option>
            </select>
            <p v-if="touched.subject && errors.subject" class="text-rose-500 text-[0.75rem]">
              {{ errors.subject }}
            </p>
          </div>

          <div class="flex flex-col gap-1.5 mb-6">
            <label class="text-[#1f3a63] text-[0.78rem] font-bold tracking-wide uppercase">
              {{ t('contact.form.message') }} <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="t('contact.form.messagePlaceholder')"
              @blur="markTouched('message')"
              class="border rounded-lg px-4 py-2.5 text-sm outline-none transition resize-none"
              :class="touched.message && errors.message ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-[#1e3a6e]'"
            />
            <p v-if="touched.message && errors.message" class="text-rose-500 text-[0.75rem]">
              {{ errors.message }}
            </p>
          </div>

          <div class="flex items-center justify-between flex-wrap gap-4">
            <button
              @click="submitForm"
              :disabled="submitAttempted && !isValid"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition duration-200 shadow-md"
              :class="submitAttempted && !isValid ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-amber-400 hover:bg-amber-300 text-[#1f3a63] hover:shadow-lg'"
            >
              <Send class="w-4 h-4" />
              {{ t('contact.form.send') }}
            </button>
            <p class="text-slate-400 text-[0.78rem]">
              {{ t('contact.form.needDetails') }}
              <a href="#" class="text-[#1e3a6e] font-semibold hover:underline" @click.prevent="goToContactSection">
                {{ t('contact.form.seeContactInfo') }}
              </a>
            </p>
          </div>
          <p v-if="submitAttempted && !isValid" class="text-rose-500 text-[0.78rem] mt-3">
            {{ t('contact.form.formError') }}
          </p>
        </template>
      </div>
    </div>
  </section>
</template>