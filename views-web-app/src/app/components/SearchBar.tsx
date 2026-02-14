"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/ventas?search=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-md">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar categoría..."
        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};
