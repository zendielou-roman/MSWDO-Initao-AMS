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
    placeholder: 'Pangita',
    noResults: 'Walay resulta para sa',
  },

  hero: {
    eyebrow: 'MAAYONG PAG-ABOT SA MSWDO INITAO',
    heading: 'Pag-atiman ug Pagtabang para sa Matag Initaonon',
    description: 'Ang Municipal Social Welfare and Development Office (MSWDO) sa Initao, Misamis Oriental nagpahinungod sa pagpauswag sa kaayohan sa atong komunidad pinaagi sa hingpit nga mga serbisyong pangkatawhan. Tumong namo ang paghatag og patas, matinud-anon, ug angay nga serbisyo aron mapalambo ang kalidad sa kinabuhi sa matag Initaohon. Naningkamot kami nga makahimo og suportadong palibot diin ang matag miyembro sa atong komunidad makaabot sa ilang kinatas-ang potensyal.',

    cta: {
      primary: 'Mga Serbisyo',
      secondary: 'Kontaka Kami',
    },

    stats: {
      beneficiaries: 'Mga Nabenepisyohan',
      programs: 'Aktibong mga Programa',
      barangays: 'Gisakupan nga mga Barangay',
      years: 'Katuigan sa Serbisyo',
    },
  },

  services: {

    filters: {
      all: 'TANAN',
      familyServices: 'SERBISYO PARA SA PAMILYA',
      childrenAndYouth: 'MGA BATA UG KABATAN-ONAN',
      personsWithDisabilities: 'TAWO NGA ADUNAY DISABILIDAD',
      seniorCitizens: 'MGA SENIOR CITIZEN',
      womensServices: 'SERBISYO PARA SA KABABAYEN-AN',
      livelihoodAssistance: 'TABANG SA PANGINABUHI',
      emergencyAssistance: 'TABANG SA EMERHENSYA',
      justiceAndRehabilitation: 'HUSTISYA UG REHABILITASYON',
    },

    section: {
      eyebrow: 'MGA GINATUMAN',
      title: 'Serbisyo sa Kaayuhang Panlipunan',
      subtitle: 'Mga Programa ug Serbisyo nga gidesinyo para sa pagsuporta ug pagpauswag sa labing bulnerable nga sektor sa atong komunidad.',
    },

    items: {

      aics: {
        title: 'AICS – Assistance to Individuals in Crisis Situations',
        desc: 'Tabang para sa mga indibidwal ug pamilya nga naeksperyensya og krisis sama sa medikal, lubong, edukasyon, ug emerhensya nga panginahanglan.',
        whoCanAvail: ['Mga residente nga naa sa krisis nga sitwasyon', 'Mga pobre nga indibidwal ug pamilya nga nanginahanglan og agaran nga suporta'],
        benefits: ['Pinansyal ug materyal nga tabang', 'Referral ngadto sa ubang serbisyong pangsuporta', 'Pag-assess ug follow-up base sa kaso'],
        requirements: ['Balido nga ID nga gikan sa gobyerno', 'Barangay certification o referral', 'Uban pang mga dokumento base sa kaso'],
        process: [
          { title: 'Pag-assess', body: 'Susihon sa social worker ang sitwasyon ug ang klase sa tabang nga gikinahanglan.' },
          { title: 'Dokumentasyon', body: 'Isumite sa aplikante ang gikinahanglan nga mga dokumento para sa verification.' },
          { title: 'Pag-apruba', body: 'Susihon sa empleyado ang kaso ug determinahon ang tabang nga ipagawas.' },
          { title: 'Pagpagawas', body: 'Ipagawas ang naaprubahan nga tabang pinaagi sa haom nga paagi.' },
        ],
        processingTime: 'Agaran nga pagpagawas o sagad sulod sa pipila ka adlaw depende sa kaso.',
        legalBasis: 'DSWD AICS Program Guidelines',
      },

      elderly: {
        title: 'Social Services for the Elderly',
        desc: 'Mga programa nga nagpauswag sa kaayohan, proteksyon, ug kahimsog sa mga senior citizen sa komunidad.',
        whoCanAvail: ['Mga senior citizen nga nagpuyo sa Initao', 'Mga tigulang nga nanginahanglan og tabang sosyal o proteksyon'],
        benefits: ['Access sa mga serbisyo sa suporta para sa senior citizen', 'Referral ngadto sa mga programa sa panglawas ug kaayuhan', 'Tabang sa pag-access sa mga naa nga benepisyo'],
        requirements: ['Balidong ID o pamatuod sa edad', 'Barangay certification o rekord sa residency', 'Suporting dokumento kung gikinahanglan para sa piho nga tabang'],
        process: [
          { title: 'Pagpaminaw', body: 'Ang kliyente mosumite og hangyo para sa tabang sa opisina.' },
          { title: 'Pag-assess', body: 'Susihon sa empleyado ang panginahanglan ug pagka-elehible sa kliyente.' },
          { title: 'Referral', body: 'I-refer ang kliyente ngadto sa haom nga serbisyo o programa.' },
        ],
        processingTime: 'Ang oras sa pagproseso magdepende sa klase sa serbisyo nga gihangyo.',
        legalBasis: 'Republic Act No. 9994',
      },

      womenWelfare: {
        title: 'Women Welfare Program',
        desc: 'Mga serbisyong pansuporta para sa mga kababaihan nga nanginahanglan, lakip ang counseling, referral, programa sa panginabuhi, ug serbisyong pamproteksyon.',
        whoCanAvail: ['Mga kababaihan', 'Mga babaye ug pamilya nga apektado sa abuso o krisis'],
        benefits: ['Counseling ug case management', 'Referral ngadto sa legal ug medikal nga suporta', 'Proteksyon ug follow-up nga tabang'],
        requirements: ['Inisyal nga report o referral', 'Balido nga ID kung naa', 'Dugang dokumento depende sa kaso'],
        process: [
          { title: 'Pagreport', body: 'Ireport sa kliyente o sa may kalabotan nga tawo ang sitwasyon.' },
          { title: 'Pag-assess', body: 'Susihon sa social worker ang kaso ug ang dinalian nga panginahanglan.' },
          { title: 'Interbensyon', body: 'Kordinahon sa MSWDO ang gikinahanglang tabang ug referral.' },
        ],
        processingTime: 'Agaran nga tubag para sa dinaliang mga kaso.',
        legalBasis: 'Republic Act No. 9262',
      },

      juvenileJustice: {
        title: 'Juvenile Justice Welfare Program',
        desc: 'Interbensyon ug serbisyo sa kaayohan para sa mga bata ug pamatan-on nga nalambigit sa legal o sosyal nga panagbangi.',
        whoCanAvail: ['Mga bata ug pamatan-on nga nasumpaki sa balaod', 'Mga pamilya ug ginikanan/tigbantay nga nanginahanglan og suportang pangkaayohan'],
        benefits: ['Case management', 'Referral ngadto sa legal ug rehabilitation nga suporta', 'Koordinasyon uban sa partner nga mga ahensya'],
        requirements: ['Referral o report', 'Birth certificate kung naa', 'Impormasyon sa ginikanan o tigbantay'],
        process: [
          { title: 'Referral', body: 'I-refer ang kaso ngadto sa MSWDO o partner nga ahensya.' },
          { title: 'Pag-assess', body: 'Maghimo ang social worker og inisyal nga pag-assess.' },
          { title: 'Suporta', body: 'Kordinahon sa MSWDO ang gikinahanglang interbensyon ug follow-up.' },
        ],
        processingTime: 'Iproseso base sa kadinali ug gikinahanglan sa kaso.',
        legalBasis: 'Republic Act No. 9344',
      },

      youthWelfare: {
        title: 'Youth Welfare Development Program',
        desc: 'Mga programa nga nagpokus sa kaayohan, kalamboan, ug paghatag og gahom sa mga batan-on sa komunidad.',
        whoCanAvail: ['Mga batan-on nga residente sa Initao', 'Mga batan-on nga nanginahanglan og giya o suporta sa kalamboan'],
        benefits: ['Suporta sa kalamboan', 'Referral ngadto sa mga programa para sa kabatan-onan', 'Giya ug tabang sa kaayohan'],
        requirements: ['Balido nga ID kung naa', 'Barangay certification o referral', 'Mubo nga pagpasabot sa gikinahanglang tabang'],
        process: [
          { title: 'Pangutana', body: 'Mohangyo ang kliyente og tabang o partisipasyon.' },
          { title: 'Pag-assess', body: 'Ilhon sa MSWDO ang haom nga programa sa suporta.' },
          { title: 'Pagparehistro', body: 'I-refer o iparehistro ang kliyente sa may kalabotan nga aktibidad.' },
        ],
        processingTime: 'Depende sa availability sa programa o schedule sa aktibidad.',
        legalBasis: 'Lokal nga mandato sa kaayohan ug kalamboan sa kabatan-onan',
      },

      sustainableLivelihood: {
        title: 'Sustainable Livelihood Program',
        desc: 'Skills training ug tabang sa panginabuhi para motabang sa mga pamilya nga makahimo o mapauswag ang oportunidad sa kita.',
        whoCanAvail: ['Mga pamilya nga ubos ang kita', 'Mga indibidwal o grupo nga interesado sa livelihood projects'],
        benefits: ['Skills training', 'Tabang sa panginabuhi', 'Monitoring ug mentoring nga tabang'],
        requirements: ['Barangay certification o pamatuod sa panginahanglan', 'Balido nga ID', 'Yano nga proposal sa livelihood kung applicable'],
        process: [
          { title: 'Orientation', body: 'Motambong ang mga kliyente og orientation bahin sa naa nga mga opsyon sa livelihood.' },
          { title: 'Aplikasyon', body: 'Isumite sa kliyente ang gikinahanglang mga dokumento ug requirements.' },
          { title: 'Training', body: 'Mag-undergo ang kliyente og training ug pag-andam sa proyekto.' },
          { title: 'Suporta', body: 'Ang naaprubahan nga livelihood projects makadawat og suporta ug monitoring.' },
        ],
        processingTime: 'Depende sa schedule sa training ug pagka-andam sa proyekto.',
        legalBasis: 'DSWD Sustainable Livelihood Program Guidelines',
      },

      pwdServices: {
        title: 'PWD Services',
        desc: 'Serbisyo para sa mga adunay disabilidad lakip ang pagparehistro, tabang, ug access sa mga benepisyo.',
        whoCanAvail: ['Mga residente sa Initao nga adunay disabilidad', 'Bag-o ug nag-renew nga mga aplikante sa PWD'],
        benefits: ['Pag-isyu og PWD ID', 'Access sa mga benepisyo ug pribilehiyo', 'Suporta sa mga transaksyon ug referral'],
        requirements: ['Bag-o nga litrato', 'Barangay certificate', 'Medical certificate o assessment kung gikinahanglan'],
        process: [
          { title: 'Aplikasyon', body: 'Isumite sa aplikante ang gikinahanglang porma ug dokumento.' },
          { title: 'Pag-assess', body: 'Susihon sa propesyunal ang disabilidad ug pagka-elehible.' },
          { title: 'Pag-isyu', body: 'Iproseso ang PWD ID ug may kalabotan nga suporta.' },
        ],
        processingTime: 'Kasagaran mahuman sulod sa pipila ka adlaw nga trabaho.',
        legalBasis: 'R.A. 10754',
      },

      childrenDisability: {
        title: 'Children with Disability Services',
        desc: 'Serbisyong pangsuporta para sa mga bata nga adunay disabilidad ug sa ilang mga pamilya.',
        whoCanAvail: ['Mga bata nga adunay disabilidad', 'Mga ginikanan ug tigbantay nga nangita og serbisyo sa suporta'],
        benefits: ['Tabang sa referral', 'Access sa mga serbisyo nga may kalabotan sa disabilidad', 'Giya sa pamilya ug follow-up'],
        requirements: ['Medical assessment o referral', 'Birth certificate o pamatuod sa edad', 'Identipikasyon sa ginikanan o tigbantay'],
        process: [
          { title: 'Referral', body: 'I-refer ang kaso ngadto sa haom nga opisina.' },
          { title: 'Pag-assess', body: 'Susihon sa MSWDO ang panginahanglan sa bata.' },
          { title: 'Suporta', body: 'I-link ang pamilya sa may kalabotan nga serbisyo ug programa.' },
        ],
        processingTime: 'Depende sa availability sa assessment ug referral.',
        legalBasis: 'Mga balaod sa PWD ug kaayohan sa bata',
      },

      eccdp: {
        title: 'ECCDP – Early Childhood Care and Development Program',
        desc: 'Mga programa nga nagpokus sa sayo nga pag-atiman, kalamboan, ug kaayohan sa gagmayng bata.',
        whoCanAvail: ['Mga ginikanan ug tigbantay sa gagmayng bata', 'Mga pamilya nga nanginahanglan og suporta sa sayong pagkabata'],
        benefits: ['Suporta sa kalamboan', 'Referral ngadto sa mga serbisyo sa sayong pagkabata', 'Suporta ug edukasyon para sa pamilya'],
        requirements: ['Birth certificate o pamatuod sa edad', 'Barangay certification kung gikinahanglan', 'Mubo nga hangyo sa tabang'],
        process: [
          { title: 'Pagparehistro', body: 'Magparehistro ang pamilya sa programa o mohangyo og tabang.' },
          { title: 'Pag-assess', body: 'Susihon sa MSWDO ang panginahanglan sa bata ug naa nga mga serbisyo.' },
          { title: 'Suporta', body: 'I-refer ang pamilya sa haom nga serbisyo sa sayong pagkabata.' },
        ],
        processingTime: 'Depende sa availability sa schedule sa serbisyo.',
        legalBasis: 'Mga polisiya sa kalamboan sa bata sa sayong panuigon',
      },

      familyDevelopment: {
        title: 'Family Development Service',
        desc: 'Serbisyo sa suporta nga nagtumong sa pagpalig-on sa mga pamilya ug pagpauswag sa kaayohan sa komunidad.',
        whoCanAvail: ['Mga pamilya nga nanginahanglan og suporta', 'Mga ginikanan ug miyembro sa panimalay nga nangita og giya'],
        benefits: ['Family strengthening sessions', 'Counseling ug giya', 'Referral ngadto sa may kalabotan nga serbisyo sa suporta'],
        requirements: ['Mubo nga hangyo sa suporta', 'Barangay o impormasyon sa referral kung naa'],
        process: [
          { title: 'Orientation', body: 'Motambong ang pamilya og orientation bahin sa naa nga mga serbisyo.' },
          { title: 'Pag-assess', body: 'Hisgutan sa MSWDO ang panginahanglan ug kabalaka sa pamilya.' },
          { title: 'Interbensyon', body: 'I-link ang pamilya sa haom nga serbisyo ug suporta.' },
        ],
        processingTime: 'Magkalahi depende sa serbisyo nga gihangyo.',
        legalBasis: 'Mga polisiya sa kaayohan ug kalamboan sa pamilya',
      },

      paroleProbation: {
        title: 'Parole and Probation Program',
        desc: 'Serbisyo sa kaayohan ug suporta para sa mga kliyente nga naa sa ilalom sa parole o probation.',
        whoCanAvail: ['Mga kliyente nga naa sa ilalom sa parole o probation', 'Mga pamilya sa kliyente nga nanginahanglan og serbisyo sa suporta'],
        benefits: ['Suporta sa pag-monitor sa kaso', 'Referral ngadto sa mga serbisyo sa komunidad', 'Tabang sa reintegration'],
        requirements: ['Referral o dokumento nga may kalabotan sa korte', 'Mga dokumento sa identipikasyon', 'Suporting papeles kung naa'],
        process: [
          { title: 'Referral', body: 'I-refer ang kaso ngadto sa opisina para sa suporta.' },
          { title: 'Pag-assess', body: 'I-assess sa MSWDO ang panginahanglan ug sitwasyon sa kliyente.' },
          { title: 'Follow-up', body: 'Tabangan ang kliyente sa pag-monitor ug serbisyo sa suporta.' },
        ],
        processingTime: 'Depende sa kaso sa kliyente ug naa nga serbisyo sa suporta.',
        legalBasis: 'Mga giya sa administrasyon sa parole ug probation',
      },

      preMarriage: {
        title: 'Pre-marriage Orientation and Counseling',
        desc: 'Giya ug serbisyo sa counseling aron matabangan ang mga magtiayon nga mangandam para sa kaminyoon ug kinabuhi sa pamilya.',
        whoCanAvail: ['Mga magtiayon nga nangandam para sa kaminyoon', 'Mga indibidwal nga nangita og premarital nga giya'],
        benefits: ['Premarital counseling', 'Giya sa pagka-andam sa pamilya', 'Suporta sa pagtukod og himsog nga relasyon'],
        requirements: ['Pagparehistro o hangyo sa appointment', 'Balido nga ID kung gikinahanglan'],
        process: [
          { title: 'Pagparehistro', body: 'Magparehistro o mohangyo ang magtiayon og orientation session.' },
          { title: 'Counseling', body: 'Maghatag ang social worker og giya ug diskusyon.' },
          { title: 'Follow-up', body: 'Makadawat ang magtiayon og dugang giya kung gikinahanglan.' },
        ],
        processingTime: 'Iiskedyul base sa naa nga counseling session.',
        legalBasis: 'Serbisyo sa counseling sa pamilya ug kaminyoon',
      },

      soloParent: {
        title: 'Solo-parent Welfare Program',
        desc: 'Serbisyo sa suporta ug pribilehiyo para sa mga solo parent aron matabangan sila sa pag-atiman sa ilang mga anak ug pamilya.',
        whoCanAvail: ['Mga solo parent nga nagpuyo sa Initao', 'Mga ginikanan nga nag-atiman og bata nga nag-inusara tungod sa sirkumstansya sa pamilya'],
        benefits: ['Access sa serbisyo sa suporta para sa solo parent', 'Referral ngadto sa tabang sa panginabuhi ug edukasyon', 'Giya ug tabang sa pag-avail sa mga benepisyo'],
        requirements: ['Barangay certification', 'Pamatuod sa status isip solo parent', 'Balido nga ID ug suporting dokumento'],
        process: [
          { title: 'Aplikasyon', body: 'Isumite sa solo parent ang requirements sa opisina.' },
          { title: 'Pag-assess', body: 'Susihon sa MSWDO ang aplikasyon ug pagka-elehible.' },
          { title: 'Suporta', body: 'I-link ang kliyente sa naa nga mga programa ug tabang.' },
        ],
        processingTime: 'Kasagaran maproseso sulod sa pipila ka adlaw nga trabaho.',
        legalBasis: 'R.A. 8972',
      },
    },

    detail: {
      whoCanAvail: 'Kinsa ang pwede mo-avail',
      whatYouGet: 'Unsay imong madawat',
      requirements: 'Mga Requirements',
      howToApply: 'Pag-apply',
      processingTime: 'Oras sa Pagproseso',
      legalBasis: 'Legal nga Basehanan',
      applyInPerson: 'Mag-apply Personal',
      getDirections: 'Impormasyon sa Pag-kontak',
      backToServices: 'Balik sa mga Serbisyo',
      notFoundTitle: 'Wala makit-i ang serbisyo',
      notFoundDesc: "Ang serbisyo nga imong gipangita wala na o mahimong nabalhin.",
    },

    card: {
      learnMore: 'Alamon pa',
    },
  },

  charter: {
    section: {
      eyebrow: 'STANDARD SA SERBISYO',
      title: "CITIZEN'S CHARTER",
      subtitle: 'Among gipasalig nga mohatag og kalidad, episyente, ug mapuslanong serbisyo sa kaayohan sa matag Initaonon.',
    },
    standards: {
      commitment: {
        title: 'Pasalig sa Serbisyo',
        text: 'Nagpasalig kami nga mohatag og serbisyo sulod sa gitakda nga oras sa pagproseso ug siguraduhon nga ang matag kliyente pagatratahon nga may dignidad ug respeto.',
      },

      processingTime: {
        title: 'Oras sa Pagproseso',
        text: 'Ang yano nga mga transaksyon kasagaran mahuman dayon, samtang ang komplikado ug taas-teknikal nga mga transaksyon mahimong magkinahanglan og dugang oras para sa insakto nga pagrepaso ug pagproseso.',
      },
      documentary: {
        title: 'Mga Documentary Requirement',
        text: 'Ang mga dokumento nga gikinahanglan lang sumala sa giya sa DILG ug DSWD maoy hangyoon. Walay dugang dokumento gawas sa gitakda sa balaod.',
      },
      zeroContact: {
        title: 'Zero Contact Policy',
        text: 'Ang among opisina istrikto nga nagsunod sa Zero Contact Policy. Gidili ang mga frontline staff sa pagpangayo og regalo o uban pang konsiderasyon.',
      },
    },
    services: {
      scsr: {
        title: 'Pag-isyu sa Social Case Study Report',
        time: '1 ka adlaw nga trabaho',
        fee: 'Walay bayad',
        requirements: [
          'Barangay Certification',
          "Certification sa Municipal Assessor",
          'Community Tax Certificate (Cedula)',
          'Intake Form',
          'SCSR Request',
          'Medical Abstract / Hospital Bill',
        ],
        process: [
          'Pagparehistro, isulat sa kliyente ang iyang ngalan sa logbook.',
          'Interview/Intake sa kliyente, o sa pinakaduol nga paryente nga nakaila pag-ayo sa kliyente, motubag sa mga pangutana sa interviewer.',
          'Ang empleyado maghimo og one-on-one nga interview sa kliyente aron makuha ang importanteng impormasyon. Ang resulta sa interview isulat sa Intake Form.',
          'Pag-andam sa SCSR.',
          'Madawat sa kliyente ang iyang kopya sa SCSR.',
        ],
      },
      indigency: {
        title: 'Pag-isyu sa Certificate of Indigency',
        time: '1 ka adlaw nga trabaho',
        fee: 'Walay bayad',
        requirements: [
          'Barangay Certification',
          "Certification sa Municipal Assessor",
          'Community Tax Certificate (Cedula)',
        ],
        process: [
          'Pagparehistro, isulat sa kliyente ang iyang ngalan sa logbook.',
          'Interview/Intake sa kliyente, o sa pinakaduol nga paryente nga nakaila pag-ayo sa kliyente, motubag sa mga pangutana sa interviewer.',
          'Ang empleyado maghimo og one-on-one nga interview sa kliyente aron makuha ang importanteng impormasyon. Ang resulta sa interview isulat sa Intake Form.',
          'Pag-andam sa Certification.',
          'Repasoha ug pirmahi ang certification.',
          'Madawat sa kliyente ang iyang kopya sa certification.',
        ],
      },
      assistance: {
        title: 'Pag-avail sa Financial/Medical/Funeral Assistance',
        time: '1 ka adlaw nga trabaho',
        fee: 'Walay bayad',
        requirements: [
          'Barangay Certification',
          'Photocopy sa Death Certificate',
          'Identification Card',
          'Pamatuod sa Gikinahanglan nga Tabang',
          'Intake Form',
        ],
        process: [
          'Pagparehistro, isulat sa kliyente ang iyang ngalan sa logbook.',
          'Interview/Intake sa kliyente, o sa pinakaduol nga paryente nga nakaila pag-ayo sa kliyente, motubag sa mga pangutana sa interviewer.',
          'Ang empleyado maghimo og one-on-one nga interview sa kliyente aron makuha ang importanteng impormasyon. Ang resulta sa interview isulat sa Intake Form.',
          'Pag-andam sa tabang nga ihatag uban ang pag-apruba sa Office Head.',
          'Madawat sa kliyente ang iyang tabang.',
        ],
      },
      pmoc: {
        title: 'Pag-isyu sa PMOC Certificate',
        time: '1 ka adlaw nga trabaho',
        fee: 'Gamay nga Bayad',
        requirements: [],
        process: [
          'Pagparehistro, isulat sa kliyente ang iyang ngalan sa logbook.',
          'Pun-a ang Marriage Inventory Form.',
          'Motambong sa gi-iskedyul nga petsa ug oras.',
          'Pagpahigayon sa PMOC.',
          'Bayad sa PMOC Certificate.',
          'Pag-andam sa Certificate.',
          'Madawat sa magtiayon ang PMOC certificate.',
        ],
      },
      counseling: {
        title: 'Pag-avail sa Counseling/Consultation',
        time: '1 ka adlaw nga trabaho',
        fee: 'Walay bayad',
        requirements: ['Intake Form'],
        process: [
          'Pagparehistro, isulat sa kliyente ang iyang ngalan sa logbook.',
          'I-refer ang kliyente para sa counseling/consultation.',
          'Pagpahigayon sa counseling/consultation.',
        ],
      },
    },
    detail: {
      requirementsLabel: 'MGA REQUIREMENT',
      processLabel: 'PROSESO',
    },
    arta: {
      title: 'Pagsunod sa Anti-Red Tape Authority (ARTA)',
      description: 'Sumala sa R.A. 11032 (Ease of Doing Business and Efficient Government Service Delivery Act), gisiguro sa kining opisinaha nga ang tanang frontline nga serbisyo ihatag dayon, matinahoron, ug walay dili kinahanglan nga kabug-at sa among mga kliyente.',
      viewFullCharter: 'Buo nga Charter',
    },
  },

  accomplishments: {
    section: {
      eyebrow: 'BASE SA NUMERO',
      title: 'Mga Nahimo ug Award',
      subtitle: 'Klaro nga resulta sa among pasalig sa kaayohan sosyal ug kalamboan sa komunidad sa Initao, Misamis Oriental.',
    },
    stats: {
      beneficiaries: 'Mga Nabenepisyohan',
      programs: 'Nahuman nga mga Programa',
      barangays: 'Naabot nga mga Barangay',
      years: 'Katuigan sa Serbisyo',
    },
    milestonesLabel: 'Bag-ong mga Milestone',
    showMore: 'Ipakita pa ang mga nahimo',
    showLess: 'Ipakita og gamay',
    readMore: 'Alamon pa',
    close: 'Sirad-i',
    items: {
      centenariansAct: {
        title: 'Expanded Centenarians Act (RA 11982)',
        desc: "Laing batch sa mga octogenarian ug nonagenarian nakadawat sa ilang ₱10K cash gift gikan sa National Commission of Senior Citizens (NCSC). Ang LCE sa LGU Initao, Hon. Mayor Mercy Grace J. Acain, mitambong sa okasyon, nagpahayag og pasalamat sa 51 ka benepisyaryo nga nakaabot sa mahinungdanong edad ug sa ilang mga pamilya tungod sa ilang suporta.",
      },
      sfpAward: {
        title: 'DSWD Certificate of Accomplishment — SFP',
        desc: 'Ang LGU Initao gi-rekognisar sa DSWD Field Office X tungod sa iyang labaw sa kasagaran nga implementasyon sa 14th Cycle (2024) Supplementary Feeding Program, nga nakab-ot ang 92.31% nga pagpauswag sa timbang ug naserbisyohan ang 100% sa target nga benepisyaryo — usa ka lig-on nga pasalig sa nutrisyon ug kaayohan sa bata sa Region X. Gihatag niadtong Hunyo 17, 2025 sa Pearlmont Hotel, Cagayan de Oro City.',
      },
      zeroHunger: {
        title: 'Zero Hunger Assistance',
        desc: 'Naghatag og food pack sa 1,200 ka pobre nga pamilya panahon sa kalamidad ug krisis.',
      },
      slpMicroenterprise: {
        title: 'SLP Microenterprise Track',
        desc: 'Gisuportahan ang 145 ka Pantawid Pamilya nga benepisyaryo sa paglunsad og gagmayng livelihood enterprise.',
      },
      childProtection: {
        title: 'Child Protection Campaign',
        desc: 'Nagpahigayon og mga aktibidad sa pagpahibalo sa komunidad bahin sa pagpugong sa abuso sa bata sa tanang 18 ka barangay.',
      },
      pwdEmpowerment: {
        title: 'PWD Empowerment Program',
        desc: 'Naghatag og assistive device ug skills training sa 320 ka persona nga adunay disabilidad.',
      },
      cashForWork: {
        title: 'DSWD KC Cash-for-Work Payout',
        desc: "Kulminasyon ug payout sa DSWD KALAHI-CIDSS (KC) Cash-for-Work Program para sa mga graduate ug graduating student sa Initao. Sa ngalan sa LGU Initao, pangulohan ni Hon. Mayor Gagay Acain, among matinud-anong pasalamat sa DSWD Team nga gipangulohan ni Engr. Abo Tocalo ug Ma'am Arline Pacudan — ug labi na kang Sir Al Orerbil tungod sa pagpadali niini nga grant.",
      },
    },
  },

  news: {
    placeholder: 'Pagpili og announcement gikan sa listahan aron mabasa ang bug-os nga bulletin. Padayon nga masayod sa pinakabag-ong mga programa sa kaayohan sosyal, relief operations, ug mga kalihokan sa komunidad.',
    readLatest: 'Basaha ang pinakabag-ong update',
    section: {
      eyebrow: 'PINAKABAG-O',
      title: 'Balita ug mga Update',
      subtitle: 'Bag-ong mga pahibalo, advisory, ug recap sa mga event gikan sa MSWDO Initao.',
    },

    readMore: 'Alamon pa',
    viewAll: 'Tan-awa ang tanang balita',
    categories: {
      relief: 'Relief',
      health: 'Panglawas',
      pension: 'Pensyon',
      youth: 'Kabatan-onan',
    },
    items: {
      foodRelief: {
        title: 'Emerhensya nga Pagpanghatag og Food Relief para sa mga Apektado sa Baha',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus nisi quis tempor blandit. Praesent feugiat est at leo accumsan venenatis at in ligula. Suspendisse potenti. Nullam venenatis ultrices porta. Proin convallis interdum ligula id dictum. Curabitur non aliquam nunc. Sed mattis, ipsum nec aliquet fermentum, diam ipsum varius tortor, sed blandit odio justo vitae risus. \nNulla sed convallis dolor, nec aliquet magna. Suspendisse cursus nec turpis vel feugiat. Sed accumsan lorem nulla, vel interdum dolor sodales sed. Duis felis lacus, commodo ac risus ac, lobortis blandit orci. Donec vitae sem blandit, placerat purus lacinia, lobortis ex. Pellentesque pharetra consectetur mattis. Nunc elementum neque nisi, a faucibus eros accumsan a. Donec ut odio facilisis, vehicula metus et, accumsan tortor. Donec consectetur nec nibh a facilisis. Vivamus eget augue leo. In hac habitasse platea dictumst. Ut aliquet, ligula in viverra luctus, enim lacus pulvinar ex, vel tristique enim eros vitae lacus. Curabitur accumsan tellus a eleifend hendrerit. Nulla pulvinar blandit metus, non dapibus orci commodo non. Maecenas laoreet in tellus at euismod.\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus aliquam massa orci, eget semper tortor auctor et. Aliquam sed nulla eget elit auctor consectetur. Sed suscipit rhoncus imperdiet. Integer viverra rutrum nunc. Ut viverra, metus ac rutrum interdum, nisi mi malesuada enim, id pretium ante odio et mi. Praesent mollis leo in tincidunt suscipit. Pellentesque commodo laoreet arcu ut ultricies. Donec porttitor velit a placerat consequat. Integer ullamcorper gravida urna, faucibus efficitur enim congue vel. Vivamus non ex rhoncus nunc aliquet tempus nec quis felis.\nMaecenas auctor porta efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam sodales sed sapien nec vulputate. Pellentesque scelerisque bibendum risus, sed efficitur quam elementum vitae. Duis iaculis sem id vulputate tristique. Ut rutrum enim et sapien pharetra sollicitudin. Pellentesque in ipsum est. Praesent semper diam mi, eu cursus augue sodales at. Sed id leo vitae mauris pulvinar aliquet in ut tortor.',
      },
      medicalMission: {
        title: 'Libre nga Medical ug Dental Mission sa Barangay Jampason',
        excerpt: 'Sa pakigtambayayong sa Municipal Health Office, ang medical ug dental mission nakaserbisyo sa kapin 300 ka residente.',
      },
      socialPension: {
        title: 'Social Pension Payout para sa mga Pobre nga Senior Citizen — 2nd Quarter 2026',
        excerpt: 'Total nga 412 ka pobre nga senior citizen nakadawat sa ilang 2nd quarter social pension.',
      },
      cashForWork: {
        title: 'DSWD KC Cash-for-Work Payout para sa mga Graduate sa Initao',
        excerpt: 'Mga graduate ug graduating student nakadawat sa ilang Cash-for-Work grant.',
      },
    },
  },

  operations: {
    section: {
      eyebrow: 'NAA SA GROUND',
      title: 'Aktibong mga Operasyon',
      subtitle: "Mga programa nga among gipadagan karon ug ang mga inisyatiba nga umaabot para moserbisyo sa Initao.",
    },
    filters: {
      all: 'Tanan',
      ongoing: 'Nagpadayon',
      planned: 'Giplano',
    },
    viewAll: 'Tan-awa ang tanang programa',
    items: {
      slp: {
        title: 'Sustainable Livelihood Program — Skills Training',
        location: 'Municipal Hall, Initao',
        beneficiaries: '120 ka partisipante',
        desc: 'Hands-on nga vocational training sa dressmaking, welding, ug food processing aron matabangan ang mga pamilya nga makahimo og malahutayong kita.',
      },
      feeding: {
        title: 'Supplementary Feeding Program — 15th Cycle',
        location: '24 ka Day Care Center',
        beneficiaries: '1,050 ka bata',
        desc: 'Adlaw-adlaw nga nutrisyoso nga pagkaon para sa mga bata sa day care aron mapauswag ang nutritional status ug maminusan ang malnutrisyon sa tanang barangay.',
      },
      seniorCaravan: {
        title: 'Senior Citizens Wellness & Mobility Caravan',
        location: 'Rotasyon sa Barangay',
        beneficiaries: '600+ ka senior',
        desc: 'Umaabot nga caravan gikan sa barangay ngadto sa barangay nga naghatag og health check, mobility aid, ug tabang sa pensyon para sa mga tigulang.',
      },
      pwdDevices: {
        title: 'Pagpanghatag og Assistive Device para sa PWD',
        location: 'Opisina sa MSWDO',
        beneficiaries: '85 ka PWD',
        desc: 'Pagpanghatag og wheelchair, bangkong, ug hearing aid sa naparehistro nga persona nga adunay disabilidad sa munisipyo.',
      },
    },
  },

  about: {

    section: {
      eyebrow: 'KINSA KAMI',
      title: 'Mahitungod sa MSWDO',
      subtitle: 'Ang bisyon, misyon, ug mga mandato sa balaod nga naggiya sa among trabaho sa pag-alagad sa katawhan sa Initao.',
    },

    vision: 'Naghatag-gahom nga mga indibidwal, pamilya ug komunidad nga adunay pauswag nga kalidad sa kinabuhi, nga nagatuman sa ilang gipaabot nga tahas ug makahimo sa pag-mobilize og resources aron matagbaw ang ilang batakang panginahanglan.',
    mission: 'Pag-atiman, pagproteksyon, pagrehabilitar, pagpalambo ug pag-integrate ngadto sa mainstream sa mga bulnerable ug sosyal nga dysfunctional nga sektor sa katilingban.',
    visionLabel: 'Among Bisyon',
    missionLabel: 'Among Misyon',
    mandatesLabel: 'Gimandato sa Balaod',
    mandatesTitle: 'Among mga Mandato',
  },

  organization: {
    section: {
      eyebrow: 'ISTRUKTURA SA OPISINA',
      title: 'Organizational Chart',
      subtitle: 'Ang hierarchy sa organisasyon sa MSWDO Initao nga nagpakita sa office leadership ug functional divisions.',
    },
    tiers: {
      leadership: 'Municipal Leadership',
      divisions: 'Focal Persons ug Divisions',
      staff: 'Staff',
    },
    leadership: {
      mayor: { role: 'Mayor' },
      viceMayor: { role: 'Vice-Mayor' },
    },
    oic: { role: 'Officer-in-Charge' },
    divisions: {
      ebesa: { roles: ['ECCD Focal Person, LGU Link', 'IT Administrator, Property Custodian'] },
      sabellano: { roles: ['Job Order, Intake / Client Info', 'IT Administrator'] },
      telen: { roles: ['SWA, Senior Citizen Focal Person', 'PWD Focal Person'] },
    },
    staff: {
      balabat: { roles: ['Solo Parent Focal', 'Job Order, Client Info Gathering'] },
      galarita: { roles: ['Job Order, Client Info Gathering'] },
      velasco: { roles: ['Job Order, OSCA Clerk'] },
      sandoval: { roles: ['Job Order, KALAHI / MCT-CEF'] },
      anoba: { roles: ['Job Order, Women Focal Person', 'KALAHI / MCT-CEF'] },
    },
  },

  contact: {
    section: {
      eyebrow: 'PAKIGKITA KANAMO',
      title: 'Impormasyon sa Kontak',
      subtitle: 'Para sa mga pangutana, reklamo, o tabang, kontaka ang MSWDO Initao pinaagi sa bisan unsa sa mga channel sa ubos.',
    },
    getDirections: 'Kuhaa ang Direksyon',
    complaint: {
      title: 'Pagsumite og Reklamo o Feedback',
      description:
        'Sumala sa R.A. 11032, ang mga kliyente pwede mag-file og reklamo batok sa mga empleyado sa MSWDO tungod sa mga buhat sa pagkawalay-pagtahod, ineptensya, o paglangan sa serbisyo. I-klik dinhi aron isumite ang imong reklamo o feedback.',
    },
    details: {
      addressLabel: 'Address sa Opisina',
      telephoneLabel: 'Telepono',
      emailLabel: 'Email',
      hoursLabel: 'Oras sa Opisina',
      facebookLabel: 'Facebook Account',
    },
    info: {
      addressLine1: 'Municipal Hall, Jampason',
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
      whatsNext: 'Unsay sunod nga mahitabo',
      whatsNextTitle: 'Gikan sa imong mensahe ngadto sa among tubag',
      steps: {
        submit: { title: 'Ikaw mosumite', body: 'Pun-a ang form sa kutob sa imong mahimong detalye ug makadawat dayon og on-screen nga kumpirmasyon.' },
        review: { title: 'Among repasohon', body: 'Madawat ang imong mensahe sa opisina ug ilogsa para sa follow-up.' },
        reply: { title: 'Makadawat ka og tubag', body: 'Paabuta ang tubag sulod sa pipila ka adlaw nga trabaho o dali kung dinalian ang kabalaka.' },
      },
      privacyNote: 'Ang imong mga detalye kumpidensyal ug gamiton lamang sa pagproseso sa imong hangyo, subay sa Data Privacy Act ug R.A. 11032.',
      urgentCall: 'Dinalian? Tawagi dayon ang hotline',
      heading: 'Padad-i Kami og Mensahe',
      subheading: 'Ang mga gikinahanglan nga field gimarkahan',
      tagline: "Para sa mga pangutana, reklamo, hangyo, o feedback.",
      name: 'Ngalan',
      anonymousLabel: 'Isumite nga anonymous',
      anonymousPlaceholder: 'Anonymous',
      namePlaceholder: 'e.g. Juan Dela Cruz',
      nameError: 'Palihug isulat ang imong ngalan, o i-check ang "Submit anonymously."',
      barangay: 'Barangay',
      barangaySelect: 'Pilia ang barangay',
      barangayError: 'Gikinahanglan ang barangay.',
      barangayOther: "Uban pa (wala sa listahan)",
      barangayOtherLabel: "Uban pa",
      barangayOtherPlaceholder: "Isulat ang imong barangay o lokasyon",
      email: 'Email',
      optional: '(optional)',
      mobile: 'Numero sa Cellphone',
      mobilePlaceholder: 'e.g. 09171234567',
      contactError: 'Paghatag og email o mobile number aron makatubag kami.',
      mobileLengthError: 'Ang mobile number kinahanglan 11 ka digit ang gitas-on.',
      contactHint: 'Paghatag og labing menos usa ka paagi para makontak ka — email o mobile number.',
      subject: 'Subject',
      subjectSelect: 'Pilia ang topiko',
      subjectError: 'Palihug pilia ang topiko.',
      subjectOptions: {
        general: 'Kinatibuk-ang pangutana',
        service: 'Hangyo sa Serbisyo',
        feedback: 'Feedback',
        complaint: 'Reklamo batok sa empleyado',
        other: 'Uban pa',
      },
      message: 'Mensahe',
      messagePlaceholder: 'Unsaon namo ikaw pagtabang?',
      messageError: 'Palihug ihulagway ang imong kabalaka.',
      send: 'Ipadala ang Mensahe',
      formError: 'Palihug hompleta ang gikinahanglan nga mga field sa ibabaw una mosumite.',
      successTitle: 'Napadala na ang Mensahe!',
      successBody: 'Salamat sa imong pagkontak. Motubag kami sa labing dali nga panahon.',
      sendAnother: 'Pagpadala og laing mensahe',
      needDetails: 'Kinahanglan ang detalye sa among opisina?',
      seeContactInfo: 'Tan-awa ang impormasyon sa kontak ↑',
    },

  },

  footer: {
    tagline: 'Nag-alagad sa mga lumulupyo sa Initao, Misamis Oriental uban ang kaluoy, integridad, ug propesyunalismo sa paghatud sa serbisyo sa kaayohan sosyal.',
    contactTitle: 'Impormasyon sa Kontak',
    hoursTitle: 'Oras sa Opisina',
    hoursValue: 'Lunes – Biyernes, 8:00 AM – 5:00 PM',
    hoursNote: 'Sirado sa Weekend & Public Holiday',
    linksTitle: 'Dali nga mga Link',
    links: {
      home: 'Panimalay',
      news: 'Balita ug mga Pahibalo',
      about: 'Mahitungod sa Opisina',
      dswd: 'Opisyal nga Website sa DSWD',
      municipal: 'Gobyerno sa Munisipyo sa Initao',
    },
    copyright: '© {year} MSWDO Initao, Misamis Oriental. Tanang katungod gigahin.',
  },
}