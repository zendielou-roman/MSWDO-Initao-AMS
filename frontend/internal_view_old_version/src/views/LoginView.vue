<script setup>
// ===== IMPORTS =====
// 'ref' makes variables Vue watches — change one and the screen updates automatically.
import { ref } from 'vue'
// Router lets us send the user to another page after a successful login.
import { useRouter } from 'vue-router'
// Our fake-login store (checks dummy accounts, remembers who's logged in).
import { useAuthStore } from '@/stores/auth'
// Icons we actually use on this page. (MapPin removed — the map is now a real image.)
import { User, Lock, ShieldCheck, Headphones, Clock, ShieldQuestion } from 'lucide-vue-next'

// ===== HELPERS =====
const router = useRouter() // lets us call router.push('/dashboard')
const auth = useAuthStore() // gives us auth.login(), auth.user, etc.

// ===== REACTIVE VARIABLES (the form's memory) =====
const email = ref('') // whatever the user types in the email box
const password = ref('') // whatever the user types in the password box
const keepSignedIn = ref(false) // is the "keep me signed in" box ticked?
const errorMsg = ref('') // shows a red message if login fails

// ===== THE SIGN-IN FUNCTION =====
// Runs on "Sign In" click. Checks the typed email/password against dummy accounts.
// LATER: replace auth.login(...) with a real Axios POST to the Laravel backend.
function handleSignIn() {
  errorMsg.value = '' // clear any old error first
  const result = auth.login(email.value, password.value) // returns { success: true } or { success: false, message }
  if (result.success) {
    router.push('/dashboard') // 👈 send them into the internal view
  } else {
    errorMsg.value = result.message || 'Invalid email or password.' // show the error
  }
}
</script>

<template>
  <!-- ROOT WRAPPER = the whole screen (the big navy box) -->
  <div class="relative min-h-screen w-full overflow-hidden bg-[#001d4c]">
    <!-- LAYER 1: GRADIENT (soft depth) -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(circle at 30% 40%, #012a63 0%, #001d4c 60%, #001336 100%)"
    ></div>

    <!-- LAYER 2: WOVEN TEXTURE (the fabric pattern) -->
    <div
      class="absolute inset-0 opacity-[0.30] mix-blend-soft-light"
      style="
        background-image: url('/woven.jpg');
        background-repeat: repeat;
        background-size: 300px auto;
      "
    ></div>

    <!-- ============================================================
         CONTENT GRID = splits the screen into 2 columns on big screens
         (1 column on phones).
    ============================================================= -->
    <div class="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <!-- ========================= LEFT SIDE: BRANDING ========================= -->
      <!-- 'relative' here is important: the map <img> below positions against THIS column. -->
      <section class="relative flex flex-col px-10 py-12 sm:px-14 lg:px-16">
        <!-- MAP IMAGE (clear — no box, no background, no ring)
             POSITION knobs:
               -right-40  -> distance from the right edge (negative = pushed off to the right)
               top-[52%]  -> vertical spot (bigger % = lower)
             SIZE knobs:
               h-120 w-120 -> height & width (change together)
             VISIBILITY:
               hidden lg:block -> hidden on phones, shows on big screens
             opacity-30 -> faded (raise/lower for more/less transparency)
             pointer-events-none -> clicks pass through it (decorative only) -->
        <img
          src="/initao-map.png"
          alt="Map of Initao"
          class="pointer-events-none absolute -right-40 top-[52%] hidden h-120 w-120 -translate-y-1/2 object-contain opacity-30 lg:block"
        />

        <!-- MASTHEAD = logo + government text block, CENTERED -->
        <div class="relative z-10 flex flex-col items-center gap-0 text-center">
          <!-- THE LOGO (h-32 w-32 = size; object-contain keeps it from stretching) -->
          <img src="/mswdo-logo.png" alt="MSWDO Logo" class="h-32 w-32 object-contain" />

          <!-- GOVERNMENT TEXT (each line sets its own font to match the prototype) -->
          <div class="-mt-4 flex flex-col items-center gap-0.5">
            <!-- Line 1: REPUBLIC OF THE PHILIPPINES (font-trajan = Cinzel lookalike) -->
            <p class="font-trajan text-[0.7rem] tracking-[0.3em] text-white/55">
              REPUBLIC OF THE PHILIPPINES
            </p>

            <!-- Line 2: province + gold divider + municipality -->
            <p class="font-trajan mt-1 text-xs font-light leading-tight">
              <span class="text-white/80">PROVINCE OF MISAMIS ORIENTAL</span>
              <span class="text-white/40"> || </span>
              <span class="text-white/80">MUNICIPALITY OF INITAO</span>
            </p>

            <!-- A thin horizontal divider line -->
            <div class="mx-auto my-1 h-px w-full bg-white/20"></div>

            <!-- Line 3: office name (font-officeserif = Tinos, a Times lookalike) -->
            <p class="font-officeserif text-base font-bold tracking-wide text-white sm:text-lg">
              MUNICIPAL SOCIAL WELFARE AND DEVELOPMENT OFFICE
            </p>
          </div>
        </div>

        <!-- BIG TITLE BLOCK (the giant gold SAGOP heading) -->
        <div class="relative z-10 mt-4">
          <!-- font-display = Anton; <br /> tags force the exact line breaks -->
          <h1
            class="font-display text-5xl uppercase leading-[1.1] tracking-[1px] text-amber-400 sm:text-[3.4rem]"
          >
            System for Assistance<br />
            Governance and<br />
            Operations Processing (SAGOP)
          </h1>

          <!-- The paragraph under the title -->
          <p class="mt-2 max-w-lg text-sm font-light leading-relaxed text-white/50">
            A unified workspace for MSWDO Initao staff to manage social welfare programs,
            applications, beneficiaries, and disbursements across the 16 barangays of Initao,
            Misamis Oriental.
          </p>
        </div>
      </section>

      <!-- ========================= RIGHT SIDE: LOGIN CARD ========================= -->
      <section class="flex items-center justify-center px-6 py-12 sm:px-10">
        <!-- THE WHITE CARD
             max-w-[530px] = width cap | p-8 / sm:p-10 = inner padding | h-full = fills column height -->
        <div
          class="h-full w-full max-w-[530px] rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur sm:rounded-3xl sm:p-10"
        >
          <!-- SHIELD ICON in a light grey circle (-mt-6 pulls the icon block UP) -->
          <div class="-mt-6 mb-0 flex justify-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <ShieldCheck class="h-7 w-7 text-slate-700" />
            </div>
          </div>

          <!-- CARD TITLES (font-display = Anton; text-2xl = size) -->
          <h2 class="text-center font-display text-2xl font-normal text-slate-800">
            SIGN IN TO YOUR ACCOUNT
          </h2>
          <p class="mb-0 text-center text-xs uppercase tracking-widest text-[#001d4c]/60">
            Authorized MSWDO personnel only
          </p>

          <!-- THE FORM (@submit.prevent runs handleSignIn without reloading the page) -->
          <form class="mt-3 space-y-5" @submit.prevent="handleSignIn">
            <!-- EMAIL FIELD -->
            <div>
              <label class="text-xs font-semibold tracking-wide text-slate-600"
                >EMAIL / USERNAME</label
              >
              <div
                class="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-slate-400"
              >
                <User class="h-4 w-4 text-slate-400" />
                <input
                  v-model="email"
                  type="text"
                  placeholder="position@mswdo.initao.gov.ph"
                  class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <!-- PASSWORD FIELD -->
            <div>
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold tracking-wide text-slate-600">PASSWORD</label>
                <a href="#" class="text-xs font-medium text-blue-600 hover:underline"
                  >Forgot Password?</a
                >
              </div>
              <div
                class="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-slate-400"
              >
                <Lock class="h-4 w-4 text-slate-400" />
                <input
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <!-- ERROR MESSAGE (only shows when errorMsg has text) -->
            <p v-if="errorMsg" class="text-sm font-medium text-red-600">{{ errorMsg }}</p>

            <!-- "KEEP ME SIGNED IN" CHECKBOX -->
            <label class="flex items-center gap-2 text-sm text-slate-600">
              <input
                v-model="keepSignedIn"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300"
              />
              Keep me signed in on this device
            </label>

            <!-- SIGN IN BUTTON -->
            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#001d4c] py-3 text-sm font-semibold text-white transition hover:bg-[#001336]"
            >
              <Lock class="h-4 w-4" />
              Sign In
            </button>
          </form>

          <!-- "NEED HELP?" LINK -->
          <div class="my-6 flex items-center justify-center">
            <a href="#" class="text-xs font-bold tracking-wide text-blue-600 hover:underline"
              >NEED HELP?</a
            >
          </div>

          <!-- SUPPORT INFO LINES -->
          <div class="space-y-2 text-sm text-slate-600">
            <p class="flex items-center gap-2">
              <Headphones class="h-4 w-4 text-slate-400" /> Contact System Administrator
            </p>
            <p class="flex items-center gap-2">
              <Clock class="h-4 w-4 text-slate-400" /> Office Hours: Monday – Friday | 8:00 AM –
              5:00 PM
            </p>
          </div>

          <!-- SECURITY NOTE (with a top border separating it) -->
          <div
            class="mt-6 flex items-start gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"
          >
            <ShieldQuestion class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <p>
              <span class="font-semibold text-slate-700">Your data is secured and protected.</span>
              By signing in, you agree to comply with the system policies.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER (copyright line at the very bottom; increase pb-* to lift it up) -->
    <p class="relative z-10 pb-4 text-center text-xs text-white/20">
      © 2026 MSWDO Initao, Misamis Oriental. All rights reserved.
    </p>
  </div>
</template>
