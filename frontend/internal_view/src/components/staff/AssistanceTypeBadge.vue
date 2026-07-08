  <template>
    <span
      class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
      :class="style"
    >
      {{ type }}
    </span>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    type: { type: String, required: true },
  })
  
  // Color-per-type system, consistent with the Client Details modal's
  // Assistance History accents — lets staff visually scan a long table
  // and spot a given aid type without reading every row.
  const TYPE_STYLES = {
    Medical: 'bg-red-50 text-red-600',
    Financial: 'bg-blue-50 text-blue-600',
    Burial: 'bg-slate-100 text-slate-600',
    Educational: 'bg-purple-50 text-purple-600',
    Food: 'bg-green-50 text-green-600',
  }
  
  const style = computed(() => TYPE_STYLES[props.type] ?? 'bg-slate-100 text-slate-500')
  </script>