<script setup>
// ===== ORGANIZATIONAL CHART SECTION =====
import { Crown, Star } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'

const leadership = [
  {
    name: 'Mercy Grace J. Acain',
    role: 'Mayor',
    img: new URL('../assets/org/mayor-acain.png', import.meta.url).href,
  },
  {
    name: 'Enerito J. Acain',
    role: 'Vice-Mayor',
    img: new URL('../assets/org/vice-mayor.png', import.meta.url).href,
  },
]

const oic = {
  name: 'Amee Amore S. Bagares',
  role: 'Officer-in-Charge',
  img: new URL('../assets/org/oic-bagares.png', import.meta.url).href,
}

const divisions = [
  {
    name: 'Rosalio L. Ebesa Jr.',
    roles: ['ECCD Focal Person, LGU Link', 'IT Administrator, Property Custodian'],
    img: new URL('../assets/org/ebesa.png', import.meta.url).href,
  },
  {
    name: 'Joash S. Sabellano',
    roles: ['Job Order, Intake / Client Info', 'IT Administrator'],
    img: new URL('../assets/org/sabellano.png', import.meta.url).href,
  },
  {
    name: 'Dahlia B. Telen',
    roles: ['SWA, Senior Citizen Focal Person', 'PWD Focal Person'],
    img: new URL('../assets/org/telen.png', import.meta.url).href,
  },
]

const staff = [
  {
    name: 'Cynthia J. Balabat',
    roles: ['Solo Parent Focal', 'Job Order, Client Info Gathering'],
    img: new URL('../assets/org/balabat.png', import.meta.url).href,
  },
  {
    name: 'Lorelie N. Galarita',
    roles: ['Job Order, Client Info Gathering'],
  },
  {
    name: 'Gardel R. Velasco',
    roles: ['Job Order, OSCA Clerk'],
    img: new URL('../assets/org/velasco.png', import.meta.url).href,
  },
  {
    name: 'Arla Jane W. Sandoval',
    roles: ['Job Order, KALAH / MCT-CEF'],
    img: new URL('../assets/org/sandoval.png', import.meta.url).href,
  },
  {
    name: 'Vicky W. Anoba',
    roles: ['Job Order, Women Focal Person', 'KALAH / MCT-CEF'],
  },
]

function initials(name) {
  const parts = name
    .replace(/Jr\.?|Sr\.?|[A-Z]\./g, '')
    .trim()
    .split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}
</script>

<template>
  <section id="organization" class="bg-slate-100 px-6 sm:px-12 pt-0.1 pb-16 text-center">
    <div class="max-w-6xl mx-auto">
      <SectionHeading
        class="mb-14"
        eyebrow="OFFICE STRUCTURE"
        title="Organizational Chart"
        subtitle="The MSWDO Initao organizational hierarchy showing office leadership and functional divisions."
      />

      <!-- TIER 1 · MUNICIPAL LEADERSHIP -->
      <p class="text-center text-[#2a5caa] font-bold tracking-[3px] text-[0.72rem] uppercase mb-5">
        Municipal Leadership
      </p>
      <div class="flex flex-wrap justify-center gap-5">
        <article
          v-for="p in leadership"
          :key="p.name"
          class="group w-60 bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2a5caa]/40"
        >
          <div
            class="mx-auto w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center ring-4 ring-white shadow-md mb-3"
          >
            <template v-if="p.img">
              <img :src="p.img" :alt="p.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-xl">{{ initials(p.name) }}</span>
            </template>
          </div>
          <h3 class="font-bold text-[#1f3a63] leading-tight">{{ p.name }}</h3>
          <span
            class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-amber-400/15 text-[#9a6b00] text-[0.72rem] font-bold uppercase tracking-wide"
          >
            {{ p.role }}
          </span>
        </article>
      </div>

      <!-- connector: leadership -> OIC -->
      <div class="flex justify-center"><div class="w-px h-10 bg-slate-300"></div></div>

      <!-- TIER 2 · OFFICER-IN-CHARGE -->
      <div class="flex justify-center">
        <article
          class="group relative w-72 rounded-2xl shadow-xl px-6 py-7 text-center text-white bg-gradient-to-br from-[#16245a] to-[#1e3a6e] transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <span class="absolute top-0 left-8 right-8 h-1 rounded-full bg-amber-400"></span>
          <div
            class="mx-auto w-24 h-24 rounded-full overflow-hidden bg-white/10 flex items-center justify-center ring-4 ring-amber-400/40 shadow-lg mb-3"
          >
            <template v-if="oic.img">
              <img :src="oic.img" :alt="oic.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-2xl">{{ initials(oic.name) }}</span>
            </template>
          </div>
          <h3 class="font-bold text-lg leading-tight">{{ oic.name }}</h3>
          <span
            class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-amber-400 text-[#1f3a63] text-[0.72rem] font-bold uppercase tracking-wide"
          >
            {{ oic.role }}
          </span>
        </article>
      </div>

      <!-- connector: OIC -> divisions -->
      <div class="flex justify-center"><div class="w-px h-10 bg-slate-300"></div></div>

      <!-- TIER 3 · FOCAL PERSONS & DIVISIONS -->
      <p class="text-center text-[#2a5caa] font-bold tracking-[3px] text-[0.72rem] uppercase mb-5">
        Focal Persons &amp; Divisions
      </p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <article
          v-for="p in divisions"
          :key="p.name"
          class="group bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2a5caa]/40"
        >
          <div
            class="mx-auto w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#1f3a63] to-[#2a5caa] flex items-center justify-center ring-4 ring-white shadow-md mb-3"
          >
            <template v-if="p.img">
              <img :src="p.img" :alt="p.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-lg">{{ initials(p.name) }}</span>
            </template>
          </div>
          <h3 class="font-bold text-[#1f3a63] leading-tight mb-2">{{ p.name }}</h3>
          <ul class="space-y-1">
            <li
              v-for="role in p.roles"
              :key="role"
              class="text-slate-500 text-[0.72rem] leading-snug"
            >
              {{ role }}
            </li>
          </ul>
        </article>
      </div>

      <!-- connector: divisions -> staff -->
      <div class="flex justify-center mt-6"><div class="w-px h-10 bg-slate-300"></div></div>

      <!-- TIER 4 · STAFF -->
      <p class="text-center text-[#2a5caa] font-bold tracking-[3px] text-[0.72rem] uppercase mb-5">
        Staff
      </p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-6xl mx-auto">
        <article
          v-for="p in staff"
          :key="p.name"
          class="group bg-slate-50 rounded-2xl border border-slate-200 shadow-sm px-5 py-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2a5caa]/40"
        >
          <div
            class="mx-auto w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center ring-4 ring-white shadow-md mb-3"
          >
            <template v-if="p.img">
              <img :src="p.img" :alt="p.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-base">{{ initials(p.name) }}</span>
            </template>
          </div>
          <h3 class="font-bold text-[#1f3a63] text-sm leading-tight mb-2">{{ p.name }}</h3>
          <ul class="space-y-1">
            <li
              v-for="role in p.roles"
              :key="role"
              class="text-slate-500 text-[0.7rem] leading-snug"
            >
              {{ role }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
