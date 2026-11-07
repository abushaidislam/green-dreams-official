import { useState, useEffect } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, HttpTypes } from "@medusajs/types"
import { useUpdateProduct } from "@medusajs/dashboard/hooks"
import {
  Container,
  Heading,
  Text,
  Badge,
  Input,
  Textarea,
  Select,
  Switch,
  Button,
  toast,
  Alert,
} from "@medusajs/ui"

interface PlantCareProfile {
  plantType?: "indoor" | "outdoor" | "succulent" | "flowering" | "tree" | "other"
  scientificName?: string
  light?: string
  watering?: string
  humidity?: string
  difficulty?: "easy" | "medium" | "advanced"
  petSafety?: "unknown" | "safe" | "unsafe"
  careInstructions?: string
  sourceVerified?: boolean
}

const PlantCareWidget = ({ data }: DetailWidgetProps<HttpTypes.AdminProduct>) => {
  const existingCare = (data.metadata?.plant_care as PlantCareProfile | undefined) || {}

  const [plantType, setPlantType] = useState<string>(existingCare.plantType || "indoor")
  const [scientificName, setScientificName] = useState<string>(existingCare.scientificName || "")
  const [light, setLight] = useState<string>(existingCare.light || "")
  const [watering, setWatering] = useState<string>(existingCare.watering || "")
  const [humidity, setHumidity] = useState<string>(existingCare.humidity || "")
  const [difficulty, setDifficulty] = useState<string>(existingCare.difficulty || "easy")
  const [petSafety, setPetSafety] = useState<string>(existingCare.petSafety || "unknown")
  const [careInstructions, setCareInstructions] = useState<string>(existingCare.careInstructions || "")
  const [sourceVerified, setSourceVerified] = useState<boolean>(Boolean(existingCare.sourceVerified))

  // Sync state if product data updates
  useEffect(() => {
    const care = (data.metadata?.plant_care as PlantCareProfile | undefined) || {}
    setPlantType(care.plantType || "indoor")
    setScientificName(care.scientificName || "")
    setLight(care.light || "")
    setWatering(care.watering || "")
    setHumidity(care.humidity || "")
    setDifficulty(care.difficulty || "easy")
    setPetSafety(care.petSafety || "unknown")
    setCareInstructions(care.careInstructions || "")
    setSourceVerified(Boolean(care.sourceVerified))
  }, [data])

  const { mutateAsync: updateProduct, isPending } = useUpdateProduct(data.id)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedCare: PlantCareProfile = {
      plantType: plantType as PlantCareProfile["plantType"],
      scientificName: scientificName.trim() || undefined,
      light: light.trim() || undefined,
      watering: watering.trim() || undefined,
      humidity: humidity.trim() || undefined,
      difficulty: difficulty as PlantCareProfile["difficulty"],
      petSafety: petSafety as PlantCareProfile["petSafety"],
      careInstructions: careInstructions.trim() || undefined,
      sourceVerified,
    }

    try {
      await updateProduct({
        metadata: {
          ...(data.metadata || {}),
          plant_care: updatedCare,
        },
      })
      toast.success("Plant care profile saved! Storefront customer view has been updated.")
    } catch (err: any) {
      toast.error(err?.message || "Failed to update plant care profile")
    }
  }

  const handleReset = () => {
    const care = (data.metadata?.plant_care as PlantCareProfile | undefined) || {}
    setPlantType(care.plantType || "indoor")
    setScientificName(care.scientificName || "")
    setLight(care.light || "")
    setWatering(care.watering || "")
    setHumidity(care.humidity || "")
    setDifficulty(care.difficulty || "easy")
    setPetSafety(care.petSafety || "unknown")
    setCareInstructions(care.careInstructions || "")
    setSourceVerified(Boolean(care.sourceVerified))
  }

  return (
    <Container className="p-6 my-4 bg-white dark:bg-ui-bg-subtle border border-ui-border-base rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-ui-border-base pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <Heading level="h2" className="text-ui-fg-base font-semibold">
              Plant Care Guide & Botanical Profile
            </Heading>
          </div>
          <Text className="text-ui-fg-subtle text-sm mt-1">
            Configure care guidance rendered directly in the customer storefront botanical accordion.
          </Text>
        </div>
        <div className="flex items-center gap-2">
          {sourceVerified ? (
            <Badge color="green" size="small">
              ✓ Verified Content
            </Badge>
          ) : (
            <Badge color="orange" size="small">
              Editorial Draft
            </Badge>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Plant Type */}
          <div>
            <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
              Plant Classification
            </label>
            <Select value={plantType} onValueChange={setPlantType}>
              <Select.Trigger>
                <Select.Value placeholder="Select type" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="indoor">Indoor Plant</Select.Item>
                <Select.Item value="outdoor">Outdoor Plant</Select.Item>
                <Select.Item value="succulent">Succulent / Cactus</Select.Item>
                <Select.Item value="flowering">Flowering Plant</Select.Item>
                <Select.Item value="tree">Tree / Bonsai</Select.Item>
                <Select.Item value="other">Care Supply / Other</Select.Item>
              </Select.Content>
            </Select>
          </div>

          {/* Scientific Name */}
          <div>
            <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
              Scientific / Botanical Name
            </label>
            <Input
              placeholder="e.g. Sansevieria trifasciata"
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
              Care Difficulty
            </label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <Select.Trigger>
                <Select.Value placeholder="Select difficulty" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="easy">Easy (Beginner-friendly)</Select.Item>
                <Select.Item value="medium">Moderate Care</Select.Item>
                <Select.Item value="advanced">Advanced (High Maintenance)</Select.Item>
              </Select.Content>
            </Select>
          </div>

          {/* Pet Safety */}
          <div>
            <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
              Pet Safety (Cats & Dogs)
            </label>
            <Select value={petSafety} onValueChange={setPetSafety}>
              <Select.Trigger>
                <Select.Value placeholder="Select pet safety" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="unknown">Unknown (Default — Do not infer)</Select.Item>
                <Select.Item value="safe">Non-Toxic / Pet Friendly</Select.Item>
                <Select.Item value="unsafe">Toxic to Pets</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </div>

        {/* Light Guidance */}
        <div>
          <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
            Light Requirement
          </label>
          <Input
            placeholder="e.g. Bright indirect sunlight, tolerates low light"
            value={light}
            onChange={(e) => setLight(e.target.value)}
          />
        </div>

        {/* Watering Guidance */}
        <div>
          <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
            Watering Schedule & Guidance
          </label>
          <Input
            placeholder="e.g. Water every 2-3 weeks; let top 2 inches dry out completely"
            value={watering}
            onChange={(e) => setWatering(e.target.value)}
          />
        </div>

        {/* Humidity */}
        <div>
          <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
            Humidity Guidance (Optional)
          </label>
          <Input
            placeholder="e.g. Thrives in moderate to high humidity (50-70%)"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>

        {/* Care Instructions / Notes */}
        <div>
          <label className="block text-xs font-medium text-ui-fg-muted mb-1.5">
            Detailed Care Instructions & Soil Advice
          </label>
          <Textarea
            rows={3}
            placeholder="Detailed instructions for potting, fertilizer, seasonal care, and Dhaka climate adaptations..."
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
          />
        </div>

        {/* Editorial Verification Switch */}
        <div className="flex items-center justify-between p-3.5 bg-ui-bg-subtle-hover rounded-lg border border-ui-border-base">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ui-fg-base">
                Editorial & Horticultural Verification
              </span>
              {sourceVerified && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <Text className="text-xs text-ui-fg-subtle mt-0.5">
              Confirm that botanical attributes have been reviewed by a qualified nursery botanist before publishing.
            </Text>
          </div>
          <Switch
            checked={sourceVerified}
            onCheckedChange={setSourceVerified}
          />
        </div>

        {/* Safety Alert */}
        <Alert variant="info" className="text-xs">
          Care details saved here immediately update the customer storefront product detail page and live store APIs. Pet safety defaults to "Unknown" to protect customer pets unless verified.
        </Alert>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-ui-border-base">
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={handleReset}
            disabled={isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="small"
            isLoading={isPending}
          >
            Save Plant Care Guide
          </Button>
        </div>
      </form>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default PlantCareWidget
