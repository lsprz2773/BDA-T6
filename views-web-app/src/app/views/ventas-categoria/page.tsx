'use client';

import { useState } from 'react';
import { getSalesByCategory } from '@/app/actions/reports';
import type { CategorySales } from '@/types/category-sales';
import Link from 'next/link';

export default function VentasPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<CategorySales[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    const result = await getSalesByCategory({ search });
    if (result.success) {
      setData(result.data ?? []);
    } else {
      setError(result.error || 'Error al cargar datos');
    }
    setLoading(false);
  };

  // Calcular totales
  const totalIngresos = data.reduce((acc, item) => acc + Number(item.ingreso_total), 0);
  const totalProductos = data.reduce((acc, item) => acc + Number(item.total_productos_vendidos), 0);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Volver al panel
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Ventas por Categoría</h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-400">
              Reporte detallado de ingresos y volumen
            </h2>
          </div>
          {!loading && data.length > 0 && (
            <div className="text-right">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                ${totalIngresos.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {totalProductos} productos vendidos
              </span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Búsqueda por categoría
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ej: Electrónica, Ropa, Hogar"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {data.length > 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Productos Vendidos
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ingreso Total
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ticket Promedio
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Órdenes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    % Participación
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => {
                  const participacion = Number(row.porcentaje_participacion);
                  
                  return (
                    <tr key={idx} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium">
                        {row.nombre_categoria}
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {row.total_productos_vendidos}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                        ${Number(row.ingreso_total).toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        ${Number(row.ticket_promedio).toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {row.numero_de_ordenes}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all"
                              style={{ width: `${participacion}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[45px]">
                            {participacion.toFixed(1)}%
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
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            {loading ? (
              <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {search 
                  ? 'No se encontraron categorías con ese criterio.'
                  : 'Realiza una búsqueda para ver resultados.'}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
