  <script setup>
  import { computed } from 'vue'
  import ApexCharts from 'apexcharts'
  import VueApexCharts from 'vue3-apexcharts'
  import { monthlyApplications } from '@/data/dummyStaffApplications'
  
  const categories = computed(() => monthlyApplications.map((m) => m.month))
  const series = computed(() => [
    { name: 'Applications Filed', data: monthlyApplications.map((m) => m.filed) },
  ])
  
  const chartOptions = computed(() => ({
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#001d4c'],
    stroke: { curve: 'smooth', width: 3 },
    markers: {
      size: 5,
      colors: ['#fbbf24'],
      strokeColors: '#001d4c',
      strokeWidth: 2,
      hover: { size: 7 },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: categories.value,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
    },
    yaxis: {
      min: 0,
      max: 280,
      tickAmount: 4,
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
    },
    tooltip: {
      y: {
        formatter: (val) => `filed : ${val}`,
      },
    },
    dataLabels: { enabled: false },
  }))
  </script>
  
  <template>
    <div class="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 class="mb-4 text-sm font-bold text-[#001d4c]">Monthly Applications</h3>
      <VueApexCharts type="line" height="280" :options="chartOptions" :series="series" />
    </div>
  </template>