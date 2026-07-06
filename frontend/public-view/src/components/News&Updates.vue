<script setup>
import { ref, computed } from 'vue'
import { Calendar, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'

// 📰 News items — first one (featured) renders large; the rest fill the side list.
// Use DOUBLE quotes for any text containing apostrophes!
const news = [
  {
    category: 'Relief',
    color: 'bg-red-100 text-red-600',
    date: 'June 15, 2026',
    title: 'Emergency Food Relief Distribution for Flood-Affected Families',
    excerpt:
      'MSWDO Initao successfully distributed food packs and relief goods to 248 families affected by the recent flooding in low-lying barangays, ensuring no household was left behind.',
    img: '/src/assets/news/food-relief.jpg',
  },
  {
    category: 'Health',
    color: 'bg-blue-100 text-blue-600',
    date: 'June 10, 2026',
    title: 'Free Medical and Dental Mission in Barangay Jampason',
    excerpt:
      'In partnership with the Municipal Health Office, a medical and dental mission served over 300 residents.',
    img: '/src/assets/news/medical.jpg',
  },
  {
    category: 'Pension',
    color: 'bg-green-100 text-green-600',
    date: 'June 3, 2026',
    title: 'Social Pension Payout for Indigent Senior Citizens — 2nd Quarter 2026',
    excerpt: 'A total of 412 indigent senior citizens received their 2nd quarter social pension.',
    img: '/src/assets/news/socialpension.jpg',
  },
  {
    category: 'Youth',
    color: 'bg-amber-100 text-amber-600',
    date: 'May 28, 2026',
    title: 'DSWD KC Cash-for-Work Payout for Initao Graduates',
    excerpt: 'College graduates and graduating students received their Cash-for-Work grants.',
    img: '/src/assets/news/culmination.jpg',
  },
]

const featured = computed(() => news[0]) // the lead story (big card)
const rest = computed(() => news.slice(1, 4)) // up to 3 items in the side list
</script>

<template>
  <!-- LIGHT background -> clearly distinct from the navy Accomplishments section above -->
  <section
    id="news"
    class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div class="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="LATEST"
        title="News & Updates"
        subtitle="Fresh announcements, advisories, and event recaps from the MSWDO Initao."
      />

      <!-- 2-column layout: BIG featured story (left) + compact list (right) -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- ★ FEATURED lead story (large) -->
        <article
          class="group rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer flex flex-col"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              :src="featured.img"
              :alt="featured.title"
              class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span
              :class="featured.color"
              class="absolute top-4 left-4 text-xs font-bold rounded-full px-3 py-1"
            >
              {{ featured.category }}
            </span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
              <Calendar class="w-3.5 h-3.5" /> {{ featured.date }}
            </div>
            <h3 class="text-xl font-bold text-[#16245a] mb-2 leading-snug">{{ featured.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">
              {{ featured.excerpt }}
            </p>
            <span
              class="mt-auto pt-4 inline-flex items-center gap-1 text-blue-700 font-semibold text-sm"
            >
              Read more <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition" />
            </span>
          </div>
        </article>

        <!-- ☰ Compact "latest" list (small thumbnail rows) -->
        <div class="flex flex-col gap-4">
          <article
            v-for="item in rest"
            :key="item.title"
            class="group flex gap-4 rounded-xl bg-white border border-slate-200 p-3 hover:shadow-md hover:border-blue-200 transition duration-300 cursor-pointer"
          >
            <!-- small thumbnail -->
            <div class="relative w-28 h-24 shrink-0 rounded-lg overflow-hidden">
              <img
                :src="item.img"
                :alt="item.title"
                class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <!-- text -->
            <div class="flex flex-col justify-center min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span :class="item.color" class="text-[10px] font-bold rounded-full px-2 py-0.5">
                  {{ item.category }}
                </span>
                <span class="text-slate-400 text-[11px] flex items-center gap-1">
                  <Calendar class="w-3 h-3" /> {{ item.date }}
                </span>
              </div>
              <h4
                class="text-sm font-bold text-[#16245a] leading-snug line-clamp-2 group-hover:text-blue-700 transition"
              >
                {{ item.title }}
              </h4>
            </div>
          </article>

          <!-- View all -> right-aligned, matches your Accomplishments button vibe -->
          <a
            href="#"
            class="mt-2 self-end inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm hover:gap-2.5 transition-all"
          >
            View all news <ArrowUpRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
