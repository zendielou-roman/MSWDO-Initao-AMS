<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'

const { t } = useI18n()

// icon/color/date/img stay hardcoded — only text goes through i18n
const newsMeta = [
  {
    key: 'foodRelief',
    categoryKey: 'relief',
    color: 'bg-red-100 text-red-600',
    date: 'June 15, 2026',
    img: '/src/assets/news/food-relief.jpg',
  },
  {
    key: 'medicalMission',
    categoryKey: 'health',
    color: 'bg-blue-100 text-blue-600',
    date: 'June 10, 2026',
    img: '/src/assets/news/medical.jpg',
  },
  {
    key: 'socialPension',
    categoryKey: 'pension',
    color: 'bg-green-100 text-green-600',
    date: 'June 3, 2026',
    img: '/src/assets/news/socialpension.jpg',
  },
  {
    key: 'cashForWork',
    categoryKey: 'youth',
    color: 'bg-amber-100 text-amber-600',
    date: 'May 28, 2026',
    img: '/src/assets/news/culmination.jpg',
  },
]

const news = computed(() =>
  newsMeta.map((n) => ({
    ...n,
    category: t(`news.categories.${n.categoryKey}`),
    title: t(`news.items.${n.key}.title`),
    excerpt: t(`news.items.${n.key}.excerpt`),
  }))
)

const featured = computed(() => news.value[0])
const rest = computed(() => news.value.slice(1, 4))
</script>

<template>
  <!-- LIGHT background -> clearly distinct from the navy Accomplishments section above -->
  <section
    id="news"
    class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div class="max-w-6xl mx-auto">
      <SectionHeader
          :eyebrow="t('news.section.eyebrow')"
          :title="t('news.section.title')"
          :subtitle="t('news.section.subtitle')"
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
           <span class="mt-auto pt-4 inline-flex items-center gap-1 text-blue-700 font-semibold text-sm">
            {{ t('news.readMore') }} <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition" />
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
          <a href="#" class="mt-2 self-end inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm hover:gap-2.5 transition-all">
  {{ t('news.viewAll') }} <ArrowUpRight class="w-4 h-4" />
</a>
        </div>
      </div>
    </div>
  </section>
</template>
