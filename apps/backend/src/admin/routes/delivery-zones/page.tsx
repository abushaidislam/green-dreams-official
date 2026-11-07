import { defineRouteConfig } from "@medusajs/admin-sdk"
import { MapPin } from "@medusajs/icons"
import {
  Container,
  Heading,
  Text,
  Badge,
  Table,
  Alert,
} from "@medusajs/ui"

const DeliveryZonesPage = () => {
  const zones = [
    {
      id: "so_inside_dhaka",
      name: "Standard Delivery (Inside Dhaka)",
      zone: "Dhaka Metropolitan Area",
      fee: 60,
      currency: "BDT",
      eta: "24–48 hours",
      origin: "Dhaka Central Nursery (Mirpur)",
      status: "Active",
      packaging: "Breathable nursery sleeve & root moisture barrier",
    },
    {
      id: "so_outside_dhaka",
      name: "Standard Delivery (Outside Dhaka)",
      zone: "All 63 Districts across Bangladesh",
      fee: 130,
      currency: "BDT",
      eta: "2–4 business days",
      origin: "Dhaka Central Nursery (Mirpur)",
      status: "Active",
      packaging: "Reinforced shockproof corrugated botanical box",
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚚</span>
            <Heading level="h1" className="text-ui-fg-base font-semibold">
              Bangladesh Delivery Zones & Shipping Rules
            </Heading>
          </div>
          <Text className="text-ui-fg-subtle text-sm mt-1">
            Authoritative shipping options configured in Medusa Fulfillment and consumed by the storefront.
          </Text>
        </div>
        <Badge color="green" size="base">
          Authoritative Backend Rates
        </Badge>
      </div>

      <Alert variant="info" className="text-sm">
        Delivery fees are authoritative and computed strictly on the backend. The Next.js storefront cannot override these rates. Cash on Delivery is the sole MVP payment collection method.
      </Alert>

      <Container className="p-0 overflow-hidden bg-white dark:bg-ui-bg-subtle border border-ui-border-base rounded-xl shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Zone & Name</Table.HeaderCell>
              <Table.HeaderCell>Geographic Coverage</Table.HeaderCell>
              <Table.HeaderCell>Authoritative Fee</Table.HeaderCell>
              <Table.HeaderCell>Estimated Delivery</Table.HeaderCell>
              <Table.HeaderCell>Packaging Protocol</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {zones.map((zone) => (
              <Table.Row key={zone.id}>
                <Table.Cell>
                  <div className="font-medium text-ui-fg-base">{zone.name}</div>
                  <div className="text-xs text-ui-fg-muted font-mono">{zone.id}</div>
                </Table.Cell>
                <Table.Cell className="text-sm text-ui-fg-subtle">
                  {zone.zone}
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    ৳{zone.fee} {zone.currency}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-sm text-ui-fg-subtle">
                  {zone.eta}
                </Table.Cell>
                <Table.Cell className="text-xs text-ui-fg-muted max-w-xs">
                  {zone.packaging}
                </Table.Cell>
                <Table.Cell>
                  <Badge color="green" size="small">
                    {zone.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white dark:bg-ui-bg-subtle border border-ui-border-base rounded-xl">
          <Heading level="h3" className="text-sm font-semibold text-ui-fg-base mb-2">
            🌱 Stock & Dispatch Location
          </Heading>
          <Text className="text-xs text-ui-fg-subtle leading-relaxed">
            All botanical orders are fulfilled from <strong>Dhaka Central Nursery</strong> (Plot 14, Mirpur Botanical Area, Dhaka-1216). All live plants undergo physical health and root moisture inspection before handover to local delivery partners.
          </Text>
        </div>

        <div className="p-5 bg-white dark:bg-ui-bg-subtle border border-ui-border-base rounded-xl">
          <Heading level="h3" className="text-sm font-semibold text-ui-fg-base mb-2">
            📋 Scope & Integrations
          </Heading>
          <Text className="text-xs text-ui-fg-subtle leading-relaxed">
            Automated courier tracking API integrations (e.g. Steadfast, RedX, Pathao) are explicitly excluded from initial MVP scope per <code>docs/01-requirements.md</code>. Fulfillment staff track parcels via tracking reference notes in Medusa Admin.
          </Text>
        </div>
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Delivery Zones",
  icon: MapPin,
  rank: 5,
})

export default DeliveryZonesPage
