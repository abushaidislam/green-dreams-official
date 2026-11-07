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
 *  - 01712345678 (11 digits starting with 01[3-9])
 *  - 8801712345678 (13 digits starting with 8801)
 *  - +8801712345678 (14 digits starting with +8801)
 */
export function validateAndNormalizeBDPhone(phone: string): {
  isValid: boolean
  normalized: string
  error?: string
} {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')

  // Regex matching valid Bangladesh mobile operators (013, 014, 015, 016, 017, 018, 019)
  const bdPhoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/

  if (!cleaned) {
    return { isValid: false, normalized: '', error: 'ফোন নম্বর প্রদান করুন' }
  }

  if (!bdPhoneRegex.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      error: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (উদাঃ 017XXXXXXXX)',
    }
  }

  // Normalize to standard international format: +8801XXXXXXXXX
  let normalized = cleaned
  if (normalized.startsWith('+880')) {
    // already full international
  } else if (normalized.startsWith('880')) {
    normalized = `+${normalized}`
  } else if (normalized.startsWith('0')) {
    normalized = `+88${normalized}`
  } else {
    normalized = `+880${normalized}`
  }

  return { isValid: true, normalized }
}

/**
 * Generates an official WhatsApp click-to-chat URL with a prefilled message.
 */
export function getWhatsAppSupportLink(phone: string = '8801700000000', message: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const encodedText = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedText}`
}
