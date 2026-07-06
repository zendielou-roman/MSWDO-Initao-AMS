// ===== SHARED SERVICES DATA =====
// Single source of truth for both the Services grid (cards) and each
// service's dedicated "Learn more" detail page. Card fields (icon, tone,
// category, title, desc) stay the same as before — detail fields are new.
//
// NOTE: content below is drafted sample copy, not verified MSWDO policy.
// Swap in the real eligibility/requirements/process text before launch —
// ideally the same text your Citizen's Charter page already needs, so the
// two don't drift out of sync.
import {
  Heart,
  Users,
  Star,
  Smile,
  Accessibility,
  HandHeart,
  Briefcase,
  UserRound,
} from 'lucide-vue-next'

export const iconTone = {
  rose: 'bg-[#fde7ea] text-[#e25c73]',
  slate: 'bg-[#e9edf4] text-[#5a6b86]',
  gold: 'bg-[#fbeccb] text-[#d4a526]',
  blue: 'bg-[#e2ecf9] text-[#2f72c4]',
}

export const services = [
  {
    slug: 'aics',
    icon: Heart,
    tone: 'rose',
    category: 'health',
    title: 'Assistance to Individuals in Crisis Situations (AICS)',
    desc: 'Financial and material support for medical, burial, educational, and emergency needs of indigent individuals and families.',
    whoCanAvail: [
      'Residents of Initao who are facing a medical, burial, educational, or other crisis-related emergency',
      'Indigent individuals and families, or those who cannot shoulder the full cost of the need on their own',
      'Walk-in applicants and those referred by a barangay official or social worker',
    ],
    benefits: [
      'Cash or in-kind assistance for hospital bills, medicines, or burial expenses',
      'Educational assistance for school-related emergency needs',
      'Assistance amount is assessed case-by-case based on need and available funds',
    ],
    requirements: [
      'Valid government-issued ID',
      'Barangay Certificate of Indigency',
      'Medical abstract / hospital bill, or death certificate (for burial assistance), as applicable',
      'Certificate of Eligibility (issued by MSWDO after intake interview)',
    ],
    process: [
      {
        title: 'Intake interview',
        body: 'A social worker reviews your situation and the type of assistance needed.',
      },
      { title: 'Document submission', body: 'Submit the requirements above for verification.' },
      {
        title: 'Assessment & approval',
        body: 'MSWDO assesses eligibility and the assistance amount.',
      },
      {
        title: 'Release of assistance',
        body: 'Approved assistance is released via check, cash, or in-kind support.',
      },
    ],
    processingTime:
      'Same day for straightforward cases; up to 3 working days if additional verification is needed.',
    legalBasis: 'DSWD AICS Program Guidelines',
  },
  {
    slug: '4ps',
    icon: Users,
    tone: 'slate',
    category: 'health',
    title: 'Pantawid Pamilyang Pilipino Program (4Ps)',
    desc: 'Conditional cash transfer program targeting poor households to improve health, nutrition, and education of children.',
    whoCanAvail: [
      'Households identified as poor through the DSWD Listahanan (National Household Targeting System)',
      'Families with children aged 0–18, or with a pregnant/lactating member',
    ],
    benefits: [
      'Health grant per household, subject to compliance with health check-up conditions',
      'Education grant per qualified child, subject to school attendance conditions',
      'Access to family development sessions and livelihood referrals',
    ],
    requirements: [
      'Household must be listed under Listahanan / validated by DSWD',
      "Children's birth certificates",
      'Proof of school enrollment (for school-aged children)',
      'Immunization and health records (for young children)',
    ],
    process: [
      { title: 'Assessment', body: 'DSWD/Listahanan determines household eligibility.' },
      { title: 'Registration', body: 'Eligible households are registered and issued a 4Ps ID.' },
      {
        title: 'Compliance verification',
        body: 'Health and education conditions are monitored each period.',
      },
      {
        title: 'Grant disbursement',
        body: 'Cash grants are released through the designated payout channel.',
      },
    ],
    processingTime:
      'Set by DSWD national schedule; MSWDO assists with local verification and inquiries.',
    legalBasis: 'R.A. 11310 (4Ps Act)',
  },
  {
    slug: 'social-pension',
    icon: Star,
    tone: 'gold',
    category: 'health',
    title: 'Social Pension for Indigent Senior Citizens',
    desc: 'Monthly stipend provided to senior citizens aged 60 and above who are frail, sick, or with disability and without regular income.',
    whoCanAvail: [
      'Filipino citizens aged 60 and above, residing in Initao',
      'Frail, sick, or with disability, and with no permanent source of income',
      'Not currently receiving a pension from SSS, GSIS, or a comparable institution',
    ],
    benefits: [
      'Monthly stipend to help meet basic needs',
      'Priority access to other MSWDO senior citizen programs',
    ],
    requirements: [
      'Senior Citizen ID',
      'Barangay Certificate of Residency and Indigency',
      'Certificate of no pension from SSS/GSIS (self-declaration accepted where applicable)',
      'Valid ID or birth certificate for age verification',
    ],
    process: [
      {
        title: 'Application',
        body: 'Submit requirements at the MSWDO office or through your barangay.',
      },
      { title: 'Validation', body: 'MSWDO verifies eligibility and indigency status.' },
      {
        title: 'Endorsement',
        body: 'Qualified applicants are endorsed to DSWD for inclusion in the pension list.',
      },
      { title: 'Release', body: 'Stipend is released on the scheduled payout date.' },
    ],
    processingTime:
      'Validation typically takes 1–2 weeks; payout schedule follows the DSWD regional calendar.',
    legalBasis: 'R.A. 9994 (Expanded Senior Citizens Act)',
  },
  {
    slug: 'child-protection',
    icon: Smile,
    tone: 'blue',
    category: 'health',
    title: 'Child Protection and Youth Welfare',
    desc: 'Programs for the protection, rehabilitation, and development of children and youth in difficult circumstances.',
    whoCanAvail: [
      'Children and youth who are abused, neglected, exploited, or in conflict with the law',
      'Children in especially difficult circumstances, including those referred by school, barangay, or PNP',
    ],
    benefits: [
      'Case management and psychosocial support',
      'Referral for medical, legal, or shelter assistance',
      'Coordination with the Barangay Council for the Protection of Children (BCPC)',
    ],
    requirements: [
      'Incident report or referral (from barangay, school, PNP, or a concerned individual)',
      'Birth certificate of the child, if available',
      'Parent/guardian contact information, where applicable',
    ],
    process: [
      {
        title: 'Report or referral',
        body: 'A case is reported directly, or referred by a partner agency.',
      },
      {
        title: 'Case assessment',
        body: 'A social worker conducts an initial assessment and safety check.',
      },
      {
        title: 'Intervention plan',
        body: 'MSWDO coordinates the appropriate support, referral, or protective custody if needed.',
      },
      {
        title: 'Monitoring',
        body: 'Follow-up visits and case monitoring continue until the case is resolved.',
      },
    ],
    processingTime:
      'Urgent/protective cases are handled immediately; other cases within 3–5 working days.',
    legalBasis: 'R.A. 7610 (Special Protection of Children Act)',
  },
  {
    slug: 'pwd-affairs',
    icon: Accessibility,
    tone: 'rose',
    category: 'pwd',
    title: 'Persons with Disability (PWD) Affairs',
    desc: 'Issuance of PWD IDs, facilitation of benefits and privileges, and programs for the empowerment of persons with disabilities.',
    whoCanAvail: [
      'Residents of Initao with an apparent or non-apparent disability',
      'First-time applicants and those renewing an existing PWD ID',
    ],
    benefits: [
      'Official PWD ID recognized nationwide',
      '20% discount and VAT exemption on covered goods and services',
      'Priority lanes in government transactions',
    ],
    requirements: [
      '2 recent 1x1 ID photos',
      'Barangay Certificate of Residency',
      'Medical certificate or assessment from a licensed physician (for the specific disability type)',
      'Accomplished PWD ID application form',
    ],
    process: [
      {
        title: 'Application',
        body: 'Submit requirements and accomplished form at the MSWDO office.',
      },
      {
        title: 'Assessment',
        body: 'A designated professional confirms the disability type and category.',
      },
      { title: 'ID processing', body: 'MSWDO processes and prints the PWD ID.' },
      {
        title: 'Release',
        body: 'Claim your ID at the MSWDO office; orientation on benefits is provided.',
      },
    ],
    processingTime: 'Typically 3–5 working days from complete submission of requirements.',
    legalBasis: 'R.A. 10754 (Expanded PWD Benefits Act)',
  },
  {
    slug: 'solo-parents',
    icon: HandHeart,
    tone: 'gold',
    category: 'livelihood',
    title: 'Solo Parents Welfare',
    desc: 'Services and privileges under R.A. 8972 for solo parents including flexible working hours and parental leave benefits.',
    whoCanAvail: [
      'Individuals who are the sole provider and caregiver of a child due to widowhood, separation, abandonment, or similar circumstance',
      'Residents of Initao raising a child alone, as defined under the Solo Parents Welfare Act',
    ],
    benefits: [
      'Solo Parent ID for access to discounts and benefits',
      'Flexible work schedule and parental leave (for employed solo parents)',
      'Priority access to livelihood, housing, and educational assistance programs',
    ],
    requirements: [
      'Barangay Certificate of Residency',
      'Proof of solo parent status (e.g. death certificate, court decision, or affidavit, depending on circumstance)',
      "Child's birth certificate",
      '1x1 ID photo',
    ],
    process: [
      { title: 'Application', body: 'Submit requirements at the MSWDO office.' },
      { title: 'Interview', body: 'A social worker verifies your solo parent circumstance.' },
      {
        title: 'ID issuance',
        body: 'Solo Parent ID is issued upon approval, valid for one year and renewable.',
      },
    ],
    processingTime: 'Typically 3 working days from complete submission of requirements.',
    legalBasis: 'R.A. 8972, as amended by R.A. 11861 (Expanded Solo Parents Welfare Act)',
  },
  {
    slug: 'sustainable-livelihood',
    icon: Briefcase,
    tone: 'blue',
    category: 'livelihood',
    title: 'Sustainable Livelihood Program (SLP)',
    desc: 'Skills training and livelihood interventions to provide additional income sources for Pantawid Pamilya beneficiaries.',
    whoCanAvail: [
      'Active 4Ps beneficiaries and other identified poor households',
      'Individuals or groups interested in starting a livelihood or micro-enterprise',
    ],
    benefits: [
      'Skills and livelihood training',
      'Seed capital or start-up assistance for qualified livelihood projects',
      'Ongoing mentoring and monitoring support',
    ],
    requirements: [
      'Proof of 4Ps membership or indigency, as applicable',
      'Valid ID',
      'Simple livelihood proposal or participation in a group micro-enterprise',
    ],
    process: [
      {
        title: 'Orientation',
        body: 'Attend an SLP orientation session to learn about the available tracks.',
      },
      {
        title: 'Application',
        body: 'Submit requirements and, if applicable, a livelihood proposal.',
      },
      {
        title: 'Training',
        body: 'Complete the relevant skills or entrepreneurship training track.',
      },
      {
        title: 'Grant release & monitoring',
        body: 'Approved projects receive support and are monitored for progress.',
      },
    ],
    processingTime:
      'Varies by training batch schedule; MSWDO can advise on the next available cycle.',
    legalBasis: 'DSWD Sustainable Livelihood Program Guidelines',
  },
  {
    slug: 'women-welfare',
    icon: UserRound,
    tone: 'rose',
    category: 'health',
    title: 'Women Welfare and Gender-Based Violence',
    desc: 'Services for women and children in especially difficult circumstances, including referral and crisis intervention.',
    whoCanAvail: [
      'Women and children who are survivors of abuse, violence, or exploitation',
      'Anyone reporting on behalf of a survivor',
    ],
    benefits: [
      'Confidential case management and counseling',
      'Referral for medical, legal, and protective services',
      'Temporary shelter referral, where needed',
    ],
    requirements: [
      'None required to make an initial report — you can walk in or call the hotline directly',
      'Incident details (date, description) help speed up the response, if you have them',
    ],
    process: [
      {
        title: 'Report',
        body: 'Report in person, by phone, or through a referring agency. Reports are handled confidentially.',
      },
      {
        title: 'Initial assessment',
        body: 'A social worker conducts a safety and needs assessment.',
      },
      {
        title: 'Intervention',
        body: 'MSWDO coordinates medical, legal, or shelter support as needed.',
      },
      { title: 'Follow-up', body: 'Ongoing case monitoring and counseling support.' },
    ],
    processingTime: 'Immediate response for urgent/safety cases.',
    legalBasis: 'R.A. 9262 (Anti-VAWC Act)',
  },
]

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug)
}
