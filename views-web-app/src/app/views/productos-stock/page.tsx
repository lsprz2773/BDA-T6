import { StockFilters } from "@/app/components/V3StockFilters";
import { LowStockCard } from "@/app/components/V3ProductCard";
import { LowStockProduct } from "@/types/low-stock-products";
import { ApiResponse } from "@/types/api-response";

async function getLowStock(search: string, urgencia: string): Promise<LowStockProduct[]> {
  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (urgencia) params.set("urgencia", urgencia);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/low-stock?${params}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error("Error fetching stock");
    const json: ApiResponse<LowStockProduct> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function InventarioPage({
  searchParams,
}: {
  searchParams: { search?: string; urgencia?: string };
}) {
  const search = searchParams.search || "";
  const urgencia = searchParams.urgencia || "";

  const data = await getLowStock(search, urgencia);

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alerta de Stock Bajo</h1>
        <p className="text-gray-500 text-sm">Productos que requieren reabastecimiento inmediato.</p>
      </div>

      <StockFilters />

      <div className="flex flex-col gap-2">
        {data.length > 0 ? (
          data.map((product) => (
            <LowStockCard key={product.id_producto} data={product} />
          ))
        ) : (
          <div className="text-center py-16 bg-green-50 rounded-lg border border-green-100">
            <div className="text-green-600 text-5xl mb-2">✓</div>
            <h3 className="text-lg font-medium text-green-800">Todo en orden</h3>
            <p className="text-green-600">No se encontraron productos con bajo stock bajo estos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
