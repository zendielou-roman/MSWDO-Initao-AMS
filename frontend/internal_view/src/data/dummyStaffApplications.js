 // src/data/dummyStaffApplications.js
  // Dummy data for the Staff Dashboard — stat cards, the Monthly Applications chart,
  // and the Recent Applications list. Swap for real API data at backend integration.
  
  export const staffStats = {
    submittedThisMonth: { value: 27, label: 'Submitted This Month', period: 'June 2024' },
    pendingReview: { value: 8, label: 'Pending Review', period: 'Awaiting OIC' },
    approvalRate: { value: 82, label: 'My Approval Rate', period: 'This month' },
    beneficiariesAssisted: {
      value: 143,
      label: 'Beneficiaries Assisted',
      period: 'Cumulative 2024',
    },
  }
  
  // Monthly filed-application counts feeding the line chart on the Staff Dashboard.
  export const monthlyApplications = [
    { month: 'Jan', filed: 140 },
    { month: 'Feb', filed: 178 },
    { month: 'Mar', filed: 205 },
    { month: 'Apr', filed: 175 },
    { month: 'May', filed: 230 },
    { month: 'Jun', filed: 250 },
  ]
  
  export const applicationStatuses = ['Pending', 'Approved', 'Rejected', 'Released']
  
  export const recentApplications = [
    {
      id: 1,
      beneficiary: 'Juan Dela Rosa',
      type: 'Medical',
      amount: 9000,
      status: 'Pending',
    },
    {
      id: 2,
      beneficiary: 'Maria Gonzales',
      type: 'Burial',
      amount: 11000,
      status: 'Approved',
    },
    {
      id: 3,
      beneficiary: 'Jose Mercado',
      type: 'Educational',
      amount: 7500,
      status: 'Rejected',
    },
    {
      id: 4,
      beneficiary: 'Rosa Lopez',
      type: 'Food',
      amount: 2000,
      status: 'Released',
    },
    {
      id: 5,
      beneficiary: 'Pedro Aguilar',
      type: 'Transportation',
      amount: 6500,
      status: 'Pending',
    },
  ]