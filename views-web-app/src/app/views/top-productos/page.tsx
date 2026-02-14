'use client';

import { useState } from 'react';
import { getTopProducts } from '@/app/actions/reports';
import type { TopProduct } from '@/types/top-products';
import Link from 'next/link';

export default function TopProductosPage() {
  const [categoria, setCategoria] = useState('');
  const [minIngreso, setMinIngreso] = useState<number | undefined>(undefined);
  const [data, setData] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilter = async () => {
    setLoading(true);
    setError('');
    const result = await getTopProducts({ categoria, min_ingreso: minIngreso });
    if (result.success) {
      setData(result.data ?? []);
    } else {
      setError(result.error || 'Error al cargar datos');
    }
    setLoading(false);
  };

  // Función para obtener color según ranking
  const getRankingColor = (ranking: string) => {
    const rank = Number(ranking);
    if (rank === 1) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    if (rank === 2) return 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200';
    if (rank === 3) return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
    return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Top Productos</h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Los mejores vendedores por categoría
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ej: Electrónica, Ropa, Hogar"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ingreso mínimo
              </label>
              <input
                type="number"
                value={minIngreso ?? ''}
                onChange={(e) => setMinIngreso(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="0"
                min="0"
                step="100"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
            <button
              onClick={handleFilter}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Filtrar'}
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
                    Ranking
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Unidades Vendidas
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ingresos Generados
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    % de Categoría
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => {
                  return (
                    <tr key={idx} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded font-bold ${getRankingColor(row.ranking_categoria)}`}>
                          #{row.ranking_categoria}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium">
                        {row.nombre_producto}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 text-sm">
                        {row.categoria}
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {row.unidades_vendidas}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                        ${Number(row.ingresos_generados).toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all"
                              style={{ width: `${Number(row.porcentaje_categoria)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[45px]">
                            {Number(row.porcentaje_categoria).toFixed(1)}%
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
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            {loading ? (
              <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
            ) : (
              <p className="text-gray-400 dark:text-gray-500">
                {categoria || minIngreso 
                  ? 'No se encontraron productos con estos filtros.'
                  : 'Selecciona una categoría y/o ingreso mínimo para ver resultados.'}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
