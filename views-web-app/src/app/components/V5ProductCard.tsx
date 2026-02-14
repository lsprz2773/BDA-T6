import { TopProduct } from "@/types/top-products";

const getRankBadgeStyles = (rank: number) => {
  switch (rank) {
    case 1: return "bg-yellow-100 text-yellow-700 border-yellow-300 ring-2 ring-yellow-400/20";
    case 2: return "bg-gray-100 text-gray-700 border-gray-300";
    case 3: return "bg-orange-100 text-orange-800 border-orange-200";
    default: return "bg-white text-gray-500 border-gray-200";
  }
};

export const TopProductCard = ({ data }: { data: TopProduct }) => {
  const rank = Number(data.ranking_categoria);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
      
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className={`h-12 w-12 flex flex-col items-center justify-center rounded-lg border font-bold text-lg ${getRankBadgeStyles(rank)}`}>
          <span className="text-[10px] uppercase leading-none opacity-70">Top</span>
          <span>{rank}</span>
        </div>
        
        <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
              {data.categoria}
            </span>
            <h3 className="font-bold text-gray-800 text-base">{data.nombre_producto}</h3>
        </div>
      </div>

      <div className="flex-1 flex justify-between md:justify-end gap-8 w-full md:w-auto items-center">
        
        <div className="text-right">
            <span className="block text-xs text-gray-500">Volumen</span>
            <span className="font-medium text-gray-900">{data.unidades_vendidas} unds.</span>
        </div>

        <div className="text-right min-w-[100px]">
            <span className="block text-xs text-gray-500">Ingresos</span>
            <span className="font-bold text-indigo-700 text-lg">
                ${Number(data.ingresos_generados).toFixed(2)}
            </span>
        </div>
        
        <div className="text-right hidden sm:block">
            <span className="block text-xs text-gray-500">% Cat.</span>
            <div className="flex items-center gap-2 justify-end">
                <span className="font-medium text-gray-700">{data.porcentaje_categoria}%</span>
                <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${data.porcentaje_categoria}%` }} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
