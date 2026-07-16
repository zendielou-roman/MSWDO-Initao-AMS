// src/data/mockDonations.js

export const donationTypes = ['Cash', 'Goods', 'Service']

export const donationStatusStyles = {
  Acknowledged: 'bg-emerald-50 text-emerald-600',
  Recorded: 'bg-blue-50 text-blue-600',
  Pending: 'bg-amber-50 text-amber-600',
}

export const mockDonations = [
  {
    id: 'DN-0501',
    donor: 'Initao Rotary Club',
    type: 'Cash',
    value: 50000,
    dateReceived: '2026-06-12',
    status: 'Acknowledged',
    allocatedTo: 'AICS',
  },
  {
    id: 'DN-0502',
    donor: 'SM Foundation',
    type: 'Goods',
    value: 120000,
    dateReceived: '2026-06-15',
    status: 'Acknowledged',
    allocatedTo: 'Relief Operations',
  },
  {
    id: 'DN-0503',
    donor: 'PhilHealth Region X',
    type: 'Service',
    value: null,
    dateReceived: '2026-07-06',
    status: 'Recorded',
    allocatedTo: 'Medical Mission',
  },
  {
    id: 'DN-0504',
    donor: 'Anonymous Benefactor',
    type: 'Cash',
    value: 20000,
    dateReceived: '2026-07-10',
    status: 'Pending',
    allocatedTo: 'AICS',
  },
  {
    id: 'DN-0505',
    donor: 'Barangay San Pedro LGU',
    type: 'Goods',
    value: 15000,
    dateReceived: '2026-07-08',
    status: 'Pending',
    allocatedTo: 'Feeding Program',
  },
]
