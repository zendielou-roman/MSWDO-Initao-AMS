<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { applicationVolume } from '@/data/Dashboard'

const activeRange = ref('6-Month Trend')
const ranges = ['6-Month Trend', 'Yearly', 'Weekly']

const categories = computed(() => applicationVolume.map((d) => d.month))
const totalSeries = computed(() => applicationVolume.map((d) => d.total))
const approvedSeries = computed(() => applicationVolume.map((d) => d.approved))

const series = computed(() => [
  { name: 'Total', data: totalSeries.value },
  { name: 'Approved', data: approvedSeries.value },
])

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    toolbar: { show: false },
    fontFamily: 'inherit',
    zoom: { enabled: false },
  },
  colors: ['#001d4c', '#d4a72c'],
  stroke: { curve: 'smooth', width: [3, 3] },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.35,
      opacityTo: 0,
      stops: [0, 90],
    },
  },
  dataLabels: { enabled: false },
  legend: {
    show: true,
    position: 'bottom',
    markers: { radius: 12 },
    itemMargin: { horizontal: 10 },
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 4,
  },
  xaxis: {
    categories: categories.value,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#94a3b8' } },
  },
  yaxis: {
    labels: { style: { colors: '#94a3b8' } },
  },
  tooltip: {
    custom({ dataPointIndex }) {
      const point = applicationVolume[dataPointIndex]
      return `
        <div class="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
          <p class="mb-1 text-sm font-semibold text-slate-700">${point.month}</p>
          <p class="text-sm text-slate-500">Total : <span class="font-semibold text-[#001d4c]">${point.total}</span></p>
          <p class="text-sm text-[#d4a72c]">Approved : <span class="font-semibold">${point.approved}</span></p>
        </div>
      `
    },
  },
  markers: {
    size: 0,
    hover: { size: 5 },
  },
}))
</script>

<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="font-semibold text-slate-800">Application Volume — Jan to Jun 2024</h3>
      <div class="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-medium">
        <button
          v-for="range in ranges"
          :key="range"
          @click="activeRange = range"
          class="rounded-full px-3 py-1.5 transition"
          :class="
            activeRange === range
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-slate-600'
          "
        >
          {{ range }}
        </button>
      </div>
    </div>

    <VueApexCharts type="area" height="280" :options="chartOptions" :series="series" />
  </div>
</template>
