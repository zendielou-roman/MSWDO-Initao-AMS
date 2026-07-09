<script setup>
// Lucide icons (already installed) — styled with Tailwind classes, not CSS
import { ref, computed } from 'vue'
import SectionHeading from './SectionHeading.vue'
import {
  Users,
  ClipboardCheck,
  MapPin,
  Star, // stat icons
  HeartHandshake,
  Sprout,
  ShieldCheck, // award category icons
  HeartPulse,
  Accessibility,
  Medal,
  ArrowRight,
  HandCoins,
  ChevronDown,
  ChevronUp,
  AwardIcon,
  Award,
  X,
} from 'lucide-vue-next'

const showAll = ref(false) // false = collapsed (one row only)

// show only the first 3 (one row) until "Show more" is clicked
const visibleAwards = computed(() => (showAll.value ? awards : awards.slice(0, 3)))

// ===== MODAL STATE =====
const selectedAward = ref(null) // holds the award object currently shown in the modal

function openModal(award) {
  selectedAward.value = award
}

function closeModal() {
  selectedAward.value = null
}

// "By the Numbers" — top stat strip
const stats = [
  { icon: Users, value: '1,450+', label: 'Beneficiaries Served' },
  { icon: ClipboardCheck, value: '32', label: 'Programs Completed' },
  { icon: MapPin, value: '16', label: 'Barangays Reached' },
  { icon: Star, value: '26+', label: 'Years of Service' },
]

// "Recent Milestones" — each now has an `img` photo  👈 ALL 6 have img now
const awards = [
  {
    year: '2025',
    icon: HandCoins, // ✅ real Lucide icon (was CashInHand)
    title: 'Expanded Centenarians Act (RA 11982)',
    img: '/src/assets/accomplishments/elderly.jpg',
    // ✅ DOUBLE quotes so the apostrophe in "Initao's" doesn't break the string
    desc: "Another batch of octogenarians and nonagenarians received their ₱10K cash gifts from the National Commission of Senior Citizens (NCSC). LGU Initao's LCE, Hon. Mayor Mercy Grace J. Acain, joined the event, expressing gratitude to the 51 beneficiaries reaching these milestone ages and to their families for their support.",
  },
  {
    year: '2025',
    icon: Award,
    title: 'DSWD Certificate of Accomplishment — SFP',
    img: '/src/assets/accomplishments/award.jpg',
    desc: 'LGU Initao was recognized by DSWD Field Office X for its outstanding implementation of the 14th Cycle (2024) Supplementary Feeding Program, achieving 92.31% weight improvement and serving 100% of target beneficiaries — a strong commitment to child nutrition and welfare in Region X. Awarded June 17, 2025 at Pearlmont Hotel, Cagayan de Oro City.',
    featured: true, // 👈 marks this card as the standout
  },
  {
    year: '2024',
    icon: HeartHandshake,
    title: 'Zero Hunger Assistance',
    img: '/src/assets/accomplishments/food-assistance.jpg',
    desc: 'Provided food packs to 1,200 indigent families during calamities and crisis situations.',
  },
  {
    year: '2024',
    icon: Sprout,
    title: 'SLP Microenterprise Track',
    img: '/src/assets/accomplishments/livelihood.jpg',
    desc: 'Supported 145 Pantawid Pamilya beneficiaries in launching small livelihood enterprises.',
  },
  {
    year: '2023',
    icon: ShieldCheck,
    title: 'Child Protection Campaign',
    img: '/src/assets/accomplishments/child-protection.jpg',
    desc: 'Conducted community awareness activities on child abuse prevention in all 18 barangays.',
  },
  {
    year: '2023',
    icon: Accessibility,
    title: 'PWD Empowerment Program',
    img: '/src/assets/accomplishments/pwd.jpg',
    desc: 'Provided assistive devices and skills training to 320 persons with disabilities.',
  },
  {
    year: '2025',
    icon: HandCoins, // 💰 cash/payout icon — already in your imports
    title: 'DSWD KC Cash-for-Work Payout',
    img: '/src/assets/accomplishments/cash-for-work.jpg', // add a photo for this
    desc: "Culmination and payout of the DSWD KALAHI-CIDSS (KC) Cash-for-Work Program for Initao college graduates and graduating students. On behalf of LGU Initao, headed by Hon. Mayor Gagay Acain, our sincere gratitude to the DSWD Team led by Engr. Abo Tocalo and Ma'am Arline Pacudan — and most especially to Sir Al Orerbil for facilitating this grant.",
  },
]
</script>

<template>
  <!-- ACCOMPLISHMENTS SECTION -->
  <section
    id="accomplishments"
    class="bg-slate-100 px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Heading block — uniform SectionHeading; mb-16 opens the gap before the navy card -->
      <SectionHeading
        class="mb-12"
        eyebrow="BY THE NUMBERS"
        title="Accomplishments & Awards"
        subtitle="Tangible results of our commitment to social welfare and community development in Initao, Misamis Oriental."
      />

      <!-- Navy achievement band -->
      <div
        class="rounded-3xl bg-gradient-to-br from-[#16245a] to-[#1e3a6e] shadow-2xl px-6 py-10 md:px-11 md:py-11"
      >
        <!-- Stat strip -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <!-- circular icon -->
            <div
              class="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center"
            >
              <component :is="stat.icon" class="w-6 h-6 text-amber-400" />
            </div>
            <p class="text-3xl md:text-4xl font-extrabold text-white">{{ stat.value }}</p>
            <p class="text-amber-300/90 text-sm mt-1">{{ stat.label }}</p>
          </div>
        </div>

        <!-- divider -->
        <div class="h-px bg-white/10 my-10"></div>

        <!-- Milestones label -->
        <p class="text-white/70 font-semibold tracking-[0.15em] text-xs uppercase mb-6">
          Recent Milestones
        </p>

        <!-- Award cards grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
            v-for="award in visibleAwards"
            :key="award.title"
            class="group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg cursor-default"
          >
            <!-- PHOTO banner with floating year badge + category icon -->
            <div class="relative h-40 overflow-hidden shrink-0">
              <img
                :src="award.img"
                :alt="award.title"
                class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <!-- dark gradient so badges stay readable over any photo -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#16245a]/80 to-transparent"></div>
              <!-- year badge -->
              <span
                class="absolute top-3 left-3 bg-amber-400 text-[#16245a] text-xs font-bold rounded-full px-2.5 py-0.5"
              >
                {{ award.year }}
              </span>
              <!-- category icon -->
              <component
                :is="award.icon"
                class="absolute top-3 right-3 w-5 h-5 text-white/80 group-hover:text-amber-400 transition"
              />
            </div>

            <!-- text body: flex-col + flex-1 makes every card equal height -->
            <div class="flex flex-col flex-1 p-5">
              <!-- title clamped to 2 lines so photos + titles align across the row -->
              <h3 class="text-white font-bold mb-1.5 line-clamp-2">{{ award.title }}</h3>
              <!-- description clamped to 4 lines -> uniform card heights -->
              <!-- text-justify spreads text evenly to both left & right edges -->
              <p
                class="text-white/60 text-sm leading-relaxed line-clamp-4 text-justify hyphens-auto"
              >
                {{ award.desc }}
              </p>

              <!-- "Read more" pushed to the bottom of every card -->
              <button
                @click="openModal(award)"
                class="mt-auto pt-3 inline-flex items-center gap-1 text-amber-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition self-start"
              >
                Read more
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </div>

        <!-- Show more / less toggle -->
        <div class="mt-8 flex justify-end">
          <button
            @click="showAll = !showAll"
            class="inline-flex items-center gap-2 rounded-full border border-amber-400/60 px-6 py-2.5 text-sm font-semibold text-amber-400 transition duration-300 hover:bg-amber-400 hover:text-[#16245a]"
          >
            {{ showAll ? 'Show less' : 'Show more accomplishments' }}
            <!-- icon flips depending on state -->
            <component :is="showAll ? ChevronUp : ChevronDown" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ===== READ MORE MODAL ===== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedAward"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          @click.self="closeModal"
        >
          <div
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden text-left"
          >
            <!-- X close button, floats over the image -->
            <button
              @click="closeModal"
              aria-label="Close"
              class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-slate-700 hover:bg-white transition"
            >
              <X class="w-4 h-4" />
            </button>

            <!-- Photo banner with year badge -->
            <div class="relative h-48 sm:h-56 overflow-hidden shrink-0">
              <img
                :src="selectedAward.img"
                :alt="selectedAward.title"
                class="w-full h-full object-cover"
              />
              <span
                class="absolute top-3 left-3 bg-amber-400 text-[#16245a] text-xs font-bold rounded-full px-2.5 py-0.5"
              >
                {{ selectedAward.year }}
              </span>
            </div>

            <!-- Text body -->
            <div class="p-6">
              <h3 class="text-lg font-bold text-slate-900 mb-3">{{ selectedAward.title }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed text-justify hyphens-auto">
                {{ selectedAward.desc }}
              </p>

              <div class="mt-6 flex justify-end">
                <button
                  @click="closeModal"
                  class="rounded-lg bg-[#16245a] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1e3a6e] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>