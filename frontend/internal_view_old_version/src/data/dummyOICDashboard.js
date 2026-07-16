  // src/data/dummyOICDashboard.js
  // Dummy data for the Officer-in-Charge Dashboard — swap for real API data at backend
  // integration. Kept as its own file (rather than reusing dummyPrograms.js) because the
  // OIC dashboard needs a lightweight "budget utilization" summary shape, not the full
  // Program Management record.
  
  export const oicApprovalBanner = {
    pendingCount: 5,
    message: 'Review and act on pending applications to avoid delay in assistance release',
  }
  
  export const oicStats = {
    pendingApproval: { value: 5, label: 'Pending My Approval', period: 'Needs your action' },
    systemWideThisMonth: { value: 143, label: 'System-wide This Month', period: 'All applications' },
    overallApprovalRate: { value: 71, label: 'Overall Approval Rate', period: 'This month' },
    totalBudgetReleased: { value: 7300000, label: 'Total Budget Released YTD', period: '2026' },
  }
  
  // Utilization thresholds drive the progress bar color so it's a rule, not a per-item
  // choice: healthy (navy) below 60%, approaching cap (amber) 60-79%, at risk (rose) 80%+.
  export function getUtilizationColor(percent) {
    if (percent >= 80) return 'rose'
    if (percent >= 60) return 'amber'
    return 'navy'
  }
  
  export const budgetUtilization = [
    { id: 1, name: 'AICS', released: 2820000, allocated: 4500000, percent: 63 },
    { id: 2, name: '4Ps', released: 5140000, allocated: 8200000, percent: 63 },
    {
      id: 3,
      name: 'Social Pension for Indigent Senior Citizens',
      released: 1950000,
      allocated: 3600000,
      percent: 54,
    },
    {
      id: 4,
      name: 'Sustainable Livelihood Program (SLP)',
      released: 980000,
      allocated: 2200000,
      percent: 45,
    },
    { id: 5, name: 'Relief Operations', released: 320000, allocated: 1500000, percent: 21 },
    {
      id: 6,
      name: 'Educational Assistance Program',
      released: 720000,
      allocated: 1800000,
      percent: 40,
    },
  ]
  
  // Drives the "Monthly Applications Trend" dual-line chart: filed (navy) vs approved
// (gold), so the OIC can see the approval gap trending over time at a glance.
export const applicationsTrend = [
  { month: 'Jan', filed: 142, approved: 98 },
  { month: 'Feb', filed: 166, approved: 118 },
  { month: 'Mar', filed: 205, approved: 152 },
  { month: 'Apr', filed: 188, approved: 141 },
  { month: 'May', filed: 234, approved: 176 },
  { month: 'Jun', filed: 263, approved: 202 },
]

  export const priorityAlerts = [
    {
      id: 1,
      severity: 'critical',
      message: 'Medical Assistance Fund is below 15% threshold.',
      timeAgo: 'Just now',
    },
    {
      id: 2,
      severity: 'warning',
      message: 'Case #8821 flagged for duplicate entry by Staff.',
      timeAgo: '2 hours ago',
    },
    {
      id: 3,
      severity: 'info',
      message: "Mayor's office requested Monthly Report.",
      timeAgo: '5 hours ago',
    },
  ]