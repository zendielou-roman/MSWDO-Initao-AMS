<script setup>
  const props = defineProps({
    status: { type: String, required: true },
  })
  
  const styles = {
    Active: 'bg-emerald-100 text-emerald-700',
    'On Hold': 'bg-amber-100 text-amber-700',
    Closed: 'bg-slate-200 text-slate-600',
  }
  
  const dotStyles = {
    Active: 'bg-emerald-500',
    'On Hold': 'bg-amber-500',
    Closed: 'bg-slate-400',
  }
  </script>
  
  <template>
    <span
      class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium"
      :class="styles[props.status] || 'bg-slate-100 text-slate-600'"
    >
      <span class="h-1.5 w-1.5 rounded-full" :class="dotStyles[props.status] || 'bg-slate-400'" />
      {{ props.status }}
    </span>
  </template>
  