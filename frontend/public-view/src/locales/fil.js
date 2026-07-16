export default {
  nav: {
    home: 'HOME',
    services: 'MGA SERBISYO',
    charter: "CITIZEN'S CHARTER",
    accomplishments: 'MGA NAGAWA',
    news: 'MGA BALITA AT ANUNSYO',
    about: 'TUNGKOL SA TANGGAPAN',
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
      secondary: 'Makipag-ugnayan',
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
    subtitle: 'De-kalidad, mahusay, at maagap na serbisyong panlipunan para sa bawat mamamayan ng Initao.',
  },

  standards: {
    commitment: {
      title: 'Pangako sa Serbisyo',
      text: 'Nangangako kaming maghatid ng mga serbisyo sa loob ng itinakdang oras ng pagproseso at tiyaking ang bawat kliyente ay tatratuhin nang may dignidad at paggalang.',
    },

    processingTime: {
      title: 'Oras ng Pagproseso',
      text: 'Mas mabilis na napoproseso ang mga simpleng transaksyon, habang ang mga komplikado at lubhang teknikal na transaksyon ay maaaring mangailangan ng mas mahabang panahon para sa wastong pagsusuri at pagproseso.',
    },

    documentary: {
      title: 'Mga Kinakailangang Dokumento',
      text: 'Ang mga dokumentong hinihingi ay batay lamang sa mga alituntunin ng DILG at DSWD. Walang karagdagang dokumentong kakailanganin maliban sa mga itinakda ng batas.',
    },

    zeroContact: {
      title: 'Zero Contact Policy',
      text: 'Mahigpit na ipinatutupad ng aming tanggapan ang Zero Contact Policy. Mahigpit na ipinagbabawal sa mga empleyado ang paghingi o pagtanggap ng regalo, pabor, o anumang kapalit ng serbisyo.',
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
        'Pagpaparehistro, isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Pag interview sa kliyente o sa pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente at sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa isang Intake Form.',
        'Paghahanda ng Social Case Study Report (SCSR).',
        'Pagtanggap ng kliyente sa kanyang kopya ng SCSR.',
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
        'Pagpaparehistro, isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Pag interview sa kliyente o sa pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente at sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa Intake Form.',
        'Paghahanda ng sertipikasyon.',
        'Pagsusuri at paglagda sa sertipikasyon.',
        'Pagtanggap ng kliyente sa kanyang kopya ng sertipikasyon.',
      ],
    },

    assistance: {
      title: 'Pag-avail ng Tulong Pinansyal, Medikal, o Pampalibing',
      time: '1 araw ng trabaho',
      fee: 'Walang Bayad',

      requirements: [
        'Sertipikasyon mula sa Barangay',
        'Photocopy ng Death Certificate',
        'Valid ID',
        'Patunay ng Pangangailangan ng Tulong',
        'Intake Form',
      ],

      process: [
        'Pagpaparehistro, isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Pag interview sa kliyente o sa pinakamalapit na kamag-anak na may sapat na kaalaman tungkol sa kalagayan ng kliyente at sasagot sa mga tanong ng tagapanayam.',
        'Isinasagawa ng kawani ang personal na panayam upang makuha ang mga kinakailangang impormasyon. Itinatala ang resulta ng panayam sa Intake Form.',
        'Paghahanda ng tulong na ipagkakaloob matapos ang pag-apruba ng officer in charge.',
        'Pagtanggap ng kliyente sa kanyang inaprubahang tulong.',
      ],
    },

    pmoc: {
      title: 'Pagkuha ng PMOC Certificate',
      time: '1 araw ng trabaho',
      fee: 'May Kaunting Bayad',

      requirements: [],

      process: [
        'Pagpaparehistro, isinusulat ng kliyente ang kanyang pangalan sa logbook.',
        'Pagsagot sa Marriage Inventory Form.',
        'Pagdalo sa itinakdang petsa at oras.',
        'Pagsasagawa ng PMOC.',
        'Pagbabayad ng additional fees para sa PMOC Certificate.',
        'Paghahanda ng sertipiko.',
        'Pagtanggap ng mga ikakasal sa kanilang PMOC Certificate.',
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
        'Pagpaparehistro, isinusulat ng kliyente ang kanyang pangalan sa logbook.',
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
    description: 'Alinsunod sa R.A. 11032 o Ease of Doing Business and Efficient Government Service Delivery Act, tinitiyak ng aming tanggapan na ang lahat ng frontline services ay naihahatid nang maagap, magalang, at walang hindi kinakailangang abala sa aming mga kliyente.',
    viewFullCharter: 'Tingnan ang Buong Citizen\'s Charter',
  },
},
accomplishments: {
  section: {
    eyebrow: 'MGA NAGAWA',
    title: 'Mga Nagawa at Pagkilala',
    subtitle: 'Mga konkretong resulta ng aming patuloy na paglilingkod sa larangan ng kapakanang panlipunan at pagpapaunlad ng komunidad sa Initao, Misamis Oriental.',
  },

  stats: {
    beneficiaries: 'Mga Benepisyaryong Naserbisyuhan',
    programs: 'Mga Programang Natapos',
    barangays: 'Mga Barangay na Naserbisyuhan',
    years: 'Taon ng Paglilingkod',
  },

  milestonesLabel: 'Mga Kamakailang Tagumpay',
  showMore: 'Ipakita ang iba pang mga nagawa',
  showLess: 'Show Less',
  readMore: 'Magbasa pa',
  close: 'Isara',

  items: {
    centenariansAct: {
      title: 'Expanded Centenarians Act (RA 11982)',
      desc: 'Isa pang pangkat ng mga octogenarian at nonagenarian ang tumanggap ng kanilang ₱10,000 cash gift mula sa National Commission of Senior Citizens (NCSC). Dumalo rin sa programa ang Punong Bayan ng LGU Initao, Hon. Mayor Mercy Grace J. Acain, upang ipahayag ang kanyang pagbati sa 51 benepisyaryong umabot sa mga natatanging edad na ito at pasalamatan ang kanilang mga pamilya sa patuloy na suporta.',
    },

    sfpAward: {
      title: 'DSWD Certificate of Accomplishment — SFP',
      desc: 'Kinilala ang LGU Initao ng DSWD Field Office X dahil sa matagumpay na pagpapatupad ng ika-14 na Cycle (2024) ng Supplementary Feeding Program. Nakamit nito ang 92.31% na pagtaas sa timbang ng mga benepisyaryo at 100% na pagseserbisyo sa target na mga bata bilang patunay ng matibay na adhikain para sa nutrisyon at kapakanan ng mga bata sa Region X. Iginawad noong Hunyo 17, 2025 sa Pearlmont Hotel, Cagayan de Oro City.',
    },

    zeroHunger: {
      title: 'Zero Hunger Assistance',
      desc: 'Nagkaloob ng mga food pack sa 1,200 pamilyang nangangailangan sa panahon ng kalamidad at iba pang sitwasyon ng krisis.',
    },

    slpMicroenterprise: {
      title: 'SLP Microenterprise Track',
      desc: 'Nasuportahan ang 145 benepisyaryo ng Pantawid Pamilyang Pilipino Program sa pagsisimula ng kanilang maliliit na kabuhayan.',
    },

    childProtection: {
      title: 'Child Protection Campaign',
      desc: 'Nagsagawa ng mga information campaign sa lahat ng 18 barangay upang palakasin ang kamalayan tungkol sa pag-iwas sa pang-aabuso sa mga bata.',
    },

    pwdEmpowerment: {
      title: 'PWD Empowerment Program',
      desc: 'Nagkaloob ng mga assistive device at pagsasanay sa kasanayan para sa 320 persons with disabilities (PWDs).',
    },

    cashForWork: {
      title: 'DSWD KC Cash-for-Work Payout',
      desc: 'Isinagawa ang pagtatapos at payout ng DSWD KALAHI-CIDSS (KC) Cash-for-Work Program para sa mga nagtapos at magsisipagtapos na mag-aaral sa kolehiyo mula sa Initao. Sa ngalan ng LGU Initao sa pangunguna ni Hon. Mayor Gagay Acain, taos-pusong pasasalamat sa DSWD Team sa pamumuno ni Engr. Abo Tocalo at Ma’am Arline Pacudan, at lalo na kay Sir Al Orerbil sa matagumpay na pagsasakatuparan ng programang ito.',
    },
  },
},

news: {
  placeholder: 'Pumili ng anunsyo mula sa listahan upang mabasa ang buong bulletin. Manatiling updated sa mga pinakabagong programang panlipunan, relief operations, at aktibidad sa komunidad.',
  readLatest: 'Basahin ang Pinakabagong Update',
  section: {
    eyebrow: 'LATEST',
    title: 'Balita at Mga Anunsyo',
    subtitle: 'Mga pinakabagong anunsyo, abiso, at ulat ng mga aktibidad mula sa MSWDO Initao.',
  },

  readMore: 'Magbasa pa',
  viewAll: 'Tingnan ang Lahat ng Balita',

  categories: {
    relief: 'Relief',
    health: 'Kalusugan',
    pension: 'Pensyon',
    youth: 'Kabataan',
  },

  items: {
    foodRelief: {
      title: 'Pamamahagi ng Emergency Food Relief para sa mga Pamilyang Apektado ng Baha',
      excerpt: 'Matagumpay na nakapamahagi ang MSWDO Initao ng mga food pack at relief goods sa 248 pamilyang naapektuhan ng kamakailang pagbaha sa mga mabababang lugar ng mga barangay, upang matiyak na walang pamilyang maiiwan.',
    },

    medicalMission: {
      title: 'Libreng Medical at Dental Mission sa Barangay Jampason',
      excerpt: 'Sa pakikipagtulungan ng Municipal Health Office, mahigit 300 residente ang nabigyan ng libreng serbisyong medikal at dental.',
    },

    socialPension: {
      title: 'Social Pension Payout para sa mga Indigent Senior Citizen — Ikalawang Quarter ng 2026',
      excerpt: 'May kabuuang 412 indigent senior citizen ang tumanggap ng kanilang Social Pension para sa ikalawang quarter.',
    },

    cashForWork: {
      title: 'DSWD KC Cash-for-Work Payout para sa mga Nagtapos sa Initao',
      excerpt: 'Natanggap ng mga nagtapos at magsisipagtapos sa kolehiyo ang kanilang Cash-for-Work grants.',
    },
  },
},

operations: {
  section: {
    eyebrow: 'MGA AKTIBIDAD',
    title: 'Mga Kasalukuyang Programa',
    subtitle: 'Mga programang kasalukuyang isinasagawa at mga inisyatibong nakatakdang ipatupad para sa mga mamamayan ng Initao.',
  },

  filters: {
    all: 'Lahat',
    ongoing: 'Kasalukuyan',
    planned: 'Nakatakda',
  },

  viewAll: 'Tingnan ang Lahat ng Programa',

  items: {
    slp: {
      title: 'Sustainable Livelihood Program — Pagsasanay sa Kasanayan',
      location: 'Municipal Hall, Initao',
      beneficiaries: '120 kalahok',
      desc: 'Praktikal na pagsasanay sa pananahi, welding, at food processing upang matulungan ang mga pamilya na magkaroon ng matatag na pinagkakakitaan.',
    },

    feeding: {
      title: 'Supplementary Feeding Program — Ika-15 Cycle',
      location: '24 Day Care Center',
      beneficiaries: '1,050 bata',
      desc: 'Araw-araw na masustansyang pagkain para sa mga batang nasa Day Care Center upang mapabuti ang kanilang nutrisyon at mabawasan ang malnutrisyon sa lahat ng barangay.',
    },

    seniorCaravan: {
      title: 'Senior Citizens Wellness & Mobility Caravan',
      location: 'Iba’t ibang Barangay',
      beneficiaries: '600+ nakatatanda',
      desc: 'Isang nakatakdang caravan na iikot sa iba’t ibang barangay upang magbigay ng serbisyong pangkalusugan, assistive devices, at tulong kaugnay ng pensyon para sa mga nakatatanda.',
    },

    pwdDevices: {
      title: 'Pamamahagi ng Assistive Devices para sa mga PWD',
      location: 'Tanggapan ng MSWDO',
      beneficiaries: '85 PWD',
      desc: 'Pamamahagi ng wheelchair, saklay, at hearing aid para sa mga rehistradong person with disability (PWD) sa bayan.',
    },
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

  organization: {
  section: {
    eyebrow: 'ISTRUKTURA NG TANGGAPAN',
    title: 'Organizational Chart',
    subtitle: 'Ang hierarchy ng MSWDO Initao na nagpapakita ng pamunuan ng tanggapan at mga functional division.',
  },
  tiers: {
    leadership: 'Pamunuan ng Bayan',
    divisions: 'Mga Focal Person at Dibisyon',
    staff: 'Kawani',
  },
  leadership: {
    mayor: { role: 'Punong Bayan' },
    viceMayor: { role: 'Pangalawang Punong Bayan' },
  },
  oic: { role: 'Namamahalang Opisyal (OIC)' },
  divisions: {
    ebesa: { roles: ['ECCD Focal Person, Ugnayan sa LGU', 'IT Administrator, Tagapangalaga ng Ari-arian'] },
    sabellano: { roles: ['Job Order, Intake / Impormasyon ng Kliyente', 'IT Administrator'] },
    telen: { roles: ['SWA, Focal Person para sa Senior Citizen', 'Focal Person para sa PWD'] },
  },
  staff: {
    balabat: { roles: ['Focal Person para sa Solo Parent', 'Job Order, Pangongolekta ng Impormasyon ng Kliyente'] },
    galarita: { roles: ['Job Order, Pangongolekta ng Impormasyon ng Kliyente'] },
    velasco: { roles: ['Job Order, Klerk ng OSCA'] },
    sandoval: { roles: ['Job Order, KALAHI / MCT-CEF'] },
    anoba: { roles: ['Job Order, Focal Person para sa Kababaihan', 'KALAHI / MCT-CEF'] },
  },
},

  contact: {
    section: {
      eyebrow: 'MAKIPAG-UGNAYAN',
title: 'Contact Information',
subtitle: 'Para sa mga katanungan, reklamo, o kahilingan ng tulong, maaari kaming makontak sa pamamagitan ng alinman sa mga sumusunod na paraan.',
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
    form: {
  whatsNext: 'Ano ang Susunod?',
  whatsNextTitle: 'Mula sa iyong mensahe hanggang sa aming tugon',

  steps: {
    submit: {
      title: 'Pagsusumite',
      body: 'Punan ang form nang may kumpletong impormasyon hangga\'t maaari. Makakatanggap ka agad ng kumpirmasyon sa screen.'
    },

    review: {
      title: 'Pagsusuri',
      body: 'Ang iyong mensahe ay ipapadala sa kaukulang kawani ng MSWDO at itatala para sa kaukulang aksyon.'
    },

    reply: {
      title: 'Pagtugon',
      body: 'Maaari mong asahan ang aming tugon sa loob ng ilang araw o mas maaga kung agarang usapin.'
    },
  },

  privacyNote: 'Ang iyong personal na impormasyon ay mananatiling kumpidensyal at gagamitin lamang para sa pagproseso ng iyong kahilingan, alinsunod sa Data Privacy Act at R.A. 11032.',

  urgentCall: 'May agarang concern? Tumawag sa aming hotline.',

  heading: 'Magpadala ng Mensahe',

  subheading: 'Ang mga patlang na may (*) ay kinakailangang sagutan.',

  name: 'Pangalan',

  anonymousLabel: 'Magsumite nang hindi nagpapakilala',

  anonymousPlaceholder: 'Anonymous',

  namePlaceholder: 'ex. Juan Dela Cruz',

  nameError: 'Mangyaring ilagay ang iyong pangalan o piliin ang "Magsumite nang hindi nagpapakilala."',

  barangay: 'Barangay',

  barangaySelect: 'Pumili ng Barangay',

  barangayError: 'Kinakailangan ang Barangay.',
  barangayOther: "Other (not listed)",
  barangayOtherLabel: "Other",
  barangayOtherPlaceholder: "Enter your barangay or location",

  email: 'Email',

  optional: '(opsyonal)',

  mobile: 'Mobile Number',

  mobilePlaceholder: 'ex. 09171234567',

  contactError: 'Magbigay ng email o mobile number upang makapagpadala kami ng tugon.',

  mobileLengthError: 'Ang mobile number ay dapat may 11 digit.',

  contactHint: 'Magbigay ng kahit isang paraan ng pakikipag-ugnayan — email o mobile number.',

  subject: 'Paksa',

  subjectSelect: 'Pumili ng Paksa',

  subjectError: 'Mangyaring pumili ng paksa.',

  subjectOptions: {
    general: 'Pangkalahatang Katanungan',
    service: 'Kahilingan sa Serbisyo',
    feedback: 'Feedback',
    complaint: 'Reklamo laban sa Kawani',
    other: 'Iba pa',
  },

  message: 'Mensahe',

  messagePlaceholder: 'Paano kami makakatulong?',

  messageError: 'Mangyaring ilarawan ang iyong concern.',

  send: 'Ipadala ang Mensahe',

  formError: 'Mangyaring kumpletuhin muna ang mga kinakailangang field bago isumite ang form.',

  successTitle: 'Naipadala ang Mensahe!',

  successBody: 'Maraming salamat sa pakikipag-ugnayan. Tutugunan namin ang iyong mensahe sa lalong madaling panahon.',

  sendAnother: 'Magpadala ng Panibagong Mensahe',

  needDetails: 'Kailangan mo ba ang impormasyon ng aming tanggapan?',

  seeContactInfo: 'Tingnan ang Contact Information ↑',
},
  },
  footer: {
    tagline: 'Naglilingkod sa mga mamamayan ng Initao, Misamis Oriental nang may malasakit, integridad, at propesyonalismo sa paghahatid ng mga serbisyong panlipunan.',
    contactTitle: 'CONTACT INFORMATION',
    hoursTitle: 'Oras ng Tanggapan',
    hoursValue: 'Lunes – Biyernes, 8:00 AM – 5:00 PM',
    hoursNote: 'Sarado sa Weekends at Public Holidays',
    linksTitle: 'Quick Links',
    links: {
      home: 'Home',
      news: 'Mga Balita at Anunsyo',
      about: 'Tungkol sa Tanggapan',
      dswd: 'Opisyal na Website ng DSWD',
      municipal: 'Munisipal na Pamahalaan ng Initao',
    },
    copyright: '© {year} MSWDO Initao, Misamis Oriental. All Rights Reserved.',
  },
}