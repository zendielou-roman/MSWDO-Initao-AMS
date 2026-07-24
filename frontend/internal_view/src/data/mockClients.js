// src/data/mockClients.js

export const barangaysOfInitao = [
  'Aluna',
  'Andales',
  'Apas',
  'Calacapan',
  'Gimangpang',
  'Jampason',
  'Kamelon',
  'Kanitoan',
  'Oguis',
  'Pagahan',
  'Poblacion',
  'Pontacon',
  'San Pedro',
  'Sinalac',
  'Tawantawan',
  'Tubigan',
]

export const clientCategories = ['AICS', 'SLP', 'Social Pension', 'VAWC', 'Relief']
export const categoryTagStyles = {
  AICS: 'bg-rose-50 text-rose-600',
  SLP: 'bg-emerald-50 text-emerald-600',
  'Social Pension': 'bg-blue-50 text-blue-600',
  VAWC: 'bg-purple-50 text-purple-600',
  Relief: 'bg-amber-50 text-amber-700',
}

export const civilStatusOptions = ['Single', 'Married', 'Widow/er', 'Separated', 'Others']
export const householdConditionOptions = [
  'Owned',
  'Rented',
  'Shared',
  'Old House',
  'New House',
  "Squatter's Shanty",
  'Caretaker',
  'Dilapidated',
  'Homeless',
]

export const mockClients = [
  {
    id: 'CB-1000',
    dateRegistered: '2026-01-03',
    sameAsClient: true,
    client: {
      surname: 'Dela Cruz',
      firstName: 'Khatami',
      middleName: '',
      ext: '',
      age: 54,
      sex: 'Male',
      purok: 'Purok 2',
      barangay: 'Pagahan',
      religion: 'Catholic',
      civilStatus: 'Married',
      highestEducation: 'Highschool',
      dateOfBirth: '1972-03-14',
      placeOfBirth: 'Initao',
      occupation: 'Farmer',
      monthlyIncome: 4500,
      relationshipToBeneficiary: 'Self',
      pantawid: false,
      philhealth: true,
      contact: '09178654746',
    },
    beneficiary: null,
    familyComposition: [
      {
        name: 'Ana Villamor',
        age: 50,
        civilStatus: 'Married',
        relationship: 'Spouse',
        education: 'Elementary',
        occupation: 'Housewife',
        income: 0,
      },
    ],
    otherIncomeSource: '',
    otherIncomeAmount: 0,
    totalMonthlyIncome: 4500,
    householdCondition: ['Owned', 'Old House'],
    expenditures: {
      food: 2500,
      education: 500,
      rent: 0,
      transportation: 300,
      recreation: 100,
      medical: 400,
      others: 0,
    },
    categories: ['AICS', 'SLP'],
    status: 'Active',
  },
]

// ===== Helpers so the table can display the nested client/beneficiary shape =====
export function getDisplayName(record) {
  return `${record.first_name} ${record.surname}`.trim()
}
export function getDisplaySex(record) {
  return record.sex
}
export function getDisplayAge(record) {
  return record.age
}
export function getDisplayBarangay(record) {
  return record.barangay
}
export function getDisplayContact(record) {
  return record.contact
}
