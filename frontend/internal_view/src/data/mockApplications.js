// src/data/mockApplications.js

export const assistanceTypes = [
  'AICS - Medical',
  'AICS - Food',
  'AICS - Burial',
  'Social Pension',
  'SLP - Employment',
  'VAWC',
  'Relief',
]

export const mockApplications = [
  {
    id: 'APP-2025000',
    clientId: 'CB-1000',
    clientName: 'Ramon Kadusale',
    submittedBy: 'J. Bacala',
    type: 'AICS - Medical',
    amount: 10000,
    barangay: 'Pinaan-an',
    dateSubmitted: '2026-05-19',
    status: 'Rejected',
  },
  {
    id: 'APP-2025001',
    clientId: 'CB-1001',
    clientName: 'Ellen Empeynado',
    submittedBy: 'M. Ranario',
    type: 'AICS - Food',
    amount: 1500,
    barangay: 'Pagahan',
    dateSubmitted: '2026-07-10',
    status: 'Approved',
  },
  {
    id: 'APP-2025002',
    clientId: 'CB-1002',
    clientName: 'Luz Jumawan',
    submittedBy: 'M. Ranario',
    type: 'AICS - Burial',
    amount: 2500,
    barangay: 'Tag-anito',
    dateSubmitted: '2026-04-20',
    status: 'Rejected',
  },
  {
    id: 'APP-2025003',
    clientId: 'CB-1003',
    clientName: 'Ellen Cabahug',
    submittedBy: 'J. Bacala',
    type: 'Social Pension',
    amount: 10000,
    barangay: 'Oguis',
    dateSubmitted: '2026-05-07',
    status: 'Pending',
  },
  {
    id: 'APP-2025004',
    clientId: 'CB-1004',
    clientName: 'Ellen Dela Cruz',
    submittedBy: 'F. Dagondon',
    type: 'SLP - Employment',
    amount: 1500,
    barangay: 'Tag-anito',
    dateSubmitted: '2026-05-28',
    status: 'Released',
  },
]

export const incomeExpenditureOptions = [
  'Total monthly family income is equal to the monthly family expenses',
  'Total monthly family income is higher than the monthly family expenses',
  'Total monthly family income is lower than the monthly family expenses',
  'The family has no permanent / fixed income',
  'None of the above / not applicable',
]

export const economicConditionOptions = [
  "Income is sufficient to meet / provide entire family's basic needs",
  'Income is sufficient to meet / provide some basic needs',
  'Income is insufficient to meet / provide all basic needs',
  'Not applicable',
]

export const problemsPresentedOptions = [
  'Medicines',
  'Financial Aid',
  'Hospital Bill',
  'Transportation',
  'Coffin',
  'Embalming',
  'Food Assistance',
  'Court Related',
  'Temporary Shelter',
  'Others',
]

export const problemToAssistanceType = {
  Medicines: 'AICS - Medical',
  'Hospital Bill': 'AICS - Medical',
  Coffin: 'AICS - Burial',
  Embalming: 'AICS - Burial',
  'Food Assistance': 'AICS - Food',
  Transportation: 'AICS - Transportation',
  'Financial Aid': 'AICS - Financial Assistance',
  'Temporary Shelter': 'AICS - Shelter',
  'Court Related': 'AICS - Legal Assistance',
  Others: 'AICS - Others',
}

export const clientCategoryOptions = [
  'Family head and other adult in need',
  'Needy youth',
  'Child in difficult situation',
  'Youthful offender',
  'Person with disability',
  'Senior Citizen',
  'Disaster victim',
  'Stranded',
]

export const evaluationOptions = [
  'Indigent',
  'Exhausted Resources',
  'Limited Economic Resources',
  'In dire need of immediate / appropriate interventions',
]
