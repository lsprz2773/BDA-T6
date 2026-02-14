import { CustomerFilters } from "@/app/components/CustomerFilters";
import { CustomerRow } from "@/app/components/V2CustomerCard";
import { CustomerAnalysis } from "@/types/customer-analysis";
import { PaginatedResponse } from "@/types/api-response";

async function getCustomers(search: string, rango: string, page = 1): Promise<PaginatedResponse<CustomerAnalysis> | null> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "20",
      search,
      rango
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/customer-analysis?${params}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error("Error consultado clientes");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: { search?: string; rango?: string; page?: string };
}) {
  const search = searchParams.search || "";
  const rango = searchParams.rango || "";
  const page = Number(searchParams.page) || 1;

  const response = await getCustomers(search, rango, page);
  const data = response?.data || [];

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Análisis de Clientes</h1>
      <p className="text-gray-500 mb-6 text-sm">Segmentación y comportamiento de compra (Top 20).</p>

      <CustomerFilters />

      <div className="flex flex-col gap-2">
        {data.length > 0 ? (
          data.map((client) => (
            <CustomerRow key={client.nombre_cliente} data={client} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No hay clientes con estos filtros.</p>
        )}
      </div>
    </div>
  );
}
