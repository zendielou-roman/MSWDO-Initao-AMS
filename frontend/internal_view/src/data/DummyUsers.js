// src/data/dummyUsers.js
// Dummy user records for the User Accounts page.
// Roles reflect a typical MSWDO office structure — adjust freely once real roles are confirmed.

  export const roles = ['Administrator', 'Social Worker', 'Encoder', 'Officer-in-Charge']
  export const statuses = ['Active', 'Inactive']
  
  export const ADMIN_ROLES = ['Administrator']
  export const STAFF_ROLES = ['Social Worker', 'Encoder']
  export const OIC_ROLES = ['Officer-in-Charge']
  
  // Given a role, returns 'admin', 'staff', or 'oic' — used by the auth store/router to
  // decide which layout and default landing page a user gets after login.
  export function getUserSide(role) {
    if (ADMIN_ROLES.includes(role)) return 'admin'
    if (OIC_ROLES.includes(role)) return 'oic'
    return 'staff'
  }
  
  const DUMMY_PASSWORD = 'password123'

export const dummyUsers = [
     {
      id: 1,
      name: 'Zendie Lou Roman',
      email: 'admin',
      password: DUMMY_PASSWORD,
      role: 'Administrator',
      status: 'Active',
      dateCreated: '2025-01-14',
      lastLogin: '2025-07-06T08:12:00',
    },
  {
    id: 2,
    name: 'Adrian Ken Jalagat',
    email: 'staff',
    password: DUMMY_PASSWORD,
    role: 'Social Worker',
    status: 'Active',
    dateCreated: '2025-02-02',
    lastLogin: '2025-07-05T14:47:00',
  },
  {
    id: 3,
    name: 'Amee Bagares',
    email: 'oic',
    password: DUMMY_PASSWORD,
    role: 'Officer-in-Charge',
    status: 'Active',
    dateCreated: '2025-02-20',
    lastLogin: '2025-07-06T09:30:00',
  },
  {
    id: 4,
    name: 'Ramon Villanueva',
    email: 'ramon.villanueva@mswdo.gov.ph',
    role: 'Social Worker',
    status: 'Inactive',
    dateCreated: '2025-03-05',
    lastLogin: '2025-05-14T16:05:00',
  },
  {
    id: 5,
    name: 'Katrina Lim',
    email: 'katrina.lim@mswdo.gov.ph',
    role: 'Encoder',
    status: 'Active',
    dateCreated: '2025-03-18',
    lastLogin: '2025-07-04T11:22:00',
  },
  {
    id: 6,
    name: 'Paolo Mendoza',
    email: 'paolo.mendoza@mswdo.gov.ph',
    role: 'Social Worker',
    status: 'Active',
    dateCreated: '2025-04-01',
    lastLogin: '2025-07-01T07:58:00',
  },
  {
    id: 7,
    name: 'Cristina Bautista',
    email: 'cristina.bautista@mswdo.gov.ph',
    role: 'Administrator',
    status: 'Active',
    dateCreated: '2025-04-22',
    lastLogin: '2025-07-06T07:40:00',
  },
  {
    id: 8,
    name: 'Michael Torres',
    email: 'michael.torres@mswdo.gov.ph',
    role: 'Encoder',
    status: 'Inactive',
    dateCreated: '2025-05-09',
    lastLogin: '2025-06-02T10:15:00',
  },
  {
    id: 9,
    name: 'Louella Fernandez',
    email: 'louella.fernandez@mswdo.gov.ph',
    role: 'Social Worker',
    status: 'Active',
    dateCreated: '2025-05-30',
    lastLogin: '2025-07-03T13:09:00',
  },
  {
    id: 10,
    name: 'Benjie Ramos',
    email: 'benjie.ramos@mswdo.gov.ph',
    role: 'Encoder',
    status: 'Active',
    dateCreated: '2025-06-11',
    lastLogin: null,
  },
]
