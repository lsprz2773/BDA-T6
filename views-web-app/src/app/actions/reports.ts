'use server';

import {
  salesByCategorySchema,
  customerAnalysisSchema,
  lowStockSchema,
  ordersStatusSchema,
  topProductsSchema,
  type SalesByCategoryInput,
  type CustomerAnalysisInput,
  type LowStockInput,
  type TopProductsInput,
} from '@/lib/validations';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(endpoint: string, params?: Record<string, any>) {
  try {
    const url = new URL(`${API_URL}/${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        // Solo agregar parámetros con valores definidos
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) throw new Error(`Error en API: ${response.statusText}`);
    
    return await response.json();
  } catch (error) {
    console.error(`Fetch error [${endpoint}]:`, error);
    return { success: false, error: 'No se pudo obtener la información' };
  }
}

export async function getSalesByCategory(input: SalesByCategoryInput) {
  const validated = salesByCategorySchema.parse(input);
  return apiRequest('sales-by-category', { search: validated.search });
}

export async function getCustomerAnalysis(input: CustomerAnalysisInput) {
  const validated = customerAnalysisSchema.parse(input);
  return apiRequest('customer-analysis', { 
    search: validated.search,
    rango: validated.rango,
    page: validated.page,
    limit: validated.limit
  });
}

export async function getLowStock(input: LowStockInput) {
  const validated = lowStockSchema.parse(input);
  return apiRequest('low-stock', { 
    search: validated.search,
    urgencia: validated.urgencia
  });
}

export async function getOrderStatus() {
  return apiRequest('api/orders-status');
}

export async function getTopProducts(input: TopProductsInput) {
  const validated = topProductsSchema.parse(input);
  return apiRequest('top-products', { 
    categoria: validated.categoria,
    min_ingreso: validated.min_ingreso
  });
}
