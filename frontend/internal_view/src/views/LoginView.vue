<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  ArrowRight,
  Clock3,
  Eye,
  EyeOff,
  Headphones,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepSignedIn = ref(false)
const errorMsg = ref('')
const isSubmitting = ref(false)

function handleSignIn() {
  errorMsg.value = ''
  isSubmitting.value = true

  try {
    const result = auth.login(email.value.trim(), password.value)

    if (result.success) {
      router.push('/dashboard')
      return
    }

    errorMsg.value = result.message || 'We could not sign you in. Check your details and try again.'
  } catch {
    errorMsg.value = 'Something went wrong. Please try again or contact the system administrator.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-dvh overflow-x-hidden bg-[#062554] text-slate-900 lg:h-dvh lg:overflow-hidden">
    <!-- Ambient background layers -->
    <div class="pointer-events-none fixed inset-0" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,#16457e_0%,#062554_42%,#031a3d_100%)]"
      ></div>
      <div
        class="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl"
      ></div>
      <div class="absolute -right-24 top-12 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl"></div>
      <div
        class="absolute inset-0 opacity-[0.20] mix-blend-soft-light [background-image:url('/woven.jpg')] [background-repeat:repeat] [background-size:260px_auto]"
      ></div>
    </div>

    <div
      class="relative mx-auto flex min-h-dvh max-w-[1600px] flex-col lg:h-dvh lg:min-h-0 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(460px,0.92fr)]"
    >
      <!-- On small screens, sign-in comes first so staff can act immediately. -->
      <section
        class="order-2 flex items-center px-5 pb-10 pt-2 sm:px-8 lg:order-1 lg:min-h-0 lg:px-16 lg:py-8 xl:px-24"
      >
        <div class="relative mx-auto w-full max-w-2xl lg:mx-0">
          <img
            src="/initao-map.png"
            alt=""
            class="pointer-events-none absolute -right-50 top-1/2 hidden w-[31rem] -translate-y-1/2 select-none object-contain opacity-[0.12] grayscale lg:block"
          />

          <div class="relative">
            <div class="flex items-center gap-1 sm:gap-3">
              <img
                src="/mswdo-seal.png"
                alt="Municipal Social Welfare and Development Office seal"
                class="h-24 w-24 shrink-0 object-contain sm:h-28 sm:w-28"
              />

              <div class="min-w-0 -ml-0.5">
                <!-- Top government label -->
                <p
                  class="font-display text-[0.62rem] -ml-4 tracking-[0.22em] text-white/65 sm:text-xs"
                >
                  REPUBLIC OF THE PHILIPPINES
                </p>

                <!-- Province and municipality -->
                <p
                  class="mt-1 -ml-4 font-display text-[0.69rem] leading-snug text-white/85 sm:text-xs"
                >
                  PROVINCE OF MISAMIS ORIENTAL
                  <span class="px-1 text-amber-300">||</span>
                  MUNICIPALITY OF INITAO
                </p>

                <!-- Office name -->
                <!-- Change mt-1.5 to mt-1 if you also want the text lines closer vertically. -->
                <p
                  class="mt-1 -ml-4 text-lg font-display font-semibold uppercase tracking-[0.08em] text-white sm:text-sm"
                >
                  Municipal Social Welfare and Development Office
                </p>
              </div>
            </div>

            <!-- Main identity content: lower mt values move this entire area upward -->
            <div class="mt-2 sm:mt-4">
              <div class="mb-3 flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                  Welcome, MSWDO Team to
                </span>
              </div>
            </div>

            <!-- Spacing between the welcome label and SAGOP title -->
            <div class="mt-7 sm:mt-7">
              <h1
                class="font-anton text-6xl uppercase leading-[0.84] tracking-[0.04em] text-amber-400 sm:text-7xl lg:text-8xl"
              >
                SAGOP
              </h1>

              <p
                class="mt-4 max-w-xl font-display text-lg font-semibold leading-snug text-white sm:text-xl"
              >
                System for Assistance Governance and Operations Processing
              </p>

              <p class="mt-4 max-w-xl text-sm leading-6 text-slate-100/70 sm:text-base">
                A workspace for MSWDO Initao staff to manage diffrent social welfare programs,
                applications, beneficiaries, and disbursements across the municipality.
              </p>
            </div>

            <dl
              class="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/15 border-y border-white/15 py-4 sm:mt-9 sm:py-5"
            >
              <div class="pr-3 sm:pr-5">
                <dt class="font-display text-2xl text-amber-300 sm:text-3xl">450+</dt>
                <dd class="mt-1 text-xs leading-4 text-white/65 sm:text-sm">
                  Beneficiaries served
                </dd>
              </div>
              <div class="px-3 sm:px-5">
                <dt class="font-display text-2xl text-amber-300 sm:text-3xl">24</dt>
                <dd class="mt-1 text-xs leading-4 text-white/65 sm:text-sm">Active programs</dd>
              </div>
              <div class="pl-3 sm:pl-5">
                <dt class="font-display text-2xl text-amber-300 sm:text-3xl">16</dt>
                <dd class="mt-1 text-xs leading-4 text-white/65 sm:text-sm">Barangays covered</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <!-- Sign in panel -->
      <section
        class="order-1 flex items-center justify-center px-5 pb-8 pt-8 sm:px-8 sm:pt-10 lg:order-2 lg:min-h-0 lg:px-12 lg:py-6 xl:px-20"
      >
        <div
          class="w-full max-w-[480px] rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(0,12,36,0.32)] sm:p-7 lg:p-6"
        >
          <!-- mx-auto centers the shield icon horizontally -->
          <div
            class="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b4ea2]"
          >
            <ShieldCheck class="h-5 w-5" aria-hidden="true" />
          </div>

          <div class="mt-4 text-center">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#0b4ea2]">
              Sign in to SAGOP
            </p>

            <p class="mt-1 text-sm leading-5 text-slate-600">
              Use your assigned account to continue.
            </p>
          </div>

          <form class="mt-5 space-y-4" @submit.prevent="handleSignIn">
            <div>
              <label for="email" class="block text-sm font-semibold text-slate-700"
                >Email or Username</label
              >
              <div
                class="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3.5 py-3 transition focus-within:border-[#0b4ea2] focus-within:ring-4 focus-within:ring-blue-100"
              >
                <UserRound class="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  required
                  autocomplete="username"
                  placeholder="name@mswdo.initao.gov.ph"
                  class="min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <p class="mt-1.5 text-xs leading-4 text-slate-500">
                Use your assigned office email or username.
              </p>
            </div>

            <div>
              <div class="flex items-baseline justify-between gap-3">
                <label for="password" class="block text-sm font-semibold text-slate-700"
                  >Password</label
                >
                <a
                  href="#support-info"
                  class="text-xs font-semibold text-[#0b4ea2] underline-offset-4 hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#0b4ea2]"
                >
                  Forgot password?
                </a>
              </div>
              <div
                class="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3.5 py-3 transition focus-within:border-[#0b4ea2] focus-within:ring-4 focus-within:ring-blue-100"
              >
                <LockKeyhole class="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  class="min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  class="rounded-md p-1 text-slate-500 transition hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4ea2]"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="h-5 w-5" aria-hidden="true" />
                  <Eye v-else class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              v-if="errorMsg"
              role="alert"
              aria-live="assertive"
              class="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium leading-5 text-red-700"
            >
              {{ errorMsg }}
            </div>

            <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
              <input
                v-model="keepSignedIn"
                type="checkbox"
                class="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0b4ea2] focus:ring-[#0b4ea2]"
              />
              <span>
                Keep me signed in on this device
                <span class="mt-0.5 block text-xs leading-4 text-slate-500"
                  >Do not use this option on shared computers.</span
                >
              </span>
            </label>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b4ea2] px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#083f85] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span>{{ isSubmitting ? 'Signing in…' : 'Sign In' }}</span>
              <ArrowRight v-if="!isSubmitting" class="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div id="support-info" class="mt-5 border-t border-slate-200 pt-4">
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-center text-slate-500">
              Need help?
            </p>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
              <p class="flex items-center gap-1.5">
                <Headphones class="h-3.5 w-3.5 shrink-0 text-[#0b4ea2]" aria-hidden="true" />Contact
                the System Administrator
              </p>
              <p class="flex items-center gap-1.5">
                <Clock3 class="h-3.5 w-3.5 shrink-0 text-[#0b4ea2]" aria-hidden="true" />Mon–Fri,
                8:00 AM–5:00 PM
              </p>
            </div>
          </div>

          <div
            class="mt-4 flex gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs leading-4 text-emerald-800"
          >
            <ShieldCheck class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
            <p>
              <span class="font-bold">Your data is protected.</span> Please follow system policies.
            </p>
          </div>
        </div>
      </section>

      <footer
        class="order-3 px-6 pb-6 text-center text-xs text-white/50 lg:absolute lg:inset-x-0 lg:bottom-1 lg:px-8"
      >
        © 2026 MSWDO Initao, Misamis Oriental. All rights reserved.
      </footer>
    </div>
  </main>
</template>
