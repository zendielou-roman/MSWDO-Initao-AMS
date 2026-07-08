  <template>
    <span
      class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      :class="style.classes"
    >
      <span class="h-1.5 w-1.5 rounded-full" :class="style.dot"></span>
      {{ status }}
    </span>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    status: { type: String, required: true },
  })
  
  // Colored pill for an assistance application's workflow status.
  // Approved = decision made; Released = funds actually disbursed —
  // kept distinct so staff never assume "Approved" already means paid out.
  const STATUS_STYLES = {
    Approved: { classes: 'bg-green-50 text-green-600', dot: 'bg-green-500' },
    Released: { classes: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
    Pending: { classes: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
    Rejected: { classes: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
  }
  
  const style = computed(
    () => STATUS_STYLES[props.status] ?? { classes: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' }
  )
  </script>