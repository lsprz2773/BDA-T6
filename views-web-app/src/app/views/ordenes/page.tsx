import { OrderStatusCard } from "@/app/components/V4OrderCard";
import { OrderStatusAnalysis } from "@/types/order-status-analysis";
import { ApiResponse } from "@/types/api-response";

async function getOrderStatus(): Promise<OrderStatusAnalysis[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/orders-status`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error fetching");
    const json: ApiResponse<OrderStatusAnalysis> = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function OrdenesPage() {
  const data = await getOrderStatus();

  const totalMoney = data.reduce((acc, item) => acc + Number(item.valor_total), 0);
  const totalCount = data.reduce((acc, item) => acc + Number(item.cantidad_ordenes), 0);

  return (
    <div className="container mx-auto max-w-4xl p-8">
      
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Estado de Órdenes</h1>
          <p className="text-gray-500 text-sm">Resumen del ciclo de vida de pedidos.</p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-bold text-gray-900">${totalMoney.toFixed(2)}</span>
          <span className="text-xs text-gray-500">{totalCount} órdenes totales</span>
        </div>
      </div>

      <div className="flex flex-col">
        {data.length > 0 ? (
          data.map((status) => (
            <OrderStatusCard key={status.estado} data={status} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">Sin datos registrados.</p>
        )}
      </div>
    </div>
  );
}
