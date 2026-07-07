  <script setup>
  defineProps({
    status: { type: String, required: true },
  })
  
  const styles = {
    Pending: 'bg-amber-50 text-amber-700',
    Approved: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-rose-50 text-rose-700',
    Released: 'bg-slate-100 text-slate-600',
  }
  
  const dotStyles = {
    Pending: 'bg-amber-500',
    Approved: 'bg-emerald-500',
    Rejected: 'bg-rose-500',
    Released: 'bg-slate-400',
  }
  </script>
  
  <template>
    <span
      class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold"
      :class="styles[status] || 'bg-slate-100 text-slate-600'"
    >
      <span class="h-1.5 w-1.5 rounded-full" :class="dotStyles[status] || 'bg-slate-400'" />
      {{ status }}
    </span>
  </template>