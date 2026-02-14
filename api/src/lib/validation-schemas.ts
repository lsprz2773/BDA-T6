import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().min(1, "La página debe ser mayor a 0").default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});

const statusEnum = z.enum(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']);

export const salesByCategorySchema = z.object({
  search: z.string().trim().optional(),
});

export const customerAnalysisSchema = paginationSchema.extend({
  rango: z.enum(['VIP', 'REGULAR', 'NUEVO']).optional().or(z.literal('')),
});

export const lowStockSchema = z.object({
  search: z.string().trim().optional(),
  urgencia: z.enum(['Critico', 'Bajo', 'Normal']).optional().or(z.literal('')),
});

export const ordersStatusSchema = z.object({
  status: statusEnum.optional().or(z.literal('')),
});

export const topProductsSchema = z.object({
  categoria: z.string().trim().optional(),
  min_ingreso: z.coerce.number().min(0).optional(),
});


export type SalesByCategoryInput = z.infer<typeof salesByCategorySchema>;
export type CustomerAnalysisInput = z.infer<typeof customerAnalysisSchema>;
export type LowStockInput = z.infer<typeof lowStockSchema>;
export type TopProductsInput = z.infer<typeof topProductsSchema>;
