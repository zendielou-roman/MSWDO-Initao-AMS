<script setup>
import { ref, computed } from 'vue'
import { Users, MapPin, ArrowUpRight } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'

// 🛠️ Current programs. status: 'Ongoing' | 'Planned'
// Use DOUBLE quotes for any text with apostrophes!
const programs = [
  {
    status: 'Ongoing',
    title: 'Sustainable Livelihood Program — Skills Training',
    location: 'Municipal Hall, Initao',
    beneficiaries: '120 participants',
    desc: 'Hands-on vocational training in dressmaking, welding, and food processing to help families build sustainable income sources.',
    img: '/src/assets/operations/slp.jpg',
  },
  {
    status: 'Ongoing',
    title: 'Supplementary Feeding Program — 15th Cycle',
    location: '24 Day Care Centers',
    beneficiaries: '1,050 children',
    desc: 'Daily nutritious meals for day care children to improve nutritional status and reduce malnutrition across all barangays.',
    img: '/src/assets/operations/feeding.jpg',
  },
  {
    status: 'Planned',
    title: 'Senior Citizens Wellness & Mobility Caravan',
    location: 'Barangay Rotation',
    beneficiaries: '600+ seniors',
    desc: 'An upcoming barangay-to-barangay caravan offering health checks, mobility aids, and pension assistance for the elderly.',
    img: '/src/assets/operations/senior.jpg',
  },
  {
    status: 'Planned',
    title: 'PWD Assistive Devices Distribution',
    location: 'MSWDO Office',
    beneficiaries: '85 PWDs',
    desc: 'Distribution of wheelchairs, crutches, and hearing aids to registered persons with disabilities in the municipality.',
    img: '/src/assets/operations/devices.jpg',
  },
]

// 🔘 Filter tabs
const filters = ['All', 'Ongoing', 'Planned']
const active = ref('All')
const filtered = computed(() =>
  active.value === 'All' ? programs : programs.filter((p) => p.status === active.value),
)

// status pill colors
const pill = (s) =>
  s === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
</script>

<template>
  <!-- WHITE background -> distinct from slate-50 News + navy Accomplishments -->
  <section
    id="operations"
    class="bg-[#dde3ef] px-6 sm:px-12 pt-0.1 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div class="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="ON THE GROUND"
        title="Active Operations"
        subtitle="Programs we're currently running and the initiatives coming soon to serve Initao."
      />

      <!-- 🔘 Filter tabs -->
      <div class="flex justify-center gap-2 mb-10">
        <button
          v-for="f in filters"
          :key="f"
          @click="active = f"
          :class="
            active === f
              ? 'bg-[#16245a] text-white shadow-md'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          "
          class="px-5 py-2 rounded-full text-sm font-semibold transition duration-200"
        >
          {{ f }}
        </button>
      </div>

      <!-- Program cards: 2-up grid, photo on top -->
      <div class="grid md:grid-cols-2 gap-6">
        <article
          v-for="p in filtered"
          :key="p.title"
          class="group rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
        >
          <!-- photo + status pill -->
          <div class="relative h-52 overflow-hidden">
            <img
              :src="p.img"
              :alt="p.title"
              class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span
              :class="pill(p.status)"
              class="absolute top-4 left-4 text-xs font-bold rounded-full px-3 py-1 shadow"
            >
              {{ p.status }}
            </span>
          </div>

          <!-- body -->
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-lg font-bold text-[#16245a] mb-2 leading-snug">{{ p.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{{ p.desc }}</p>

            <!-- meta row: location + beneficiaries -->
            <div
              class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 pt-4 border-t border-slate-100"
            >
              <span class="inline-flex items-center gap-1.5">
                <MapPin class="w-3.5 h-3.5 text-blue-600" /> {{ p.location }}
              </span>
              <span class="inline-flex items-center gap-1.5 font-semibold text-[#16245a]">
                <Users class="w-3.5 h-3.5 text-blue-600" /> {{ p.beneficiaries }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- View all -> right-aligned, matches News + Accomplishments -->
      <div class="mt-8 flex justify-end">
        <a
          href="#"
          class="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm hover:gap-2.5 transition-all"
        >
          View all programs <ArrowUpRight class="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>
