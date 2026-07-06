import { services } from './services.js'

const staticContent = [
  { title: 'Issuance of Social Case Study Report', category: "Citizen's Charter", route: '/charter', sectionId: 'charter' },
  { title: 'Issuance of Certificate of Indigency', category: "Citizen's Charter", route: '/charter', sectionId: 'charter' },
  { title: 'Availment of Financial/Medical/Funeral Assistance', category: "Citizen's Charter", route: '/charter', sectionId: 'charter' },
  { title: 'Issuance of PMOC Certificate', category: "Citizen's Charter", route: '/charter', sectionId: 'charter' },
  { title: 'Availment of Counseling/Consultation', category: "Citizen's Charter", route: '/charter', sectionId: 'charter' },
  { title: 'Accomplishments', category: 'Page', route: '/accomplishments', sectionId: 'accomplishments' },
  { title: 'News & Updates', category: 'Page', route: '/news', sectionId: 'news' },
  { title: 'About Us', category: 'Page', route: '/about', sectionId: 'about' },
  { title: 'Contact Us', category: 'Page', route: '/contact', sectionId: 'contact' },
]

const serviceEntries = services.map(s => ({
  title: s.title,
  category: 'Service',
  route: `/services/${s.slug}`,
}))

export const searchIndex = [...serviceEntries, ...staticContent]

export function searchSite(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex.filter(item => item.title.toLowerCase().includes(q))
}