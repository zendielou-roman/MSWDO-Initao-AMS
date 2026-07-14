<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from './SectionHeading.vue'
import {
  Users, ClipboardCheck, MapPin, Star, HeartHandshake, Sprout,
  ShieldCheck, Accessibility, HandCoins, ArrowRight, ChevronDown,
  ChevronUp, Award, X,
} from 'lucide-vue-next'

const { t } = useI18n()

const showAll = ref(false)
const selectedAward = ref(null)
function openModal(award) { selectedAward.value = award }
function closeModal() { selectedAward.value = null }

// icon/img stay hardcoded — only text goes through i18n
const stats = computed(() => [
  { icon: Users, value: '1,450+', label: t('accomplishments.stats.beneficiaries') },
  { icon: ClipboardCheck, value: '32', label: t('accomplishments.stats.programs') },
  { icon: MapPin, value: '16', label: t('accomplishments.stats.barangays') },
  { icon: Star, value: '26+', label: t('accomplishments.stats.years') },
])

const awardsMeta = [
  { key: 'centenariansAct', year: '2025', icon: HandCoins, img: '/src/assets/accomplishments/elderly.jpg' },
  { key: 'sfpAward', year: '2025', icon: Award, img: '/src/assets/accomplishments/award.jpg', featured: true, imgPosition: 'object-[50%_20%]' }, // ← added
  { key: 'zeroHunger', year: '2024', icon: HeartHandshake, img: '/src/assets/accomplishments/food-assistance.jpg' },
  { key: 'slpMicroenterprise', year: '2024', icon: Sprout, img: '/src/assets/accomplishments/livelihood.jpg' },
  { key: 'childProtection', year: '2023', icon: ShieldCheck, img: '/src/assets/accomplishments/child-protection.jpg' },
  { key: 'pwdEmpowerment', year: '2023', icon: Accessibility, img: '/src/assets/accomplishments/pwd.jpg' },
  { key: 'cashForWork', year: '2025', icon: HandCoins, img: '/src/assets/accomplishments/cash-for-work.jpg' },
]

const awards = computed(() =>
  awardsMeta.map((a) => ({
    ...a,
    title: t(`accomplishments.items.${a.key}.title`),
    desc: t(`accomplishments.items.${a.key}.desc`),
  }))
)

const visibleAwards = computed(() => (showAll.value ? awards.value : awards.value.slice(0, 3)))
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
        :eyebrow="t('accomplishments.section.eyebrow')"
        :title="t('accomplishments.section.title')"
        :subtitle="t('accomplishments.section.subtitle')"
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
          {{ t('accomplishments.milestonesLabel') }}
        </p>

        <!-- Award cards grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
            v-for="award in visibleAwards"
            :key="award.title"
            @click="openModal(award)"
            class="group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg cursor-pointer"
          >
            <!-- PHOTO banner with floating year badge + category icon -->
            <div class="relative h-40 overflow-hidden shrink-0">
              <img
                :src="award.img"
                :alt="award.title"
                :class="['w-full h-full object-cover transition duration-500 group-hover:scale-105', award.imgPosition || 'object-center']"
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
               {{ t('accomplishments.readMore') }}
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
            {{ showAll ? t('accomplishments.showLess') : t('accomplishments.showMore') }}
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
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-95"
          @click.self="closeModal"
        >
          <div
            class="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl overflow-hidden text-left"
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
            <div class="relative h-50 sm:h-70 overflow-hidden shrink-0">
              <img
                :src="selectedAward.img"
                :alt="selectedAward.title"
                :class="['w-full h-full object-cover', selectedAward.imgPosition || 'object-center']"
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