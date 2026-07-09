 <!--
    Dual-line "Monthly Applications Trend" chart for the OIC Dashboard: Filed (navy) vs
    Approved (gold), so the OIC can see the approval gap trending over time at a glance.
    Same visual language as MonthlyApplicationsChart (Staff dashboard) but with two series.
  -->
  <script setup>
  import { computed } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  import { applicationsTrend } from '@/data/dummyOICDashboard'
  
  const categories = computed(() => applicationsTrend.map((m) => m.month))
  const series = computed(() => [
    { name: 'filed', data: applicationsTrend.map((m) => m.filed) },
    { name: 'approved', data: applicationsTrend.map((m) => m.approved) },
  ])
  
  const chartOptions = computed(() => ({
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#001d4c', '#fbbf24'],
    stroke: { curve: 'smooth', width: 3 },
    markers: {
      size: 5,
      colors: ['#001d4c', '#fbbf24'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: { size: 7 },
    },
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '13px',
      labels: { colors: '#64748b' },
      markers: { size: 5, offsetX: -2 },
      itemMargin: { horizontal: 10 },
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
      min: 70,
      tickAmount: 3,
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
    dataLabels: { enabled: false },
  }))
  </script>
  
  <template>
    <div class="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 class="mb-4 text-sm font-bold text-[#001d4c]">Monthly Applications Trend</h3>
      <VueApexCharts type="line" height="300" :options="chartOptions" :series="series" />
    </div>
  </template>