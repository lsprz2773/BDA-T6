import { LowStockProduct } from "@/types/low-stock-products";

const getUrgencyStyles = (urgencia: string) => {
  switch (urgencia) {
    case 'Critico': 
      return 'border-l-4 border-l-red-500 bg-red-50';
    case 'Bajo': 
      return 'border-l-4 border-l-yellow-400 bg-yellow-50';
    default: 
      return 'border-l-4 border-l-gray-300 bg-white';
  }
};

const getBadgeColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Critico': return 'bg-red-200 text-red-800';
      case 'Bajo': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

export const LowStockCard = ({ data }: { data: LowStockProduct }) => {
  return (
    <div className={`rounded-r-lg p-4 shadow-sm hover:shadow-md transition-all mb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-gray-200 ${getUrgencyStyles(data.urgencia)}`}>
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getBadgeColor(data.urgencia)}`}>
            {data.urgencia}
          </span>
          <span className="text-xs text-gray-500 font-mono">ID: {data.id_producto}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg">{data.nombre_producto}</h3>
        <p className="text-sm text-gray-600">{data.categoria}</p>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-10 w-full md:w-auto justify-between md:justify-end">
        
        <div className="flex flex-col items-end">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Stock Actual</span>
          <span className={`text-2xl font-bold ${data.urgencia === 'Critico' ? 'text-red-600' : 'text-gray-800'}`}>
            {data.stock_actual}
          </span>
          <span className="text-[10px] text-gray-400">unidades</span>
        </div>

        <div className="flex flex-col items-end min-w-[100px]">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Rotación</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-700">{data.radio_rotacion}</span>
            <span className="text-xs text-gray-400">ratio</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {data.unidades_vendidas} vendidas
          </span>
        </div>

      </div>
    </div>
  );
};
