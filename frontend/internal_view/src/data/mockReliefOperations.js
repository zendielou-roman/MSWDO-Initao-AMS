// src/data/mockReliefOperations.js

export const reliefStatusStyles = {
  Completed: 'bg-emerald-50 text-emerald-600',
  Ongoing: 'bg-blue-50 text-blue-600',
  Pending: 'bg-amber-50 text-amber-600',
  Planned: 'bg-slate-100 text-slate-500',
}

// src/data/mockReliefOperations.js

export const reliefOperationTypes = [
  'Disaster Response', // typhoon, flood, landslide
  'Fire Incident',
  'Medical Mission',
  'Feeding Program',
  'Evacuation Support',
  'Cash Assistance',
]

export const mockReliefOperations = [
  {
    id: 'RO-0231',
    event: 'Tropical Depression Auring Relief',
    type: 'Disaster Response',
    date: '2026-07-02',
    barangay: 'Jampason',
    beneficiaries: 214,
    beneficiaryUnit: 'families', // ← flexible: could be 'individuals', 'households', 'families'
    itemsDistributed: 214,
    itemUnit: 'relief packs', // ← flexible: could be 'hygiene kits', 'meals', 'cash grants (₱)'
    status: 'Completed',
  },
  {
    id: 'RO-0232',
    event: 'Fire Incident - Purok 3',
    type: 'Fire Incident',
    date: '2026-06-26',
    barangay: 'Poblacion',
    beneficiaries: 12,
    beneficiaryUnit: 'households',
    itemsDistributed: 12,
    itemUnit: 'shelter kits',
    status: 'Completed',
  },
  {
    id: 'RO-0233',
    event: 'Flooding Response',
    type: 'Disaster Response',
    date: '2026-07-03',
    barangay: 'Pagahan',
    beneficiaries: 88,
    beneficiaryUnit: 'families',
    itemsDistributed: 88,
    itemUnit: 'relief packs',
    status: 'Ongoing',
  },
  {
    id: 'RO-0234',
    event: 'Landslide Evacuation Support',
    type: 'Evacuation Support',
    date: '2026-07-10',
    barangay: 'Tag-anito',
    beneficiaries: 34,
    beneficiaryUnit: 'individuals',
    itemsDistributed: 34,
    itemUnit: 'evacuation slots',
    status: 'Pending',
  },
  {
    id: 'RO-0235',
    event: 'Community Feeding Program',
    type: 'Feeding Program',
    date: '2026-07-09',
    barangay: 'San Pedro',
    beneficiaries: 60,
    beneficiaryUnit: 'individuals',
    itemsDistributed: 120,
    itemUnit: 'meals',
    status: 'Planned',
  },
]
