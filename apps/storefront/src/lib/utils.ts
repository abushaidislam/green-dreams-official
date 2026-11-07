import { validateBDPhoneDetailed, NURSERY_CONTACT } from './bangladesh-data'

/**
 * Formats a numeric amount in Bangladeshi Taka (BDT)
 */
export function formatBDT(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳0'
  }
  return `৳${Math.round(amount).toLocaleString('en-US')}`
}

/**
 * Validates and normalizes Bangladesh phone numbers.
 * Supported inputs:
 *  - 01712345678 (11 digits starting with valid operator 013-019)
 *  - 8801712345678 (13 digits starting with 8801)
 *  - +8801712345678 (14 digits starting with +8801)
 */
export function validateAndNormalizeBDPhone(phone: string): {
  isValid: boolean
  normalized: string
  operator?: string
  error?: string
} {
  return validateBDPhoneDetailed(phone)
}

/**
 * Generates an official WhatsApp click-to-chat URL with a prefilled message.
 */
export function getWhatsAppSupportLink(
  phone: string = NURSERY_CONTACT.phoneRaw,
  message: string
): string {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const encodedText = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedText}`
}

