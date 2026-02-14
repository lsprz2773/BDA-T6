import { CategorySales } from "../../types/category-sales";

export const CategoryCard = ({ data }: { data: CategorySales }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all mb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
            {data.nombre_categoria.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{data.nombre_categoria}</h3>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {data.porcentaje_participacion}% del mercado
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap md:flex-nowrap gap-6 md:gap-10 justify-start md:justify-end text-sm">
        
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Volumen</span>
          <span className="font-medium text-gray-700">
            {data.total_productos_vendidos} prods / {data.numero_de_ordenes} órdenes
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Ticket Prom.</span>
          <span className="font-medium text-gray-700">
             ${Number(data.ticket_promedio).toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col min-w-[100px]">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Ingreso Total</span>
          <span className="font-bold text-green-600 text-base">
            ${Number(data.ingreso_total).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
