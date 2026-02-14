"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const StockFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [urgencia, setUrgencia] = useState(searchParams.get("urgencia") || "");

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (urgencia) params.set("urgencia", urgencia);
    
    router.push(`/inventario?${params.toString()}`);
  };

  return (
    <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <input
        type="text"
        placeholder="Buscar producto o categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 flex-1 focus:ring-2 focus:ring-red-500 outline-none"
      />
      
      <select 
        value={urgencia}
        onChange={(e) => setUrgencia(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-48 bg-white cursor-pointer"
      >
        <option value="">Todas las urgencias</option>
        <option value="Critico">Crítico (Stock &lt; 50)</option>
        <option value="Bajo">Bajo (50 - 99)</option>
        <option value="Normal">Normal (&gt; 100)</option>
      </select>

      <button 
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
};
