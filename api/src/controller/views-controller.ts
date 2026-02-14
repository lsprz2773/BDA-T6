import { Request, Response } from 'express';
import * as db from '../config/db';


export const getVentasPorCategoria = async (req: Request, res: Response) => {
    try {
        const validated = schemas.salesByCategorySchema.parse(req.query);
        const searchTerm = `%${validated.search || ''}%`;

        const result = await db.query(
            `SELECT nombre_categoria, total_productos_vendidos, ingreso_total, ticket_promedio, numero_de_ordenes, porcentaje_participacion 
            FROM view_ventas_por_categoria 
            WHERE nombre_categoria ILIKE $1
            ORDER BY ingreso_total DESC`,
            [searchTerm]
        );

        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Datos de consulta inválidos' });
    }
};


export const getAnalisisDeClientes = async (req: Request, res: Response) => {
    try {
        const validated = schemas.customerAnalysisSchema.parse(req.query);
        const offset = (validated.page - 1) * validated.limit;
        const searchTerm = `%${validated.search || ''}%`;

        const result = await db.query(
            `SELECT nombre_cliente, total_gastado, numero_de_ordenes, ticket_promedio, rango_cliente, ranking, diferencia_vs_promedio 
            FROM view_analisis_de_clientes 
            WHERE (nombre_cliente ILIKE $1) AND ($2 = '' OR rango_cliente = $2)
            ORDER BY ranking ASC 
            LIMIT $3 OFFSET $4`,
            [searchTerm, validated.rango || '', validated.limit, offset]
        );

        const countResult = await db.query(
            `SELECT COUNT(*) as total FROM view_analisis_de_clientes WHERE nombre_cliente ILIKE $1`,
            [searchTerm]
        );
        const total = parseInt(countResult.rows[0]?.total || '0');

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                page: validated.page,
                limit: validated.limit,
                total,
                pages: Math.ceil(total / validated.limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener análisis de clientes' });
    }
};


export const getProductosBajoStock = async (req: Request, res: Response) => {
    try {
        const validated = schemas.lowStockSchema.parse(req.query);
        const searchTerm = `%${validated.search || ''}%`;

        const result = await db.query(
            `SELECT id_producto, nombre_producto, categoria, stock_actual, unidades_vendidas, unidades_restantes, radio_rotacion, urgencia 
            FROM view_productos_bajo_stock 
            WHERE (nombre_producto ILIKE $1 OR categoria ILIKE $1) AND ($2 = '' OR urgencia = $2)
            ORDER BY stock_actual ASC`,
            [searchTerm, validated.urgencia || '']
        );

        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener reporte de stock' });
    }
};

export const getAnalisisOrdenesEstado = async (req: Request, res: Response) => {
    try {
        const result = await db.query(
            `SELECT estado, cantidad_ordenes, valor_total, valor_promedio, valor_maximo, valor_minimo, porcentaje_ordenes 
            FROM view_analisis_ordenes_estado 
            ORDER BY cantidad_ordenes DESC`
        );

        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener análisis de órdenes' });
    }
};


export const getTopProductosPorCategoria = async (req: Request, res: Response) => {
    try {
        const validated = schemas.topProductsSchema.parse(req.query);
        const categoryFilter = validated.categoria || '%';

        const result = await db.query(
            `SELECT categoria, nombre_producto, unidades_vendidas, ingresos_generados, ranking_categoria, porcentaje_categoria 
            FROM view_top_productos_categoria 
            WHERE categoria ILIKE $1
            ORDER BY categoria ASC, ranking_categoria ASC`,
            [categoryFilter]
        );

        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Categoría no válida' });
    }
};
