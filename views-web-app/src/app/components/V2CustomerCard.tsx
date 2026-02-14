import { CustomerAnalysis } from "@/types/customer-analysis";

const getColorRange = (rango: string) => {
  switch (rango) {
    case 'VIP': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'REGULAR': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-green-100 text-green-700 border-green-200';
  }
};

export const CustomerCard = ({ data }: { data: CustomerAnalysis }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all mb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-col items-center justify-center h-12 w-12 bg-gray-800 text-white rounded-lg shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-400">Rank</span>
          <span className="text-xl font-bold">#{data.ranking}</span>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{data.nombre_cliente}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getColorRange(data.rango_cliente)}`}>
            {data.rango_cliente}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-12 text-sm w-full md:w-auto justify-between md:justify-end">
        
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">Total Gastado</span>
          <span className="font-bold text-gray-900 text-base">
            ${Number(data.total_gastado).toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">Ticket Prom.</span>
          <span className="font-medium text-gray-700">
            ${Number(data.ticket_promedio).toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">Vs Promedio</span>
          <span className={`font-bold ${Number(data.diferencia_vs_promedio) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {Number(data.diferencia_vs_promedio) > 0 ? '+' : ''}
            ${Number(data.diferencia_vs_promedio).toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
};
