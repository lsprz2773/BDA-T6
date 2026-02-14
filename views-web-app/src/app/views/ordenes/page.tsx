'use client';

import { useEffect, useState } from 'react';
import { getOrderStatus } from '@/app/actions/reports';
import type { OrderStatusAnalysis } from '@/types/order-status-analysis';
import Link from 'next/link';

export default function OrdenesPage() {
  const [data, setData] = useState<OrderStatusAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    const result = await getOrderStatus();
    if (result.success) {
      setData(result.data ?? []);
    } else {
      setError(result.error || 'Error al cargar datos');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalMoney = data.reduce((acc, item) => acc + Number(item.valor_total), 0);
  const totalCount = data.reduce((acc, item) => acc + Number(item.cantidad_ordenes), 0);

  const getStatusColor = (estado: string) => {
    const statusColors: Record<string, string> = {
      'pendiente': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'pagado': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'enviado': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'entregado': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'cancelado': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    };
    return statusColors[estado.toLowerCase()] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Volver al panel
        </Link>

        <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Estado de Órdenes</h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-400">
              Resumen del ciclo de vida de pedidos
            </h2>
          </div>
          {!loading && data.length > 0 && (
            <div className="text-right">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                ${totalMoney.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {totalCount} órdenes totales
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Cargando...</div>
        ) : data.length > 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Valor Total
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Valor Promedio
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Valor Mínimo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Valor Máximo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    % del Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => {
                  const percentage = Number(row.porcentaje_ordenes).toFixed(1);
                  
                  return (
                    <tr key={idx} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded font-medium capitalize ${getStatusColor(row.estado)}`}>
                          {row.estado}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {row.cantidad_ordenes}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                        ${Number(row.valor_total).toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        ${Number(row.valor_promedio).toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 text-sm">
                        ${Number(row.valor_minimo).toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 text-sm">
                        ${Number(row.valor_maximo).toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[45px]">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No hay datos disponibles
          </div>
        )}
      </div>
    </main>
  );
}
