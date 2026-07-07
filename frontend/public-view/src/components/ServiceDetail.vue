<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getTranslatedServiceBySlug, iconTone } from '@/data/services.js'
import { ArrowLeft, CheckCircle2, Clock, FileText, ListChecks, MapPin, Scale } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const service = ref(null)

function loadService() {
  service.value = getTranslatedServiceBySlug(route.params.slug, t)
}

watch([() => route.params.slug, locale], loadService, { immediate: true })

async function backToServices() {
  await router.push({ path: '/', hash: '#services' })
  await router.isReady()
  await nextTick()

  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function goToContact() {
  await router.push({ path: '/', hash: '#contact' })
  await router.isReady()
  await nextTick()

  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <main class="bg-[#f4f6fa]">
    <template v-if="service">
      <!-- ===== HERO ===== -->
      <section
        id="service-hero"
        class="relative overflow-hidden bg-gradient-to-br from-[#16245a] to-[#1e3a6e] px-6 sm:px-12 pt-14 pb-16"
      >
        <div
          class="absolute right-0 top-0 bottom-0 w-40 bg-amber-400"
          style="clip-path: polygon(60% 0, 100% 0, 100% 100%, 0% 100%)"
        ></div>

        <div class="max-w-4xl mx-auto relative">
          <a
            href="#"
            @click.prevent="backToServices"
            class="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-[0.82rem] font-semibold mb-6 transition"
          >
            <ArrowLeft class="w-4 h-4" />
            {{ service.backToServicesKey ? t(service.backToServicesKey) : 'Back to Services' }}
          </a>

          <span
            class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            :class="iconTone[service.tone]"
          >
            <component :is="service.icon" :size="26" />
          </span>

          <h1 class="font-['Anton'] text-white text-3xl sm:text-4xl leading-[1.1] mb-4 max-w-2xl">
            {{ service.title }}
          </h1>
          <p class="text-white/85 text-base leading-relaxed max-w-xl">
            {{ service.desc }}
          </p>
        </div>
      </section>

      <!-- ===== DETAIL CONTENT ===== -->
      <section class="px-6 sm:px-12 py-14">
        <div class="max-w-4xl mx-auto grid md:grid-cols-[1fr_280px] gap-8 items-start">
          <!-- LEFT · main content -->
          <div class="flex flex-col gap-6">
            <!-- WHO CAN AVAIL -->
            <div class="bg-white rounded-2xl border border-slate-200 p-7">
              <div class="flex items-center gap-2.5 mb-4">
                <CheckCircle2 class="w-5 h-5 text-[#1e3a6e]" />
                <h2 class="text-[#1f3a63] font-extrabold text-lg">{{ service.whoCanAvailTitleKey ? t(service.whoCanAvailTitleKey) : 'Who Can Avail' }}</h2>
              </div>
              <ul class="space-y-2.5">
                <li
                  v-for="(item, i) in service.whoCanAvail"
                  :key="i"
                  class="flex gap-2.5 text-[0.92rem] text-slate-600 leading-relaxed"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- BENEFITS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-7">
              <div class="flex items-center gap-2.5 mb-4">
                <FileText class="w-5 h-5 text-[#1e3a6e]" />
                <h2 class="text-[#1f3a63] font-extrabold text-lg">{{ service.benefitsTitleKey ? t(service.benefitsTitleKey) : 'What You Get' }}</h2>
              </div>
              <ul class="space-y-2.5">
                <li
                  v-for="(item, i) in service.benefits"
                  :key="i"
                  class="flex gap-2.5 text-[0.92rem] text-slate-600 leading-relaxed"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- REQUIREMENTS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-7">
              <div class="flex items-center gap-2.5 mb-4">
                <ListChecks class="w-5 h-5 text-[#1e3a6e]" />
                <h2 class="text-[#1f3a63] font-extrabold text-lg">{{ service.requirementsTitleKey ? t(service.requirementsTitleKey) : 'Requirements' }}</h2>
              </div>
              <ul class="space-y-2.5">
                <li
                  v-for="(item, i) in service.requirements"
                  :key="i"
                  class="flex gap-2.5 text-[0.92rem] text-slate-600 leading-relaxed"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- HOW TO APPLY -->
            <div class="bg-white rounded-2xl border border-slate-200 p-7">
              <h2 class="text-[#1f3a63] font-extrabold text-lg mb-5">{{ service.processTitleKey ? t(service.processTitleKey) : 'How to Apply' }}</h2>
              <ol class="space-y-5">
                <li v-for="(step, i) in service.process" :key="step.title" class="flex gap-4">
                  <span
                    class="w-8 h-8 rounded-full bg-[#1e3a6e] text-white font-bold text-[0.8rem] flex items-center justify-center shrink-0"
                  >
                    {{ i + 1 }}
                  </span>
                  <div>
                    <p class="font-semibold text-[#1f3a63] text-[0.92rem] mb-0.5">
                      {{ step.title }}
                    </p>
                    <p class="text-slate-500 text-[0.88rem] leading-relaxed">{{ step.body }}</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <!-- RIGHT · at-a-glance sidebar -->
          <aside class="w-full md:w-[280px] sticky top-6 self-start">
            <div class="flex flex-col gap-4">
              <div class="bg-white rounded-2xl border border-slate-200 p-6">
                <div class="flex items-center gap-2 mb-2">
                  <Clock class="w-4 h-4 text-[#1e3a6e]" />
                  <p class="text-[#1f3a63] text-[0.75rem] font-bold uppercase tracking-wide">
                    {{ service.processingTimeTitleKey ? t(service.processingTimeTitleKey) : 'Processing Time' }}
                  </p>
                </div>
                <p class="text-slate-600 text-[0.88rem] leading-relaxed">
                  {{ service.processingTime }}
                </p>
              </div>

              <div class="bg-white rounded-2xl border border-slate-200 p-6">
                <div class="flex items-center gap-2 mb-2">
                  <Scale class="w-4 h-4 text-[#1e3a6e]" />
                  <p class="text-[#1f3a63] text-[0.75rem] font-bold uppercase tracking-wide">
                    {{ service.legalBasisTitleKey ? t(service.legalBasisTitleKey) : 'Legal Basis' }}
                  </p>
                </div>
                <p class="text-slate-600 text-[0.85rem] leading-relaxed">{{ service.legalBasis }}</p>
              </div>

              <div class="bg-gradient-to-br from-[#16245a] to-[#1e3a6e] rounded-2xl p-6 text-white">
                <div class="flex items-center gap-2 mb-2">
                  <MapPin class="w-4 h-4 text-amber-400" />
                  <p class="text-[0.75rem] font-bold uppercase tracking-wide text-amber-400">
                    {{ service.applyInPersonTitleKey ? t(service.applyInPersonTitleKey) : 'Apply In Person' }}
                  </p>
                </div>
                <p class="text-white/80 text-[0.85rem] leading-relaxed mb-4">
                  MSWDO Office, Municipal Hall, Initao, Misamis Oriental
                </p>
                <a
                  href="#"
                  @click.prevent="goToContact"
                  class="inline-flex items-center justify-center w-full rounded-lg bg-amber-400 hover:bg-amber-300 text-[#1f3a63] font-bold text-[0.85rem] py-2.5 transition"
                >
                  {{ service.directionsTitleKey ? t(service.directionsTitleKey) : 'Get Directions & Contact Info' }}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <!-- ===== FALLBACK: unknown slug ===== -->
    <section v-else class="px-6 sm:px-12 py-24 text-center">
      <p class="text-[#1f3a63] font-extrabold text-xl mb-3">{{ service?.notFoundTitleKey ? t(service.notFoundTitleKey) : 'Service not found' }}</p>
      <p class="text-slate-500 text-sm mb-6">
        {{ service?.notFoundDescKey ? t(service.notFoundDescKey) : "The service you're looking for doesn't exist or may have been moved." }}
      </p>
      <a
        href="#"
        @click.prevent="backToServices"
        class="inline-flex items-center gap-1.5 text-[#1e3a6e] font-semibold text-sm hover:underline"
      >
        <ArrowLeft class="w-4 h-4" />
        {{ service?.backToServicesKey ? t(service.backToServicesKey) : 'Back to Services' }}
      </a>
    </section>
  </main>
</template>