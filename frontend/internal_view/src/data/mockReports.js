// src/data/mockReports.js

export const reportPrograms = [
  'All Programs',
  'AICS',
  'Social Pension',
  'SLP',
  'Relief',
  'Day Care',
]
export const reportBarangays = [
  'All Barangays',
  'Poblacion',
  'Jampason',
  'Pagahan',
  'Tag-anito',
  'Oguis',
]
export const reportAssistanceTypes = [
  'All Types',
  'AICS - Medical',
  'AICS - Food',
  'AICS - Burial',
  'AICS - Educational',
]

export const reportTemplates = [
  {
    id: 'beneficiary-list',
    title: 'Beneficiary List Report',
    description: 'Complete list of beneficiaries by program',
    reportType: 'Beneficiary List',
  },
  {
    id: 'assistance-summary',
    title: 'Assistance Summary Report',
    description: 'Summary of assistance provided by type and amount',
    reportType: 'Assistance Summary',
  },
  {
    id: 'barangay-report',
    title: 'Barangay Report',
    description: 'Assistance distribution per barangay',
    reportType: 'Barangay Report',
  },
  {
    id: 'monthly-accomplishment',
    title: 'Monthly Accomplishment Report',
    description: 'Monthly summary of all programs and activities',
    reportType: 'Monthly Accomplishment',
  },
  {
    id: 'client-profile',
    title: 'Client Profile Report',
    description: 'Detailed client information and assistance history',
    reportType: 'Client Profile',
  },
  {
    id: 'relief-operations',
    title: 'Relief Operations Report',
    description: 'Summary of relief operations and distributions',
    reportType: 'Relief Operations',
  },
]

export const applicationsVsApprovals = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  applications: [40, 52, 48, 58, 72, 68],
  approved: [28, 32, 30, 42, 55, 52],
}

export const distributionByProgram = {
  labels: ['AICS', 'Social Pension', 'SLP', 'Relief', 'Day Care'],
  data: [45, 18, 15, 12, 10],
  colors: ['#001d4c', '#D4A017', '#10b981', '#ef4444', '#8b5cf6'],
}

export const recentlyGeneratedReports = [
  {
    id: 1,
    title: 'AICS Monthly Report - December 2024',
    generatedBy: 'Ben Calif',
    date: '2024-12-22 10:30 AM',
    format: 'PDF',
  },
  {
    id: 2,
    title: 'Beneficiary List - Poblacion',
    generatedBy: 'Adrian Ken',
    date: '2024-12-21 03:45 PM',
    format: 'Excel',
  },
  {
    id: 3,
    title: 'Relief Operations Summary - Q4 2024',
    generatedBy: 'Zendie Lou',
    date: '2024-12-20 09:15 AM',
    format: 'PDF',
  },
]

export const casesPerBarangay = {
  labels: ['Poblacion', 'Aluna', 'Apas', 'Calacapan', 'Jampason', 'Kanitoan', 'Tubigan', 'Oguis'],
  data: [12, 20, 28, 21, 29, 37, 30, 38],
}

export const programSummaryReport = [
  {
    program: 'AICS (Assistance to Individuals in Crisis Situation)',
    totalApplications: 436,
    approved: 312,
    rejected: 46,
    budgetReleased: 1876500,
    beneficiaries: 312,
    utilization: 75,
  },
  {
    program: 'Social Pension for Indigent Senior Citizens',
    totalApplications: 630,
    approved: 450,
    rejected: 67,
    budgetReleased: 1350000,
    beneficiaries: 450,
    utilization: 75,
  },
  {
    program: 'Sustainable Livelihood Program (SLP)',
    totalApplications: 218,
    approved: 156,
    rejected: 23,
    budgetReleased: 780000,
    beneficiaries: 156,
    utilization: 65,
  },
  {
    program: 'Pantawid Pamilyang Pilipino Program',
    totalApplications: 1248,
    approved: 892,
    rejected: 133,
    budgetReleased: 3150000,
    beneficiaries: 892,
    utilization: 90,
  },
]
