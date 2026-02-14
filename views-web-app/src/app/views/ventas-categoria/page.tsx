import {ApiResponse} from '@/types/api-response'
import { VentaPorCategoria } from "@/types/venta-por-categoria";
import { BarraBusqueda } from '@/app/components/BarraBusqueda';
import { CardCategoria } from '@/app/components/CardCategoria';

async function getVentasPorCategoria(search: string): Promise<VentaPorCategoria[]> {
  try {
    const res = await fetch(`http://localhost:4000/api/sales-category?search=${search}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Fallo al cargar datos");
    const json: ApiResponse<VentaPorCategoria> = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function VentasPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const query = searchParams.search || "";
  const data = await getVentasPorCategoria(query);

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ventas por Categoría</h1>
          <p className="text-gray-500 text-sm">Reporte detallado de ingresos y volumen.</p>
        </div>
        <BarraBusqueda />
      </div>

      <div className="flex flex-col gap-2">
        {data.length > 0 ? (
          data.map((item) => (
            <CardCategoria key={item.nombre_categoria} data={item} />
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500">No se encontraron categorías con ese criterio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
