import { CategoryFilter } from "@/app/components/V5CategoryFilter";
import { TopProductCard } from "@/app/components/V5ProductCard";
import { TopProduct } from "@/types/top-products";
import { ApiResponse } from "@/types/api-response";

async function getTopProducts(categoria: string): Promise<TopProduct[]> {
  try {
    const params = new URLSearchParams();
    if (categoria) params.set("categoria", categoria);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/top-products-category?${params}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error("Error fetching top products");
    const json: ApiResponse<TopProduct> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function TopProductosPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const categoria = searchParams.categoria || "";
  const data = await getTopProducts(categoria);

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Top Productos</h1>
        <p className="text-gray-500 text-sm">Los mejores vendedores por categoría.</p>
      </div>

      <CategoryFilter />

      <div className="flex flex-col gap-1">
        {data.length > 0 ? (
          data.map((product, index) => (
            <TopProductCard 
                key={`${product.categoria}-${product.nombre_producto}`} 
                data={product} 
            />
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400">No se encontraron productos para esa categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
