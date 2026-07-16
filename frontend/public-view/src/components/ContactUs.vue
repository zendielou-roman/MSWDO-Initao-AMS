<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ============================================================
//  CONTACT US · SECTION  (redesigned — modern, unified layout)
//  One elevated card: navy info panel (left) + Google Map (right),
//  followed by the R.A. 11032 complaint/feedback banner.
//  Tailwind only · Lucide icons · navy + amber brand palette.
// ============================================================
import { computed, inject } from 'vue'
import { MapPin, Phone, Mail, Clock, ExternalLink, Facebook, ShieldAlert } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'

// Complaint banner action (provided higher up by App.vue).
// Fallback no-op keeps the component safe if it isn't provided.
const goToContact = inject('goToContact', () => {})

// Text-search embed — resolves to a plain pin (no business rating attached)
const mapEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('New Municipal Hall of Initao, Jampason, Initao, Misamis Oriental') +
  '&output=embed'

const gmaps = 'https://www.google.com/maps?q=New+Municipal+Hall+of+Initao&ll=8.508564090204711,124.30375781410106'

// ---- Contact rows (data-driven → clean, DRY markup) ----
// Each icon is a Lucide component rendered via <component :is>.
const facebookUrl = 'https://www.facebook.com/mswdo.initao'
const facebookDisplayText = 'facebook.com/mswdo.initao'

const details = [
  {
    icon: MapPin,
    label: 'Office Address',
    lines: ['Municipal Hall, Jampason', 'Initao, Misamis Oriental 9022'],
  },
  { icon: Phone, label: 'Telephone', lines: ['(088) 271-xxxx', '(088) 271-xxxx (Fax)'] },
  { icon: Mail, label: 'Email', lines: ['mswdo.initao@gmail.com', 'lgu.initao@gmail.com'] },
  {
    icon: Clock,
    label: 'Office Hours',
    lines: ['Monday – Friday', '8:00 AM – 12 NN · 1:00 – 5:00 PM'],
  },
  {
    icon: Facebook,
    label: 'Facebook Account',
    href: facebookUrl,
    lines: [facebookDisplayText],
  },
]
</script>

<template>
  <!-- ===== CONTACT US =====
       bg-[#dde3ef] gives a soft neutral that contrasts the white section above -->
  <section id="contact" class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 border-t border-[#dfe6f0]">
    <div class="mx-auto max-w-6xl">
      <!-- Uniform section heading (canonical SectionHeading) -->
      <SectionHeading
        class="mb-12"
        :eyebrow="t('contact.section.eyebrow')"
        :title="t('contact.section.title')"
        :subtitle="t('contact.section.subtitle')"
      />
      <!-- ===== UNIFIED CONTACT CARD ===== -->
      <!-- One rounded, elevated card: info panel (left) + map (right).
           ring + shadow lift it cleanly off the slate background. -->
      <div
        class="grid overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/70 lg:grid-cols-[420px_1fr]"
      >
        <!-- ───── LEFT · NAVY INFO PANEL ───── -->
        <aside
          class="flex flex-col bg-gradient-to-br from-[#16245a] to-[#1e3a6e] p-8 md:p-9 text-white text-left"
        >
          <!-- Office identity -->
          <div>
            <h3 class="text-lg font-bold leading-tight">MSWDO Initao</h3>
            <p class="mt-1 text-[0.82rem] text-white/60">
              Municipal Social Welfare &amp; Development Office
            </p>
            <!-- gold accent divider -->
          </div>

          <!-- Contact detail rows (data-driven) -->
          <ul class="mt-7 flex-1 space-y-6">
            <li v-for="item in details" :key="item.label" class="flex gap-4">
              <!-- amber icon chip -->
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15"
              >
                <component :is="item.icon" class="h-[18px] w-[18px] text-amber-400" />
              </span>
              <!-- label + lines -->
              <div class="min-w-0">
                <p class="text-[0.7rem] font-bold uppercase tracking-[1.5px] text-amber-400/90">
                  {{ item.label }}
                </p>
                <template v-if="item.href">
                  <a
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-0.5 block break-words text-[0.9rem] leading-relaxed text-white/90 transition hover:text-amber-300"
                  >
                    {{ item.lines[0] }}
                  </a>
                </template>
                <template v-else>
                  <p
                    v-for="(line, i) in item.lines"
                    :key="i"
                    class="mt-0.5 break-words text-[0.9rem] leading-relaxed text-white/90"
                  >
                    {{ line }}
                  </p>
                </template>
              </div>
            </li>
          </ul>

          <!-- amber CTA · Get Directions -->
          <a
            :href="gmaps"
            target="_blank"
            rel="noopener"
            class="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-3 text-[0.92rem] font-bold text-[#1f3a63] shadow-md transition duration-200 hover:bg-amber-300 hover:shadow-lg"
          >
            <ExternalLink class="h-4 w-4" />
            {{ t('contact.getDirections') }}
          </a>
        </aside>

       <!-- ───── RIGHT · GOOGLE MAP ───── -->
    <div class="relative min-h-[380px] bg-slate-100 lg:min-h-[560px]">
      <iframe
        :src="mapEmbed"
        title="Map of MSWDO Initao, Misamis Oriental"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        class="absolute inset-0 h-full w-full border-0"
      ></iframe>
    </div>
      </div>

      <!-- CLICKABLE COMPLAINT BANNER -->
      <button
        @click="goToContact"
        class="w-full bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:bg-rose-50 border border-transparent hover:border-rose-200 transition duration-200 cursor-pointer text-left mt-6"
      >
        <span
          class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"
        >
          <ShieldAlert class="w-5 h-5 text-rose-500" />
        </span>
        <div>
          <p class="font-bold text-[#1f3a63] text-[0.95rem] mb-1">{{ t('contact.complaint.title') }}</p>
          <p class="text-slate-500 text-[0.88rem] leading-relaxed">
            {{ t('contact.complaint.description') }}
          </p>
        </div>
        <!-- arrow hint -->
        
      </button>
    </div>
  </section>
</template>
