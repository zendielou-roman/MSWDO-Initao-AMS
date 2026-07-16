// src/data/mockUsers.js (extend your existing file)
import { ROLES } from '@/config/roleConfig'

export const roleDisplayLabels = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.STAFF]: 'Staff',
  [ROLES.AICS_FOCAL]: 'AICS Focal',
  [ROLES.OIC]: 'Officer-in-Charge',
  [ROLES.SOCPEN_FOCAL]: 'Sr. Citizen Focal',
  [ROLES.SLP_FOCAL]: 'SLP Focal',
}

export const roleBadgeStyles = {
  [ROLES.ADMIN]: 'bg-slate-800 text-white',
  [ROLES.STAFF]: 'bg-blue-50 text-blue-600',
  [ROLES.AICS_FOCAL]: 'bg-rose-50 text-rose-600',
  [ROLES.OIC]: 'bg-purple-50 text-purple-600',
  [ROLES.SOCPEN_FOCAL]: 'bg-amber-50 text-amber-700',
  [ROLES.SLP_FOCAL]: 'bg-emerald-50 text-emerald-600',
}

// Extended mock user list for the User Accounts table (separate from login testAccounts)
export const mockUserAccounts = [
  {
    id: 1,
    name: 'Zendie Lou Roman',
    email: 'admin@mswdo.initao.gov.ph',
    role: ROLES.ADMIN,
    status: 'Active',
    dateCreated: '2025-01-14',
    lastLogin: '2026-07-06 08:12 AM',
  },
  {
    id: 2,
    name: 'Adrian Ken Jalagat',
    email: 'staff1@mswdo.initao.gov.ph',
    role: ROLES.STAFF,
    status: 'Active',
    dateCreated: '2025-02-02',
    lastLogin: '2026-07-05 02:47 PM',
  },
  {
    id: 3,
    name: 'Amee Amore Bagares',
    email: 'oic@mswdo.initao.gov.ph',
    role: ROLES.OIC,
    status: 'Active',
    dateCreated: '2025-02-20',
    lastLogin: '2026-07-06 09:30 AM',
  },
  {
    id: 4,
    name: 'Jude Mori Posadas',
    email: 'judemori.posadas@mswdo.gov.ph',
    role: ROLES.STAFF,
    status: 'Inactive',
    dateCreated: '2025-03-05',
    lastLogin: '2026-05-14 04:05 PM',
  },
  {
    id: 5,
    name: 'Katrina Lim',
    email: 'katrina.lim@mswdo.gov.ph',
    role: ROLES.AICS_FOCAL,
    status: 'Active',
    dateCreated: '2025-03-18',
    lastLogin: '2026-07-04 11:22 AM',
  },
  {
    id: 6,
    name: 'Paolo Mendoza',
    email: 'paolo.mendoza@mswdo.gov.ph',
    role: ROLES.STAFF,
    status: 'Active',
    dateCreated: '2025-04-01',
    lastLogin: '2026-07-01 07:58 AM',
  },
]

export const mockUsers = [
  {
    id: 101,
    name: 'Zendie Lou Roman',
    email: 'admin@mswdo.initao.gov.ph',
    password: 'admin123',
    role: ROLES.ADMIN,
  },
  {
    id: 102,
    name: 'Adrian Ken Jalagat',
    email: 'staff@mswdo.initao.gov.ph',
    password: 'staff123',
    role: ROLES.STAFF,
  },
  {
    id: 103,
    name: 'Ben Calif Didato',
    email: 'aics@mswdo.initao.gov.ph',
    password: 'aics123',
    role: ROLES.AICS_FOCAL,
  },
  {
    id: 104,
    name: 'Amee Amore Bagares',
    email: 'oic@mswdo.initao.gov.ph',
    password: 'oic123',
    role: ROLES.OIC,
  },
  {
    id: 105,
    name: 'Ruby Jane Jabagat',
    email: 'socpen@mswdo.initao.gov.ph',
    password: 'socpen123',
    role: ROLES.SOCPEN_FOCAL,
  },
  {
    id: 106,
    name: 'Eyrol Junio',
    email: 'slp@mswdo.initao.gov.ph',
    password: 'slp123',
    role: ROLES.SLP_FOCAL,
  },
]
