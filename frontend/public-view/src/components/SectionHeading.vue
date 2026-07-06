<script setup>
// ===== SECTION HEADER =====
// Reusable heading block used across all page sections.
// Matches the style from ServicesSection: spaced eyebrow label,
// Anton gradient headline, and a muted subtitle paragraph.

defineProps({
  // Small all-caps label above the title (e.g. "WHAT WE DO")
  eyebrow: {
    type: String,
    default: '',
  },
  // Main section headline
  title: {
    type: String,
    required: true,
  },
  // Supporting description below the title
  subtitle: {
    type: String,
    default: '',
  },
  // Max-width of the subtitle paragraph (default matches ServicesSection)
  subtitleMaxWidth: {
    type: String,
    default: '645px',
  },
})
</script>

<template>
  <div class="text-center mb-8 pt-1">
    <p v-if="eyebrow" class="text-[#2a5caa] text-[0.8rem] font-bold tracking-[2px] mb-1 uppercase">
      {{ eyebrow }}
    </p>
    <h2
      class="font-['Anton',_'Arial_Black',_sans-serif] font-normal text-[2.8rem] tracking-[0.5px] mb-[0.1rem] text-[#1f3a63] max-[560px]:text-[2.1rem]"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-[#6b7790] mx-auto text-[0.9rem] leading-[1.6] text-center whitespace-nowrap [hyphens:auto]"
      :style="{ maxWidth: subtitleMaxWidth }"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
