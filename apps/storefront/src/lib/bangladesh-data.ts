/**
 * Bangladesh Localization Data & Validation Rules
 * Designed for Green Dreams Plant eCommerce MVP
 */

export interface MobileOperator {
  prefix: string
  name: string
  brandColor: string
}

export const BANGLADESH_OPERATOR_PREFIXES: Record<string, string> = {
  '013': 'Grameenphone',
  '017': 'Grameenphone',
  '014': 'Banglalink',
  '019': 'Banglalink',
  '018': 'Robi',
  '016': 'Airtel',
  '015': 'Teletalk',
}

/**
 * 35+ Primary Dhaka Metropolitan Delivery Areas
 */
export const DHAKA_CITY_AREAS = [
  'Mirpur (মিরপুর)',
  'Dhanmondi (ধানমন্ডি)',
  'Gulshan 1 & 2 (গুলশান)',
  'Banani (বনানী)',
  'Uttara (উত্তরা)',
  'Mohammadpur (মোহাম্মদপুর)',
  'Mohakhali / DOHS (মহাখালী)',
  'Badda / Merul Badda (বাড্ডা)',
  'Bashundhara R/A (বসুন্ধরা)',
  'Baridhara & DOHS (বারিধারা)',
  'Rampura / Banasree (বনশ্রী)',
  'Khilgaon / Goran (খিলগাঁও)',
  'Malibagh / Mouchak (মালিবাগ)',
  'Shantinagar / Kakrail (শান্তিনগর)',
  'Motijheel / Dilkusha (মতিঝিল)',
  'Old Dhaka / Lalbagh (পুরান ঢাকা)',
  'Tejgaon / Farmgate (তেজগাঁও)',
  'Shyamoli / Kalyanpur (শ্যামলী)',
  'Agargaon / Sher-e-Bangla (আগারগাঁও)',
  'Jatrabari / Sayedabad (যাত্রাবাড়ী)',
  'Khilkhet / Nikunja (খিলক্ষেত)',
  'Pallabi / Mirpur 12 (পল্লবী)',
  'Cantonment / Kafrul (ক্যান্টনমেন্ট)',
  'Hazaribagh / Rayerbazar (হাজারীবাগ)',
  'Gopibagh / Wari (ওয়ারী)',
  'Keraniganj (কেরানীগঞ্জ)',
  'Savar (সাভার)',
  'Other Dhaka Area (ঢাকার অন্যান্য এলাকা)',
] as const

/**
 * All 64 Administrative Districts of Bangladesh by Division
 */
export const BANGLADESH_DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: [
    'Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Narsingdi', 'Faridpur',
    'Manikganj', 'Munshiganj', 'Kishoreganj', 'Gopalganj', 'Madaripur',
    'Rajbari', 'Shariatpur',
  ],
  Chattogram: [
    'Chattogram', 'Cox\'s Bazar', 'Cumilla', 'Feni', 'Brahmanbaria',
    'Noakhali', 'Chandpur', 'Lakshmipur', 'Rangamati', 'Khagrachhari', 'Bandarban',
  ],
  Rajshahi: [
    'Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Naogaon', 'Natore',
    'Chapai Nawabganj', 'Joypurhat',
  ],
  Khulna: [
    'Khulna', 'Jashore', 'Kushtia', 'Satkhira', 'Jhenaidah', 'Bagerhat',
    'Chuadanga', 'Magura', 'Meherpur', 'Narail',
  ],
  Barishal: [
    'Barishal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Barguna', 'Jhalokathi',
  ],
  Sylhet: [
    'Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj',
  ],
  Rangpur: [
    'Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari',
    'Panchagarh', 'Thakurgaon', 'Lalmonirhat',
  ],
  Mymensingh: [
    'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur',
  ],
}

/**
 * Flat, sorted list of all 64 districts
 */
export const ALL_BANGLADESH_DISTRICTS: string[] = Object.values(
  BANGLADESH_DISTRICTS_BY_DIVISION
)
  .flat()
  .sort((a, b) => a.localeCompare(b))

/**
 * Phone validation with mobile operator detection
 */
export interface BDPhoneValidationResult {
  isValid: boolean
  normalized: string
  operator?: string
  error?: string
}

export function validateBDPhoneDetailed(phone: string): BDPhoneValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, normalized: '', error: 'ফোন নম্বর প্রদান করা আবশ্যক' }
  }

  // Strip spaces, dashes, brackets, plus
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')

  // Extract raw 11-digit national format
  let nationalNumber = ''
  if (cleaned.startsWith('8801') && cleaned.length === 13) {
    nationalNumber = cleaned.slice(2) // remove 88 -> 01XXXXXXXXX
  } else if (cleaned.startsWith('01') && cleaned.length === 11) {
    nationalNumber = cleaned
  } else if (cleaned.startsWith('1') && cleaned.length === 10) {
    nationalNumber = `0${cleaned}`
  } else {
    // Check length violations
    if (cleaned.length < 11) {
      return {
        isValid: false,
        normalized: cleaned,
        error: `ফোন নম্বরটি খুব ছোট (${cleaned.length} ডিজিট)। ১১ ডিজিটের নম্বর দিন।`,
      }
    }
    if (cleaned.length > 13) {
      return {
        isValid: false,
        normalized: cleaned,
        error: `ফোন নম্বরটি খুব বড় (${cleaned.length} ডিজিট)। সঠিক ১১ ডিজিট দিন।`,
      }
    }
    return {
      isValid: false,
      normalized: cleaned,
      error: 'সঠিক বাংলাদেশি মোবাইল নম্বর প্রদান করুন (উদাঃ 017XXXXXXXX)',
    }
  }

  // Operator prefix check (first 3 digits of national format: 013 - 019)
  const prefix = nationalNumber.slice(0, 3)
  const operator = BANGLADESH_OPERATOR_PREFIXES[prefix]

  if (!operator) {
    return {
      isValid: false,
      normalized: nationalNumber,
      error: `অচল অপারেটর প্রিফিক্স (${prefix})। শুধুমাত্র 013, 014, 015, 016, 017, 018 বা 019 গ্রহণযোগ্য।`,
    }
  }

  // All 11 digits must be numeric
  if (!/^\d{11}$/.test(nationalNumber)) {
    return {
      isValid: false,
      normalized: nationalNumber,
      error: 'ফোন নম্বরে শুধুমাত্র সংখ্যা গ্রহণযোগ্য',
    }
  }

  return {
    isValid: true,
    normalized: `+88${nationalNumber}`,
    operator,
  }
}

/**
 * Address completeness validator to protect live plant transit
 */
export function validateBDAddress(address: string, city: string): {
  isValid: boolean
  warning?: string
  error?: string
} {
  const trimmed = address.trim()

  if (!trimmed) {
    return { isValid: false, error: 'ডেলিভারির পূর্ণ ঠিকানা প্রদান করুন' }
  }

  if (trimmed.length < 12) {
    return {
      isValid: false,
      error: 'ঠিকানাটি খুব সংক্ষিপ্ত। বাড়ি নম্বর, রোড নম্বর বা এলাকার নাম উল্লেখ করুন।',
    }
  }

  // Suggest landmark if address doesn't seem to have road/house/landmark clues
  const hasSpecifics = /(house|road|holding|block|lane|sector|বাড়ি|রোড|ব্লক|লেন|সেক্টর|মাদ্রাসা|মসজিদ|মোড়|বাজার|স্কুল|হাসপাতাল)/i.test(trimmed)
  if (!hasSpecifics && trimmed.length < 25) {
    return {
      isValid: true,
      warning: 'পরামর্শ: কুরিয়ারে দ্রুত ও নিরাপদ ডেলিভারির জন্য নিকটস্থ ল্যান্ডমার্ক (যেমন: মসজিদ, মোড় বা স্কুলের নাম) উল্লেখ করুন।',
    }
  }

  return { isValid: true }
}

/**
 * Authoritative Delivery Configuration
 */
export const DELIVERY_ZONES = {
  INSIDE_DHAKA: {
    id: 'so_inside_dhaka',
    name: 'Standard Delivery (Inside Dhaka)',
    nameBn: 'ঢাকা শহরের ভেতরে নিজস্ব ডেলিভারি',
    fee: 60,
    currency: 'BDT',
    etaDays: '1-2 days',
    etaTextBn: '২৪–৪৮ ঘণ্টার মধ্যে নিজস্ব ডেলিভারি ম্যানে ডেলিভারি',
    packagingBn: 'শ্বাসপ্রশ্বাসযোগ্য নার্সারি স্লীভ ও রুট ময়েশ্চার সিল',
    maxWeightKg: 10,
  },
  OUTSIDE_DHAKA: {
    id: 'so_outside_dhaka',
    name: 'Standard Delivery (Outside Dhaka)',
    nameBn: 'ঢাকার বাইরে কুরিয়ার ডেলিভারি (৬৪ জেলা)',
    fee: 130,
    currency: 'BDT',
    etaDays: '2-4 days',
    etaTextBn: '২–৪ কার্যদিবসের মধ্যে কুরিয়ার পার্সেল ডেলিভারি',
    packagingBn: 'শকপ্রুফ রিইনফোর্সড ঢেউখেলানো উদ্ভিদের স্পেশাল কার্টন',
    maxWeightKg: 10,
  },
} as const

/**
 * Confirmed Support Phone & Nursery Address
 */
export const NURSERY_CONTACT = {
  nurseryName: 'Green Dreams Nursery & Plant Care',
  addressEn: 'Plot 14, Block C, Mirpur Botanical Area, Dhaka-1216, Bangladesh',
  addressBn: 'প্লট ১৪, ব্লক সি, মিরপুর বোটানিক্যাল এলাকা, ঢাকা-১২১৬',
  phoneDisplay: '+880 1712-345678',
  phoneRaw: '8801712345678',
  email: 'support@greendreams.com.bd',
  hours: 'Saturday – Thursday: 9:00 AM – 8:00 PM (Friday closed for nursery maintenance)',
} as const
