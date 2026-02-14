'use client';

import { useState } from 'react';
import { getCustomerAnalysis } from '@/app/actions/reports';
import type { CustomerAnalysis } from '@/types/customer-analysis';
import Link from 'next/link';

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [rango, setRango] = useState<'' | 'VIP' | 'REGULAR' | 'NUEVO'>('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [data, setData] = useState<CustomerAnalysis[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (p: number = 1) => {
    setLoading(true);
    setError('');
    const result = await getCustomerAnalysis({ search, rango, page: p, limit });
    if (result.success) {
      setData(result.data ?? []);
      setPagination(result.pagination ?? { page: 1, limit: 20, total: 0, pages: 0 });
      setPage(p);
    } else {
      setError(result.error || 'Error al cargar datos');
    }
    setLoading(false);
  };

  // Función para obtener color según rango de cliente
  const getRangoColor = (rango: 'VIP' | 'REGULAR' | 'NUEVO') => {
    const rangoColors = {
      'VIP': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'REGULAR': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'NUEVO': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    };
    return rangoColors[rango];
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Volver al panel
        </Link>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Análisis de Clientes</h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Segmentación y comportamiento de compra (Top 20)
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Búsqueda (nombre del cliente)
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ej: Juan Pérez, María López"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rango de cliente
              </label>
              <select
                value={rango}
                onChange={(e) => setRango(e.target.value as '' | 'VIP' | 'REGULAR' | 'NUEVO')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              >
                <option value="">Todos</option>
                <option value="VIP">VIP</option>
                <option value="REGULAR">Regular</option>
                <option value="NUEVO">Nuevo</option>
              </select>
            </div>
            <button
              onClick={() => handleSearch(1)}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
          <>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Ranking
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Rango
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Órdenes
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Total Gastado
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Ticket Promedio
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      vs. Promedio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => {
                    const diferencia = Number(row.diferencia_vs_promedio);
                    const isPositive = diferencia >= 0;
                    
                    return (
                      <tr key={idx} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-6 py-3">
                          <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-semibold">
                            #{row.ranking}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium">
                          {row.nombre_cliente}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`px-3 py-1 rounded text-xs font-semibold ${getRangoColor(row.rango_cliente)}`}>
                            {row.rango_cliente}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                            {row.numero_de_ordenes}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                          ${Number(row.total_gastado).toFixed(2)}
                        </td>
                        <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                          ${Number(row.ticket_promedio).toFixed(2)}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`px-3 py-1 rounded text-xs font-semibold ${
                            isPositive 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}>
                            {isPositive ? '+' : ''}{diferencia.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Página {pagination.page} de {pagination.pages} (Total: {pagination.total})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSearch(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handleSearch(page + 1)}
                  disabled={page >= pagination.pages}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {loading ? 'Cargando...' : 'Realiza una búsqueda para ver resultados'}
          </div>
        )}
      </div>
    </main>
  );
}
