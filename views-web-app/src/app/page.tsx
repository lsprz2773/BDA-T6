import Link from "next/link";

const dashboardLinks = [
  {
    title: "Ventas por Categoría",
    description: "Rendimiento y participación de mercado.",
    href: "/views/ventas-categoria"
  },
  {
    title: "Análisis de Clientes",
    description: "Segmentación VIP, Regular y Nuevos.",
    href: "/views/analisis-clientes"
  },
  {
    title: "Inventario (Bajo Stock)",
    description: "Alertas de reabastecimiento crítico.",
    href: "/views/productos-stock"
  },
  {
    title: "Estado de Órdenes",
    description: "Flujo de pedidos (Pendiente a Entregado).",
    href: "/views/ordenes"
  },
  {
    title: "Top Productos",
    description: "Ranking de mejores vendedores por grupo.",
    href: "/views/top-productos"
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard de Reportes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vistas disponibles para análisis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
