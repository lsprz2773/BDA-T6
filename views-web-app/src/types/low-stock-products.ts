export interface LowStockProduct {
  id_producto: number;
  nombre_producto: string;
  categoria: string;
  stock_actual: number;
  unidades_vendidas: string;
  unidades_restantes: number;
  radio_rotacion: string;
  urgencia: 'Critico' | 'Bajo' | 'Normal';
}