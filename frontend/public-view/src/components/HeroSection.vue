<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = computed(() => [
  { icon: 'users', value: '1,450+', label: t('hero.stats.beneficiaries') },
  { icon: 'award', value: '38', label: t('hero.stats.programs') },
  { icon: 'pin', value: '16', label: t('hero.stats.barangays') },
  { icon: 'star', value: '26+', label: t('hero.stats.years') },
])

function goToServices() {
  const el = document.getElementById('services')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goToContact() {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    id="home"
    class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center px-6 md:px-10 pt-10 pb-12 md:pb-[4.5rem] bg-[#e6eaf2]"
  >
    <!-- ============ LEFT: TEXT COLUMN ============ -->
    <div>
      <!-- Eyebrow badge: small gold pill for context/polish -->
      <span class="block text-[#2a5caa] text-[0.85rem] font-[650] tracking-[3px] uppercase mb-2">
        {{ t('hero.eyebrow') }}
      </span>

      <h2
        class="font-['Anton',sans-serif] font-normal text-[2.1rem] md:text-[3.8rem] leading-[1.25] tracking-[0.5px] text-[#1f3a63] mt-2.5 mb-2"
      >
        {{ t('hero.heading') }}
      </h2>
      <p
        class="text-[#0d294f] text-[1.1rem] font-light mt-3 mb-0.01 leading-[1.85] tracking-[0.1px] max-w-[41.25rem] text-justify"
      >
        {{ t('hero.description') }}
      </p>

      <!-- CALL-TO-ACTION buttons -->
      <div class="flex gap-4 mt-8 flex-wrap justify-start">
        <!-- Primary (gold). The arrow nudges right on hover. -->
        <button
          @click="goToServices"
          class="group inline-flex items-center justify-center text-center gap-[0.6rem] border-none min-w-[200px] px-[1.6rem] py-[0.95rem] font-[650] text-[0.92rem] tracking-[0.3px] rounded-xl cursor-pointer transition-all duration-200 ease-out bg-[#d4a526] text-[#1f3a63] shadow-[0_6px_16px_rgba(212,165,38,0.35)] hover:-translate-y-0.5 active:translate-y-0"
        >
          {{ t('hero.cta.primary') }}
          <svg
            class="w-[18px] h-[18px] transition-transform duration-200 ease-out group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <!-- Secondary (navy outline-fill) -->
        <button
          @click="goToContact"
          class="inline-flex items-center justify-center text-center gap-[0.6rem] border-none min-w-[200px] px-[1.6rem] py-[0.95rem] font-[650] text-[0.92rem] tracking-[0.3px] rounded-xl cursor-pointer transition-all duration-200 ease-out bg-[#1f3a63] text-white shadow-[0_6px_16px_rgba(31,58,99,0.25)] hover:-translate-y-0.5 active:translate-y-0"
        >
          {{ t('hero.cta.secondary') }}
        </button>
      </div>
    </div>

    <!-- ============ RIGHT: STAT CARDS ============ -->
    <div class="grid grid-cols-2 gap-5">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="group relative overflow-hidden bg-white border border-[#e6e9ef] rounded-[18px] px-6 py-[1.6rem] flex flex-col items-center text-center gap-[0.45rem] shadow-[0_8px_22px_rgba(31,58,99,0.06)] transition-all duration-200 ease-out hover:-translate-y-[5px] hover:shadow-[0_16px_30px_rgba(31,58,99,0.12)] hover:border-[#d8dde7]"
      >
        <!-- Gold accent bar on the LEFT edge — wipes in on hover (replaces ::before) -->
        <span
          class="absolute top-0 left-0 w-1 h-full bg-[#d4a526] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
        />

        <!-- Icon sits in a soft tinted "chip" -->
        <span
          class="grid place-items-center w-12 h-12 rounded-2xl bg-[#d4a526]/15 text-[#d4a526] mb-1 transition-colors duration-200 ease-out group-hover:bg-[#d4a526] group-hover:text-white"
        >
          <!-- USERS -->
          <svg
            v-if="stat.icon === 'users'"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <!-- AWARD -->
          <svg
            v-else-if="stat.icon === 'award'"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
          </svg>
          <!-- PIN -->
          <svg
            v-else-if="stat.icon === 'pin'"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <!-- STAR -->
          <svg
            v-else
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </span>

        <span class="text-[2.1rem] font-extrabold tracking-[-1px] text-[#1f3a63] leading-none">{{
          stat.value
        }}</span>
        <span class="text-[0.9rem] font-medium text-[#64748b]">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
</style>
