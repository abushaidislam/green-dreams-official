import {
  validateBDPhoneDetailed,
  validateBDAddress,
  ALL_BANGLADESH_DISTRICTS,
  BANGLADESH_DISTRICTS_BY_DIVISION,
  DHAKA_CITY_AREAS,
  DELIVERY_ZONES,
  NURSERY_CONTACT,
} from './bangladesh-data'
import { getWhatsAppSupportLink, formatBDT } from './utils'
import { validatePlantCareProfile } from './plant-care-schema'

console.log('🧪 [Phase 5 Test Suite] Running Bangladesh Business Details & Validation Tests...\n')

let passed = 0
let failed = 0

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`)
    passed++
  } else {
    console.error(`  ❌ FAIL: ${testName}`)
    if (detail) console.error(`     Detail: ${detail}`)
    failed++
  }
}

// ==========================================
// 1. Phone Number Validation & Operator Tests
// ==========================================
console.log('--- 1. Testing Mobile Operators & Formats ---')

// Grameenphone
const gp1 = validateBDPhoneDetailed('01712345678')
assert(gp1.isValid && gp1.operator === 'Grameenphone' && gp1.normalized === '+8801712345678', 'Valid GP 017 11-digit')

const gp2 = validateBDPhoneDetailed('+8801312345678')
assert(gp2.isValid && gp2.operator === 'Grameenphone' && gp2.normalized === '+8801312345678', 'Valid GP 013 with +880')

const gp3 = validateBDPhoneDetailed('8801712345678')
assert(gp3.isValid && gp3.operator === 'Grameenphone' && gp3.normalized === '+8801712345678', 'Valid GP 017 with 880 prefix')

// Banglalink
const bl1 = validateBDPhoneDetailed('01912345678')
assert(bl1.isValid && bl1.operator === 'Banglalink', 'Valid Banglalink 019')

const bl2 = validateBDPhoneDetailed('01412345678')
assert(bl2.isValid && bl2.operator === 'Banglalink', 'Valid Banglalink 014')

// Robi
const robi = validateBDPhoneDetailed('01812345678')
assert(robi.isValid && robi.operator === 'Robi', 'Valid Robi 018')

// Airtel
const airtel = validateBDPhoneDetailed('01612345678')
assert(airtel.isValid && airtel.operator === 'Airtel', 'Valid Airtel 016')

// Teletalk
const teletalk = validateBDPhoneDetailed('01512345678')
assert(teletalk.isValid && teletalk.operator === 'Teletalk', 'Valid Teletalk 015')

// Formatted input with dashes/spaces
const formatted = validateBDPhoneDetailed('01712-345 678')
assert(formatted.isValid && formatted.operator === 'Grameenphone', 'Valid phone with spaces and dashes')

// ==========================================
// 2. Negative & Invalid Phone Tests
// ==========================================
console.log('\n--- 2. Testing Invalid Phone Rejection ---')

const shortPhone = validateBDPhoneDetailed('01712345')
assert(!shortPhone.isValid, 'Reject too short phone (8 digits)')

const longPhone = validateBDPhoneDetailed('0171234567890')
assert(!longPhone.isValid, 'Reject too long phone (13 digits without 88)')

const defunctPrefix = validateBDPhoneDetailed('01112345678')
assert(!defunctPrefix.isValid, 'Reject defunct 011 prefix (Citycell)')

const invalidPrefix2 = validateBDPhoneDetailed('01012345678')
assert(!invalidPrefix2.isValid, 'Reject non-existent 010 prefix')

const nonNumeric = validateBDPhoneDetailed('0171234abcd')
assert(!nonNumeric.isValid, 'Reject letters in phone number')

const emptyPhone = validateBDPhoneDetailed('')
assert(!emptyPhone.isValid, 'Reject empty string phone')

// ==========================================
// 3. Address Validation & Completeness Tests
// ==========================================
console.log('\n--- 3. Testing Address Validation Rules ---')

const emptyAddr = validateBDAddress('', 'Dhaka')
assert(!emptyAddr.isValid, 'Reject empty address')

const tooShortAddr = validateBDAddress('Dhaka', 'Dhaka')
assert(!tooShortAddr.isValid, 'Reject vague/short address ("Dhaka")')

const completeAddr = validateBDAddress('House 14, Road 4, Block C, Mirpur, Dhaka', 'Dhaka')
assert(completeAddr.isValid && !completeAddr.warning, 'Accept full address with house & road')

const shortNoLandmark = validateBDAddress('Mirpur, Dhaka 1216', 'Dhaka')
assert(shortNoLandmark.isValid && Boolean(shortNoLandmark.warning), 'Provide helpful landmark tip for short address')

// ==========================================
// 4. Geographic Data Completeness Tests
// ==========================================
console.log('\n--- 4. Testing Geographic Data & Districts ---')

assert(ALL_BANGLADESH_DISTRICTS.length === 64, 'Exactly 64 districts in Bangladesh catalog', `Count: ${ALL_BANGLADESH_DISTRICTS.length}`)

const divisions = Object.keys(BANGLADESH_DISTRICTS_BY_DIVISION)
assert(divisions.length === 8, 'Exactly 8 administrative divisions', `Divisions: ${divisions.join(', ')}`)

assert(DHAKA_CITY_AREAS.length >= 25, 'Dhaka City areas catalog has 25+ major zones', `Count: ${DHAKA_CITY_AREAS.length}`)

// Key districts check
const keyDistricts = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Cox\'s Bazar', 'Bogura']
const allFound = keyDistricts.every((d) => ALL_BANGLADESH_DISTRICTS.includes(d))
assert(allFound, 'Key industrial and division centers present in district list')

// ==========================================
// 5. Delivery Rates & Business Logic
// ==========================================
console.log('\n--- 5. Testing Delivery Rates & WhatsApp Support ---')

assert(DELIVERY_ZONES.INSIDE_DHAKA.fee === 60, 'Inside Dhaka delivery fee is strictly 60 BDT')
assert(DELIVERY_ZONES.OUTSIDE_DHAKA.fee === 130, 'Outside Dhaka delivery fee is strictly 130 BDT')

assert(formatBDT(60) === '৳60', 'Format BDT 60 currency symbol')
assert(formatBDT(130) === '৳130', 'Format BDT 130 currency symbol')

const waLink = getWhatsAppSupportLink(NURSERY_CONTACT.phoneRaw, 'Hello Green Dreams')
assert(waLink.startsWith('https://wa.me/8801712345678?text=Hello%20Green%20Dreams'), 'WhatsApp click-to-chat URL is properly constructed and encoded')

// ==========================================
// 6. Plant Care Schema Validation Tests
// ==========================================
console.log('\n--- 6. Testing Plant Care Schema Validation ---')

const validCare = {
  plantType: 'indoor',
  scientificName: 'Sansevieria trifasciata',
  light: 'Bright indirect light',
  watering: 'Every 2-3 weeks',
  humidity: '40-50%',
  difficulty: 'easy',
  petSafety: 'unsafe',
  careInstructions: 'Wipe leaves monthly with damp cloth',
  sourceVerified: true,
}

const vResult = validatePlantCareProfile(validCare)
assert(vResult.isValid && vResult.sanitized?.sourceVerified === true, 'Validate valid plant care profile')

const xssCare = {
  plantType: 'indoor',
  difficulty: 'easy',
  petSafety: 'safe',
  careInstructions: '<script>alert("xss")</script>Keep moist',
}
const xResult = validatePlantCareProfile(xssCare)
assert(
  xResult.isValid && !xResult.sanitized?.careInstructions?.includes('<script>'),
  'Sanitize potential HTML/script injection from care instructions'
)

const invalidEnumCare = {
  plantType: 'carnivorous-alien',
  difficulty: 'extreme',
  petSafety: 'lethal',
  sourceVerified: 'not-a-boolean',
}
const invResult = validatePlantCareProfile(invalidEnumCare)
assert(
  !invResult.isValid && invResult.errors.length === 4,
  'Reject invalid plantType, difficulty, petSafety, and non-boolean sourceVerified',
  `Found errors: ${invResult.errors.length}`
)

const nullCare = validatePlantCareProfile(null)
assert(!nullCare.isValid, 'Reject null plant care profile')

// ==========================================
// Summary
// ==========================================
console.log('\n==========================================')
console.log(`🏁 Test Results: ${passed} Passed, ${failed} Failed`)
console.log('==========================================\n')

if (failed > 0) {
  process.exit(1)
} else {
  process.exit(0)
}
