import { ref, computed, onMounted } from 'vue'
import api from '@/lib/api'
import { getDisplayName } from '@/data/mockClients'

export function useDashboardData() {
  const applications = ref([])
  const programs = ref([])
  const isLoading = ref(true)

  async function fetchData() {
    try {
      const [appsRes, programsRes] = await Promise.all([
        api.get('/applications'),
        api.get('/programs'),
      ])
      applications.value = appsRes.data
      programs.value = programsRes.data
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchData)

  // ===== KPI: Applications This Month =====
  const applicationsThisMonth = computed(() => {
    const now = new Date()
    const thisMonth = applications.value.filter((a) => {
      const d = new Date(a.date_submitted)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonth = applications.value.filter((a) => {
      const d = new Date(a.date_submitted)
      return d.getMonth() === lastMonthDate.getMonth() && d.getFullYear() === lastMonthDate.getFullYear()
    })
    const diff = thisMonth.length - lastMonth.length
    const note =
      lastMonth.length === 0
        ? 'vs last month'
        : `${diff >= 0 ? '+' : ''}${Math.round((diff / lastMonth.length) * 100)}% vs last month`
    return { value: thisMonth.length, note }
  })

  // ===== KPI: Pending Review =====
  const pendingReview = computed(() => {
    const count = applications.value.filter((a) => a.status === 'Pending').length
    return { value: count, note: 'Awaiting OIC' }
  })

  // ===== KPI: Approval Rate =====
  const approvalRate = computed(() => {
    const resolved = applications.value.filter((a) =>
      ['Approved', 'Rejected', 'Released'].includes(a.status),
    )
    const approved = applications.value.filter((a) =>
      ['Approved', 'Released'].includes(a.status),
    )
    const rate = resolved.length ? Math.round((approved.length / resolved.length) * 100) : 0
    return { value: `${rate}%`, note: 'All-time' }
  })

  // ===== KPI: Beneficiaries Assisted =====
  const beneficiariesAssisted = computed(() => {
    const uniqueClients = new Set(
      applications.value
        .filter((a) => ['Approved', 'Released'].includes(a.status))
        .map((a) => a.client_id),
    )
    return { value: uniqueClients.size, note: 'Year-to-date' }
  })

  const dashboardKpis = computed(() => ({
    applicationsThisMonth: applicationsThisMonth.value,
    pendingReview: pendingReview.value,
    approvalRate: approvalRate.value,
    beneficiariesAssisted: beneficiariesAssisted.value,
  }))

  // ===== Budget Utilization (from real Programs) =====
  const budgetUtilization = computed(() =>
    programs.value.map((p) => ({
      program: p.name,
      released: p.released,
      allocated: p.allocated,
      percent: p.allocated ? Math.round((p.released / p.allocated) * 100) : 0,
    })),
  )

  // ===== Applications Trend (monthly counts, last 9 months) =====
  const applicationsTrend = computed(() => {
    const now = new Date()
    const months = []
    for (let i = 8; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({ label: d.toLocaleString('default', { month: 'short' }), year: d.getFullYear(), month: d.getMonth() })
    }
    const data = months.map(
      (m) =>
        applications.value.filter((a) => {
          const d = new Date(a.date_submitted)
          return d.getMonth() === m.month && d.getFullYear() === m.year
        }).length,
    )
    return { labels: months.map((m) => m.label), data }
  })

  // ===== Applications by Type (this quarter) =====
  const applicationsByType = computed(() => {
    const now = new Date()
    const currentQuarter = Math.floor(now.getMonth() / 3)
    const inQuarter = applications.value.filter((a) => {
      const d = new Date(a.date_submitted)
      return Math.floor(d.getMonth() / 3) === currentQuarter && d.getFullYear() === now.getFullYear()
    })
    const map = {}
    inQuarter.forEach((a) => {
      const category = a.type?.split(' - ')[0] || a.type || 'Other'
      map[category] = (map[category] || 0) + 1
    })
    return { labels: Object.keys(map), data: Object.values(map) }
  })

  // ===== Recent Activity (latest 6 applications) =====
  const recentActivity = computed(() =>
    [...applications.value]
      .sort((a, b) => new Date(b.date_submitted) - new Date(a.date_submitted))
      .slice(0, 6)
      .map((a) => ({
        id: a.application_code,
        name: a.client ? getDisplayName(a.client) : '—',
        type: a.type,
        date: a.date_submitted,
        amount: a.amount,
        status: a.status,
      })),
  )

  return {
    isLoading,
    dashboardKpis,
    budgetUtilization,
    applicationsTrend,
    applicationsByType,
    recentActivity,
  }
}