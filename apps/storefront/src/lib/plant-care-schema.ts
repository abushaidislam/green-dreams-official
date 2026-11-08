import { PlantCareProfile } from './medusa'

export const VALID_PLANT_TYPES = ['indoor', 'outdoor', 'succulent', 'flowering', 'tree', 'other'] as const
export const VALID_DIFFICULTIES = ['easy', 'medium', 'advanced'] as const
export const VALID_PET_SAFETY = ['unknown', 'safe', 'unsafe'] as const

export interface PlantCareValidationResult {
  isValid: boolean
  errors: string[]
  sanitized?: PlantCareProfile
}

/**
 * Sanitizes string content to avoid raw HTML injection / XSS
 */
function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // Strip brackets
    .trim()
}

/**
 * Validates and sanitizes botanical plant care profiles for storefront & admin
 */
export function validatePlantCareProfile(data: unknown): PlantCareValidationResult {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Plant care data must be an object'],
    }
  }

  const raw = data as Record<string, unknown>

  // Validate plantType if present
  let plantType: PlantCareProfile['plantType'] = 'indoor'
  if (raw.plantType !== undefined) {
    if (typeof raw.plantType === 'string' && VALID_PLANT_TYPES.includes(raw.plantType as any)) {
      plantType = raw.plantType as PlantCareProfile['plantType']
    } else {
      errors.push(`Invalid plantType: '${raw.plantType}'. Must be one of: ${VALID_PLANT_TYPES.join(', ')}`)
    }
  }

  // Validate difficulty if present
  let difficulty: PlantCareProfile['difficulty'] = 'easy'
  if (raw.difficulty !== undefined) {
    if (typeof raw.difficulty === 'string' && VALID_DIFFICULTIES.includes(raw.difficulty as any)) {
      difficulty = raw.difficulty as PlantCareProfile['difficulty']
    } else {
      errors.push(`Invalid difficulty: '${raw.difficulty}'. Must be one of: ${VALID_DIFFICULTIES.join(', ')}`)
    }
  }

  // Validate petSafety if present
  let petSafety: PlantCareProfile['petSafety'] = 'unknown'
  if (raw.petSafety !== undefined) {
    if (typeof raw.petSafety === 'string' && VALID_PET_SAFETY.includes(raw.petSafety as any)) {
      petSafety = raw.petSafety as PlantCareProfile['petSafety']
    } else {
      errors.push(`Invalid petSafety: '${raw.petSafety}'. Must be one of: ${VALID_PET_SAFETY.join(', ')}`)
    }
  }

  // Validate sourceVerified
  let sourceVerified = false
  if (raw.sourceVerified !== undefined) {
    if (typeof raw.sourceVerified === 'boolean') {
      sourceVerified = raw.sourceVerified
    } else {
      errors.push("Field 'sourceVerified' must be a boolean")
    }
  }

  const sanitized: PlantCareProfile = {
    plantType,
    difficulty,
    petSafety,
    sourceVerified,
    scientificName: sanitizeString(raw.scientificName),
    light: sanitizeString(raw.light),
    watering: sanitizeString(raw.watering),
    humidity: sanitizeString(raw.humidity),
    careInstructions: sanitizeString(raw.careInstructions),
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized,
  }
}
