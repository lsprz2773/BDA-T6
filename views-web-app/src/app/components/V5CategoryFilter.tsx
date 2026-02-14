"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("categoria") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (term) params.set("categoria", term);
    router.push(`/top-productos?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Filtrar por categoría (ej. Ropa)..."
        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <button 
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Filtrar
      </button>
    </form>
  );
};
