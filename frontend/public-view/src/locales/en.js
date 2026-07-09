export default {
  nav: {
    home: 'HOME',
    services: 'SERVICES',
    charter: "CITIZEN'S CHARTER",
    accomplishments: 'ACCOMPLISHMENTS',
    news: 'NEWS & UPDATES',
    about: 'ABOUT US',
    contact: 'CONTACT US',
  },

  search: {
    placeholder: 'Search',
    noResults: 'No results found for',
  },

  hero: {
    eyebrow: 'WELCOME TO MSWDO INITAO',
    heading: 'Empowering Communities Through Responsive Social Welfare Services',
    description:'The Municipal Social Welfare and Development Office (MSWDO) of Initao, Misamis Oriental is dedicated to enhancing the well-being of our community through comprehensive social services. Our office is committed to empowering individuals and families, promoting social justice, and fostering sustainable development. We strive to create a supportive environment where every member of our community can thrive and reach their full potential.',
    
    cta: {
      primary: 'Explore Services',
      secondary: 'Learn More',
    },

    stats: {
      beneficiaries: 'Beneficiaries Served',
      programs: 'Active Programs',
      barangays: 'Barangays Covered',
      years: 'Years of Service',
    },
  },

  services: {

    filters: {
      all: 'ALL',
      familyServices: 'FAMILY SERVICES',
      childrenAndYouth: 'CHILDREN AND YOUTH',
      personsWithDisabilities: 'PERSONS WITH DISABILITIES',
      seniorCitizens: 'SENIOR CITIZENS',
      womensServices: 'WOMEN\'S SERVICES',
      livelihoodAssistance: 'LIVELIHOOD ASSISTANCE',
      emergencyAssistance: 'EMERGENCY ASSISTANCE',
      justiceAndRehabilitation: 'JUSTICE AND REHABILITATION',
    },

    section: {
      eyebrow: 'WHAT WE DO',
      title: 'Social Welfare Services',
      subtitle: 'Programs and Services designed to support and uplift the most vulnerable sectors in our community.',
    },

    items: {

      aics: {
        title: 'AICS – Assistance to Individuals in Crisis Situations',
        desc: 'Immediate assistance for individuals and families experiencing crisis situations such as medical, burial, educational, and emergency needs.',
        whoCanAvail: ['Residents facing urgent crisis situations', 'Indigent individuals and families needing immediate support'],
        benefits: ['Financial and material assistance', 'Referral to other support services', 'Case-based assessment and follow-up'],
        requirements: ['Valid government-issued ID', 'Barangay certification or referral', 'Supporting documents based on the case'],
        process: [
          { title: 'Assessment', body: 'A social worker evaluates the situation and the type of support needed.' },
          { title: 'Documentation', body: 'The applicant submits the required documents for verification.' },
          { title: 'Approval', body: 'An employee reviews the case and determines the assistance to be released.' },
          { title: 'Release', body: 'Approved support is released through the appropriate channel.' },
        ],
        processingTime: 'Immediate release or usually within a few working days depending on the case.',
        legalBasis: 'DSWD AICS Program Guidelines',
      },

      elderly: {
        title: 'Social Services for the Elderly',
        desc: 'Programs that promote the welfare, protection, and well-being of senior citizens in the community.',
        whoCanAvail: ['Senior citizens residing in Initao', 'Elderly persons who need social assistance or protection'],
        benefits: ['Access to senior citizen support services', 'Referral to health and social welfare programs', 'Assistance in accessing available benefits'],
        requirements: ['Valid ID or proof of age', 'Barangay certification or residency record', 'Supporting documents if needed for specific assistance'],
        process: [
          { title: 'Intake', body: 'The client submits a request for assistance at the office.' },
          { title: 'Assessment', body: 'An employee reviews the client’s needs and eligibility.' },
          { title: 'Referral', body: 'The client is referred to the appropriate service or program.' },
        ],
        processingTime: 'Processing time depends on the type of service requested.',
        legalBasis: 'Republic Act No. 9994',
      },

      womenWelfare: {
        title: 'Women Welfare Program',
        desc: 'Support services for women in need, including counseling, referral, livelihood programs, and protection services.',
        whoCanAvail: ['Women in need of social support', 'Women and families affected by abuse or crisis'],
        benefits: ['Counseling and case management', 'Referral to legal and medical support', 'Protection and follow-up assistance'],
        requirements: ['Initial report or referral', 'Valid ID if available', 'Additional documents depending on the case'],
        process: [
          { title: 'Reporting', body: 'The client or a concerned party reports the situation.' },
          { title: 'Assessment', body: 'A social worker evaluates the case and immediate needs.' },
          { title: 'Intervention', body: 'MSWDO coordinates the needed support and referral.' },
        ],
        processingTime: 'Immediate response for urgent cases.',
        legalBasis: 'Republic Act No. 9262',
      },

      juvenileJustice: {
        title: 'Juvenile Justice Welfare Program',
        desc: 'Intervention and welfare services for children and youth involved in legal or social conflict.',
        whoCanAvail: ['Children and youth in conflict with the law', 'Families and guardians needing welfare support'],
        benefits: ['Case management', 'Referral to legal and rehabilitation support', 'Coordination with partner agencies'],
        requirements: ['Referral or report', 'Birth certificate if available', 'Parent or guardian information'],
        process: [
          { title: 'Referral', body: 'The case is referred to MSWDO or a partner agency.' },
          { title: 'Assessment', body: 'A social worker conducts an initial assessment.' },
          { title: 'Support', body: 'MSWDO coordinates the needed intervention and follow-up.' },
        ],
        processingTime: 'Processed based on urgency and case requirements.',
        legalBasis: 'Republic Act No. 9344',
      },

      youthWelfare: {
        title: 'Youth Welfare Development Program',
        desc: 'Programs focused on the welfare, development, and empowerment of young people in the community.',
        whoCanAvail: ['Youth residents of Initao', 'Young people needing guidance or development support'],
        benefits: ['Developmental support', 'Referral to youth programs', 'Guidance and welfare assistance'],
        requirements: ['Valid ID if available', 'Barangay certification or referral', 'Brief explanation of support needed'],
        process: [
          { title: 'Inquiry', body: 'The client requests assistance or participation.' },
          { title: 'Assessment', body: 'MSWDO identifies the appropriate support program.' },
          { title: 'Enrollment', body: 'The client is referred or enrolled in the relevant activity.' },
        ],
        processingTime: 'Depends on the available activity or program schedule.',
        legalBasis: 'Local youth welfare and development mandates',
      },

      sustainableLivelihood: {
        title: 'Sustainable Livelihood Program',
        desc: 'Skills training and livelihood support to help families create or improve income opportunities.',
        whoCanAvail: ['Low-income households', 'Individuals or groups interested in livelihood projects'],
        benefits: ['Skills training', 'Livelihood support', 'Monitoring and mentoring assistance'],
        requirements: ['Barangay certification or proof of need', 'Valid ID', 'Simple livelihood proposal if applicable'],
        process: [
          { title: 'Orientation', body: 'Clients attend an orientation on available livelihood options.' },
          { title: 'Application', body: 'The client submits the needed documents and requirements.' },
          { title: 'Training', body: 'The client undergoes training and project preparation.' },
          { title: 'Support', body: 'Approved livelihood projects receive support and monitoring.' },
        ],
        processingTime: 'Depends on the training schedule and project readiness.',
        legalBasis: 'DSWD Sustainable Livelihood Program Guidelines',
      },

      pwdServices: {
        title: 'PWD Services',
        desc: 'Services for persons with disability including registration, assistance, and access to benefits.',
        whoCanAvail: ['Residents of Initao with disability', 'First-time and renewing PWD applicants'],
        benefits: ['PWD ID issuance', 'Access to benefits and privileges', 'Support in transactions and referrals'],
        requirements: ['Recent ID photo', 'Barangay certificate', 'Medical certificate or assessment if needed'],
        process: [
          { title: 'Application', body: 'The applicant submits the required form and documents.' },
          { title: 'Assessment', body: 'A professional evaluates the disability and eligibility.' },
          { title: 'Issuance', body: 'The PWD ID and related support are processed.' },
        ],
        processingTime: 'Usually completed within a few working days.',
        legalBasis: 'R.A. 10754',
      },

      childrenDisability: {
        title: 'Children with Disability Services',
        desc: 'Support services for children with disabilities and their families.',
        whoCanAvail: ['Children with disabilities', 'Parents and guardians seeking support services'],
        benefits: ['Referral support', 'Access to disability-related services', 'Family guidance and follow-up'],
        requirements: ['Medical assessment or referral', 'Birth certificate or proof of age', 'Parent or guardian identification'],
        process: [
          { title: 'Referral', body: 'The case is referred to the appropriate office.' },
          { title: 'Assessment', body: 'MSWDO evaluates the child’s needs.' },
          { title: 'Support', body: 'The family is linked to applicable services and programs.' },
        ],
        processingTime: 'Depends on the availability of assessment and referrals.',
        legalBasis: 'PWD and child welfare laws',
      },

      eccdp: {
        title: 'ECCDP – Early Childhood Care and Development Program',
        desc: 'Programs focused on the early care, development, and well-being of young children.',
        whoCanAvail: ['Parents and caregivers of young children', 'Families needing early childhood support'],
        benefits: ['Development support', 'Referral to early childhood services', 'Family support and education'],
        requirements: ['Birth certificate or proof of age', 'Barangay certification if needed', 'Brief request for assistance'],
        process: [
          { title: 'Registration', body: 'The family registers for the program or requests assistance.' },
          { title: 'Assessment', body: 'MSWDO checks the child’s needs and available services.' },
          { title: 'Support', body: 'The family is referred to the appropriate early childhood services.' },
        ],
        processingTime: 'Depends on the available service schedule.',
        legalBasis: 'Early childhood development policies',
      },

      familyDevelopment: {
        title: 'Family Development Service',
        desc: 'Support services aimed at strengthening families and improving community well-being.',
        whoCanAvail: ['Families in need of support', 'Parents and household members seeking guidance'],
        benefits: ['Family strengthening sessions', 'Counseling and guidance', 'Referral to relevant support services'],
        requirements: ['Brief request for support', 'Barangay or referral information if available'],
        process: [
          { title: 'Orientation', body: 'The family attends an orientation on available services.' },
          { title: 'Assessment', body: 'MSWDO discusses the family’s needs and concerns.' },
          { title: 'Intervention', body: 'The family is linked to appropriate services and support.' },
        ],
        processingTime: 'Varies depending on the service requested.',
        legalBasis: 'Family welfare and development policies',
      },

      paroleProbation: {
        title: 'Parole and Probation Program',
        desc: 'Welfare and support services for clients under parole or probation supervision.',
        whoCanAvail: ['Clients under parole or probation', 'Families of clients needing support services'],
        benefits: ['Case monitoring support', 'Referral to community services', 'Reintegration assistance'],
        requirements: ['Referral or court-related document', 'Identification documents', 'Supporting papers if available'],
        process: [
          { title: 'Referral', body: 'The case is referred to the office for support.' },
          { title: 'Assessment', body: 'MSWDO assesses the client’s needs and situation.' },
          { title: 'Follow-up', body: 'The client is assisted with monitoring and support services.' },
        ],
        processingTime: 'Depends on the client’s case and available support services.',
        legalBasis: 'Parole and probation administration guidelines',
      },

      preMarriage: {
        title: 'Pre-marriage Orientation and Counseling',
        desc: 'Guidance and counseling services to help couples prepare for marriage and family life.',
        whoCanAvail: ['Couples preparing for marriage', 'Individuals seeking premarital guidance'],
        benefits: ['Premarital counseling', 'Family preparedness guidance', 'Support in building healthy relationships'],
        requirements: ['Registration or request for appointment', 'Valid ID if needed'],
        process: [
          { title: 'Registration', body: 'The couple registers or requests an orientation session.' },
          { title: 'Counseling', body: 'A social worker provides guidance and discussion.' },
          { title: 'Follow-up', body: 'The couple receives additional guidance if needed.' },
        ],
        processingTime: 'Scheduled based on available counseling sessions.',
        legalBasis: 'Family and marriage counseling services',
      },

      soloParent: {
        title: 'Solo-parent Welfare Program',
        desc: 'Support services and privileges for solo parents to help them provide for their children and family.',
        whoCanAvail: ['Solo parents residing in Initao', 'Parents raising children alone due to family circumstances'],
        benefits: ['Access to solo parent support services', 'Referral to livelihood and educational help', 'Guidance and assistance in availing benefits'],
        requirements: ['Barangay certification', 'Proof of solo parent status', 'Valid ID and supporting documents'],
        process: [
          { title: 'Application', body: 'The solo parent submits the requirements at the office.' },
          { title: 'Assessment', body: 'MSWDO reviews the application and eligibility.' },
          { title: 'Support', body: 'The client is linked to available programs and assistance.' },
        ],
        processingTime: 'Usually processed within a few working days.',
        legalBasis: 'R.A. 8972',
      },
    },

    detail: {
      whoCanAvail: 'Who can avail',
      whatYouGet: 'What you get',
      requirements: 'Requirements',
      howToApply: 'How to Apply',
      processingTime: 'Processing Time',
      legalBasis: 'Legal Basis',
      applyInPerson: 'Apply In Person',
      getDirections: 'Get Directions & Contact Info',
      backToServices: 'Back to Services',
      notFoundTitle: 'Service not found',
      notFoundDesc: "The service you're looking for doesn't exist or may have been moved.",
    },

    card: {
      learnMore: 'Learn more',
    },
  },

  charter: {
    section: {
      eyebrow: 'SERVICE STANDARDS',
      title: "CITIZEN'S CHARTER",
      subtitle: 'Our commitment to deliver quality, efficient, and responsive social welfare services to every Filipino in Initao.',
    },
    standards: {
      commitment: {
        title: 'Service Commitment',
        text: 'We commit to deliver services within the prescribed processing time and ensure that every client is treated with dignity and respect.',
      },
      processingTime: {
        title: 'Processing Time',
        text: 'Simple transactions: 3 working days. Complex transactions: 7 working days. Highly technical: 20 working days.',
      },
      documentary: {
        title: 'Documentary Requirements',
        text: 'Only required documents per DILG and DSWD guidelines are requested. No additional documents beyond what is prescribed by law.',
      },
      zeroContact: {
        title: 'Zero Contact Policy',
        text: 'Our office strictly adheres to the Zero Contact Policy. Frontline staff are prohibited from soliciting gifts or other considerations.',
      },
    },
    services: {
      scsr: {
        title: 'Issuance of Social Case Study Report',
        time: '1 working day',
        fee: 'Free of charge',
        requirements: [
          'Barangay Certification',
          "Municipal Assessor's Certification",
          'Community Tax Certificate (Cedula)',
          'Intake Form',
          'SCSR Request',
          'Medical Abstract / Hospital Bill',
        ],
        process: [
          'Registration, the client writes his/her name in a logbook.',
          'Interview/Intake client, or nearest relative, who knows the client best, answers questions by the interviewer.',
          'An employee conducts one-on-one interview with the client to get pertinent information. The result of the interview is written in an Intake Form.',
          'Preparation of SCSR.',
          'Client receives his/her copy of SCSR.',
        ],
      },
      indigency: {
        title: 'Issuance of Certificate of Indigency',
        time: '1 working day',
        fee: 'Free of charge',
        requirements: [
          'Barangay Certification',
          "Municipal Assessor's Certification",
          'Community Tax Certificate (Cedula)',
        ],
        process: [
          'Registration, the client writes his/her name in a logbook.',
          'Interview/Intake client, or nearest relative, who knows the client best, answers questions by the interviewer.',
          'An employee conducts one-on-one interview with the client to get pertinent information. The result of the interview is written in an Intake Form.',
          'Preparation of Certification.',
          'Review and sign the certification.',
          'Client receives his/her copy of certification.',
        ],
      },
      assistance: {
        title: 'Availment of Financial/Medical/Funeral Assistance',
        time: '1 working day',
        fee: 'Free of charge',
        requirements: [
          'Barangay Certification',
          'Photocopy of Death Certificate',
          'Identification Card',
          'Proof of Assistance Needed',
          'Intake Form',
        ],
        process: [
          'Registration, the client writes his/her name in a logbook.',
          'Interview/Intake client, or nearest relative, who knows the client best, answers questions by the interviewer.',
          'An employee conducts one-on-one interview with the client to get pertinent information. The result of the interview is written in an Intake Form.',
          'Preparation of assistance to be given with the approval of the Office Head',
          'Client receives his/her assistance.',
        ],
      },
      pmoc: {
        title: 'Issuance of PMOC Certificate',
        time: '1 working day',
        fee: 'Minimal Fees',
        requirements: [],
        process: [
          'Registration, the client writes his/her name in a logbook.',
          'Fill-up Marriage Inventory Form',
          'Report to scheduled date and time.',
          'Conduct of PMOC.',
          'Payment of PMOC Certificate',
          'Preparation of Certificate',
          'Couple receives the PMOC certificate.',
        ],
      },
      counseling: {
        title: 'Availment of Counseling/Consultation',
        time: '1 working day',
        fee: 'Free of charge',
        requirements: ['Intake Form'],
        process: [
          'Registration, the client writes his/her name in a logbook.',
          'Client is referred for counseling/consultation.',
          'Conduct of counseling/consultation.',
        ],
      },
    },
    detail: {
      requirementsLabel: 'REQUIREMENTS',
      processLabel: 'PROCESS',
    },
    arta: {
      title: 'Anti-Red Tape Authority (ARTA) Compliance',
      description: 'In compliance with R.A. 11032 (Ease of Doing Business and Efficient Government Service Delivery Act), this office ensures that all frontline services are delivered promptly, courteously, and without undue burden to our clients.',
      viewFullCharter: 'View Full Charter',
    },
  },

  about: {

    section: {
      eyebrow: 'WHO WE ARE',
      title: 'About the MSWDO',
      subtitle: 'The vision, mission, and legal mandates that guide our work in serving the people of Initao.',
    },

    vision: 'Empowered individuals, families and communities with improved quality of life, performing their expected roles and able to mobilize resources to meet their basic needs.',
    mission: 'To care, protect, rehabilitate, develop and integrate into mainstream the vulnerable and socially dysfunctional sectors of society.',
    visionLabel: 'Our Vision',
    missionLabel: 'Our Mission',
    mandatesLabel: 'Mandated By Law',
    mandatesTitle: 'Our Mandates',
  },

  contact: {
    section: {
      eyebrow: 'GET IN TOUCH',
      title: 'Contact Information',
      subtitle: 'For inquiries, complaints, or assistance, reach the MSWDO Initao through any channel below.',
    },
    getDirections: 'Get Directions',
    complaint: {
      title: 'File a Complaint or Feedback',
      description:
        'In accordance with R.A. 11032, clients may file complaints against MSWDO employees for acts of discourtesy, inefficiency, or delayed service. Click here to submit your grievance or feedback.',
    },
    details: {
      addressLabel: 'Office Address',
      telephoneLabel: 'Telephone',
      emailLabel: 'Email',
      hoursLabel: 'Office Hours',
      facebookLabel: 'Facebook Account',
    },
    info: {
      addressLine1: 'Municipal Hall, Jampason',
      addressLine2: 'Initao, Misamis Oriental 9022',
      phoneLine1: '(088) 271-xxxx',
      phoneLine2: '(088) 271-xxxx (Fax)',
      emailLine1: 'mswdo.initao@gmail.com',
      emailLine2: 'lgu.initao@gmail.com',
      hoursLine1: 'Monday – Friday',
      hoursLine2: '8:00 AM – 12 NN · 1:00 – 5:00 PM',
      facebookText: 'facebook.com/mswdo.initao',
    },
  },

  footer: {
    tagline: 'Serving the constituents of Initao, Misamis Oriental with compassion, integrity, and professionalism in social welfare service delivery.',
    contactTitle: 'Contact Information',
    hoursTitle: 'Office Hours',
    hoursValue: 'Monday – Friday, 8:00 AM – 5:00 PM',
    hoursNote: 'Closed on weekends & public holidays',
    linksTitle: 'Quick Links',
    links: {
      home: 'Home',
      news: 'News & Announcements',
      about: 'About the Office',
      programs: 'Programs & Operations',
      dswd: 'DSWD Official Website',
      municipal: 'Municipal Government of Initao',
    },
    copyright: '© {year} MSWDO Initao, Misamis Oriental. All rights reserved.',
  },
}