export interface CyberMeme {
  id: string;
  text: string;
  description: string;
  category: 'phishing' | 'passwords' | 'social' | 'mobile' | 'general';
  funnyFactor: number; // 1-5 scale
}

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: 'phishing' | 'passwords' | 'social' | 'mobile' | 'general';
  date: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trending: boolean;
  timestamp: Date;
  source: string;
}

export const cyberMemesData = {
  en: [
    {
      id: 'meme-en-1',
      text: 'Me: Uses "password123"\nHackers: "It\'s free real estate"',
      description: 'Weak password meme showing how easy it is for hackers',
      category: 'passwords' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-en-2',
      text: 'When you get a "You\'ve won $1M!" email\nMe: Doubt (X)',
      description: 'Suspicious email prize scam meme',
      category: 'phishing' as const,
      funnyFactor: 4
    },
    {
      id: 'meme-en-3',
      text: 'Public WiFi: "Free Internet!"\nHackers: "And I took that personally"',
      description: 'Public WiFi security risks meme',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-en-4',
      text: 'Software Update: "Install now?"\nMe: "Remind me later"\n*Gets hacked*\nMe: *Surprised Pikachu*',
      description: 'Software update procrastination meme',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-en-5',
      text: 'My password: "ILoveCats123!"\nHacker: "Thanks for the pet info and birth year"',
      description: 'Personal information in passwords meme',
      category: 'passwords' as const,
      funnyFactor: 4
    }
  ],
  zu: [
    {
      id: 'meme-zu-1',
      text: 'Mina: Ngisebenzisa "iphasiwedi123"\nAbagwebi: "Yimali yamahhala"',
      description: 'I-meme yephasiwedi elibuthakathaka ebonisa ukuthi kulula kangakanani kubagwebi',
      category: 'passwords' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-zu-2',
      text: 'Lapho uthola i-imeyili ethi "Uwine R1M!"\nMina: Ngiyangabaza (X)',
      description: 'I-meme yokukhwabanisa nge-imeyili yomklomelo osolisayo',
      category: 'phishing' as const,
      funnyFactor: 4
    },
    {
      id: 'meme-zu-3',
      text: 'I-WiFi Yomphakathi: "I-inthanethi yamahhala!"\nAbagwebi: "Futhi ngikuthathe kanzima"',
      description: 'I-meme yobungozi bokuphepha be-WiFi yomphakathi',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-zu-4',
      text: 'Ukubuyekezwa kweSofthiwe: "Faka manje?"\nMina: "Ngikhumbuze kamuva"\n*Ngithathwa ngabagwebi*\nMina: *I-Pikachu emangele*',
      description: 'I-meme yokulibazisa ukubuyekezwa kwesofthiwe',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-zu-5',
      text: 'Iphasiwedi lami: "NgiyazithandaAmakati123!"\nUmgwebi: "Ngiyabonga ngolwazi lwezilwane nezifiso nezinyanga zokuzalwa"',
      description: 'Ulwazi lomuntu siqu kumaphasiwedi meme',
      category: 'passwords' as const,
      funnyFactor: 4
    }
  ],
  xh: [
    {
      id: 'meme-xh-1',
      text: 'Mna: Ndisebenzisa "iphasiwedi123"\nAbaqhankqalazi: "Yimali yasimahla"',
      description: 'I-meme yephasiwedi ebuthathaka ebonisa ukuba kulula kangakanani kubaqhankqalazi',
      category: 'passwords' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-xh-2',
      text: 'Xa ufumana i-imeyili ethi "Uphumelele iR1M!"\nMna: Ndiyathandabuza (X)',
      description: 'I-meme yokuqhathakanya nge-imeyili yomvuzo osolisayo',
      category: 'phishing' as const,
      funnyFactor: 4
    },
    {
      id: 'meme-xh-3',
      text: 'I-WiFi Yoluntu: "I-intanethi yasimahla!"\nAbaqhankqalazi: "Kwaye ndiyithatha kanzima"',
      description: 'I-meme yemingcipheko yokhuseleko lwe-WiFi yoluntu',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-xh-4',
      text: 'Ukuhlaziywa kweSoftware: "Faka ngoku?"\nMna: "Ndikhumbuze kamva"\n*Ndithathwa ngabaqhankqalazi*\nMna: *I-Pikachu emangalisayo*',
      description: 'I-meme yokulibazisa ukuhlaziywa kwesoftware',
      category: 'general' as const,
      funnyFactor: 5
    },
    {
      id: 'meme-xh-5',
      text: 'Iphasiwedi yam: "NdiyazithandaIikati123!"\nUmqhankqalazi: "Enkosi ngolwazi lwezilwane kunye nonyaka wokuzalwa"',
      description: 'Ulwazi lomntu ngapakathi kumaphasiwedi meme',
      category: 'passwords' as const,
      funnyFactor: 4
    }
  ]
};

export const dailyTipsData = {
  en: [
    {
      id: 'tip-en-1',
      title: 'Two-Factor Authentication',
      content: 'Enable 2FA on all your important accounts. Even if someone gets your password, they still need your phone to access your account.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-en-2',
      title: 'Phishing Email Red Flags',
      content: 'Watch out for urgent language, spelling mistakes, suspicious sender addresses, and requests for personal information.',
      category: 'phishing' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-en-3',
      title: 'Strong Password Creation',
      content: 'Use a unique password for each account, make it at least 12 characters long, and include numbers, symbols, and both cases.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-en-4',
      title: 'Public WiFi Safety',
      content: 'Avoid accessing sensitive information on public networks. Use a VPN or mobile data for banking and important accounts.',
      category: 'general' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-en-5',
      title: 'Software Updates',
      content: 'Keep your devices and apps updated. Updates often include critical security patches that protect against new threats.',
      category: 'general' as const,
      date: new Date().toISOString()
    }
  ],
  zu: [
    {
      id: 'tip-zu-1',
      title: 'Ukuqinisekisa Kabili',
      content: 'Vumela i-2FA kuwo wonke ama-akhawunti akho abalulekile. Ngisho noma othile athola iphasiwedi lakho, asadinga ifoni yakho ukuze afinyelele i-akhawunti yakho.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-zu-2',
      title: 'Izibonakaliso Ze-Imeyili Yokukhwabanisa',
      content: 'Qaphela ulimi olusheshayo, amaphutha okubhala, amakheli omthumeli asolisayo, nezicelo zolwazi lomuntu siqu.',
      category: 'phishing' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-zu-3',
      title: 'Ukudala Iphasiwedi Eliqinile',
      content: 'Sebenzisa iphasiwedi elihlukile kwe-akhawunti ngayinye, lenze libe okungenani izinhlamvu ezingu-12, futhi lifake izinombolo, izimpawu, kanye nezinhlamvu ezinkulu nezincane.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-zu-4',
      title: 'Ukuphepha Kwe-WiFi Yomphakathi',
      content: 'Gwema ukufinyelela ulwazi olubucayi emanetwekini omphakathi. Sebenzisa i-VPN noma idatha yeselula yamabhange nama-akhawunti abalulekile.',
      category: 'general' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-zu-5',
      title: 'Ukubuyekezwa Kwesofthiwe',
      content: 'Gcina amadivaysi nezinhlelo zakho zisabukeziwe. Ukubuyekezwa kuvame ukufaka amalengiso abalulekile okuphepha avikela ezinsongelweni ezintsha.',
      category: 'general' as const,
      date: new Date().toISOString()
    }
  ],
  xh: [
    {
      id: 'tip-xh-1',
      title: 'Ukuqinisekisa Kabini',
      content: 'Vumela i-2FA kuzo zonke ii-akhawunti zakho ezibalulekileyo. Nokuba omnye umntu ufumana iphasiwedi yakho, usafuna ifoni yakho ukuze afikelele kwi-akhawunti yakho.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-xh-2',
      title: 'Izibonakaliso Ze-Imeyile Yokuqhatha',
      content: 'Qaphela ulwimi olungxamisekileyo, iimpazamo zokubhala, iidilesi zomthumeli ezikrokrelayo, nezicelo zolwazi lomntu.',
      category: 'phishing' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-xh-3',
      title: 'Ukudala Iphasiwedi Eqinileyo',
      content: 'Sebenzisa iphasiwedi eyahlukileyo kwi-akhawunti nganye, yenze ibe okungenani oonobumba abalishumi elinesibini, kwaye ufake amanani, iimpawu, kunye noonobumba abakhulu nabancinci.',
      category: 'passwords' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-xh-4',
      title: 'Ukhuseleko Lwe-WiFi Yoluntu',
      content: 'Phepha ukufikelela kulwazi olucacileyo kwiinetwekhi zoluntu. Sebenzisa i-VPN okanye idatha yeselula kwibhanki nakwii-akhawunti ezibalulekileyo.',
      category: 'general' as const,
      date: new Date().toISOString()
    },
    {
      id: 'tip-xh-5',
      title: 'Ukuhlaziywa Kwesoftware',
      content: 'Gcina izixhobo zakho nezicelo zisahlaziyiwe. Ukuhlaziywa kuhlala kubandakanya amalungiso abalulekileyo okhuseleko akhusela kwizoyikiso ezintsha.',
      category: 'general' as const,
      date: new Date().toISOString()
    }
  ]
};

export const securityAlertsData = {
  en: [
    {
      id: 'alert-en-1',
      title: 'WhatsApp Prize Scam Surge',
      description: 'Scammers are sending fake prize notifications claiming you\'ve won money or gifts. Never click suspicious links or share personal information.',
      severity: 'high' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Community Reports'
    },
    {
      id: 'alert-en-2',
      title: 'Banking SMS Phishing Wave',
      description: 'Increase in SMS messages claiming account issues or requesting verification. Banks never ask for PIN or passwords via SMS.',
      severity: 'critical' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Security Team'
    },
    {
      id: 'alert-en-3',
      title: 'Fake Job Offer Emails',
      description: 'Fraudulent job offers promising high pay for simple tasks. Always verify company legitimacy before sharing personal details.',
      severity: 'medium' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Community Reports'
    }
  ],
  zu: [
    {
      id: 'alert-zu-1',
      title: 'Ukwenyuka Kwesu Se-WhatsApp Yamabhonasi',
      description: 'Abakhohlisi bathumela izaziso zamabhonasi ezingamanga besithi unqobile imali noma izipho. Ungalokothi uclike izixhumanisi ezisola noma wabelane ngolwazi lomuntu siqu.',
      severity: 'high' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Imibiko Yomphakathi'
    },
    {
      id: 'alert-zu-2',
      title: 'Igagasi Le-SMS Yokukhwabanisa Lebhange',
      description: 'Kwenyuke imiyalezo ye-SMS ethi kunezinkinga ze-akhawunti noma icela ukuqinisekisa. Amabhange awayibuzi i-PIN noma amaphasiwedi nge-SMS.',
      severity: 'critical' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Ithimba Lokuphepha'
    },
    {
      id: 'alert-zu-3',
      title: 'Ama-Imeyili Weminikelo Yomsebenzi Engamanga',
      description: 'Iminikelo yomsebenzi enkohliso ethembisa ukuphakema kwehole ngemisebenzi elula. Hlala uqinisekisa ubuqiniso benkampani ngaphambi kokwabelana ngemininingwane yomuntu siqu.',
      severity: 'medium' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Imibiko Yomphakathi'
    }
  ],
  xh: [
    {
      id: 'alert-xh-1',
      title: 'Ukwenyuka Kwesu Se-WhatsApp Yamabhaso',
      description: 'Abaqhathi bathumela isaziso samabhaso angamanga besithi uphumelele imali okanye izipho. Ungaze ucofele amakhongolose arhanelayo okanye wabelane ngolwazi lomntu.',
      severity: 'high' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Iingxelo Zoluntu'
    },
    {
      id: 'alert-xh-2',
      title: 'Amaza E-SMS Yokuqhatha Yebhanki',
      description: 'Kwenyuke imiyalezo ye-SMS ethi kunengxaki zee-akhawunti okanye icela ukuqinisekisa. Iibhanki azibuzi i-PIN okanye amaphasiwedi nge-SMS.',
      severity: 'critical' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Iqela Lokhuseleko'
    },
    {
      id: 'alert-xh-3',
      title: 'Ii-Imeyile Zeminikelo Yomsebenzi Engamanga',
      description: 'Iminikelo yomsebenzi enkohliso ethembisa umvuzo ophezulu ngemisebenzi elula. Soloko uqinisekisa ubunyani benkampani ngaphambi kokwabelana ngeenkcukacha zomntu.',
      severity: 'medium' as const,
      trending: true,
      timestamp: new Date(),
      source: 'Iingxelo Zoluntu'
    }
  ]
};

// Helper functions
export function getDailyMemes(language: 'en' | 'zu' | 'xh'): CyberMeme[] {
  return cyberMemesData[language] || cyberMemesData.en;
}

export function getDailyTip(language: 'en' | 'zu' | 'xh'): DailyTip {
  const tips = dailyTipsData[language] || dailyTipsData.en;
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const tipIndex = dayOfYear % tips.length;
  return tips[tipIndex];
}

export function getTrendingAlerts(language: 'en' | 'zu' | 'xh'): SecurityAlert[] {
  return securityAlertsData[language] || securityAlertsData.en;
}
