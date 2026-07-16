// Dummy data for the admin dashboard.
// Later, replace these with real API calls to the Laravel backend.

export const dashboardStats = [
  { icon: 'Users', label: 'Registered System Users', sublabel: 'All roles', value: 8 },
  { icon: 'Box', label: 'Active Programs', sublabel: '1 On Hold', value: 5 },
  { icon: 'Heart', label: 'Total Beneficiaries', sublabel: 'System-wide', value: 2847 },
  {
    icon: 'FileText',
    label: 'Applications This Month',
    sublabel: 'June 2024',
    value: 143,
    highlight: true,
  },
  { icon: 'Heart', label: 'Total Beneficiaries', sublabel: 'System-wide', value: 2847 },
  { icon: 'Heart', label: 'Total Beneficiaries', sublabel: 'System-wide', value: 2847 },
]

export const recentActivity = [
  {
    initials: 'AK',
    color: 'bg-pink-100 text-pink-700',
    username: 'Adrian Ken',
    timeAgo: '1 hour ago',
    action: 'Approved Application',
    target: 'AICS',
    date: '2026-02-23',
  },
  {
    initials: 'BC',
    color: 'bg-amber-100 text-amber-700',
    username: 'Ben Calif',
    timeAgo: '3 hours ago',
    action: 'Updated Budget',
    target: 'Social Pension Fund',
    date: '2026-02-23',
  },
  {
    initials: 'ZL',
    color: 'bg-emerald-100 text-emerald-700',
    username: 'Zendie Lou',
    timeAgo: '3 hours ago',
    action: 'Created New Application',
    target: 'SLP Management',
    date: '2026-02-23',
  },
]

export const applicationVolume = [
  { month: 'Jan', total: 96, approved: 70 },
  { month: 'Feb', total: 104, approved: 78 },
  { month: 'Mar', total: 132, approved: 101 },
  { month: 'Apr', total: 121, approved: 92 },
  { month: 'May', total: 128, approved: 94 },
  { month: 'Jun', total: 143, approved: 108 },
]
