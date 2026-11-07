import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, HttpTypes } from "@medusajs/types"
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  Alert,
} from "@medusajs/ui"

function normalizeBDPhoneForWhatsApp(phone?: string | null): string | null {
  if (!phone) return null
  const cleaned = phone.replace(/[^0-9]/g, "")
  if (cleaned.startsWith("8801") && cleaned.length === 13) {
    return cleaned
  }
  if (cleaned.startsWith("01") && cleaned.length === 11) {
    return `88${cleaned}`
  }
  if (cleaned.startsWith("1") && cleaned.length === 10) {
    return `880${cleaned}`
  }
  return cleaned
}

const OrderOperationsWidget = ({ data }: DetailWidgetProps<HttpTypes.AdminOrder>) => {
  const shippingAddress = data.shipping_address
  const customerName = `${shippingAddress?.first_name || ""} ${shippingAddress?.last_name || ""}`.trim() || "Customer"
  const rawPhone = shippingAddress?.phone || data.customer?.phone || null
  const waPhone = normalizeBDPhoneForWhatsApp(rawPhone)
  const orderDisplayId = data.display_id ? `#${data.display_id}` : data.id.slice(0, 10)

  const waMessage = encodeURIComponent(
    `Assalamu Alaikum ${customerName}! This is Green Dreams nursery regarding your order ${orderDisplayId}. Please confirm your physical delivery address so our horticultural team can prepare and dispatch your live plants. (Cash on Delivery)`
  )
  const waUrl = waPhone ? `https://wa.me/${waPhone}?text=${waMessage}` : null

  return (
    <Container className="p-5 my-4 bg-white dark:bg-ui-bg-subtle border border-ui-border-base rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-ui-border-base pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌿</span>
          <Heading level="h3" className="text-ui-fg-base font-semibold text-sm">
            Bangladesh Operations & COD
          </Heading>
        </div>
        <Badge color="green" size="small">
          Cash on Delivery
        </Badge>
      </div>

      <div className="space-y-4">
        {/* COD Protocol Banner */}
        <Alert variant="warning" className="text-xs">
          <strong>COD Protocol:</strong> Do not dispatch live plants without prior phone confirmation. Live plants cannot remain in courier transit indefinitely.
        </Alert>

        {/* Customer Details */}
        <div className="bg-ui-bg-subtle-hover p-3 rounded-lg border border-ui-border-base text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-ui-fg-muted font-medium">Customer:</span>
            <span className="text-ui-fg-base font-semibold">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ui-fg-muted font-medium">Phone:</span>
            <span className="text-ui-fg-base font-mono">{rawPhone || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ui-fg-muted font-medium">City / Zone:</span>
            <span className="text-ui-fg-base">{shippingAddress?.city || "Bangladesh"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ui-fg-muted font-medium">Payment State:</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold uppercase">
              {data.payment_status || "Awaiting Collection"}
            </span>
          </div>
        </div>

        {/* WhatsApp Action */}
        {waUrl ? (
          <div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                type="button"
                variant="secondary"
                size="small"
                className="w-full flex items-center justify-center gap-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300"
              >
                <span>💬</span>
                <span>Confirm via WhatsApp ({rawPhone})</span>
              </Button>
            </a>
            <Text className="text-[11px] text-ui-fg-subtle text-center mt-1.5">
              Opens prefilled customer greeting with Order {orderDisplayId} reference.
            </Text>
          </div>
        ) : (
          <Text className="text-xs text-ui-fg-muted italic text-center">
            No valid customer phone number recorded for WhatsApp confirmation.
          </Text>
        )}

        {/* Packing Checklist */}
        <div className="pt-3 border-t border-ui-border-base text-xs text-ui-fg-muted space-y-1">
          <div className="font-medium text-ui-fg-base mb-1">Fulfillment Checklist:</div>
          <div className="flex items-center gap-1.5">
            <span>◻</span>
            <span>Verify customer physical address & landmark</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>◻</span>
            <span>Moisten plant roots & wrap pot securely</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>◻</span>
            <span>Enclose printed botanical care card</span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default OrderOperationsWidget
