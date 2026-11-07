import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  res.status(200).json({
    status: 'ok',
    service: 'green-dreams-backend',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  })
}
