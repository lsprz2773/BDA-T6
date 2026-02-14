"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const CustomerFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [rango, setRango] = useState(searchParams.get("rango") || "");

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (rango) params.set("rango", rango);
    
    router.push(`/clientes?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
      />
      
      <select 
        value={rango}
        onChange={(e) => setRango(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-40 bg-white"
      >
        <option value="">Todos los rangos</option>
        <option value="VIP">VIP</option>
        <option value="REGULAR">Regular</option>
        <option value="NUEVO">Nuevo</option>
      </select>

      <button 
        onClick={handleFilter}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Filtrar
      </button>
    </div>
  );
};
