<script setup>
/* ===== CITIZEN'S CHARTER SECTION =====
     Two parts:
     1) charterItems  -> the small "service standards" cards (top row)
     2) services      -> the detailed service cards (navy header + Requirements/Process)
                         this is the new block that replaces the old duplicated row. */
import { ShieldCheck, Clock, FileText, Globe, BadgeCheck, CheckCircle2 } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeading.vue'
/* ---- TOP STANDARDS CARDS ----
     NOTE: the duplicates are gone — only the 4 unique cards remain. */
const charterItems = [
  {
    icon: ShieldCheck,
    title: 'Service Commitment',
    text: 'We commit to deliver services within the prescribed processing time and ensure that every client is treated with dignity and respect.',
    featured: false,
  },
  {
    icon: Clock,
    title: 'Processing Time',
    text: 'Simple transactions: 3 working days. Complex transactions: 7 working days. Highly technical: 20 working days.',
    featured: false,
  },
  {
    icon: FileText,
    title: 'Documentary Requirements',
    text: 'Only required documents per DILG and DSWD guidelines are requested. No additional documents beyond what is prescribed by law.',
    featured: true,
  },
  {
    icon: Globe,
    title: 'Zero Contact Policy',
    text: 'Our office strictly adheres to the Zero Contact Policy. Frontline staff are prohibited from soliciting gifts or other considerations.',
    featured: false,
  },
]

const services = [
  {
    no: '01',
    title: 'Issuance of PWD Identification Card',
    time: '1 working day',
    fee: 'Free of charge',
    requirements: [
      'Accomplished PWD application form',
      'Medical certificate stating the type of disability',
      '2 pcs. 1×1 ID picture',
      'Barangay certificate of residency',
    ],
    process: [
      'Submit complete requirements at the MSWDO PDAO desk',
      'Validation and encoding by PDAO focal person',
      'Approval and signature of the MSWDO head',
      'Release of PWD ID and purchase booklet',
    ],
  },
]

function openCharter() {
  window.open('/citizens-charter.pdf', '_blank')
}
</script>

<template>
  <section
    id="charter"
    class="bg-[#dde3ef] px-6 sm:px-12 pt-11 pb-16 text-center border-t border-[#dfe6f0]"
  >
    <div id="charter">
      <SectionHeader
        eyebrow="SERVICE STANDARDS"
        title="CITIZEN'S CHARTER"
        subtitle="Our commitment to deliver quality, efficient, and responsive social welfare services to every Filipino in Initao."
      />

      <!-- ===== TOP STANDARDS GRID (4 cards) ===== -->
      <div
        class="grid grid-cols-4 gap-5 max-w-[1180px] mx-auto mb-10 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
      >
        <article
          v-for="(item, i) in charterItems"
          :key="i"
          class="bg-[#fdfdfe] border border-[#e4e9f1] rounded-[14px] px-[1.4rem] py-[1.8rem] text-center transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_26px_rgba(31,58,99,0.1)]"
          :class="
            item.featured
              ? 'border-[1.5px] border-[#c9d4e6] shadow-[0_10px_24px_rgba(31,58,99,0.08)]'
              : ''
          "
        >
          <div class="flex justify-center mb-4">
            <span
              class="inline-flex items-center justify-center w-[54px] h-[54px] rounded-[14px] border border-[#e3e8f0] shadow-sm bg-[#eef1f7] text-[#2a5caa]"
            >
              <component :is="item.icon" :size="22" :stroke-width="2.2" class="shrink-0" />
            </span>
          </div>
          <h3 class="text-[#1f3a63] text-base font-bold mb-2">{{ item.title }}</h3>
          <p class="text-[#6b7688] text-[0.82rem] leading-[1.5] m-0">{{ item.text }}</p>
        </article>
      </div>
    </div>

    <!-- ===== DETAILED SERVICE CARDS (new block) ===== -->
    <div class="max-w-[1180px] mx-auto mb-10 flex flex-col gap-6">
      <article
        v-for="(svc, i) in services"
        :key="i"
        class="bg-white rounded-[14px] overflow-hidden shadow-[0_10px_28px_rgba(31,58,99,0.08)] text-left"
      >
        <!-- NAVY HEADER BAR -->
        <header
          class="flex items-center justify-between gap-4 bg-[#16284a] px-[1.6rem] py-[1.1rem] flex-wrap max-[600px]:flex-col max-[600px]:items-start"
        >
          <h3 class="flex items-center gap-[0.6rem] text-white text-[1.25rem] font-extrabold m-0">
            <span class="text-[#e0b13a] font-extrabold">{{ svc.no }}</span>
            {{ svc.title }}
          </h3>
          <!-- time + fee meta on the right -->
          <div class="flex items-center gap-6">
            <span
              class="inline-flex items-center gap-[0.4rem] text-white text-[0.9rem] [&_svg]:text-[#e0b13a]"
              ><Clock :size="16" /> {{ svc.time }}</span
            >
            <span
              class="inline-flex items-center gap-[0.4rem] text-white text-[0.9rem] [&_svg]:text-[#e0b13a]"
              ><FileText :size="16" /> {{ svc.fee }}</span
            >
          </div>
        </header>

        <!-- TWO-COLUMN BODY -->
        <div
          class="grid grid-cols-2 gap-0 px-[1.8rem] py-[1.6rem] max-[900px]:grid-cols-1 max-[900px]:gap-6"
        >
          <!-- LEFT: REQUIREMENTS -->
          <div
            class="px-6 border-r border-[#e6ebf3] max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:pb-6"
          >
            <p class="text-[#2a5caa] text-[0.8rem] font-extrabold tracking-[2px] mb-4">
              REQUIREMENTS
            </p>
            <ul class="list-none m-0 p-0">
              <li
                v-for="(req, r) in svc.requirements"
                :key="r"
                class="flex items-start gap-[0.6rem] text-[#344256] text-[0.95rem] leading-[1.4] mb-[0.85rem]"
              >
                <CheckCircle2 :size="18" class="text-[#e0b13a] flex-shrink-0 mt-px" />
                <span>{{ req }}</span>
              </li>
            </ul>
          </div>

          <!-- RIGHT: PROCESS -->
          <div class="px-6">
            <p class="text-[#2a5caa] text-[0.8rem] font-extrabold tracking-[2px] mb-4">PROCESS</p>
            <ol class="list-none m-0 p-0">
              <li
                v-for="(step, s) in svc.process"
                :key="s"
                class="flex items-start gap-[0.7rem] text-[#344256] text-[0.95rem] leading-[1.4] mb-[0.85rem]"
              >
                <span
                  class="inline-flex items-center justify-center w-[26px] h-[26px] flex-shrink-0 rounded-full bg-[#1f4fa3] text-white text-[0.8rem] font-bold"
                  >{{ s + 1 }}</span
                >
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>
      </article>
    </div>

    <!-- ===== ARTA COMPLIANCE BANNER ===== -->
    <div
      class="flex items-center justify-between gap-6 max-w-[1180px] mx-auto bg-[#1f3a63] border-l-[5px] border-[#d4a526] rounded-[10px] px-[1.6rem] py-[1.3rem] text-left max-[600px]:flex-col max-[600px]:items-start"
    >
      <div>
        <p class="flex items-center gap-2 text-[#d4a526] font-bold text-[0.95rem] mb-[0.4rem]">
          <BadgeCheck :size="18" class="text-[#d4a526]" />
          Anti-Red Tape Authority (ARTA) Compliance
        </p>
        <p class="text-[#d6ddea] text-[0.83rem] leading-[1.5] m-0 max-w-[760px]">
          In compliance with R.A. 11032 (Ease of Doing Business and Efficient Government Service
          Delivery Act), this office ensures that all frontline services are delivered promptly,
          courteously, and without undue burden to our clients.
        </p>
      </div>
      <button
        class="inline-flex items-center gap-[0.45rem] flex-shrink-0 bg-[#d4a526] text-[#1f3a63] border-0 rounded-[7px] px-[1.2rem] py-[0.7rem] font-bold text-[0.85rem] cursor-pointer transition-colors duration-150 ease-out hover:bg-[#e0b73a]"
        @click="openCharter"
      >
        <FileText :size="16" />
        View Full Charter
      </button>
    </div>
  </section>
</template>
