export interface CustomerAnalysis {
  nombre_cliente: string;
  total_gastado: string;
  numero_de_ordenes: string;
  ticket_promedio: string;
  rango_cliente: 'VIP' | 'REGULAR' | 'NUEVO';
  ranking: string;
  diferencia_vs_promedio: string;
}