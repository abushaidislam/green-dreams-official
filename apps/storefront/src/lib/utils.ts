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

/**
 * Strips internal editorial tags like [SAMPLE] from product titles for clean customer-facing UI
 */
export function cleanProductTitle(title?: string | null): string {
  if (!title) return ''
  return title.replace(/\[SAMPLE\]/gi, '').trim()
}

/**
 * Extracts authoritative BDT price information from a StoreProduct
 */
export function getProductPriceDetails(product: any, variantId?: string): {
  amount: number
  hasMultiplePrices: boolean
  minAmount: number
  maxAmount: number
  formatted: string
  formattedRange: string
} {
  const variants = product?.variants || []
  const selectedVariant = variantId ? variants.find((v: any) => v.id === variantId) : variants[0]

  const getVariantAmount = (v: any): number => {
    if (!v) return 0
    const calc = v.calculated_price?.calculated_amount ?? v.calculated_price?.original_amount
    if (calc !== undefined && calc !== null && !isNaN(Number(calc)) && Number(calc) > 0) {
      return Number(calc)
    }
    const bdt = v.prices?.find((p: any) => p.currency_code === 'bdt')?.amount
    if (bdt !== undefined && bdt !== null && !isNaN(Number(bdt)) && Number(bdt) > 0) {
      return Number(bdt)
    }
    const any = v.prices?.[0]?.amount
    if (any !== undefined && any !== null && !isNaN(Number(any)) && Number(any) > 0) {
      return Number(any)
    }
    return 0
  }

  const selectedAmount = getVariantAmount(selectedVariant)
  const allAmounts = variants.map(getVariantAmount).filter((a: number) => a > 0)

  const minAmount = allAmounts.length > 0 ? Math.min(...allAmounts) : selectedAmount
  const maxAmount = allAmounts.length > 0 ? Math.max(...allAmounts) : selectedAmount
  const hasMultiplePrices = minAmount !== maxAmount && minAmount > 0

  return {
    amount: selectedAmount || minAmount,
    hasMultiplePrices,
    minAmount,
    maxAmount,
    formatted: formatBDT(selectedAmount || minAmount),
    formattedRange: hasMultiplePrices ? `${formatBDT(minAmount)} – ${formatBDT(maxAmount)}` : formatBDT(selectedAmount || minAmount),
  }
}

