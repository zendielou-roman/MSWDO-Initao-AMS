<script setup>
import { ref, inject, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { Search, Globe, ChevronDown, FileText } from 'lucide-vue-next'

import sealLogo from '../assets/seal.png'
import { services, iconTone } from '@/data/services.js'
import { searchSite } from '@/data/SearchIndex.js'

const router = useRouter()
const goToHome = inject('goToHome')
const { locale, t } = useI18n()

const links = [
  { label: 'nav.home', to: '/', sectionId: 'home' },
  { label: 'nav.services', to: '/services', hasDropdown: true, sectionId: 'services' },
  { label: 'nav.charter', to: '/charter', sectionId: 'charter' },
  { label: 'nav.accomplishments', to: '/accomplishments', sectionId: 'accomplishments' },
  { label: 'nav.news', to: '/news', sectionId: 'news' },
  { label: 'nav.about', to: '/about', sectionId: 'about' },
  { label: 'nav.contact', to: '/contact', sectionId: 'contact' },
]

const charterMenu = [
  { icon: FileText, tone: 'blue', title: 'Issuance of Social Case Study Report' },
  { icon: FileText, tone: 'gold', title: 'Issuance of Certificate of Indigency' },
  { icon: FileText, tone: 'rose', title: 'Availment of Financial/Medical/Funeral Assistance' },
  { icon: FileText, tone: 'blue', title: 'Issuance of PMOC Certificate' },
  { icon: FileText, tone: 'gold', title: 'Availment of Counseling/Consultation' },
]

const active = ref('home') // now tracks sectionId instead of raw label text
const search = ref('')
const showResults = ref(false)
const openMenu = ref(null)
const localeMenuButton = ref(null)
const showLocaleMenu = ref(false)
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'fil', label: 'Filipino' },
  { value: 'ceb', label: 'Cebuano' },
]

let closeTimer = null

function openDropdown(label) {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  openMenu.value = label
}

function scheduleClose() {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    openMenu.value = null
    closeTimer = null
  }, 200)
}

async function goToSection(id, label) {
  active.value = id
  openMenu.value = null
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }

  await goToHome(id)
}
function goToServices() {
  goToSection('services', 'SERVICES')
}

// --- Search ---
const results = computed(() => searchSite(search.value).slice(0, 8))

function onSearchFocus() {
  if (search.value.trim()) showResults.value = true
}

function onSearchInput() {
  showResults.value = search.value.trim().length > 0
}

async function selectResult(item) {
  search.value = ''
  showResults.value = false
  if (item.sectionId) {
    await goToHome(item.sectionId)
  } else if (item.route) {
    router.push(item.route)
  }
}

function closeResultsDelayed() {
  setTimeout(() => {
    showResults.value = false
  }, 150)
}

// --- Language ---
const localeLabel = computed(() => {
  return localeOptions.find((option) => option.value === locale.value)?.label || 'English'
})

function toggleLocaleMenu() {
  showLocaleMenu.value = !showLocaleMenu.value
}

function selectLocale(value) {
  locale.value = value
  localStorage.setItem('locale', value)
  showLocaleMenu.value = false
}

function handleClickOutside(event) {
  if (localeMenuButton.value && !localeMenuButton.value.contains(event.target)) {
    showLocaleMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="sticky top-0 z-[100] bg-[#e9ebee] px-8 pt-[0.9rem] pb-[0.4rem]">
   <nav
  class="flex flex-nowrap items-start justify-between gap-4 bg-white rounded-[16px] px-[1.6rem] py-[0.55rem] shadow-[0_6px_18px_rgba(0,0,0,0.1)]"
>
 <div class="flex items-center gap-[1.1rem] min-w-0 flex-1 self-center">
  <img :src="sealLogo" alt="MSWDO seal" class="w-[50px] h-[50px] object-contain shrink-0" />

<ul class="flex flex-wrap items-center gap-x-11 gap-y-2 list-none m-0 p-0 overflow-visible">
  <li
  v-for="link in links"
  :key="link.label"
  class="relative flex"
  @mouseenter="link.hasDropdown ? openDropdown(link.label) : null"
  @mouseleave="link.hasDropdown ? scheduleClose() : null"
>
            <a
               href="#"
  class="relative inline-flex items-center gap-[3px] whitespace-nowrap text-[0.82rem] font-bold tracking-[0.5px] leading-none text-[#1f3a63] no-underline py-1 transition-colors hover:text-[#d4a526]"
  :class="active === link.sectionId
    ? 'after:content-[\'\'] after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:bg-[#1f3a63]'
    : ''"
  @click.prevent="goToSection(link.sectionId, link.label)"
>
              {{ t(link.label) }}
              <ChevronDown
                v-if="link.hasDropdown"
                :size="14"
                class="text-[#d4a526] transition-transform"
                :class="{ 'rotate-180': openMenu === link.label }"
              />
            </a>

            <!-- SERVICES dropdown (scrollable) -->
            <div
              v-if="link.label === 'nav.services'"
              class="absolute top-full left-0 mt-3.5 w-[270px] bg-white rounded-xl shadow-xl p-2 z-30 transition-all duration-150 ease-out
                     before:content-[''] before:absolute before:-top-[7px] before:left-[26px] before:w-3.5 before:h-3.5 before:bg-white before:rotate-45 before:shadow-[-2px_-2px_5px_rgba(31,58,99,0.05)]
                     max-h-[420px] max-md:max-h-[60vh] max-md:w-[90vw] max-md:left-1/2 max-md:-translate-x-1/2 overflow-y-auto overscroll-contain
                     [scrollbar-width:thin] [scrollbar-color:#c7d2e1_transparent]
                     [&::-webkit-scrollbar]:w-1.5
                     [&::-webkit-scrollbar-track]:bg-transparent
                     [&::-webkit-scrollbar-thumb]:bg-[#c7d2e1]
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb]:hover:bg-[#9fb3cf]"
              :class="openMenu === 'nav.services'
                ? 'opacity-100 visible pointer-events-auto translate-y-0'
                : 'opacity-0 invisible pointer-events-none translate-y-2'"
              @mouseenter="openDropdown('nav.services')"
              @mouseleave="scheduleClose()"
            >
              <router-link
                v-for="s in services"
                :key="s.slug"
                :to="`/services/${s.slug}`"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline text-[#1f3a63] transition-colors hover:bg-gray-100 border-none"
                @click="openMenu = null"
              >
                <component :is="s.icon" :size="18" class="text-[#45506a] shrink-0" />
                <span class="text-[0.85rem] font-semibold text-[#1f3a63] leading-tight">{{
                  s.title
                }}</span>
              </router-link>
            </div>

            <!-- CHARTER dropdown (fixed, no scroll) -->
            <div
              v-if="link.hasDropdown && link.label !== 'nav.services' && link.label !== 'nav.about'"
              class="absolute top-full left-0 mt-3.5 w-[270px] bg-white rounded-xl shadow-xl p-2 z-30 transition-all duration-150 ease-out
                     before:content-[''] before:absolute before:-top-[7px] before:left-[26px] before:w-3.5 before:h-3.5 before:bg-white before:rotate-45 before:shadow-[-2px_-2px_5px_rgba(31,58,99,0.05)]
                     max-md:w-[90vw] max-md:left-1/2 max-md:-translate-x-1/2"
              :class="openMenu === link.label
                ? 'opacity-100 visible pointer-events-auto translate-y-0'
                : 'opacity-0 invisible pointer-events-none translate-y-2'"
              @mouseenter="openDropdown(link.label)"
              @mouseleave="scheduleClose()"
            >
              <a
                v-for="c in charterMenu"
                :key="c.title"
                href="#charter"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline text-[#1f3a63] transition-colors hover:bg-gray-100 border-none"
                @click.prevent="goToSection('charter', link.label)"
              >
                <component
                  :is="c.icon"
                  :size="18"
                  class="text-[#45506a] shrink-0 group-hover/row:text-blue-600"
                />
                <span class="text-[0.85rem] font-semibold text-[#1f3a63] leading-tight">{{
                  c.title
                }}</span>
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-1.5 shrink-0 self-center">
        <div class="relative">
          <div class="flex items-center gap-1.5 border border-gray-300 rounded px-2 py-0.5 w-48">
            <input
              v-model="search"
              type="text"
              :placeholder="t('search.placeholder')"
              class="flex-1 min-w-0 border-none outline-none text-sm bg-transparent text-[#1f3a63]"
              @input="onSearchInput"
              @focus="onSearchFocus"
              @blur="closeResultsDelayed"
            />
            <Search :size="16" class="text-blue-700 ml-auto" />
          </div>

          <div
            v-if="showResults"
            class="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-2 z-40 max-h-80 overflow-y-auto"
          >
            <button
              v-for="item in results"
              :key="item.title"
              class="flex flex-col w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              @mousedown.prevent="selectResult(item)"
            >
              <span class="text-sm font-semibold text-[#1f3a63]">{{ item.title }}</span>
              <span class="text-xs text-gray-500">{{ item.category }}</span>
            </button>

            <p v-if="results.length === 0" class="px-3 py-2 text-sm text-gray-500">
              {{ t('search.noResults') }} "{{ search }}"
            </p>
          </div>
        </div>

        <div ref="localeMenuButton" class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5 border border-gray-300 rounded px-2 py-0.5 w-48 text-sm"
            @click.stop="toggleLocaleMenu"
          >
            <Globe :size="15" class="text-blue-700" />
            <span class="text-[#1f3a63]">{{ localeLabel }}</span>
            <ChevronDown
              :size="13"
              class="text-[#1f3a63] ml-auto transition-transform"
              :class="{ 'rotate-180': showLocaleMenu }"
            />
          </button>

          <div
            v-if="showLocaleMenu"
            class="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl p-1.5 z-50"
            @click.stop
          >
            <button
              v-for="option in localeOptions"
              :key="option.value"
              type="button"
              class="flex w-full items-center justify-start px-3 py-2 text-sm rounded-lg hover:bg-gray-100 text-[#1f3a63]"
              @click="selectLocale(option.value)"
            >
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

