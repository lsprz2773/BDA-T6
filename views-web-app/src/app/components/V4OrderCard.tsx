import { OrderStatusAnalysis } from "@/types/order-status-analysis";

const getTheme = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('pendiente')) return { bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'bg-yellow-400', dot: 'bg-yellow-500' };
  if (s.includes('pagado')) return { bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500', dot: 'bg-blue-600' };
  if (s.includes('enviado')) return { bg: 'bg-purple-50', border: 'border-purple-200', bar: 'bg-purple-500', dot: 'bg-purple-600' };
  if (s.includes('entregado')) return { bg: 'bg-green-50', border: 'border-green-200', bar: 'bg-green-500', dot: 'bg-green-600' };
  if (s.includes('cancelado')) return { bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500', dot: 'bg-red-600' };
  return { bg: 'bg-gray-50', border: 'border-gray-200', bar: 'bg-gray-400', dot: 'bg-gray-500' };
};

export const OrderStatusCard = ({ data }: { data: OrderStatusAnalysis }) => {
  const percentage = parseFloat(data.porcentaje_ordenes);
  const theme = getTheme(data.estado);

  return (
    <div className={`border rounded-lg p-5 mb-4 ${theme.bg} ${theme.border}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className={`h-4 w-4 rounded-full ${theme.dot} shadow-sm flex-shrink-0`} />
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{data.estado}</h3>
            <span className="text-sm text-gray-600 font-medium">{data.cantidad_ordenes} Órdenes</span>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-2">
          <div className="flex justify-between text-xs mb-1 text-gray-600 font-semibold">
            <span>Distribución</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 shadow-sm border border-gray-100">
            <div 
              className={`h-full rounded-full ${theme.bar}`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="w-full md:w-1/3 text-right">
            <div className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total</div>
            <div className="text-xl font-bold text-gray-900">
                ${Number(data.valor_total).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
                Promedio: ${Number(data.valor_promedio).toFixed(2)}
            </div>
        </div>

      </div>
      
      <div className="mt-3 pt-3 border-t border-black/5 flex justify-end gap-4 text-[10px] text-gray-400 uppercase tracking-wide">
        <span>Min: ${Number(data.valor_minimo).toFixed(2)}</span>
        <span>Max: ${Number(data.valor_maximo).toFixed(2)}</span>
      </div>
    </div>
  );
};
