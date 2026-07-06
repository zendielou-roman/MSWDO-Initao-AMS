<script setup>
// ============================================================
//  CONTACT US · SECTION  (redesigned — modern, unified layout)
//  One elevated card: navy info panel (left) + Google Map (right),
//  followed by the R.A. 11032 complaint/feedback banner.
//  Tailwind only · Lucide icons · navy + amber brand palette.
// ============================================================
import { inject } from 'vue'
import { MapPin, Phone, Mail, Clock, ExternalLink, Facebook, ShieldAlert } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'

// Complaint banner action (provided higher up by App.vue).
// Fallback no-op keeps the component safe if it isn't provided.
const goToContact = inject('goToContact', () => {})

// ---- Google Maps embed (Initao, Misamis Oriental) ----
const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31553.476374870576' +
  '!2d124.29012895!3d8.4466145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1' +
  '!3m3!1m2!1s0x32ff8d1451f6c3d1%3A0x2d5b8b3e00e59bf5' +
  '!2sInitao%2C%20Misamis%20Oriental!5e0!3m2!1sen!2sph!4v1702000000000!5m2!1sen!2sph'

// "Get Directions" deep link (opens native Google Maps).
const gmaps = 'https://maps.google.com/?q=Initao,Misamis+Oriental'

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
        eyebrow="GET IN TOUCH"
        title="Contact Information"
        subtitle="For inquiries, complaints, or assistance, reach the MSWDO Initao through any channel below."
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
            Get Directions
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
          <p class="font-bold text-[#1f3a63] text-[0.95rem] mb-1">File a Complaint or Feedback</p>
          <p class="text-slate-500 text-[0.88rem] leading-relaxed">
            In accordance with R.A. 11032, clients may file complaints against MSWDO employees for
            acts of discourtesy, inefficiency, or delayed service. Click here to submit your
            grievance or feedback.
          </p>
        </div>
        <!-- arrow hint -->
        <span class="ml-auto text-rose-400 text-lg self-center">›</span>
      </button>
    </div>
  </section>
</template>
