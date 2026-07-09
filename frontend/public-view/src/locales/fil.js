export default {
  nav: {
    home: 'HOME',
    services: 'MGA SERBISYO',
    charter: "CITIZEN'S CHARTER",
    accomplishments: 'MGA NAGAWA',
    news: 'MGA BALITA AT ANUNSYO',
    about: 'TUNGKOL SA AMIN',
    contact: 'MAKIPAG-UGNAYAN',
  },
  search: {
    placeholder: 'Maghanap',
    noResults: 'Walang nahanap na resulta para sa',
  },
  hero: {
    eyebrow: 'MALIGAYANG PAGDATING SA TANGGAPAN NG MSWDO INITAO',
    heading: 'Serbisyong may \nMalasakit para sa Bawat Mamamayan', 
    description:
      'Ang Municipal Social Welfare and Development Office (MSWDO) ng Initao, Misamis Oriental ay nakatuon sa pagpapabuti ng kalagayan ng bawat mamamayan sa pamamagitan ng mga serbisyong panlipunan. Layunin ng aming tanggapan na suportahan at tulungan ang mga indibidwal at pamilya, isulong ang pantay na oportunidad, at hikayatin ang patuloy na pag-unlad ng komunidad. Nagsisikap kaming magbigay ng de-kalidad at maaasahang serbisyo upang matiyak na ang bawat mamamayan ay may pagkakataong umunlad at mapabuti ang kanilang pamumuhay.',
    cta: {
      primary: 'Tingnan ang mga Serbisyo',
      secondary: 'Alamin Pa',
    },
    stats: {
      beneficiaries: 'Mga Benepisyaryong Naserbisyuhan',
      programs: 'Mga Aktibong Programa',
      barangays: 'Mga Barangay na Sakop',
      years: 'Taon ng Serbisyo',
    },
  },
  services: {
    filters: {
      all: 'LAHAT',
      familyServices: 'SERBISYONG PANGPAMILYA',
      childrenAndYouth: 'SERBISYONG PAGKABATAAN',
      personsWithDisabilities: 'PARA SA MGA PWD',
      seniorCitizens: 'PARA SA MGA NAKATATANDA',
      womensServices: 'PARA SA KABABAIHAN',
      livelihoodAssistance: 'PANGKABUHAYAN',
      emergencyAssistance: 'AGARANG TULONG',
      justiceAndRehabilitation: 'HUSTISYA AT REHABILITASYON',
    },
    section: {
      eyebrow: 'ANG AMING GINAGAWA',
      title: 'Mga Serbisyong Panlipunan',
      subtitle: 'Mga programa at serbisyong naglalayong magbigay ng suporta at magpabuti sa kalagayan ng mga pinaka-nangangailangang sektor sa ating komunidad.',
    },
    items: {
      aics: {
        title: 'AICS – Assistance to Individuals in Crisis Situations',
        desc: 'Agarang tulong para sa mga indibidwal at pamilyang dumaranas ng krisis, tulad ng pangangailangang medikal, tulong sa pagpapalibing, edukasyon, at iba pang agarang pangangailangan.',
        whoCanAvail: ['Mga residenteng nakararanas ng agarang krisis', 'Mga indibidwal at pamilyang nangangailangan ng agarang tulong'],
        benefits: ['Pinansyal at materyal na tulong', 'Pagre-refer sa iba pang mga serbisyo', 'Pagsusuri at follow-up batay sa kaso'],
        requirements: ['Balidong Government-issued ID', 'Sertipikasyon o Referral mula sa Barangay', 'Iba pang mga pansuportang dokumento batay sa kaso'],
        process: [
          { title: 'Pagsusuri', body: 'Sinusuri ng social worker ang sitwasyon ng Kliyente/Benepisyaryo upang matukoy ang uri ng tulong na kinakailangan.'},
          { title: 'Dokumentasyon', body: 'Isinusumite ng aplikante ang mga kinakailangang dokumento para sa beripikasyon.' },
          { title: 'Pag-apruba', body: 'Sinusuri ng empleyado ang kaso at tinutukoy ang naaangkop na tulong na ipagkakaloob.' },
          { title: 'Pag-release', body: 'Ang naaprubahang tulong ay ibinibigay sa pamamagitan ng naaangkop na proseso.' },
        ],
        processingTime: 'Agarang naibibigay o karaniwang naipagkakaloob sa loob ng ilang, depende sa sitwasyon ng kaso.',
        legalBasis: 'DSWD AICS Program Guidelines',
      },
      elderly: {
        title: 'Social Services for the Elderly',
        desc: 'Mga programa na naglalayong itaguyod ang kapakanan, proteksyon, at maayos na pamumuhay ng mga nakatatanda sa komunidad.',
        whoCanAvail: ['Mga senior citizen na naninirahan sa Initao', 'Mga nakatatandang nangangailangan ng social assistance o proteksyon'],
        benefits: ['Pag-access sa suporta para sa senior citizen', 'Referral sa mga programang pangkalusugan at pangkagalingan ng lipunan', 'Tulong sa pag-access sa mga benepisyo na nakalaan'],
        requirements: ['Balidong ID o patunay ng edad', 'Sertipiko ng barangay o rekord ng paninirahan', 'Mga suportang dokumento kung kailangan para sa tiyak na tulong'],
        process: [
          { title: 'Pagtanggap ng Kliyente', body: 'Isinusumite ng kliyente ang kahilingan para sa tulong sa tanggapan ng MSWDO.'},
          { title: 'Pagsusuri', body: 'Sinusuri ng social worker ang pangangailangan at pagiging kwalipikado ng kliyente.' },
          { title: 'Referral', body: 'Ang kliyente ay inirerefer sa angkop na serbisyo o programa.' },
        ],
        processingTime: 'Ang oras ng pagproseso ay depende sa uri ng serbisyong inaaplayan.',
        legalBasis: 'Republic Act No. 9994',
      },
      womenWelfare: {
        title: 'Women Welfare Program',
        desc: 'Mga serbisyong suporta para sa mga kababaihan na nangangailangan, kabilang ang counseling, referral, pangkabuhayan, at proteksyon.',
        whoCanAvail: ['Mga kababaihan na nangangailangan ng suporta', 'Mga kababaihan at pamilya na apektado ng pang-aabuso o krisis'],
        benefits: ['Pagpapayo at Pamamahala ng Kaso', 'Referral sa legal at medikal na suporta', 'Proteksyon at iba pang follow-up na tulong'],
        requirements: ['Paunang ulat o referral', 'Balidong ID kung mayroon', 'Karagdagang dokumento depende sa kaso'],
        process: [
          { title: 'Pag-uulat', body: 'Ang kliyente o isang may-katuturang partido ay nag-uulat ng sitwasyon.' },
          { title: 'Pagsusuri', body: 'Sinusuri ng social worker ang kaso at agarang pangangailangan.' },
          { title: 'Interbensyon', body: 'Kinokoordina ng MSWDO ang kinakailangang suporta at referral.' },
        ],
        processingTime: 'Agarang pagtugon para sa mga urgent na kaso.',
        legalBasis: 'Republic Act No. 9262',
      },
      juvenileJustice: {
        title: 'Juvenile Justice Welfare Program',
        desc: 'Mga interbensyon at serbisyong pangkagalingan para sa mga bata at kabataan na kasangkot sa legal o panlipunang salungatan.',
        whoCanAvail: ['Mga bata at kabataan na may salungatan sa batas', 'Mga pamilya at guardian na nangangailangan ng suporta sa kagalingan'],
        benefits: ['Pag-aasikaso sa kaso', 'Referral sa legal at suporta sa rehabilitasyon', 'Koordinasyon sa mga partner na ahensya'],
        requirements: ['Referral o ulat', 'Birth certificate kung mayroon', 'Impormasyon ng magulang o guardian'],
        process: [
          { title: 'Referral', body: 'Ang kaso ay inirerefer sa MSWDO o partner agency.' },
          { title: 'Pagsusuri', body: 'Isang social worker ang nagsasagawa ng paunang pagsusuri.' },
          { title: 'Suporta', body: 'Kinokoordina ng MSWDO ang kinakailangang interbensyon at follow-up.' },
        ],
        processingTime: 'Pinoproseso batay sa urgency at kinakailangan ng kaso.',
        legalBasis: 'Republic Act No. 9344',
      },
      youthWelfare: {
        title: 'Youth Welfare Development Program',
        desc: 'Mga programa na naglalayong itaguyod ang kapakanan, pag-unlad, at pagbibigay-kakayahan sa mga kabataan sa komunidad.',
        whoCanAvail: ['Mga kabataang residente ng Initao', 'Mga kabataan na nangangailangan ng gabay o suporta'],
        benefits: ['Suporta sa pag-unlad', 'Referral sa mga programang pangkabataan', 'Gabay at Serbisyong Pangkapakanan'],
        requirements: ['Balidong ID kung mayroon', 'Sertipiko ng barangay o referral', 'Maikling paliwanag ng pangangailangan'],
        process: [
          { title: 'Katanungan', body: 'Nagsusumite ang kliyente ng kahilingan para sa tulong o paglahok sa programa.' },
          { title: 'Pagsusuri', body: 'Tinutukoy ng MSWDO ang angkop na programang suporta.' },
          { title: 'Pagpaparehistro', body: 'Inirefer o in-enroll ang kliyente sa kaukulang aktibidad.' },
        ],
        processingTime: 'Depende sa magagamit na aktibidad o iskedyul ng programa.',
        legalBasis: 'Mga lokal na mandato para sa kapakanan at pag-unlad ng kabataan.',
      },
      sustainableLivelihood: {
        title: 'Sustainable Livelihood Program',
        desc: 'Mga pagsasanay at suporta sa kabuhayan upang matulungan ang mga pamilya na magkaroon o mapalago ang kanilang pinagkakakitaan.',
        whoCanAvail: ['Mga Pamilyang may Mababang Kita', 'Mga indibidwal o grupo na interesado sa mga proyektong pangkabuhayan'],
        benefits: ['Pagsasanay sa Kasanayan', 'Suportang pangkabuhayan', 'Monitoring at mentoring na tulong'],
        requirements: ['Sertipiko ng barangay o patunay ng pangangailangan', 'Valid ID', 'Simpleng livelihood proposal (kung naaangkop)'],
        process: [
          { title: 'Orientasyon', body: 'Dumadalo ang mga kliyente sa isang oryentasyon tungkol sa mga pagpipiliang kabuhayan.' },
          { title: 'Aplikasyon', body: 'Isinusumite ng kliyente ang mga dokumento at iba pang kinakailangan.' },
          { title: 'Training', body: 'Sumasailalim ang kliyente sa pagsasanay at paghahanda ng proyekto.' },
          { title: 'Suporta', body: 'Ang mga aprubadong proyektong pangkabuhayan ay tumatanggap ng suporta at monitoring.' },
        ],
        processingTime: 'Depende sa iskedyul ng training at paghahanda ng proyekto.',
        legalBasis: 'DSWD Sustainable Livelihood Program Guidelines',
      },
      pwdServices: {
        title: 'PWD Services',
        desc: 'Mga serbisyo para sa mga may kapansanan kabilang ang pagpaparehistro, tulong, at pag-access sa benepisyo.',
        whoCanAvail: ['Mga residente sa Initao na may kapansanan', 'Mga first-time at renewing PWD applicants'],
        benefits: ['Pagkakaloob ng PWD ID', 'Pag-access sa benepisyo at pribilehiyo', 'Suporta sa transaksiyon at referral'],
        requirements: ['Kamakailang larawan para sa ID', 'Sertipiko ng barangay', 'Sertipiko medikal o pagsusuri kung kailangan'],
        process: [
          { title: 'Aplikasyon', body: 'Isinusumite ng aplikante ang kinakailangang form at dokumento.' },
          { title: 'Pagsusuri', body: 'Sinusuri ng isang propesyonal ang kapansanan at pagiging kwalipikado ng kliyente.' },
          { title: 'Pagbibigay', body: 'Ang PWD ID at kaukulang suporta ay pinoproseso.' },
        ],
        processingTime: 'Karaniwang natatapos sa loob ng ilang araw na pagtatrabaho.',
        legalBasis: 'R.A. 10754',
      },
      childrenDisability: {
        title: 'Children with Disability Services',
        desc: 'Mga serbisyong pansuporta para sa mga bata na may kapansanan at sa kanilang pamilya.',
        whoCanAvail: ['Mga batang may kapansanan', 'Mga magulang at guardian na naghahanap ng suporta'],
        benefits: ['Suporta sa referral', 'Pag-access sa serbisyo na may kinalaman sa kapansanan', 'Gabay sa pamilya at follow-up'],
        requirements: ['Pagsusuring medikal o referral', 'Birth certificate o patunay ng edad', 'Pagkakakilanlan ng magulang o guardian'],
        process: [
          { title: 'Referral', body: 'Ang kaso ay inirerefer sa angkop na tanggapan.' },
          { title: 'Pagsusuri', body: 'Sinusuri ng MSWDO ang pangangailangan ng bata.' },
          { title: 'Suporta', body: 'Ang pamilya ay ikinokonekta sa naaangkop na serbisyo at programa.' },
        ],
        processingTime: 'Depende sa pagkakaroon ng assessment at referrals.',
        legalBasis: 'PWD at child welfare laws',
      },
      eccdp: {
        title: 'ECCDP – Early Childhood Care and Development Program',
        desc: 'Mga programang nakatuon sa maagang pangangalaga, pag-unlad, at kagalingan ng mga batang preschool.',
        whoCanAvail: ['Mga magulang at caregiver ng mga batang preschool', 'Mga pamilya na nangangailangan ng suporta sa maagang pag-unlad'],
        benefits: ['Suporta sa pag-unlad', 'Referral sa early childhood services', 'Suporta at edukasyon sa pamilya'],
        requirements: ['Birth certificate o patunay ng edad', 'Sertipiko ng barangay kung kailangan', 'Maikling kahilingan para sa tulong'],
        process: [
          { title: 'Pagpaparehistro', body: 'Nagsusumite ang pamilya ng kahilingan para sa programa o tulong.' },
          { title: 'Pagsusuri', body: 'Sinusuri ng MSWDO ang pangangailangan ng bata at mga serbisyong maihahandog.' },
          { title: 'Suporta', body: 'Inire-refer ang pamilya sa naaangkop na mga serbisyo para sa maagang pagpapabuti sa bata.' },
        ],
        processingTime: 'Depende sa available service schedule.',
        legalBasis: 'Mga polisiya sa early childhood development',
      },
      familyDevelopment: {
        title: 'Family Development Service',
        desc: 'Mga serbisyong naglalayong mapatatag ang mga pamilya at mapabuti ang kanilang kalagayan sa komunidad.',
        whoCanAvail: ['Mga pamilya na nangangailangan ng suporta', 'Mga magulang at miyembro ng pamilya na nangangailangan ng gabay.'],
        benefits: ['Mga session sa Pagpapatatag ng pamilya', 'Pagpapayo at gabay', 'Referral sa kaukulang serbisyong pansuporta'],
        requirements: ['Maikling kahilingan para sa suporta', 'Impormasyon ng barangay o referral kung available'],
        process: [
          { title: 'Orientasyon', body: 'Dumadalo ang pamilya sa orientasyon sa mga serbisyong mayroon.' },
          { title: 'Pagsusuri', body: 'Tinalakay ng MSWDO ang pangangailangan at alalahanin ng pamilya.' },
          { title: 'Interbensyon', body: 'Ang pamilya ay ikinokonekta sa angkop na serbisyo at suporta.' },
        ],
        processingTime: 'Nag-iiba depende sa serbisyong hiniling.',
        legalBasis: 'Mga polisiya sa kagalingan at pag-unlad ng pamilya',
      },
     paroleProbation: {
  title: 'Parole and Probation Program',
  desc: 'Mga serbisyong pangkapakanan at suporta para sa mga kliyenteng nasa ilalim ng parole o probation.',
  whoCanAvail: [
    'Mga kliyenteng nasa ilalim ng parole o probation',
    'Mga pamilya ng mga kliyenteng nangangailangan ng mga serbisyong suporta'
  ],
  benefits: [
    'Suporta sa pagsubaybay ng kaso',
    'Pagre-refer sa mga serbisyong pangkomunidad',
    'Tulong sa muling pagsasama sa komunidad'
  ],
  requirements: [
    'Referral o dokumentong may kaugnayan sa korte',
    'Mga dokumento ng pagkakakilanlan',
    'Mga karagdagang dokumento kung mayroon'
  ],
  process: [
    {
      title: 'Referral',
      body: 'Inire-refer ang kaso sa tanggapan upang mabigyan ng kaukulang suporta.'
    },
    {
      title: 'Pagsusuri',
      body: 'Sinusuri ng MSWDO ang pangangailangan at sitwasyon ng kliyente.'
    },
    {
      title: 'Pagsubaybay',
      body: 'Tinutulungan ang kliyente sa pamamagitan ng patuloy na pagsubaybay at mga serbisyong suporta.'
    },
  ],
  processingTime: 'Nakadepende sa kaso ng kliyente at sa mga magagamit na serbisyong suporta.',
  legalBasis: 'Mga alituntunin sa pangangasiwa ng parole at probation',
},

preMarriage: {
  title: 'Pre-marriage Orientation and Counseling',
  desc: 'Mga serbisyo sa gabay at pagpapayo upang matulungan ang mga magkapareha na makapaghanda para sa pag-aasawa at buhay-pamilya.',
  whoCanAvail: [
    'Mga magkaparehang naghahanda para sa kasal',
    'Mga indibidwal na naghahanap ng gabay bago ang kasal'
  ],
  benefits: [
    'Premarital counseling',
    'Gabay sa paghahanda para sa buhay-pamilya',
    'Suporta sa pagbuo ng maayos at matatag na relasyon'
  ],
  requirements: [
    'Pagpaparehistro o kahilingan para sa appointment',
    'Balidong ID kung kinakailangan'
  ],
  process: [
    {
      title: 'Pagpaparehistro',
      body: 'Nagpaparehistro ang magkapareha o humihiling ng sesyon ng oryentasyon.'
    },
    {
      title: 'Pagpapayo',
      body: 'Nagbibigay ng gabay at talakayan ang social worker.'
    },
    {
      title: 'Pagsubaybay',
      body: 'Tumatanggap ang magkapareha ng karagdagang gabay kung kinakailangan.'
    },
  ],
  processingTime: 'Isinasagawa batay sa iskedyul ng mga sesyon ng counseling.',
  legalBasis: 'Mga serbisyo sa pagpapayo tungkol sa pamilya at pag-aasawa',
},

soloParent: {
  title: 'Solo-parent Welfare Program',
  desc: 'Mga serbisyong suporta at benepisyo para sa mga solo parent upang matulungan silang matugunan ang pangangailangan ng kanilang mga anak at pamilya.',
  whoCanAvail: [
    'Mga solo parent na naninirahan sa Initao',
    'Mga magulang na nag-aaruga ng kanilang mga anak nang mag-isa dahil sa mga sitwasyon sa pamilya'
  ],
  benefits: [
    'Access sa mga serbisyong suporta para sa solo parent',
    'Pagre-refer sa mga programa sa kabuhayan at tulong pang-edukasyon',
    'Gabay at tulong sa pag-avail ng mga benepisyo'
  ],
  requirements: [
    'Sertipikasyon mula sa Barangay',
    'Patunay ng pagiging solo parent',
    'Balidong ID at mga kinakailangang dokumento'
  ],
  process: [
    {
      title: 'Aplikasyon',
      body: 'Isinusumite ng solo parent ang mga kinakailangang dokumento sa tanggapan.'
    },
    {
      title: 'Pagsusuri',
      body: 'Sinusuri ng MSWDO ang aplikasyon at pagiging kwalipikado.'
    },
    {
      title: 'Suporta',
      body: 'Iniuugnay ang kliyente sa mga magagamit na programa at tulong.'
    },
  ],
  processingTime: 'Karaniwang napoproseso sa loob ng ilang araw ng trabaho.',
  legalBasis: 'R.A. 8972',
},
    },

  
    detail: {
      whoCanAvail: 'Sino ang Maaaring Maka-avail',
      whatYouGet: 'Mga Benepisyong Matatanggap',
      requirements: 'Mga Kinakailangan',
      howToApply: 'Paano Mag-apply',
      processingTime: 'Tagal ng Pagproseso',
      legalBasis: 'Batayang Legal',
      applyInPerson: 'Mag-apply nang Personal',
      getDirections: 'Direksyon at Contact Info.',
      backToServices: 'Bumalik sa mga Serbisyo',
      notFoundTitle: 'Hindi natagpuan ang serbisyo',
      notFoundDesc: 'Ang serbisyong hinahanap mo ay wala o maaaring inilipat na.',
    },
    card: {
      learnMore: 'Alamin pa',
    },
  },

  charter: {
  section: {
    eyebrow: 'MGA PAMANTAYAN NG SERBISYO',
    title: 'CITIZEN\'S CHARTER',
    subtitle: 'Ang aming pangako na maghatid ng de-kalidad, mahusay, at mabilis na serbisyong panlipunan para sa bawat mamamayan ng Initao.',
  },

  standards: {
    commitment: {
      title: 'Pangako sa Serbisyo',
      text: 'Nangangako kaming maghatid ng mga serbisyo sa loob ng itinakdang oras ng pagproseso at tiyaking ang bawat kliyente ay tratuhin nang may dignidad at paggalang.',
    },

    processingTime: {
      title: 'Oras ng Pagproseso',
      text: 'Mga simpleng transaksyon: 3 araw ng trabaho. Mga komplikadong transaksyon: 7 araw ng trabaho. Mga teknikal na transaksyon: 20 araw ng trabaho.',
    },

    documentary: {
      title: 'Mga Kinakailangang Dokumento',
      text: 'Tanging mga dokumentong kinakailangan ayon sa mga alituntunin ng DILG at DSWD ang hinihingi. Walang karagdagang dokumentong hihingin maliban sa itinakda ng batas.',
    },

    zeroContact: {
      title: 'Patakaran sa Zero Contact',
      text: 'Mahigpit na ipinatutupad ng aming tanggapan ang Zero Contact Policy. Ipinagbabawal sa mga kawani ng frontline ang paghingi ng regalo o anumang uri ng pabor.',
    },
  },

  services: {
    scsr: {
      title: 'Pagkuha ng Social Case Study Report (SCSR)',
      time: '1 araw ng trabaho',
      fee: 'Walang Bayad',

      requirements: [
        'Sertipikasyon mula sa Barangay',
        'Sertipikasyon mula sa Municipal Assessor',
        'Community Tax Certificate (Cedula)',
        'Intake Form',
        'Kahilingan para sa SCSR',
        'Medical Abstract / Hospital Bill',
      ],

      process: [
        'Pagpaparehistro. Isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Intake interview. Ang kliyente o pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente ay sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa Intake Form.',
        'Paghahanda ng Social Case Study Report (SCSR).',
        'Matatanggap ng kliyente ang kanyang kopya ng SCSR.',
      ],
    },

    indigency: {
      title: 'Pagkuha ng Sertipiko ng Indigency',
      time: '1 araw ng trabaho',
      fee: 'Walang Bayad',

      requirements: [
        'Sertipikasyon mula sa Barangay',
        'Sertipikasyon mula sa Municipal Assessor',
        'Community Tax Certificate (Cedula)',
      ],

      process: [
        'Pagpaparehistro. Isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Intake interview. Ang kliyente o pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente ay sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa Intake Form.',
        'Paghahanda ng sertipikasyon.',
        'Pagsusuri at paglagda sa sertipikasyon.',
        'Matatanggap ng kliyente ang kanyang kopya ng sertipikasyon.',
      ],
    },

    assistance: {
      title: 'Pag-avail ng Tulong Pinansyal, Medikal, o Pampalibing',
      time: '1 araw ng trabaho',
      fee: 'Walang Bayad',

      requirements: [
        'Sertipikasyon mula sa Barangay',
        'Photocopy ng Death Certificate',
        'Balidong ID',
        'Patunay ng Pangangailangan ng Tulong',
        'Intake Form',
      ],

      process: [
        'Pagpaparehistro. Isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Intake interview. Ang kliyente o pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente ay sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa Intake Form.',
        'Paghahanda ng tulong na ipagkakaloob matapos ang pag-apruba ng pinuno ng tanggapan.',
        'Matatanggap ng kliyente ang inaprubahang tulong.',
      ],
    },

    pmoc: {
      title: 'Pagkuha ng PMOC Certificate',
      time: '1 araw ng trabaho',
      fee: 'May Kaunting Bayad',

      requirements: [],

      process: [
        'Pagpaparehistro. Isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Pagsagot sa Marriage Inventory Form.',
        'Pagdalo sa itinakdang petsa at oras.',
        'Pagsasagawa ng PMOC.',
        'Pagbabayad para sa PMOC Certificate.',
        'Paghahanda ng sertipiko.',
        'Matatanggap ng magkapareha ang PMOC Certificate.',
      ],
    },

    counseling: {
      title: 'Pag-avail ng Counseling o Konsultasyon',
      time: '1 araw ng trabaho',
      fee: 'Walang Bayad',

      requirements: [
        'Intake Form',
      ],

      process: [
        'Pagpaparehistro. Isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Inire-refer ang kliyente para sa counseling o konsultasyon.',
        'Isinasagawa ang counseling o konsultasyon.',
      ],
    },
  },

  detail: {
    requirementsLabel: 'MGA KINAKAILANGAN',
    processLabel: 'PROSESO',
  },

  arta: {
    title: 'Pagsunod sa Anti-Red Tape Authority (ARTA)',
    description: 'Alinsunod sa R.A. 11032 o Ease of Doing Business and Efficient Government Service Delivery Act, tinitiyak ng aming tanggapan na ang lahat ng frontline services ay naihahatid nang mabilis, magalang, at walang hindi kinakailangang abala sa aming mga kliyente.',
    viewFullCharter: 'Tingnan ang Buong Citizen\'s Charter',
  },
},

  about: {
    section: {
      eyebrow: 'SINO KAMI',
      title: 'Tungkol sa MSWDO',
      subtitle: 'Ang pangitain, misyon, at legal na mandato na gumagabay sa aming trabaho sa paglingkuran ang mga tao ng Initao.',
    },
    vision: 'Empowered individuals, families and communities with improved quality of life, performing their expected roles and able to mobilize resources to meet their basic needs.',
    mission: 'To care, protect, rehabilitate, develop and integrate into mainstream the vulnerable and socially dysfunctional sectors of society.',
    visionLabel: 'Our Vision',
    missionLabel: 'Our Mission',
    mandatesLabel: 'Mandato Batay sa Batas',
    mandatesTitle: 'Ang Aming Mga Mandato',
  },
  contact: {
    section: {
      eyebrow: 'KUMUSTA KA',
      title: 'Impormasyon sa Pakikipag-ugnayan',
      subtitle: 'Para sa mga katanungan, reklamo, o tulong, makipag-ugnayan sa MSWDO Initao sa alinmang channel sa ibaba.',
    },
    getDirections: 'Kunin ang Direksyon',
    complaint: {
      title: 'Magharap ng Reklamo o Puna',
      description:
        'Alinsunod sa R.A. 11032, ang mga kliyente ay maaaring magharap ng reklamo laban sa mga empleyado ng MSWDO para sa mga kilos ng kawalang-galang, kawalan ng kahusayan, o naantalang serbisyo. I-click dito para isumite ang iyong reklamo o puna.',
    },
    details: {
      addressLabel: 'Tanggapan',
      telephoneLabel: 'Telepono',
      emailLabel: 'Email',
      hoursLabel: 'Oras ng Tanggapan',
      facebookLabel: 'Facebook Account',
    },
    info: {
      addressLine1: 'Munisipal Hall, Jampason',
      addressLine2: 'Initao, Misamis Oriental 9022',
      phoneLine1: '(088) 271-xxxx',
      phoneLine2: '(088) 271-xxxx (Fax)',
      emailLine1: 'mswdo.initao@gmail.com',
      emailLine2: 'lgu.initao@gmail.com',
      hoursLine1: 'Lunes – Biyernes',
      hoursLine2: '8:00 AM – 12 NN · 1:00 – 5:00 PM',
      facebookText: 'facebook.com/mswdo.initao',
    },
  },
  footer: {
    tagline: 'Naglilingkod sa mga mamamayan ng Initao, Misamis Oriental nang may malasakit, integridad, at propesyonalismo sa paghahatid ng mga serbisyong panlipunan.',
    contactTitle: 'Impormasyon sa Pakikipag-ugnayan',
    hoursTitle: 'Oras ng Tanggapan',
    hoursValue: 'Lunes – Biyernes, 8:00 AM – 5:00 PM',
    hoursNote: 'Sarado sa weekends at public holidays',
    linksTitle: 'Mga Maikling Link',
    links: {
      home: 'Bahay',
      news: 'Balita at Anunsyo',
      about: 'Tungkol sa Tanggapan',
      programs: 'Mga Programa at Operasyon',
      dswd: 'Opisyal na Website ng DSWD',
      municipal: 'Munisipal na Pamahalaan ng Initao',
    },
    copyright: '© {year} MSWDO Initao, Misamis Oriental. Lahat ng karapatan ay nakalaan.',
  },
}