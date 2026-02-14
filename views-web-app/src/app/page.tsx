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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vistas disponibles para analisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`
                group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                bg-indigo-600 hover:bg-indigo-70 text-white shadow-lg
              `}
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-500 ease-in-out" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">
                  {link.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
