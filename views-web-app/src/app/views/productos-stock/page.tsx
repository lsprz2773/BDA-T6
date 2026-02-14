'use client';

import { useState } from 'react';
import { getLowStock } from '@/app/actions/reports';
import type { LowStockProduct } from '@/types/low-stock-products';
import Link from 'next/link';

export default function InventarioPage() {
  const [search, setSearch] = useState('');
  const [urgencia, setUrgencia] = useState<'' | 'Critico' | 'Bajo' | 'Normal'>('');
  const [data, setData] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    const result = await getLowStock({ search, urgencia });
    if (result.success) {
      setData(result.data ?? []);
    } else {
      setError(result.error || 'Error al cargar datos');
    }
    setLoading(false);
  };

  // Función para obtener color según urgencia
  const getUrgenciaColor = (urgencia: 'Critico' | 'Bajo' | 'Normal') => {
    const urgenciaColors = {
      'Critico': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      'Bajo': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'Normal': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    };
    return urgenciaColors[urgencia];
  };

  // Función para calcular porcentaje de stock
  const getStockPercentage = (actual: number, vendidas: string) => {
    const totalVendidas = Number(vendidas);
    if (totalVendidas === 0) return 100;
    return Math.min(100, (actual / totalVendidas) * 100);
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Alerta de Stock Bajo</h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Productos que requieren reabastecimiento inmediato
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Búsqueda (nombre o categoría)
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ej: Laptop, Electrónica"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nivel de urgencia
              </label>
              <select
                value={urgencia}
                onChange={(e) => setUrgencia(e.target.value as '' | 'Critico' | 'Bajo' | 'Normal')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              >
                <option value="">Todos</option>
                <option value="Critico">Crítico</option>
                <option value="Bajo">Bajo</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
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
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Stock Actual
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Vendidas
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ratio Rotación
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Urgencia
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => {
                  const stockPercentage = getStockPercentage(row.stock_actual, row.unidades_vendidas);
                  
                  return (
                    <tr key={idx} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium">
                        {row.nombre_producto}
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300 text-sm">
                        {row.categoria}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {row.stock_actual} / {row.unidades_restantes}
                          </span>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${
                                stockPercentage <= 20 
                                  ? 'bg-red-600' 
                                  : stockPercentage <= 50 
                                  ? 'bg-yellow-600' 
                                  : 'bg-green-600'
                              }`}
                              style={{ width: `${stockPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {row.unidades_vendidas}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        {Number(row.radio_rotacion).toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getUrgenciaColor(row.urgencia)}`}>
                          {row.urgencia}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            {loading ? (
              <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
            ) : (
              <>
                <div className="text-green-600 dark:text-green-400 text-5xl mb-2">✓</div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Todo en orden</h3>
                <p className="text-green-600 dark:text-green-400">
                  No se encontraron productos con bajo stock bajo estos filtros.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
