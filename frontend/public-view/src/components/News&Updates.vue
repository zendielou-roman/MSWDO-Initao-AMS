<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, Newspaper } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'

const { t } = useI18n()

const newsMeta = [
  { key: 'foodRelief', categoryKey: 'relief', color: 'bg-red-400', date: 'June 15, 2026', img: '/src/assets/news/food-relief.jpg' },
  { key: 'medicalMission', categoryKey: 'health', color: 'bg-blue-400', date: 'June 10, 2026', img: '/src/assets/news/medical.jpg' },
  { key: 'socialPension', categoryKey: 'pension', color: 'bg-emerald-400', date: 'June 3, 2026', img: '/src/assets/news/socialpension.jpg' },
  { key: 'cashForWork', categoryKey: 'youth', color: 'bg-amber-400', date: 'May 28, 2026', img: '/src/assets/news/culmination.jpg' },
]

const news = computed(() =>
  newsMeta.map((n) => ({
    ...n,
    category: t(`news.categories.${n.categoryKey}`),
    title: t(`news.items.${n.key}.title`),
    excerpt: t(`news.items.${n.key}.excerpt`),
  }))
)

const selectedKey = ref(null)
const selected = computed(() => news.value.find((n) => n.key === selectedKey.value) || null)
function selectItem(key) { selectedKey.value = key }

// Graceful fallback if a news image fails to load
const imgErrors = reactive({})
function onImgError(key) { imgErrors[key] = true }
</script>

<template>
  <section id="news" class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 border-t border-[#dfe6f0]">
    <div class="max-w-6xl mx-auto">
      <SectionHeader
        :eyebrow="t('news.section.eyebrow')"
        :title="t('news.section.title')"
        :subtitle="t('news.section.subtitle')"
      />

      <div class="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-6 items-start mt-10">
        <!-- LEFT: list card -->
        <div class="flex flex-col h-[440px] lg:h-[520px] rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] overflow-hidden">
          <!-- list header -->
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 shrink-0">
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#16245a]/70">
              {{ t('news.section.eyebrow') }}
            </span>
            <span class="text-[11px] font-semibold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 leading-none">
              {{ news.length }}
            </span>
          </div>

          <!-- scrollable items, with a reserved gutter so the scrollbar never overlaps content or corners -->
          <div class="relative flex-1 min-h-0">
            <div class="pointer-events-none absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-white to-transparent z-10"></div>
            <div class="pointer-events-none absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-white to-transparent z-10"></div>

            <div
              class="h-full flex flex-col overflow-y-auto py-2 pr-2 pl-0
                     [&::-webkit-scrollbar]:w-1.5
                     [&::-webkit-scrollbar-track]:bg-transparent
                     [&::-webkit-scrollbar-thumb]:bg-[#16245a]/15
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-[#16245a]/30"
            >
              <button
                v-for="item in news"
                :key="item.key"
                type="button"
                @click="selectItem(item.key)"
                class="group relative text-left mx-2 my-0.5 rounded-xl pl-5 pr-3.5 py-3.5 transition-colors duration-200"
                :class="selectedKey === item.key ? 'bg-[#16245a]/[0.05]' : 'hover:bg-slate-50'"
              >
                <!-- sliding rail -->
                <span
                  class="absolute left-1.5 top-2.5 bottom-2.5 w-[3px] rounded-full transition-all duration-300"
                  :class="selectedKey === item.key ? 'bg-amber-400' : 'bg-transparent'"
                ></span>

                <div class="flex items-center gap-2 mb-1.5">
                  <span :class="item.color" class="w-1.5 h-1.5 rounded-full shrink-0"></span>
                  <span class="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {{ item.category }}
                  </span>
                  <span class="text-slate-300 text-[11px]">·</span>
                  <span class="text-slate-400 text-[11px]">{{ item.date }}</span>
                </div>
                <h4
                  class="text-sm font-bold leading-snug mb-1 transition-colors"
                  :class="selectedKey === item.key ? 'text-[#16245a]' : 'text-slate-700 group-hover:text-[#16245a]'"
                >
                  {{ item.title }}
                </h4>
                <p class="text-slate-400 text-xs leading-relaxed line-clamp-2">
                  {{ item.excerpt }}
                </p>
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT: editorial detail panel -->
        <div class="flex flex-col h-[440px] lg:h-[520px] rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80 overflow-hidden">
          <!-- Placeholder state -->
          <div v-if="!selected" class="h-full flex items-center justify-center p-10">
            <div class="max-w-sm text-center mx-auto">
              <div class="w-14 h-14 mx-auto mb-5 rounded-full bg-[#16245a]/5 ring-8 ring-[#16245a]/[0.03] flex items-center justify-center">
                <Newspaper class="w-6 h-6 text-[#16245a]" />
              </div>
              <h3 class="text-xl font-bold text-[#16245a] mb-2">{{ t('news.section.title') }}</h3>
              <p class="text-slate-500 text-sm leading-relaxed mb-6">{{ t('news.placeholder') }}</p>
              <button
                type="button"
                @click="selectItem(news[0].key)"
                class="inline-flex items-center gap-1.5 bg-[#16245a] hover:bg-[#1e3a6e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                {{ t('news.readLatest') }}
              </button>
            </div>
          </div>

          <!-- Selected article -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            mode="out-in"
          >
            <div v-if="selected" :key="selected.key" class="h-full overflow-y-auto
                   [&::-webkit-scrollbar]:w-1.5
                   [&::-webkit-scrollbar-track]:bg-transparent
                   [&::-webkit-scrollbar-thumb]:bg-[#16245a]/15
                   [&::-webkit-scrollbar-thumb]:rounded-full
                   hover:[&::-webkit-scrollbar-thumb]:bg-[#16245a]/30">
              <article>
                <!-- hero image with category badge -->
                <div class="relative h-40 sm:h-48 overflow-hidden shrink-0">
                  <img
                    v-if="!imgErrors[selected.key]"
                    :src="selected.img"
                    :alt="selected.title"
                    @error="onImgError(selected.key)"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center"
                    :class="selected.color"
                  >
                    <Newspaper class="w-9 h-9 text-white/80" />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"></div>
                  <div class="absolute bottom-3 left-4">
                    <span class="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full pl-1.5 pr-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#16245a] shadow-sm">
                      <span :class="selected.color" class="w-1.5 h-1.5 rounded-full"></span>
                      {{ selected.category }}
                    </span>
                  </div>
                </div>

                <div class="p-6 sm:p-8">
                  <h3 class="text-2xl sm:text-3xl font-extrabold text-[#16245a] mb-3 leading-tight">
                    {{ selected.title }}
                  </h3>

                  <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-6 pb-6 border-b border-slate-100">
                    <Calendar class="w-3.5 h-3.5" /> {{ selected.date }}
                  </div>

                  <p class="text-slate-600 text-sm leading-relaxed">
                    {{ selected.excerpt }}
                  </p>
                </div>
              </article>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>